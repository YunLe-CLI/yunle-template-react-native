import React from 'react';
import {
  View,
} from 'react-native';
import { StyleProvider, Container, Header, Left, Right, Body, Icon, Content, Footer, FooterTab, Button, Text } from 'native-base';
import DeviceInfo from "react-native-device-info";
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {NavigationActions } from "react-navigation";
import Modal from "react-native-modal";
import styles from './styles';
import FastImage from 'react-native-fast-image';
import logoImg from './assets/logo.png';
import {ENVIRONMENT, BUILD_TYPE} from "@/utils/env";

import getTheme from '@/utils/native-base-theme/components';
import platform from '@/utils/native-base-theme/variables/platform';

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
}

@(connect() as any)
class Login extends React.Component<IProps, IState> {

  state: IState = {
    time: undefined,
    mobile: undefined,
    smsCode: undefined,
    mobileErr: undefined,
    smsErr: undefined,
  }

  goToMain = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'cache/closeLoginModal',
    });
    this.props.dispatch(NavigationActions.navigate({
      routeName: 'Main',
      params: {},
    }))
    global.hideGlobalLoading();
  };

  handleGoBack = () => {
    const { dispatch } = this.props;
    dispatch(NavigationActions.back());
  }

  handleLogin = async () => {
    const { dispatch } = this.props;
    global.showGlobalLoading();
    dispatch({
      type: 'auth/login',
      payload: {
        visible: true,
      }
    });
    this.goToMain();
  }


  render() {
    return (
      <Modal {...this.props}
        coverScreen={false}
        useNativeDriver
        propagateSwipe
        style={{
          margin: 0,
        }}
        hideModalContentWhileAnimating
        onSwipeComplete={() => {
          const { dispatch } = this.props;
          dispatch({
            type: 'cache/closeLoginModal'
          });
        }}
      >
        <View style={{ flex: 1 }}>
          <StyleProvider style={getTheme(platform)}>
            <Container style={styles.container}>
              <Header  style={{ borderBottomWidth: 0, backgroundColor: '#fff' }}>
                <Left />
                <Body>

                </Body>
                <Right>
                    <Button
                        transparent
                        onPress={() => {
                            this.goToMain();
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
                  <View style={styles.btnWrap}>
                    <Button
                        rounded
                        onPress={async () => {
                          await this.handleLogin();
                        }}
                        style={{
                          justifyContent: 'center'
                        }}
                    >
                      <Text>立即登录</Text>
                    </Button>
                  </View>
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
          </StyleProvider>
        </View>
      </Modal>
    );
  }
}

export default Login;
