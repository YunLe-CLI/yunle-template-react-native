import React, { PureComponent } from 'react';
import {Platform, BackHandler, ToastAndroid, View} from 'react-native';
import {
  NavigationActions,
} from 'react-navigation';
import _ from 'lodash';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';
import { StyleProvider } from 'native-base';
import {
    createReduxContainer,
    createReactNavigationReduxMiddleware,
    createNavigationReducer,
} from 'react-navigation-redux-helpers';

import { connect } from 'react-redux';
import getTheme from '../components/native-base-theme/components';
import platform from '../components/native-base-theme/variables/platform';

import Splash from '../pages/Splash';
import BottomTab from '../router/BottomTab.router';

import LoginProvider from '../components/LoginModal';
import GoToRoomModalProvider from '../components/GoToRoomModal';
import CancelModalProvider from '../components/CancelModal';
import AddressListModalProvider from '../components/AddressListModal';
import SelectDateTimeModalProvider from '../components/SelectTimeModal';
import { getActiveRoute } from '@/utils/utils';


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

    componentDidUpdate(prevProps: Readonly<IMProps>, prevState: Readonly<{}>): void {
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
      const { dispatch, router } = this.props;
      return <StyleProvider style={getTheme(platform)}>
        <LoginProvider>
          <GoToRoomModalProvider>
            <CancelModalProvider>
              <AddressListModalProvider>
                <SelectDateTimeModalProvider>
                  {
                    !forceUpdate ? <App
                      dispatch={dispatch}
                      state={router}
                    /> : undefined
                  }
                </SelectDateTimeModalProvider>
              </AddressListModalProvider>
            </CancelModalProvider>
          </GoToRoomModalProvider>
        </LoginProvider>
      </StyleProvider>
    }
  }

  interface IConnectProps {
    router: any;
  }
  return {
    routerReducer,
    routerMiddleware,
    Router: connect((state: IConnectProps) => {
      console.log('TEST_NNN', state)
      return {
        router: state.router,
        token: _.get(state, 'auth.token'),
      }
    })(Router),
  }
}


