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
    mobile: undefined,
    password: undefined,
    mobile: '17708105213',
    password: 'EJqo6376',
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
                      fontSize: 25,
                      fontWeight: '400',
                      lineHeight: 45,
                      color: '#155BD4',
                    }}>
                      薄荷医疗
                    </Text>
                    <Text style={{
                      fontSize: 18,
                      fontWeight: '400',
                      lineHeight: 26,
                      color: '#999999',
                    }}
                  >用心保障您的美好生活</Text>
                  </View>
                  <View style={styles.formWrap}>
                    <Form>
                      <Item 
                        style={[
                          styles.iptItem,
                          this.state.onFocus === 'mobile' ? {
                              borderBottomColor: '#155BD4'
                            } : {}
                        ]}
                      >
                        <FastImage
                          style={{
                            width: 17,
                            height: 18,
                            marginRight: 20,
                            alignContent: 'center',
                            justifyContent: 'center',
                          }}
                          source={require('./assets/user/index.png')}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                        <Input value={this.state.mobile}
                          onFocus={() => {
                            this.setState({
                              onFocus: 'mobile'
                            })
                          }}
                          onBlur={() => {
                            this.setState({
                              onFocus: null
                            })
                          }}
                         style={styles.ipt} placeholder="请输入用户名" placeholderTextColor={"#9C9EB9"}
                               onChangeText={(value) => {
                                 this.setState({
                                   mobile: value,
                                 })
                               }}
                        />
                      </Item>
                      <Item 
                        style={[
                          styles.iptItem,
                          this.state.onFocus === 'password' ? {
                              borderBottomColor: '#155BD4'
                            } : {}
                        ]}
                      >
                        <FastImage
                          style={{
                            width: 17,
                            height: 18,
                            marginRight: 20,
                            alignContent: 'center',
                            justifyContent: 'center',
                          }}
                          source={require('./assets/pwd/index.png')}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                        <Input 
                          onFocus={() => {
                            this.setState({
                              onFocus: 'password'
                            })
                          }}
                          onBlur={() => {
                            this.setState({
                              onFocus: null
                            })
                          }}
                          secureTextEntry value={this.state.password} style={styles.ipt} placeholder="请输入验证码" placeholderTextColor={"#9C9EB9"}
                               onChangeText={(value) => {
                                 this.setState({
                                   password: value,
                                 })
                               }}
                        />
                      </Item>
                    </Form>
                  </View>
                  <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                    <View style={styles.btnWrap}>
                      <LinearGradient
                        start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                        colors={['#155BD4', '#155BD4']}
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
                          <Title>立即登录</Title>
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