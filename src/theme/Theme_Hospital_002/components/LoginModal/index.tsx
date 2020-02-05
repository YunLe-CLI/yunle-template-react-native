import React, {createContext} from 'react';
import {
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
  Label,
} from 'native-base';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {NavigationActions, StackActions } from "react-navigation";
import Modal from "react-native-modal";
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import logoImg from './assets/logo_slices/pic_logo_s.png';
import { withDropdownAlert } from '@/components/DropdownAlert';
import { withLoadingSpinner } from '@/components/LoadingSpinner';
import { getActiveRoute } from '@/utils/utils';
import bg from './assets/bg/bg.png'

import { LOGIN, PATIENTS_DETAILS } from '../../services/api';
import _ from 'lodash';
import {getStatusBarHeight} from "react-native-status-bar-height";

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
    mobile: '18200000006',
    password: '123456',
    // mobile: undefined,
    // password: undefined,
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

  goToMain = (type: boolean) => {
    // type 是否填写个人信息
    if (type) {
      this.props.dispatch(NavigationActions.navigate({
        routeName: 'Main',
        params: {},
      }))
    } else {
      setTimeout(() => {
        this.props.dispatch(NavigationActions.navigate({
          routeName: 'PersonalDetails',
          params: {},
        }))
      }, 1000)
    }
  };

  handleLogin = async () => {
    try {
      const { dispatch } = this.props;
      const { mobile, password } = this.state;
      this.props.showLoading()
      const res = await LOGIN({
        mobile,
        password,
      })
      if (res.code === 0) {
        await dispatch({
          type: 'auth/login',
          payload: {
            token: res.data.token,
          }
        });
        const userRes = await PATIENTS_DETAILS({});
        const userInfo = await dispatch({
          type: 'user/setUserAsync',
          payload: {
            user: userRes.data,
          }
        });
        // this.props.showAlert({
        //   type: 'success',
        //   title: '登陆成功',
        //   message: '登陆成功',
        // })
        this.closeLogin();
        this.goToMain(!!userInfo.idCard);
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
              <ImageBackground
                source={bg}
                style={{
                  flex: 1,
                  flexGrow: 1,
                  width: '100%',
                }}
              >
                <View style={{
                  marginTop: getStatusBarHeight(true),
                  height: 108,
                  paddingBottom: 18,
                  justifyContent: 'center',
                }}>
                  <View style={{
                    paddingHorizontal: 16,
                  }}>
                    <Text style={{
                      fontSize: 18,
                      fontWeight: '500',
                      color: '#FFFFFF'
                    }}>
                      云诊室demo
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    marginTop: -18,
                    paddingHorizontal: 32.5,
                    flex: 1,
                    borderTopLeftRadius: 18,
                    borderTopRightRadius: 18,
                    overflow: 'hidden',
                    backgroundColor: '#fff'
                  }}
                >
                  <View style={{
                    marginTop: 32,
                  }}>
                    <View style={styles.logoWrap}>
                      <Text style={{
                        fontSize: 20,
                        fontWeight: '500',
                        lineHeight: 45,
                        color: '#000000',
                      }}>
                        Welcome to 云诊室demo!
                      </Text>
                    </View>
                    <View style={styles.formWrap}>
                      <Form>
                        <Item floatingLabel style={[
                          styles.iptItem,
                          this.state.focusIpt === 'mobile' ? {
                            borderBottomColor: '#6093FB'
                          } : {}
                        ]}>
                          <Label>Login id</Label>
                          <Input value={this.state.mobile}
                                 style={styles.ipt}
                                 placeholder="输入用户名"
                                 placeholderTextColor={"#9C9EB9"}
                                 onFocus={() => {
                                   this.setState({
                                     focusIpt: 'mobile',
                                   })
                                 }}
                                 onBlur={() => {
                                   this.setState({
                                     focusIpt: undefined,
                                   })
                                 }}
                                 onChangeText={(value) => {
                                   this.setState({
                                     mobile: value,
                                   })
                                 }}
                          />
                        </Item>
                        <Item floatingLabel style={[
                          styles.iptItem,
                          this.state.focusIpt === 'password' ? {
                            borderBottomColor: '#6093FB'
                          } : {}
                        ]}>
                          <Label>Password</Label>
                          <Input secureTextEntry
                                 value={this.state.password}
                                 style={styles.ipt}
                                 placeholder="输入密码"
                                 placeholderTextColor={"#9C9EB9"}
                                 onFocus={() => {
                                   this.setState({
                                     focusIpt: 'password',
                                   })
                                 }}
                                 onBlur={() => {
                                   this.setState({
                                     focusIpt: undefined,
                                   })
                                 }}
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
                        colors={['#6093FB', '#6093FB']}
                        style={[
                          styles.linearGradientBtn,
                          {
                            opacity: this.state.password && this.state.mobile ? 1 : 0.4
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
                          textStyle={{
                            color: '#fff'
                          }}
                        >
                          <Title>登录</Title>
                        </Button>
                      </LinearGradient>
                    </View>
                  </View>
                </View>
              </ImageBackground>
            </Container>
          </View>
        </Modal>
      </LoginContext.Provider>
    );
  }
}

export default withLoadingSpinner(withDropdownAlert(LoginProvider));