import React, {Component, PureComponent, ReactNode} from 'react';
import {AppState, Linking, View, Text} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer, REHYDRATE } from 'redux-persist';
import { StyleProvider } from 'native-base';
import { PersistGate } from 'redux-persist/integration/react';
import { connect } from "react-redux";
import RNBootSplash from 'react-native-bootsplash';
import Orientation from 'react-native-orientation-locker';
import codePush from "react-native-code-push";
import _ from 'lodash';
import dva from '@/utils/dva';
import createModels from '@/models';
import {UrlProcessUtil, getEnv} from '@/utils/utils';
import LoadingSpinnerProvider, {withLoadingSpinner} from '@/components/LoadingSpinner';
import DropdownAlertProvider from '@/components/DropdownAlert';
import IsTester from '@/components/isTester';
import Loading from '@/components/Loading';
import CheckAppUpdateProvider from '@/components/CheckAppUpdate';
import CheckCodePushProvider from '@/components/CheckCodePush';
import { IAppModelState } from '@/models';
import ErrorView from '@/components/ErrorView';

import getTheme from '@/utils/native-base-theme/components';
import platform from '@/utils/native-base-theme/variables/platform';
import {setJSExceptionHandler} from "@/utils/globalErrorHandle";
import { BUILD_TYPE } from '@/utils/env'

import { Theme_Hospital } from '@/theme';

global.dvaStore = undefined;

export interface ICreateApp {
  PERSIST_KEY: string;
  router: {};
  models: [],
}

function createApp(config: ICreateApp) {
  const PERSIST_KEY = config.PERSIST_KEY;
  const router = config.router;
  const models = createModels(config.models)
  const persistConfig = {
    key: PERSIST_KEY,
    storage: AsyncStorage,
    blacklist: [
      'router',
      'cache',
    ],
  };

  const dvaApp = dva({
    initialState: {},
    models,
    extraReducers: { router: router.routerReducer },
    onAction: [router.routerMiddleware],
    onReducer: (rootReducer:any) => persistReducer(persistConfig, rootReducer),
    onError: (e: any) => {
      console.log('onError', e);
    },
  });

  const createPersist = (store: any) => {
    const persistor = persistStore(store)
    persistor.dispatch({
      type: REHYDRATE,
      key: PERSIST_KEY,
    });
    return persistor
  };

  interface IMProps {
    appReload: boolean;
    ENV: string;
  }

  @(connect((state: IAppModelState) => {
    return {
      appReload: _.get(state, 'app.appReload', false),
      ENV: _.get(state, 'app.ENV', {}),
      appProps: state,
    }
  }) as any)
  class Main extends Component<IMProps> {
    constructor(props: IMProps) {
      super(props)
      codePush.disallowRestart(); // 禁止重启
      const { dispatch } = props;
      // @ts-ignore
      UrlProcessUtil.dispatch = props.dispatch;
      Orientation.lockToPortrait();
      const initial = Orientation.getInitialOrientation();
      if (dispatch) {
        dispatch({
          type: 'app/orientationChange',
          orientation: initial,
        })
      }
    }

    state = {
      loading: true,
      isLogin: false,
      initLoading: false,
      forceUpdate: false,
      isError: false,
      errorInfo: undefined,
    };

    forceUpdateNum: number = 0;

    static getDerivedStateFromError(error) {
      return { isError: true };
    }

    componentDidCatch (err, info) {
      this.setState({
        errorInfo: err || info,
      })
    }

    async componentDidMount() {
      await this.init();
      codePush.allowRestart();// 在加载完了，允许重启
    }

    async componentDidUpdate(prevProps: Readonly<IMProps>, prevState: Readonly<{}>, snapshot?: any): void {
      // // todo: 暂时 当appReload改变强置刷新
      try {
        if (this.props.appReload !== prevProps.appReload && this.props.appReload) {
          console.log('this.props.appReload', this.props.appReload, prevProps.appReload)
          this.forceUpdateNum += 1;
          await this.props.dispatch({
            type:"app/appReload",
            appReload: false,
          });
          this.setState({
            forceUpdate: true,
          }, () => {
            this.setState({
              forceUpdate: false,
            })
          })
        }
      } catch (e) {
        console.log(e);
      }
    }

    componentWillUnmount() {
      AppState.removeEventListener('change', this._handleAppStateChange);
      Linking.removeEventListener('url', ({url}) => UrlProcessUtil.handleOpenURL(url));
    }

    async init() {
      try {
        await this.initENV();
        await this.initLinking();
        AppState.addEventListener('change', this._handleAppStateChange);
        Orientation.addOrientationListener(this._onOrientationDidChange);
        // setJSExceptionHandler((e) => {
        //   this.setState({
        //     isError: true,
        //     errorInfo: e,
        //   })
        // }, BUILD_TYPE === 'release');
      } catch (e) {

      } finally {
        this.setState({
          initLoading: false,
        }, () => {
          RNBootSplash.hide({ duration: 300 });
        });
      }
    }

    _handleAppStateChange = async (nextAppState: string) => {
      const { dispatch } = this.props;
      if (dispatch) {
        dispatch({
          type: 'app/appStateChange',
          appState: nextAppState,
        });
      }
    };

    _onOrientationDidChange = async (orientation: string) => {
      const { dispatch } = this.props;
      dispatch({
        type: 'app/orientationChange',
        orientation,
      })
    };

    initENV = async () => {
      const { dispatch } = this.props;
      const env = await getEnv();
      await dispatch({
        type: 'app/changeENV',
        payload: env,
      });
    };

    initLinking = async () => {
      Linking.addEventListener('url', ({url}) => UrlProcessUtil.handleOpenURL(url));
    }

    render() {
      const { ENV, appProps } = this.props;
      const { initLoading, forceUpdate, isError, errorInfo } = this.state;
      console.log(this.props)
      return (
        <View style={{ flex: 1, flexGrow: 1, }}>
          <View style={{ flexGrow: 1, }}>
            {
              isError ? (<ErrorView errorInfo={errorInfo} />) : (
                !initLoading && !forceUpdate ? <router.Router {...appProps} /> : <Text>加载中</Text>
              )
            }
          </View>
          <IsTester />
          {/*{*/}
          {/*  !initLoading && ENV === 'development' ? <IsTester /> : undefined*/}
          {/*}*/}
        </View>
      );
    }
  }
  const MainView = withLoadingSpinner(Main);
  class App extends PureComponent {
    render() {
      // todo: 临时写法
      global.dvaStore = dvaApp._store;
      return (
        <PersistGate
          persistor={createPersist(dvaApp._store)}
          loading={<Loading />}
        >
          <StyleProvider style={getTheme(platform)}>
            <LoadingSpinnerProvider>
              <DropdownAlertProvider>
                <CheckAppUpdateProvider>
                  <CheckCodePushProvider>
                    <MainView />
                  </CheckCodePushProvider>
                </CheckAppUpdateProvider>
              </DropdownAlertProvider>
            </LoadingSpinnerProvider>
          </StyleProvider>
        </PersistGate>
      );
    }
  }

  return dvaApp.start(<App />);
}

let codePushOptions = {
  checkFrequency : codePush.CheckFrequency.MANUAL,
  updateDialog: false,
};
@codePush(codePushOptions)
export default class RootView extends PureComponent {

  NODE: ReactNode;

  state = {
    init: false,
  }

  componentDidMount() {
    this.createThemeNode(Theme_Hospital);
    this.setState({
      init: true,
    })
  }

  componentDidUpdate() {
    this.createThemeNode(Theme_Hospital);
  }

  createThemeNode(theme) {
    if (!this.NODE) {
      this.NODE = createApp(theme);
    }
  }

  render() {
    const { init } = this.state;
    return init && this.NODE ? <this.NODE /> : <Loading />
  }
};
