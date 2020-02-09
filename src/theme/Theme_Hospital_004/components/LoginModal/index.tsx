import React, {createContext} from 'react';
import {
  View, ImageBackground,
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
    // mobile: '18200000001',
    // password: '123456',
    mobile: undefined,
    password: undefined,
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
          <ImageBackground
           source={require('./assets/bg/index.png')}
           style={{ flex: 1,
            width: '100%',
           }}>
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
                    <FastImage
                      style={{
                        width: 100,
                        height: 100,
                        alignContent: 'center',
                        justifyContent: 'center',
                      }}
                      source={logoImg}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                    <Text style={{
                      fontSize: 20,
                      fontWeight: '500',
                      lineHeight: 45,
                      color: '#000',
                    }}>
                      好医生
                    </Text>
                  </View>
                  <View style={styles.formWrap}>
                    <Form>
                      <Item style={styles.iptItem}>
                        <FastImage
                          style={{
                            marginRight: 18,
                            width: 20,
                            height: 20,
                            alignContent: 'center',
                            justifyContent: 'center',
                          }}
                          source={require('./assets/user/index.png')}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                        <Input value={this.state.mobile} style={styles.ipt} placeholder="输入用户名" placeholderTextColor={"#000000"}
                               onChangeText={(value) => {
                                 this.setState({
                                   mobile: value,
                                 })
                               }}
                        />
                      </Item>
                      <Item style={styles.iptItem}>
                        <FastImage
                          style={{
                            marginRight: 18,
                            width: 20,
                            height: 20,
                            alignContent: 'center',
                            justifyContent: 'center',
                          }}
                          source={require('./assets/pwd/index.png')}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                        <Input secureTextEntry value={this.state.password} style={styles.ipt} placeholder="输入密码" placeholderTextColor={"#000000"}
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
                        <FastImage
                          style={{
                            width: 80,
                            height: 80,
                            alignContent: 'center',
                            justifyContent: 'center',
                          }}
                          source={require('./assets/btn/index.png')}
                          resizeMode={FastImage.resizeMode.contain}
                        />
                      </Button>
                  </View>
                </View>
              </Content>
            </Container>
          </ImageBackground>
        </Modal>
      </LoginContext.Provider>
    );
  }
}

export default withLoadingSpinner(withDropdownAlert(LoginProvider));