import React, { PureComponent } from 'react';
import { Platform, BackHandler, ToastAndroid } from 'react-native';
import { NavigationActions, createSwitchNavigator } from 'react-navigation'; // Version can be specified in package.json
import {
    createReduxContainer,
    createReactNavigationReduxMiddleware,
    createNavigationReducer,
} from 'react-navigation-redux-helpers';

import { connect } from 'react-redux';


import Splash from '@/pages/Splash';
import QRCode from '@/pages/QRCode';


const AppNavigator = createSwitchNavigator(
    {
        Splash: {
            screen: Splash,
        },
        QRCode: {
            screen: QRCode,
        },
    },
    {
        initialRouteName: 'Splash',
    }
);


export const routerReducer = createNavigationReducer(AppNavigator)

export const routerMiddleware = createReactNavigationReduxMiddleware(
    (state: any) => state.router,
    'root'
)

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

        if (currentScreen !== 'BlogList') {
            dispatch(NavigationActions.back());
            return true
        }
        if (lastBackPressed && lastBackPressed + 2000 >= Date.now()) {
            BackHandler.exitApp();
            return false;
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
