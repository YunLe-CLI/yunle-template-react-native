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
import DeviceInfo from "react-native-device-info";
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {NavigationActions } from "react-navigation";
import Modal from "react-native-modal";
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import logoImg from './assets/logo_slices/pic_logo_s.png';
import {ENVIRONMENT, BUILD_TYPE} from "@/utils/env";
import { withDropdownAlert } from '@/components/DropdownAlert';
import { withLoadingSpinner } from '@/components/LoadingSpinner';

import { LOGIN, PATIENTS_DETAILS } from '@/services/api';

export const LoginContext = createContext({
  openLoginModal: () => {},
  closeLoginModal: () => {},
})
export const LoginConsumer = LoginContext.Consumer;

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

@(connect() as any)
class LoginProvider extends React.Component<IProps, IState> {

  state: IState = {
    isVisible: false,
    mobile: '18200000001',
    password: '123456',
  }

  openLogin = () => {
    this.setState({
      isVisible: true,
    })
  }

  closeLogin = () => {
    this.setState({
      isVisible: false,
    })
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
      }
    } catch (e) {
      alert('登录失败'+e)
    } finally {
      this.props.hiddenLoading()
    }
  }


  render() {
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
          isVisible={this.state.isVisible}
          coverScreen={false}
          useNativeDriver
          propagateSwipe
          style={{
            margin: 0,
          }}
          hideModalContentWhileAnimating
          onBackButtonPress={() => {
            this.props.dispatch({
              type: 'auth/login',
              payload: {
                visible: true,
              }
            });
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
                    <FastImage
                      style={{
                        width: 39.5,
                        height: 39.5,
                        marginRight: 13.5,
                        alignContent: 'center',
                        justifyContent: 'center',
                      }}
                      source={logoImg}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                    <Text style={{
                      fontSize: 32,
                      fontWeight: '500',
                      lineHeight: 45,
                      color: '#11CD8F',
                    }}>
                      登录
                    </Text>
                  </View>
                  <View style={styles.formWrap}>
                    <Form>
                      <Item style={styles.iptItem}>
                        <Input value={this.state.mobile} style={styles.ipt} placeholder="输入用户名" placeholderTextColor={"#9C9EB9"}
                               onChangeText={(value) => {
                                 this.setState({
                                   mobile: value,
                                 })
                               }}
                        />
                      </Item>
                      <Item style={styles.iptItem}>
                        <Input secureTextEntry value={this.state.password} style={styles.ipt} placeholder="输入密码" placeholderTextColor={"#9C9EB9"}
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
                      colors={['#6AE27C', '#17D397']}
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
                        textStyle={{
                          color: '#fff'
                        }}
                      >
                        <Title>登录</Title>
                      </Button>
                    </LinearGradient>
                  </View>
                </View>
              </Content>
              {/*<Footer style={{ borderTopWidth: 0, backgroundColor: '#fff' }}>*/}
              {/*  <FooterTab>*/}
              {/*    <Button full>*/}
              {/*      <Text>*/}
              {/*        大狗吱@2019 version: {DeviceInfo.getVersion()}*/}
              {/*      </Text>*/}
              {/*      <Text>*/}
              {/*        ENV: {ENVIRONMENT} -- TYPE: {BUILD_TYPE}*/}
              {/*      </Text>*/}
              {/*    </Button>*/}
              {/*  </FooterTab>*/}
              {/*</Footer>*/}
            </Container>
          </View>
        </Modal>
      </LoginContext.Provider>
    );
  }
}

export default withLoadingSpinner(withDropdownAlert(LoginProvider));
