import React, {createContext} from 'react';
import {
  Dimensions,
  View,
} from 'react-native';
import {
  Header,
  Button,
  Left,
  Body,
  Right,
  Text,
  Segment,
} from 'native-base';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/Entypo';
import WebView from 'react-native-webview';
import styles from './styles';
import FastImage from 'react-native-fast-image';
import { withDropdownAlert } from '@Global/components/DropdownAlert';
import { withLoadingSpinner } from '@Global/components/LoadingSpinner';

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
              return <WrappedComponent
                {...this.props}
                openMinProgram={openMinProgram} 
                closeMinProgram={closeMinProgram} 
              />;
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

class MinProgramProvider extends React.Component<IProps, IState> {

  state: IState = {
    isVisible: true,
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
                  <Button 
                    style={{
                      width: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }} 
                    first
                  >
                    <Icon 
                      size={20}
                      color={'#fff'}
                      name="dots-three-horizontal"
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
                    <Icon 
                      size={20}
                      color={'#fff'}
                      name="vinyl"
                    />
                  </Button>
                </Segment>
              </Right>
            </Header>
            <WebView 
              style={{ 
                flex: 1, 
                flexGrow: 1, 
                width, 
                height, 
                backgroundColor: '#fff' 
              }} 
              source={{ uri: 'https://jakearchibald.github.io/isserviceworkerready/demos/navigator.serviceWorker/' }}
            />
          </View>
        </Modal>
      </MinProgramContext.Provider>
    );
  }
}

export default withLoadingSpinner(withDropdownAlert(MinProgramProvider));