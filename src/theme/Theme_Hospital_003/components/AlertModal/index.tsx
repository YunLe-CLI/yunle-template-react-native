import React, { createContext } from 'react';
import { View, AppState,} from 'react-native';
import styles from './styles';
import Modal from "react-native-modal";
import _ from "lodash";
import {Button, Text} from 'native-base';

export const AlertModalContext = createContext({
  handleShowAlertModal: () => {}
})
export const  AlertModalConsumer = AlertModalContext.Consumer

export function withAlertModal(WrappedComponent: React.ReactNode) {
  return class extends React.Component {
    render() {
      return <>
        < AlertModalConsumer>
          {
            ({ handleShowAlertModal }) => {
              return <WrappedComponent  {...this.props} handleShowAlertModal={handleShowAlertModal} />
            }
          }
        </ AlertModalConsumer>
      </>
    }
  }
}

export interface IState {
  isModalVisible: boolean;
  isNotRemind: boolean;
  isModalNotVisible: boolean;
  updateURI: undefined | string;
}
class  AlertModalProvider extends React.Component<{}, IState> {

  constructor(props: {}) {
    super(props);
  }

  state: IState = {
    isModalVisible: false,
    text: '',
  };

  showModel = (text: string, onOk, onClear) => {
    this.onOkCallback = undefined;
    this.onClearCallback = undefined;
    if (onOk) {
      this.onOkCallback = onOk;
    }
    if (onClear) {
      this.onClearCallback = onClear;
    }
    this.setState({
      isModalVisible: true,
      text,
    });
  };

  closeModel = () => {
    this.setState({
      isModalVisible: false,
    }, () => {
      this.onOkCallback = undefined;
      this.onClearCallback = undefined;
    })
  };


  async componentDidMount() {

  }

  componentWillUnmount(): void {
    this.closeModel();
  }

  render() {
    const { isModalVisible, text } = this.state;
    return (
      <AlertModalContext.Provider value={{
        handleShowAlertModal: async (config: {text: string, onOk: () => {}, onClear: () => {}}) => {
          this.showModel(config.text, config.onOk, config.onClear)
        }
      }}>
        {this.props.children}
        <Modal
          coverScreen={true}
          useNativeDriver
          propagateSwipe
          isVisible={isModalVisible}
          onBackButtonPress={() => {
            this.closeModel()
          }}
          onBackdropPress={() => {

          }}
          style={{
            paddingHorizontal: 20,
          }}
        >
          <View style={{
            justifyContent: 'center',
            backgroundColor: '#fff',
            borderRadius: 0,
          }}>
              <View>
                <View>
                  <Text style={styles.title}>
                    提醒
                  </Text>
                  <Text style={styles.infoText}>
                    {text}
                  </Text>
                </View>
                <View style={styles.btnWrap}>
                  <Button
                      full
                      bordered
                      onPress={async () => {
                        this.setState({
                          isNotRemind: true,
                        }, () => {
                          this.closeModel();
                          if (typeof this.onClearCallback === 'function') {
                            this.onClearCallback()
                          }
                        })
                      }}
                      style={[styles.btn, {
                        backgroundColor: '#7D899B'
                      }]}
                  >
                    <Text style={[styles.btnText]}>取消</Text>
                  </Button>
                  <Button
                      transparent
                      full
                      bordered
                      onPress={async () => {
                        this.closeModel();
                        if (typeof this.onOkCallback === 'function') {
                          this.onOkCallback()
                        }
                      }}
                      style={[styles.btn, {
                        backgroundColor: '#0059D3',
                      }]}
                  >
                    <Text style={[styles.btnText, styles.okText]}>确定</Text>
                  </Button>
                </View>
              </View>
          </View>
        </Modal>
      </AlertModalContext.Provider>
    );
  }
}

export default AlertModalProvider
