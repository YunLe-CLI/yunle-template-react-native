import React, { PureComponent } from 'react';
import { Platform, BackHandler, ToastAndroid } from 'react-native';
import {
  NavigationActions,
} from '@react-navigation/compat';
import _ from 'lodash';
import { StyleProvider, Root } from 'native-base';
import { Mode } from 'react-native-dark-mode';
import { connect } from 'react-redux';
import { ConnectState } from '../models/connect';
import { getTheme } from '@Global/utils/themes';

// import Splash from '../pages/Splash';
import BottomTab from './BottomTab.router';

import LoginProvider from '../components/LoginModal';
import { getActiveRoute } from '@Global/utils/utils';


// const AppNavigator = createAnimatedSwitchNavigator(
//     {
//         Splash: Splash,
//     },
//     {
//       initialRouteName: 'Splash',
//       transition: (
//         <Transition.Together>
//           <Transition.Out type="fade" durationMs={400} interpolation="easeInOut" />
//           <Transition.In type="fade" durationMs={300} interpolation="easeInOut"  />
//         </Transition.Together>
//       ),
//     }
// );

export default function createRouter() {

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
      const { theme, mode } = this.props;
      return (
        <StyleProvider style={getTheme(theme, mode)}>
          <Root>
            <LoginProvider>
              <BottomTab />
            </LoginProvider>
          </Root>
        </StyleProvider>
      )
    }
  }

  interface IConnectState extends ConnectState {}
  return {
    Router: connect((state: IConnectState) => {
      return {
        token: _.get(state, 'auth.token'),
        mode: _.get(state, 'global.mode'),
        theme: _.get(state, 'theme.theme'),
      }
    })(Router),
  }
}


