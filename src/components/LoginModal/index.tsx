import React, {createContext} from 'react';
import {
  View,
} from 'react-native';
import { Container, Header, Left, Right, Body, Icon, Content, Footer, FooterTab, Button, Text } from 'native-base';
import DeviceInfo from "react-native-device-info";
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {NavigationActions } from "react-navigation";
import Modal from "react-native-modal";
import styles from './styles';
import FastImage from 'react-native-fast-image';
import logoImg from './assets/logo.png';
import {ENVIRONMENT, BUILD_TYPE} from "@/utils/env";
import { withDropdownAlert } from '@/components/DropdownAlert';
import { LoadingSpinnerConsumer } from '@/components/LoadingSpinner';

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
  mobile: string | undefined;
  smsCode: string | undefined;
  time: number | undefined;
  mobileErr: string | undefined;
  smsErr: string | undefined;
  isVisible: boolean;
}

@(connect() as any)
class LoginProvider extends React.Component<IProps, IState> {

  state: IState = {
    time: undefined,
    mobile: undefined,
    smsCode: undefined,
    mobileErr: undefined,
    smsErr: undefined,
    isVisible: false,
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

  goToMain = () => {
    this.props.dispatch(NavigationActions.navigate({
      routeName: 'Main',
      params: {},
    }))
  };

  handleLogin = async () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'auth/login',
      payload: {
        visible: true,
      }
    });
    this.closeLogin();
    this.goToMain();
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
              <Header noShadow  style={{ borderBottomWidth: 0, backgroundColor: '#fff' }}>
                <Left />
                <Body>

                </Body>
                <Right>
                  <Button
                    transparent
                    onPress={() => {
                      this.closeLogin();
                    }}
                  >
                    <Icon color={"#eee"} name='close' />
                  </Button>
                </Right>
              </Header>
              <Content

                scrollEnabled={false}
                contentContainerStyle={{
                  justifyContent: 'center',
                  alignContent: 'center',
                  paddingHorizontal: 24,
                  flex: 1,
                }}
              >
                <View style={{
                  marginTop: -60,
                }}>
                  <View style={styles.logoWrap}>
                    <FastImage
                      style={{
                        width: 120,
                        height: 120,
                        borderRadius: 60,
                        alignContent: 'center',
                        justifyContent: 'center',
                      }}
                      source={logoImg}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </View>
                  <LoadingSpinnerConsumer>
                    {
                      ({ showLoading, hiddenLoading }) => {
                        return (
                          <View style={styles.btnWrap}>
                            <Button
                              rounded
                              onPress={async () => {
                                try {
                                  showLoading()
                                  await this.handleLogin();
                                  this.props.showAlert({
                                    type: 'success',
                                    title: '登陆成功',
                                    message: '登陆成功',
                                  })
                                } catch (e) {

                                } finally {
                                  setTimeout(() => {
                                    hiddenLoading()
                                  }, 3000)
                                }

                              }}
                              style={{
                                justifyContent: 'center'
                              }}
                            >
                              <Text>立即登录</Text>
                            </Button>
                          </View>
                        )
                      }
                    }
                  </LoadingSpinnerConsumer>

                </View>
              </Content>
              <Footer style={{ borderTopWidth: 0, backgroundColor: '#fff' }}>
                <FooterTab>
                  <Button full>
                    <Text>
                      大狗吱@2019 version: {DeviceInfo.getVersion()}
                    </Text>
                    <Text>
                      ENV: {ENVIRONMENT} -- TYPE: {BUILD_TYPE}
                    </Text>
                  </Button>
                </FooterTab>
              </Footer>
            </Container>
          </View>
        </Modal>
      </LoginContext.Provider>
    );
  }
}

export default withDropdownAlert(LoginProvider);
