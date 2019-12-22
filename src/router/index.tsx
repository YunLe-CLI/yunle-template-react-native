import React, { PureComponent } from 'react';
import { Platform, BackHandler, ToastAndroid } from 'react-native';
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

import Splash from '@/pages/Splash';
import BottomTab from '@/router/BottomTab.router';


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


export const routerReducer = createNavigationReducer(AppNavigator)

export const routerMiddleware = createReactNavigationReduxMiddleware(
    (state: any) => state.router,
    'root'
)

// const App = createReduxContainer(<AppNavigator uriPrefix={uriPrefix} />, 'root')
const App = createReduxContainer(AppNavigator, 'root')

export interface IRouterProps {
  dispatch: any;
  router: any;
  theme?: any;
}

let lastBackPressed: any = undefined;
const isIos = Platform.OS === 'ios';

export function getActiveRouteName(navigationState: any): string {
  if (!navigationState) {
    return ''
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getActiveRouteName(route)
  }
  return route.routeName
}

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
        const currentScreen = getActiveRouteName(router);

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
        return <App
            dispatch={dispatch}
            state={router}
        />
    }
}

// export default Router;
export interface IConnectProps {
    router: any;
}
export default connect((state: IConnectProps) => ({ router: state.router }))(Router);
