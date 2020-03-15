import React, { PureComponent } from 'react';
import { Platform, BackHandler, ToastAndroid } from 'react-native';
import {
  NavigationActions,
} from 'react-navigation';
import _ from 'lodash';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import { StyleProvider, Root } from 'native-base';
import {
    createReduxContainer,
    createReactNavigationReduxMiddleware,
    createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { Mode } from 'react-native-dark-mode';
import { connect } from 'react-redux';
import { ConnectState } from '../models/connect';
import { getTheme } from '@Global/utils/themes';

import Splash from '../pages/Splash';
import BottomTab from './BottomTab.router';

import LoginProvider from '../components/LoginModal';
import { getActiveRoute } from '@Global/utils/utils';


const MainRouter = createAnimatedSwitchNavigator(
  {
    Main: BottomTab,
  },
  {
    initialRouteName: 'Main',
    // headerMode: 'none',
    // mode: 'modal',
      transition: (
      <Transition.Together>
          <Transition.Out type="slide-bottom" durationMs={300} interpolation="easeInOut" />
          <Transition.In type="fade" durationMs={300} interpolation="easeInOut" />
      </Transition.Together>
    ),
  }
);

const AppNavigator = createAnimatedSwitchNavigator(
    {
        Splash: Splash,
        MainRouter: MainRouter,
    },
    {
      initialRouteName: 'Splash',
      transition: (
        <Transition.Together>
          <Transition.Out type="fade" durationMs={400} interpolation="easeInOut" />
          <Transition.In type="fade" durationMs={300} interpolation="easeInOut"  />
        </Transition.Together>
      ),
    }
);

export default function createRouter() {
  const routerReducer = createNavigationReducer(AppNavigator)

  const routerMiddleware = createReactNavigationReduxMiddleware(
    (state: any) => state.router,
    'root'
  )

  const App = createReduxContainer(AppNavigator, 'root')

  interface IRouterProps {
    dispatch: any;
    router: any;
    theme?: any;
    token: undefined | string;
    mode: Mode;
  }

  let lastBackPressed: any = undefined;
  const isIos = Platform.OS === 'ios';


  class Router extends PureComponent<IRouterProps, {}> {
    constructor(props: IRouterProps) {
      super(props);
      // @ts-ignore
      if (!isIos) {
        BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
      }
    }

    state = {
      forceUpdate: false,
    }

    componentDidUpdate(prevProps: Readonly<IRouterProps>, prevState: Readonly<{}>): void {
      // // todo: 暂时 当token改变强置刷新
      try {
        console.log('token this', this.props.token)
        console.log('token prevProps', prevProps.token)
        if (this.props.token !== prevProps.token) {
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
      if (!isIos) {
        BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
      }
    }

    onBackButtonPressAndroid = () => {
      const { dispatch, router } = this.props;
      const currentScreen = getActiveRoute(router).routeName;

      if (currentScreen !== 'Home' && currentScreen !== 'Login' ) {
        dispatch(NavigationActions.back());
        return true
      }
      if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
        BackHandler.exitApp();
        return true;
      }
      lastBackPressed = Date.now();
      ToastAndroid.show('再按一次退出应用', ToastAndroid.SHORT);
      return true
    };

    render() {
      const { forceUpdate } = this.state;
      const { dispatch, router, theme } = this.props;
      return <StyleProvider style={getTheme(theme)}>
          <Root>
            <LoginProvider>
              {
                !forceUpdate ? <App
                  dispatch={dispatch}
                  state={router}
                /> : undefined
              }
            </LoginProvider>
          </Root>
      </StyleProvider>
    }
  }

  interface IConnectState extends ConnectState {
    router: any;
  }
  return {
    routerReducer,
    routerMiddleware,
    Router: connect((state: IConnectState) => {
      return {
        router: state.router,
        token: state.auth.token,
        mode: state.global.mode,
        theme: state.theme.theme,
      }
    })(Router),
  }
}

