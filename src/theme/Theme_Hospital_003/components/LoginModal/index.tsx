import React, {createContext} from 'react';
import {
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
  Icon,
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

import { LOGIN, PATIENTS_DETAILS } from '../../services/api';
import _ from 'lodash';

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
              <Content
                disableKBDismissScroll
                contentContainerStyle={{
                  paddingHorizontal: 32.5,
                  flex: 1,
                }}
              >
                <View style={{
                  marginTop: 60,
                }}>
                  <View style={styles.logoWrap}>
                    <Text style={{
                      fontSize: 18,
                      fontWeight: '400',
                      lineHeight: 45,
                      color: '#32303D',
                    }}>
                      云诊室demo
                    </Text>
                  </View>
                  <View style={styles.formWrap}>
                    <Form>
                      <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                        <FastImage
                          style={{
                            width: 14,
                            height: 19,
                            marginRight: 14,
                            alignContent: 'center',
                            justifyContent: 'center',
                          }}
                          source={require('./assets/iconPhone_slices/index.png')}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                        <Text style={{
                          fontSize: 14,
                          color: '#32303D',
                        }}>手机号码</Text>
                      </View>
                      <View style={{
                        marginBottom: 29,
                      }}>
                        <Item style={styles.iptItem}>
                          <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                            <Text style={{
                              fontSize: 17,
                              color: '#32303D',
                            }}>+86</Text>
                            <FastImage
                              style={{
                                width: 6,
                                height: 5,
                                marginRight: 14,
                                marginLeft: 14,
                                alignContent: 'center',
                                justifyContent: 'center',
                              }}
                              source={require('./assets/x.png')}
                              resizeMode={FastImage.resizeMode.contain}
                            />
                          </View>
                          <Input
                            onFocus={() => {
                              this.setState({
                                onFocuse: 'mobile',
                              })
                            }}
                            onBlur={() => {
                              this.setState({
                                onFocuse: null,
                              })
                            }}
                            value={this.state.mobile} style={styles.ipt} placeholder="请输入手机号" placeholderTextColor={"#9C9EB9"}
                                 onChangeText={(value) => {
                                   this.setState({
                                     mobile: value,
                                   })
                                 }}
                          />
                        </Item>
                        <LinearGradient
                          start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                          colors={this.state.onFocuse === 'mobile' ? ['#FFFFFF', '#5277F1', '#FFFFFF'] : ['#E4E4E4', '#E4E4E4']}
                          style={[
                            styles.linearGradientBtn,
                            {
                              opacity: this.state.password && this.state.mobile ? 1 : 0.4
                            }
                          ]}
                        >
                          <View style={{ width: '100%', height: 1 }} />
                        </LinearGradient>
                      </View>
                      <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                        <FastImage
                          style={{
                            width: 14.5,
                            height: 17,
                            marginRight: 13.5,
                            alignContent: 'center',
                            justifyContent: 'center',
                          }}
                          source={require('./assets/iconPws_slices/index.png')}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                        <Text style={{
                          fontSize: 14,
                          color: '#32303D',
                        }}>密码</Text>
                      </View>
                      <View style={{
                        marginBottom: 29,
                      }}>
                        <Item style={styles.iptItem}>
                          <Input
                            onFocus={() => {
                              this.setState({
                                onFocuse: 'password',
                              })
                            }}
                            onBlur={() => {
                              this.setState({
                                onFocuse: null,
                              })
                            }}
                            secureTextEntry value={this.state.password} style={styles.ipt} placeholder="请输入密码" placeholderTextColor={"#9C9EB9"}
                                 onChangeText={(value) => {
                                   this.setState({
                                     password: value,
                                   })
                                 }}
                          />
                        </Item>
                        <LinearGradient
                          start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                          colors={this.state.onFocuse === 'password' ? ['#FFFFFF', '#5277F1', '#FFFFFF'] : ['#E4E4E4', '#E4E4E4']}
                          style={[
                            styles.linearGradientBtn,
                            {
                              opacity: this.state.password && this.state.mobile ? 1 : 0.4
                            }
                          ]}
                        >
                          <View style={{ width: '100%', height: 1 }} />
                        </LinearGradient>
                      </View>
                    </Form>
                  </View>
                  <View style={styles.btnWrap}>
                    <View style={{
                      width: 161,
                    }}>
                      <LinearGradient
                        start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                        colors={['#5277F1', '#5277F1']}
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
              </Content>
            </Container>
          </View>
        </Modal>
      </LoginContext.Provider>
    );
  }
}

export default withLoadingSpinner(withDropdownAlert(LoginProvider));