import React, { createContext } from 'react';
import { View, AppState,} from 'react-native';
import styles from './styles';
import Modal from "react-native-modal";
import _ from "lodash";
import {Button, Text} from 'native-base';

import nativeAutoUpdate, { handleDownload } from "@/utils/native-auto-update";

export const AlertModalContext = createContext({
  handleAlertModalModal: () => {}
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

  showModel = (text: string) => {
    this.setState({
      isModalVisible: true,
      text,
    });
  };

  closeModel = () => {
    this.setState({
      isModalVisible: false,
    })
    this.onOkCallback = undefined;
    this.onClearCallback = undefined;
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
          this.showModel(config.text)
          if (config.onOk) {
            this.onOkCallback = config.onOk;
          }
          if (config.onOk) {
            this.onClearCallback = config.onClear;
          }
        }
      }}>
        {this.props.children}
        <Modal
          coverScreen={true}
          useNativeDriver
          propagateSwipe
          isVisible={isModalVisible}
          onBackButtonPress={() => {
            this.closeModel(undefined)
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
            borderRadius: 8,
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
                      style={styles.btn}
                  >
                    <Text style={[styles.btnText]}>取消</Text>
                  </Button>
                  <View style={{ width: 1, height: 50, backgroundColor: '#F2F2F2' }} />
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
                      style={styles.btn}
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
