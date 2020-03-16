import React from 'react';
import {Linking, View} from 'react-native';
import { connect } from 'react-redux';
import LottieView from 'lottie-react-native';
import styles from "./styles";
import animateData from './assets/12131-christmas-snow-loading.json.js.js.js.js';
import {NavigationActions} from "react-navigation";
import {UrlProcessUtil} from "@Global/utils/utils";
import { withLoginModal } from '../../components/LoginModal'

export interface IProps {}

@(connect() as any)
class Splash extends React.PureComponent<IProps, {}> {
  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    const url: string | null = await Linking.getInitialURL();
    const isLogin: boolean = await this.checkLogin()
    if (isLogin && url) {
      UrlProcessUtil.handleOpenURL(url);
    }
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
  };

  goToLogin = async () => {
    const { dispatch } = this.props;
    dispatch(NavigationActions.navigate({
      routeName: 'MainRouter',
      params: {},
    }));
    if (this.props.openLoginModal) {
      this.props.openLoginModal();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        {/*<LottieView*/}
        {/*  autoPlay*/}
        {/*  loop={false}*/}
        {/*  source={animateData}*/}
        {/*  onAnimationFinish={async () => {*/}

        {/*  }}*/}
        {/*/>*/}
      </View>
    );
  }
}


export default withLoginModal(Splash);
