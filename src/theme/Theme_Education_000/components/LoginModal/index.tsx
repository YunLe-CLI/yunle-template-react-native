import React, {createContext} from 'react';
import {
  View,
  ImageBackground, Dimensions,
} from 'react-native';
import { Form, Input, Item, StyleProvider, Container, Header, Left, Right, Body, Icon, Content, Footer, FooterTab, Button, Text } from 'native-base';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {NavigationActions, StackActions } from "react-navigation";
import Modal from "react-native-modal";
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import { withDropdownAlert } from '@/components/DropdownAlert';
import { withLoadingSpinner } from '@/components/LoadingSpinner';
import { getActiveRoute } from '@/utils/utils';

import { login, PATIENTS_DETAILS } from '../../services/api';
import _ from 'lodash';

import logoImg from './assets/logo.png';
import footerImg from './assets/footer.png';
import {ENVIRONMENT, BUILD_TYPE} from "@/utils/env";

export const LoginContext = createContext({
  openLoginModal: () => {},
  closeLoginModal: () => {},
})
export const LoginConsumer = LoginContext.Consumer;
export let LOGIN_MODAL_THIS = null;
export function withLoginModal(WrappedComponent: React.ReactNode) {
  return class extends React.Component {
    render() {
      return <>
        <LoginContext.Consumer>
          {
            ({ openLoginModal, closeLoginModal }) => {
              return <WrappedComponent {...this.props} closeLoginModal={closeLoginModal} openLoginModal={openLoginModal} />;
            }
          }
        </LoginContext.Consumer>
      </>
    }
  }
}

export interface IProps {
  navigation: any;
  dispatch: Dispatch<any>;
  login: (p: { mobile: string; smsCode: string; }) => boolean;
  sendMSG: (mobile: string) => boolean;
  getUser: () => Promise<any>;
  skipBindWeChat: boolean;
}
export interface IState {
  isVisible: boolean;
  mobile: string | undefined;
  password: string | undefined;
}

@(connect(({ router }) => {
  return {
    router
  }
}) as any)
class LoginProvider extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.reloadNavigation = _.debounce(this.reloadNavigation, 1000);
  }

  state: IState = {
    isVisible: false,
    loginName: undefined,
    password: undefined,
    // loginName: '13473015185',
    // password: 'OEjb9493',
  }

  reloadNavigation = () => {
    try {
      return;
      const routeInfo = getActiveRoute(this.props.router)
      console.log('TEST_NNN reload page', routeInfo)
      const replaceAction = StackActions.replace({
        key: routeInfo.key,
        newKey: routeInfo.key+'__RELOAD__',
        routeName: routeInfo.routeName,
        params: {
          "RELOAD_NAVIGATION": true,
        }
      });
      // const resetAction = StackActions.reset({
      //   index: 0,
      //   actions: [NavigationActions.navigate({ routeName: 'Home' })],
      // });
      this.props.dispatch(replaceAction);

      // const setParamsAction = NavigationActions.setParams({
      //   params: { title: 'Hello' },
      //   key: routeInfo.key,
      // });
      // this.props.dispatch(setParamsAction);
    } catch (e) {
      console.log('TEST_NNN', e)
    }
  }

  openLogin = () => {
    if (!this.state.isVisible) {
      this.setState({
        isVisible: true,
      }, () => {

      });
    }
  }

  closeLogin = async () => {
    if (this.state.isVisible) {
      this.setState({
        isVisible: false,
      }, () => {

      });
    }
  }

  goToMain = () => {
    this.props.dispatch(NavigationActions.navigate({
      routeName: 'Main',
      params: {},
    }))
  };

  handleLogin = async () => {
    try {
      const { dispatch } = this.props;
      const { loginName, password } = this.state;
      this.props.showLoading()
      const res = await login({
        loginName: this.state.loginName,
        password: this.state.password,
      });
      console.log(res, 1111)
      if (res.code === 0) {
        await dispatch({
          type: 'auth/login',
          payload: {
            token: res.data.token,
          }
        });
        const userInfo = await dispatch({
          type: 'user/setUserAsync',
          payload: {
            user: res.data,
          }
        });
        // this.props.showAlert({
        //   type: 'success',
        //   title: '登陆成功',
        //   message: '登陆成功',
        // })
        this.closeLogin();
        // this.goToMain();
      } else {
        throw res.msg
      }
    } catch (e) {
      alert('登录失败'+e)
    } finally {
      this.props.hiddenLoading()
    }
  }


  render() {
    LOGIN_MODAL_THIS = this;
    return (
      <LoginContext.Provider
        value={{
          openLoginModal: () => {
            this.openLogin()
          },
          closeLoginModal: () => {
            this.closeLogin()
          },
        }}
      >
        {this.props.children}
        <Modal
          backdropColor={'transparent'}
          isVisible={this.state.isVisible}
          coverScreen={false}
          useNativeDriver
          propagateSwipe
          style={{
            margin: 0,
          }}
          hideModalContentWhileAnimating
          onBackButtonPress={() => {
            // this.props.dispatch({
            //   type: 'auth/login',
            //   payload: {
            //     visible: true,
            //   }
            // });
          }}
        >
          <View style={{ flex: 1 }}>
            <Container style={styles.container}>
              <Content
                contentContainerStyle={{
                  paddingHorizontal: 36,
                  flex: 1,
                }}
              >
                <View style={{
                  marginTop: 40,
                }}>
                  <View style={styles.logoWrap}>
                    <Text style={styles.logoWrapText}>欢迎来到云视课堂</Text>
                  </View>
                  <View>
                    <Form style={ styles.form }>
                      <Item rounded style={[styles.iptItem, this.state.focus === 'name' ? styles.iptBorder : {}]}>
                        <FastImage
                          style={{
                            width: 20,
                            height: 20,
                            alignContent: 'center',
                            justifyContent: 'center',
                          }}
                          source={this.state.loginName ? require('./assets/user_active/icon_user_active.png') : require('./assets/user/icon_user_default.png')}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                        <Input value={this.state.loginName} style={styles.ipt} placeholder="请输入用户名" placeholderTextColor={"#9C9EB9"}
                               onChangeText={(value) => {
                                 this.setState({
                                   loginName: value,
                                 })
                               }}
                               onFocus={() => {
                                 this.setState({
                                   focus: 'name'
                                 })
                               }}
                               onBlur={() => {
                                 this.setState({
                                   focus: undefined
                                 })
                               }}
                        />
                      </Item>
                      <Item bordered rounded style={[styles.iptItem, this.state.focus === 'pwd' ? styles.iptBorder : {}]}>
                        <FastImage
                          style={{
                            width: 20,
                            height: 20,
                            alignContent: 'center',
                            justifyContent: 'center',
                          }}
                          source={this.state.password ? require('./assets/pwd_active/icon_lock_active.png') : require('./assets/pwd/icon_lock_default.png')}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                        <Input secureTextEntry value={this.state.password} style={styles.ipt} placeholder="请输入密码" placeholderTextColor={"#9C9EB9"}
                               onChangeText={(value) => {
                                 this.setState({
                                   password: value,
                                 })
                               }}
                               onFocus={() => {
                                 this.setState({
                                   focus: 'pwd'
                                 })
                               }}
                               onBlur={() => {
                                 this.setState({
                                   focus: undefined
                                 })
                               }}
                        />
                      </Item>
                    </Form>
                  </View>
                  <View style={styles.btnWrap}>
                    <ImageBackground
                      style={{
                        width: Dimensions.get('window').width - 36*2,
                        height: 79,
                        justifyContent: 'center',
                      }}
                      source={this.state.password && this.state.loginName ? require('./assets/btn_2/btn_login.png') : require('./assets/btn_1/btn_unlogin.png')}
                    >
                      <Button
                        transparent
                        onPress={async () => {
                          if (this.state.password && this.state.loginName) {
                            await this.handleLogin();
                          }
                        }}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: -8,
                          width: Dimensions.get('window').width - 36*2,
                          height: 50,
                        }}
                      >
                        <Text style={styles.btnText}>LOGIN</Text>
                      </Button>
                    </ImageBackground>
                  </View>
                </View>
              </Content>
            </Container>
          </View>
        </Modal>
      </LoginContext.Provider>
    );
  }
}

export default withLoadingSpinner(withDropdownAlert(LoginProvider));