import React, {createContext} from 'react';
import {
  Dimensions,
  ImageBackground,
  View,
} from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
  Item,
  Input, Form,
  Title,
} from 'native-base';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {NavigationActions, StackActions } from "react-navigation";
import Modal from "react-native-modal";
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import logoImg from './assets/logo_slices/logo.jpg';
import { withDropdownAlert } from '@Global/components/DropdownAlert';
import { withLoadingSpinner } from '@Global/components/LoadingSpinner';
import { getActiveRoute } from '@Global/utils/utils';

import { LOGIN, PATIENTS_DETAILS } from '../../services/api';
import _ from 'lodash';
import pic_loginbg from './assets/pic_loginbg_slices/hd.png';

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
    loginName: 'user01',
    password: '123456',
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
      await dispatch({
        type: 'auth/login',
        payload: {
          token: 'testToken',
        }
      });
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
            <ImageBackground
              style={{
                width: Dimensions.get('window').width,
                height: Dimensions.get('window').height,
              }}
              source={pic_loginbg}>
              <Container style={styles.container}>
                <Content
                  disableKBDismissScroll
                  contentContainerStyle={{
                    paddingHorizontal: 32.5,
                    flex: 1,
                  }}
                >
                  <View style={styles.logoWrap}>
                    <FastImage
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 6,
                        alignContent: 'center',
                        justifyContent: 'center',
                      }}
                      source={logoImg}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </View>
                  <View style={{
                    flex: 1,
                  }}>
                    <View style={styles.formBox}>
                      <View style={styles.formBoxItem}>
                        <View style={styles.formWrap}>
                          <Form>
                            <Item rounded style={styles.iptItem}>
                              <Input rounded value={this.state.loginName} style={styles.ipt} placeholder="输入用户名" placeholderTextColor={"#FFFFFF"}
                                     onChangeText={(value) => {
                                       this.setState({
                                         loginName: value,
                                       })
                                     }}
                              />
                            </Item>
                            <Item rounded style={styles.iptItem}>
                              <Input rounded secureTextEntry value={this.state.password} style={styles.ipt} placeholder="输入密码" placeholderTextColor={"#FFFFFF"}
                                     onChangeText={(value) => {
                                       this.setState({
                                         password: value,
                                       })
                                     }}
                              />
                            </Item>
                          </Form>
                        </View>
                        <View style={styles.btnWrap}>
                          <LinearGradient
                            start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                            colors={['#FFFFFF', '#FFFFFF']}
                            style={[
                              styles.linearGradientBtn,
                              {
                                opacity: this.state.password && this.state.loginName ? 1 : 0.4
                              }
                            ]}
                          >
                            <Button
                              transparent
                              rounded
                              onPress={async () => {
                                  await this.handleLogin();
                              }}
                              style={styles.loginButton}
                            >
                              <Title style={{
                                color: '#3B3B3B'
                              }}>登录</Title>
                            </Button>
                          </LinearGradient>
                        </View>
                      </View>
                    </View>
                  </View>
                </Content>
              </Container>
            </ImageBackground>
          </View>
        </Modal>
      </LoginContext.Provider>
    );
  }
}

export default withLoadingSpinner(withDropdownAlert(LoginProvider));