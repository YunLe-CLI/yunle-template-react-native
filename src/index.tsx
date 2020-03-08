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
import dva from '@Global/utils/dva';
import createModels from '@Global/models';
import { Dispatch } from 'redux';
import { ConnectState } from '@Global/connect';
import {UrlProcessUtil, getEnv} from '@Global/utils/utils';
import LoadingSpinnerProvider, {withLoadingSpinner} from '@Global/components/LoadingSpinner';
import DropdownAlertProvider from '@Global/components/DropdownAlert';
import IsTester from '@Global/components/isTester';
import Loading from '@Global/components/Loading';
import CheckAppUpdateProvider from '@Global/components/CheckAppUpdate';
import CheckCodePushProvider from '@Global/components/CheckCodePush';
import SelectThemeModalProvider, {withSelectThemeModal} from '@Global/components/SelectThemeModal';
import { IAppModelState } from '@Global/models';
import ErrorView from '@Global/components/ErrorView';

import getTheme from '@Global/utils/native-base-theme/components';
import platform from '@Global/utils/native-base-theme/variables/platform';
import {setJSExceptionHandler} from "@Global/utils/globalErrorHandle";
import { BUILD_TYPE } from '@Global/utils/env'

import * as themes from '@Theme';
import moment from 'moment';

global.dvaStore = undefined;

const THEMES = Object.values(themes);

export interface ICreateApp {
  id: string;
  name: string;
  router: {};
  models: [],
}

function createApp(config: ICreateApp) {
  let APP_NODE = undefined;
  try {
    const PERSIST_KEY = config.id;
    const router = config.router;
    const models = createModels(config.models);

    const persistConfig = {
      key: PERSIST_KEY,
      storage: AsyncStorage,
      blacklist: [
        'router',
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
      dispatch: Dispatch;
    }

    @(connect((state: ConnectState) => {
      return {
        appReload: _.get(state, 'app.appReload', false),
        ENV: _.get(state, 'app.ENV', {}),
        appProps: state,
      }
    }))
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
            type: 'global/orientationChange',
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
              type:"global/appReload",
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
            RNBootSplash.hide({ duration: 250 });
          });
        }
      }

      _handleAppStateChange = async (nextAppState: string) => {
        const { dispatch } = this.props;
        if (dispatch) {
          dispatch({
            type: 'global/appStateChange',
            appState: nextAppState,
          });
        }
      };

      _onOrientationDidChange = async (orientation: string) => {
        const { dispatch } = this.props;
        dispatch({
          type: 'global/orientationChange',
          orientation,
        })
      };

      initENV = async () => {
        const { dispatch } = this.props;
        const env = await getEnv();
        await dispatch({
          type: 'global/changeENV',
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
                  !initLoading && !forceUpdate ? <router.Router {...appProps} /> : undefined
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
    const MainView = withSelectThemeModal(withLoadingSpinner(Main));
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
                      <SelectThemeModalProvider>
                        <MainView />
                      </SelectThemeModalProvider>
                    </CheckCodePushProvider>
                  </CheckAppUpdateProvider>
                </DropdownAlertProvider>
              </LoadingSpinnerProvider>
            </StyleProvider>
          </PersistGate>
        );
      }
    }
    APP_NODE = dvaApp.start(<App />);
  } catch (e) {
    alert(e)
  }
  return APP_NODE;
}

let codePushOptions = {
  checkFrequency : codePush.CheckFrequency.MANUAL,
  updateDialog: false,
};
@codePush(codePushOptions)
export default class RootView extends PureComponent {

  state = {
    themeID: 'Theme_Novel',
  }

  componentDidMount() {
    this.createThemeNode();
  }

  async componentDidUpdate() {
    const themeID = await AsyncStorage.getItem('__THEME_ID__') || this.state.themeID;
    console.log(!this[themeID])
    if (!this[themeID]) {
      this.createThemeNode()
    }
  }

  async createThemeNode() {
    const themeID = await AsyncStorage.getItem('__THEME_ID__') || this.state.themeID;
    const nowTheme = _.findLast(THEMES, (item) => {
      return item.id === themeID
    });
    if (nowTheme) {
      await AsyncStorage.setItem('__THEME_ID__', themeID);
      this[themeID] = createApp(nowTheme);
      this.setState({
        themeID: themeID,
        time: moment().format('X')
      });
    } else {
      const nowTheme = _.findLast(THEMES, (item) => {
        return item.id === this.state.themeID
      });
      this[themeID] = createApp(nowTheme);
      this.setState({
        themeID: themeID,
        time: moment().format('X')
      });
    }
  }

  async selectTheme(themeID: string) {
    await AsyncStorage.setItem('__THEME_ID__', themeID);
    setTimeout(() => {
      codePush.restartApp();
    }, 300)
  }

  render() {
    global.ROOTVIEW = this;
    const { themeID } = this.state;
    const NODE = this[themeID];
    return themeID && NODE ? <NODE /> : <Loading />
  }
};
