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
import _ from 'lodash';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/Entypo';
import WebView from 'react-native-webview';
import styles from './styles';


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
export function withMinProgram(WrappedComponent: new() => React.Component<any, any>) {
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

export default MinProgramProvider;