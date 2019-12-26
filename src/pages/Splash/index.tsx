import React from 'react';
import {Linking, View} from 'react-native';
import { connect } from 'react-redux';
import LottieView from 'lottie-react-native';
import styles from "@/pages/Splash/styles";
import animateData from './assets/12131-christmas-snow-loading.json';
import {NavigationActions} from "react-navigation";
import {UrlProcessUtil} from "@/utils/utils";
import nativeAutoUpdate from "@/utils/native-auto-update";

export interface IProps {}

@(connect() as any)
class Splash extends React.PureComponent<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  checkUpdate = async () => {
    await nativeAutoUpdate();
  }

  checkLogin = async () => {
    let IS_LOGIN = false;
    try {
      const { dispatch } = this.props;
      IS_LOGIN = await dispatch({
        type: 'auth/checkLogin'
      });
      if (IS_LOGIN) {
        this.goToMain();
      } else {
        throw false;
      }
    } catch (e) {
      await this.goToLogin()
      IS_LOGIN = false;
    }
    return IS_LOGIN;
  }

  goToMain = async () => {
    const { dispatch } = this.props;
    dispatch(NavigationActions.navigate({
      routeName: 'MainRouter',
      params: {},
    }));
    this.setState({
      isLogin: true,
    });
    await dispatch({
      type: 'cache/closeLoginModal'
    });
  };

  goToLogin = async () => {
    const { dispatch } = this.props;
    this.setState({
      isLogin: false,
    });
    dispatch(NavigationActions.navigate({
      routeName: 'MainRouter',
      params: {},
    }));
    await dispatch({
      type: 'cache/openLoginModal'
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <LottieView
          autoPlay
          loop={false}
          source={animateData}
          onAnimationFinish={async () => {
            const url: string | null = await Linking.getInitialURL();
            const isLogin: boolean = await this.checkLogin()
            if (isLogin && url) {
              UrlProcessUtil.handleOpenURL(url);
            }
            await this.checkUpdate()
          }}
        />
      </View>
    );
  }
}


export default Splash;
