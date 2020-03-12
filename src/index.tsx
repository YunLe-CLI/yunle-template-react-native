import React, {Component, PureComponent } from 'react';
import { Linking, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer, REHYDRATE } from 'redux-persist';
import { StyleProvider } from 'native-base';
import { PersistGate } from 'redux-persist/integration/react';
import { connect } from "react-redux";
import RNBootSplash from 'react-native-bootsplash';
import codePush from "react-native-code-push";
import _ from 'lodash';
import './global';
import dva from '@Global/utils/dva';
import createModels from '@Global/models';
import { ConnectState, ConnectProps } from '@Global/models/connect';
import { UrlProcessUtil } from '@Global/utils/utils';
import MinProgramProvider from '@Global/components/MinProgram';
import LoadingSpinnerProvider, {withLoadingSpinner} from '@Global/components/LoadingSpinner';
import DropdownAlertProvider from '@Global/components/DropdownAlert';
import IsTester from '@Global/components/isTester';
import Loading from '@Global/components/Loading';
import CheckAppUpdateProvider from '@Global/components/CheckAppUpdate';
import CheckCodePushProvider from '@Global/components/CheckCodePush';
import SelectThemeModalProvider, {withSelectThemeModal} from '@Global/components/SelectThemeModal';
import ErrorView from '@Global/components/ErrorView';

import getTheme from '@Global/utils/native-base-theme/components';
import platform from '@Global/utils/native-base-theme/variables/platform';
import {setJSExceptionHandler} from "@Global/utils/globalErrorHandle";
import moment from 'moment';

import * as themes from '@Theme/index';
const themesMemoize = _.memoize(_.values);

export interface ICreateApp {
  id: string;
  name: string;
  router: {
    Router: any;
    routerReducer: any;
    routerMiddleware: any;
  };
  models: [],
  locales: {},
}

interface IMProps extends ConnectProps {
  appReload: boolean;
  ENV: string;
  appProps: ConnectState
}

function createApp(config: ICreateApp) {
  let APP_NODE = undefined;
  try {
    const PERSIST_KEY = config.id;
    const router = config.router;
    const models = createModels(config.models);
    i18n.setI18nConfig('zh-CN', config.locales);
    const persistConfig = {
      key: PERSIST_KEY,
      storage: AsyncStorage,
      blacklist: [
        'global',
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

    class Main extends Component<IMProps> {
      constructor(props: IMProps) {
        super(props)
        codePush.disallowRestart(); // 禁止重启
        // @ts-ignore
        UrlProcessUtil.dispatch = props.dispatch;
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

      static getDerivedStateFromError() {
        return { isError: true };
      }

      componentDidCatch (err: any, info: any) {
        this.setState({
          errorInfo: err || info,
        })
      }

      async componentDidMount() {
        await this.init();
        codePush.allowRestart();// 在加载完了，允许重启
      }

      async componentDidUpdate(prevProps: Readonly<IMProps>, prevState: Readonly<{}>, snapshot?: any) {
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
        Linking.removeEventListener('url', ({url}) => UrlProcessUtil.handleOpenURL(url));
      }

      async init() {
        try {
          await this.initLinking();
          setJSExceptionHandler((e) => {
            this.setState({
              isError: true,
              errorInfo: e,
            })
          }, $config.buildType === 'release');
        } catch (e) {

        } finally {
          this.setState({
            initLoading: false,
          }, () => {
            RNBootSplash.hide({ duration: 250 });
          });
        }
      }

      initLinking = async () => {
        Linking.addEventListener('url', ({url}) => UrlProcessUtil.handleOpenURL(url));
      }

      render() {
        const { appProps } = this.props;
        const { initLoading, forceUpdate, isError, errorInfo } = this.state;
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
    const MainView = connect((state: ConnectState) => {
      return {
        appReload: _.get(state, 'app.appReload', false),
        appProps: state,
      }
    })(withSelectThemeModal(withLoadingSpinner(Main)));

    class App extends React.Component {
      render() {
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
                        <MinProgramProvider>
                          <MainView />
                        </MinProgramProvider>
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
   
  }
  return APP_NODE;
}

let codePushOptions = {
  checkFrequency : codePush.CheckFrequency.MANUAL,
  updateDialog: undefined,
};
@codePush(codePushOptions)
export default class RootView extends PureComponent {

  state = {
    themeID: 'Theme_Default',
  }

  componentDidMount() {
    this.createThemeNode();
  }

  async componentDidUpdate() {
    const themeID = await AsyncStorage.getItem('__THEME_ID__') || this.state.themeID;
    if (!this[themeID]) {
      this.createThemeNode()
    }
  }

  async createThemeNode() {
    const themeID = await AsyncStorage.getItem('__THEME_ID__') || this.state.themeID;
    let nowThemeID = 'Theme_Default';
    const supportedThemes = themesMemoize(themes)
    if (themeID && supportedThemes.findIndex((item) => themeID === item.id) > -1) {
      nowThemeID = themeID;
    } else {
      // auto set
      nowThemeID = 'Theme_Default'
    }
    await AsyncStorage.setItem('__THEME_ID__', nowThemeID);
    const nowTheme = themes[nowThemeID];
    this[nowThemeID] = createApp(nowTheme);
    this.setState({
      themeID: nowThemeID,
      time: moment().format('X')
    });
  }

  async selectTheme(themeID: string) {
    let nowThemeID = 'Theme_Default';
    const supportedThemes = themesMemoize(themes)
    if (themeID && supportedThemes.findIndex((item) => themeID === item.id) > -1) {
      nowThemeID = themeID;
    } else {
      // auto set
      nowThemeID = 'Theme_Default'
    }
    await AsyncStorage.setItem('__THEME_ID__', nowThemeID);
    console.log(themeID)
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
