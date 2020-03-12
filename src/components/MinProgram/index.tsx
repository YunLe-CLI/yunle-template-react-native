import React, {createContext} from 'react';
import {
  Dimensions,
  ImageBackground,
  View,
} from 'react-native';
import {
  Header,
  Container,
  Content,
  Button,
  Item,
  Input, Form,
  Title,
  Left,
  Body,
  Right,
  Text,
  Segment,
} from 'native-base';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {NavigationActions, StackActions } from "react-navigation";
import Modal from "react-native-modal";
import WebView from 'react-native-webview';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import { withDropdownAlert } from '@Global/components/DropdownAlert';
import { withLoadingSpinner } from '@Global/components/LoadingSpinner';
import { getActiveRoute } from '@Global/utils/utils';

import _ from 'lodash';

export const MinProgramContext = createContext({
  openMinProgram: () => {},
  closeMinProgram: () => {},
})
export const LoginConsumer = MinProgramContext.Consumer;
export interface LOGIN_MODAL_THIS_TYPE {
  openMinProgram?: () => void;
  closeMinProgram?: () => void;
};
export let LOGIN_MODAL_THIS: LOGIN_MODAL_THIS_TYPE = {};
export interface withMinProgramProps {
  openMinProgram: () => void;
  closeMinProgram: () => void;
}
export function withMinProgram(WrappedComponent: React.ReactNode) {
  return class extends React.Component {
    render() {
      return <>
        <MinProgramContext.Consumer>
          {
            ({ openMinProgram, closeMinProgram }) => {
              return <WrappedComponent {...this.props} openMinProgram={openMinProgram} closeMinProgram={closeMinProgram} />;
            }
          }
        </MinProgramContext.Consumer>
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
}

export interface IMinProgramProvider {
  openLoginModal: () => void;
  closeLoginModal: () => void;
}
@(connect(({ router }) => {
  return {
    router
  }
}) as any)
class MinProgramProvider extends React.Component<IProps, IState> {

  state: IState = {
    isVisible: false,
  }

  openMinProgram = () => {
    if (!this.state.isVisible) {
      this.setState({
        isVisible: true,
      }, () => {

      });
    }
  }

  closeMinProgram = async () => {
    if (this.state.isVisible) {
      this.setState({
        isVisible: false,
      }, () => {

      });
    }
  }


  render() {
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    return (
      <MinProgramContext.Provider
        value={{
          openMinProgram: () => {
            this.openMinProgram()
          },
          closeMinProgram: () => {
            this.closeMinProgram()
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
          <View style={{ flex: 1, backgroundColor: '#373940' }}>
            <Header>
              <Left>

              </Left>
              <Body>
                <Text>小程序</Text>
              </Body>
              <Right>
                <Segment style={{
                  backgroundColor:'transparent'
                }}>
                  <Button style={{
                    width: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }} first>
                    <FastImage
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                      }}
                      source={require('./assets/gengduo.png')}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </Button>
                  <Button 
                    style={{
                      width: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}  last
                    onPress={() => {
                      this.closeMinProgram()
                    }}
                  >
                    <FastImage
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                      }}
                      source={require('./assets/center.png')}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </Button>
                </Segment>
              </Right>
            </Header>
            <WebView style={{ flex: 1, flexGrow: 1, width, height, backgroundColor: '#fff' }} source={{ uri: 'https://dagouzhi.com/' }} />
          </View>
        </Modal>
      </MinProgramContext.Provider>
    );
  }
}

export default withLoadingSpinner(withDropdownAlert(MinProgramProvider));