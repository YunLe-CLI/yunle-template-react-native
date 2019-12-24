import React, { PureComponent } from 'react';
import {AppState, Linking, View} from 'react-native';
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
import ApolloRoot from '@/utils/apollo';
import Router, { routerMiddleware, routerReducer } from '@/router';
import * as models from '@/models';
import {UrlProcessUtil, getEnv} from '@/utils/utils';
import LoginModal from '@/components/LoginModal';
import IsTester from '@/components/isTester';
import Loading from '@/components/Loading'
import { IAppModelState } from '@/models';

import getTheme from '@/utils/native-base-theme/components';
import platform from '@/utils/native-base-theme/variables/platform';

const PERSIST_KEY = 'root';
const persistConfig = {
  key: PERSIST_KEY,
  storage: AsyncStorage,
  blacklist: [
    'router',
    'cache',
  ],

};


export const dvaApp = dva({
    initialState: {},
    models: Object.values(models),
    extraReducers: { router: routerReducer },
    onAction: [routerMiddleware],
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

let codePushOptions = {
  //设置检查更新的频率
  //ON_APP_RESUME APP恢复到前台的时候
  //ON_APP_START APP开启的时候
  //MANUAL 手动检查
  checkFrequency : codePush.CheckFrequency.ON_APP_RESUME,
  updateDialog : {
    //是否显示更新描述
    appendReleaseDescription : true ,
    //更新描述的前缀。 默认为"Description"
    descriptionPrefix : "更新内容：" ,
    //强制更新按钮文字，默认为continue
    mandatoryContinueButtonLabel : "立即更新" ,
    //强制更新时的信息. 默认为"An update is available that must be installed."
    mandatoryUpdateMessage : "必须更新后才能使用" ,
    //非强制更新时，按钮文字,默认为"ignore"
    optionalIgnoreButtonLabel : '稍后' ,
    //非强制更新时，确认按钮文字. 默认为"Install"
    optionalInstallButtonLabel : '后台更新' ,
    //非强制更新时，检查到更新的消息文本
    optionalUpdateMessage : '有新版本了，是否更新？' ,
    //Alert窗口的标题
    title : '更新提示'
  },
};

export interface IMProps {}

@(connect((state: IAppModelState) => {
  const { auth } = state;
  return {
    token: auth.token,
    isVisibleLoginModal:  _.get(state, 'cache.isVisibleLoginModal', false),
    loading: _.get(state, 'app.loading', {}),
    ENV: _.get(state, 'app.ENV', {}),
  }
}) as any)
class Main extends PureComponent<IMProps> {
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
  };

  forceUpdateNum: number = 0;

  async componentDidMount() {
    await this.init();
    codePush.allowRestart();// 在加载完了，允许重启
    console.log('app main did mount')
  }

  async componentDidUpdate(prevProps: Readonly<IMProps>, prevState: Readonly<{}>, snapshot?: any): void {
    // todo: 暂时 当token改变强置刷新
    if (this.props.token !== prevProps.token) {
      // this.forceUpdate(() => {
      //   this.forceUpdateNum += 1;
      //   console.log("forceUpdate: ", this.forceUpdateNum)
      // })
      this.forceUpdateNum += 1;
      console.log("forceUpdate: ", this.forceUpdateNum)
      this.setState({
        forceUpdate: true,
      }, () => {
        this.setState({
          forceUpdate: false,
        })
      })
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

  async initLinking() {
    Linking.addEventListener('url', ({url}) => UrlProcessUtil.handleOpenURL(url));
  }

  render() {
    const { isVisibleLoginModal, ENV } = this.props;
    const { initLoading, forceUpdate } = this.state;
    return (
      <>
        <View style={{ flexGrow: 1, }}>
          {
            !initLoading && !forceUpdate ? <Router /> : undefined
          }
          {
            !initLoading && ENV === 'development' ? <IsTester /> : undefined
          }
        </View>
        <LoginModal isVisible={isVisibleLoginModal} />
      </>
    );
  }
}

@codePush(codePushOptions)
class App extends PureComponent {
    render() {
      return (
        <PersistGate
            persistor={createPersist(dvaApp._store)}
            loading={<Loading />}
        >
          <ApolloRoot>
            <StyleProvider style={getTheme(platform)}>
              <Main />
            </StyleProvider>
          </ApolloRoot>
        </PersistGate>
      );
    }
}


export default dvaApp.start(<App />);