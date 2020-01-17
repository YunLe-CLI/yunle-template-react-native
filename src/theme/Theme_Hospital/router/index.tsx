import React, { PureComponent } from 'react';
import {Platform, BackHandler, ToastAndroid, View} from 'react-native';
import {
  NavigationActions,
} from 'react-navigation';
import createAnimatedSwitchNavigator from 'react-navigation-animated-switch';
import { Transition } from 'react-native-reanimated';

import {
    createReduxContainer,
    createReactNavigationReduxMiddleware,
    createNavigationReducer,
} from 'react-navigation-redux-helpers';

import { connect } from 'react-redux';

import Splash from '../pages/Splash';
import BottomTab from '../router/BottomTab.router';

import LoginProvider from '@/theme/Theme_Hospital/components/LoginModal';
import GoToRoomModalProvider from '@/theme/Theme_Hospital/components/GoToRoomModal';
import CancelModalProvider from '@/theme/Theme_Hospital/components/CancelModal';
import SelectDepartmentModalProvider from '@/theme/Theme_Hospital/components/SelectDepartmentModal';
import SelectDoctorModalProvider from '@/theme/Theme_Hospital/components/SelectDoctorModal';
import SelectLevelModalProvider from '@/theme/Theme_Hospital/components/SelectLevelModal';

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
      const { dispatch, router } = this.props;
      return <LoginProvider>
        <GoToRoomModalProvider>
          <CancelModalProvider>
            <SelectDepartmentModalProvider>
              <SelectDoctorModalProvider>
                <SelectLevelModalProvider>
                  {
                    <App
                      dispatch={dispatch}
                      state={router}
                    />
                  }
                </SelectLevelModalProvider>
              </SelectDoctorModalProvider>
            </SelectDepartmentModalProvider>
          </CancelModalProvider>
        </GoToRoomModalProvider>
      </LoginProvider>
    }
  }

  interface IConnectProps {
    router: any;
  }
  return {
    routerReducer,
    routerMiddleware,
    Router: connect((state: IConnectProps) => ({ router: state.router }))(Router),
  }
}


