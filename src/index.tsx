import React, {Component, PureComponent } from 'react';
import { Linking, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { persistStore, persistReducer, REHYDRATE } from 'redux-persist';
import { Root, StyleProvider } from 'native-base';
import { PersistGate } from 'redux-persist/integration/react';
import { connect } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import RNBootSplash from 'react-native-bootsplash';
import codePush from "react-native-code-push";
import { Mode } from 'react-native-dark-mode';
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
import SelectAppModalProvider, {withSelectAppModal} from '@Global/components/SelectAppModal';
import SelectThemeModalProvider, {withSelectThemeModal} from '@Global/components/SelectThemeModal';
import ErrorView from '@Global/components/ErrorView';

import { getTheme } from '@Global/utils/themes';
import {setJSExceptionHandler} from "@Global/utils/globalErrorHandle";
import moment from 'moment';

import * as apps from '@/Apps/index';
const appsMemoize = _.memoize(_.values);

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
  appProps: ConnectState;
  mode: Mode;
  theme: any;
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
      ],
    };

    const dvaApp = dva({
      initialState: {},
      models,
      extraReducers: {},
      onAction: [],
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
        const { appProps, theme } = this.props;
        const { initLoading, forceUpdate, isError, errorInfo } = this.state;
        // return <NavigationContainer><router.Router {...appProps} /></NavigationContainer>
        return (
          <NavigationContainer>
            <StyleProvider style={getTheme(theme)}>
              <Root>
                <LoadingSpinnerProvider>
                  <DropdownAlertProvider>
                    <CheckAppUpdateProvider>
                      <CheckCodePushProvider>
                        <SelectThemeModalProvider>
                          <SelectAppModalProvider>
                            <MinProgramProvider>
                              {
                                isError ? (<ErrorView errorInfo={errorInfo} />) : (
                                  !initLoading && !forceUpdate ? <router.Router {...appProps} /> : undefined
                                )
                              }
                              {!initLoading && $config.environment ? <IsTester /> : undefined }
                            </MinProgramProvider>
                          </SelectAppModalProvider>
                        </SelectThemeModalProvider>
                      </CheckCodePushProvider>
                    </CheckAppUpdateProvider>
                  </DropdownAlertProvider>
                </LoadingSpinnerProvider>
              </Root>
            </StyleProvider>
          </NavigationContainer>
        );
      }
    }
    const MainView = connect((state: ConnectState) => {
      return {
        appReload: _.get(state, 'app.appReload', false),
        appProps: state,
        mode: _.get(state, 'global.mode'),
        theme: _.get(state, 'theme.theme'),
      }
    })(withSelectThemeModal((withSelectAppModal(withLoadingSpinner(Main)))));

    function App() {
      return (
        <PersistGate
          persistor={createPersist(dvaApp._store)}
          loading={<Loading />}
        >
          <MainView />
        </PersistGate>
      )
    }
    APP_NODE = dvaApp.start(<App />);
  } catch (e) {
    console.log(e)
  }
  return APP_NODE;
}

let codePushOptions = {
  checkFrequency : codePush.CheckFrequency.MANUAL,
  updateDialog: undefined,
};
@codePush(codePushOptions)
export default class RootView extends PureComponent {
  
  constructor(props: any) {
    super(props);
    this.getAppID = this.getAppID.bind(this);
    this.selectApp = this.selectApp.bind(this);
  }

  state = {
    defaultAppID: 'app_Default',
    appID: '',
  }

  componentDidMount() {
    this.createAppNode();
  }

  async componentDidUpdate() {
    const appID = await AsyncStorage.getItem('__APP_ID__') || this.state.appID;
    if (!this[appID]) {
      this.createAppNode()
    }
  }

  async createAppNode() {
    const appID = await AsyncStorage.getItem('__APP_ID__');
    const nowAppID = this.getAppID(appID);
    const app = apps[nowAppID];
    // console.log('config: ', 'nowAppID: ', nowAppID, 'app: ', app, 'apps: ', apps);
    this[nowAppID] = createApp(app);
    this.setState({
      appID: nowAppID,
      time: moment().format('X')
    }, () => {
      AsyncStorage.setItem('__THEME_ID__', this.state.appID);
    });
  }

  async selectApp(appID: string) {
    RNBootSplash.show();
    const nowAppID = this.getAppID(appID);
    await AsyncStorage.setItem('__APP_ID__', nowAppID);
    setTimeout(() => {
      codePush.restartApp();
    }, 300)
  }

  getAppID(appID: string | null) {
    let nowAppID = this.state.defaultAppID;
    const supportedApps = appsMemoize(apps)
    if (appID && supportedApps.findIndex((item) => appID === item.id) > -1) {
      nowAppID = appID;
    } else {
      // 设置默认app id
      nowAppID = this.state.defaultAppID;
    }
    return nowAppID;
  }

  render() {
    const { appID } = this.state;
    const NODE = this[appID];
    global['$selectApp'] = this.selectApp;
    return appID && NODE ? <NODE /> : <Loading />
  }
};
