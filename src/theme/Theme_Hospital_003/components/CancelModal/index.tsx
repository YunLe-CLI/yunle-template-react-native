import React, { createContext } from 'react';
import { View, AppState,} from 'react-native';
import styles from './styles';
import Modal from "react-native-modal";
import _ from "lodash";
import {Button, Text} from 'native-base';
import LinearGradient from "react-native-linear-gradient";

import nativeAutoUpdate, { handleDownload } from "@/utils/native-auto-update";

export const CheckAppUpdateContext = createContext({
  handleShowCancelModal: () => {}
})
export const CancelModalConsumer = CheckAppUpdateContext.Consumer

export function withCancelModal(WrappedComponent: React.ReactNode) {
  return class extends React.Component {
    render() {
      return <>
        <CancelModalConsumer>
          {
            ({ handleShowCancelModal }) => {
              return <WrappedComponent  {...this.props} handleShowCancelModal={handleShowCancelModal} />
            }
          }
        </CancelModalConsumer>
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
class CancelModalProvider extends React.Component<{}, IState> {

  constructor(props: {}) {
    super(props);
  }

  state: IState = {
    isModalVisible: false,
  };

  showModel = () => {
    this.setState({
      isModalVisible: true,
    });
  };

  closeModel = () => {
    this.setState({
      isModalVisible: false,
    })
  };


  async componentDidMount() {

  }

  componentWillUnmount(): void {
    this.closeModel();
  }

  render() {
    const { isModalVisible, isModalNotVisible, updateURI } = this.state;
    return (
      <CheckAppUpdateContext.Provider value={{
        handleShowCancelModal: async () => { this.showModel() }
      }}>
        {this.props.children}
        <Modal
          coverScreen={false}
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
            borderRadius: 0,
          }}>
              <View>
                <View style={styles.header}>
                  <Text style={styles.title}>
                  是否确认取消2020年1月3日下午的就诊？
                  </Text>
                  <Text style={styles.title}>
                  取消后挂号费会原路退回
                  </Text>
                </View>
                <View style={styles.btnWrap}>
                  <Button
                    full
                    onPress={async () => {
                      this.setState({
                        isNotRemind: true,
                      }, () => {
                        this.closeModel();
                      })
                    }}
                    style={[styles.btn, {
                      backgroundColor: '#7D899B',
                    }]}
                  >
                    <Text style={[styles.btnText]}>取消</Text>
                  </Button>
                  <LinearGradient
                    start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                    colors={['#6AE27C', '#17D397']}
                    style={[
                      styles.btn,
                    ]}
                  >
                    <Button
                      full
                        bordered={false}
                        onPress={async () => {
                          this.closeModel();
                        }}
                        style={styles.btn}
                    >
                      <Text style={[styles.btnText]}>确定</Text>
                    </Button>
                  </LinearGradient>
                </View>
              </View>
          </View>
        </Modal>
      </CheckAppUpdateContext.Provider>
    );
  }
}

export default CancelModalProvider
