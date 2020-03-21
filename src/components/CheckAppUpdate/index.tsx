import React, { createContext } from 'react';
import { View, AppState, Alert,} from 'react-native';
import styles from './styles';
import Modal from "react-native-modal";
import _ from "lodash";
import {Button, Text} from 'native-base';

import nativeAutoUpdate, { handleDownload } from "@Global/utils/native-auto-update";

export const CheckAppUpdateContext = createContext({
  handleCheck: () => {}
})
export const CheckAppUpdateConsumer = CheckAppUpdateContext.Consumer

export function withCheckAppUpdate(WrappedComponent: new() => React.Component<any, any>) {
  return class extends React.Component {
    render() {
      return <>
        <CheckAppUpdateConsumer>
          {
            ({ handleCheck }) => {
              return <WrappedComponent  {...this.props} handleCheckAppUpdate={handleCheck} />
            }
          }
        </CheckAppUpdateConsumer>
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
class CheckAppUpdateProvider extends React.Component<{}, IState> {

  constructor(props: {}) {
    super(props);
    this.getRemoteDate = _.debounce(this.getRemoteDate,  3000)
  }

  state: IState = {
    isModalVisible: false,
    isNotRemind: false,
    isModalNotVisible: false,
    updateURI: undefined,
  };

  showModel = () => {
    this.setState({
      isModalVisible: true,
    });
  };

  closeModel = (uri: string | undefined) => {
    this.setState({
      isModalVisible: false,
    }, () => {
      if (uri) {
        try {
          handleDownload(uri);
        } catch (e) {
          // alert(e)
        }
      }
    })
  };

  showNotModel = () => {
    this.setState({
      isModalNotVisible: true,
    });
  };

  closeNotModel = () => {
    this.setState({
      isModalNotVisible: false,
    });
  };

  getRemoteDate = async (nextAppState: string, manual: boolean = false) => {
    if (nextAppState === 'active') {
      let res = undefined;
      try {
        res = await nativeAutoUpdate();
        if (res) {
          this.showModel();
        } else {
          throw '没有更新'
        }
      } catch (e) {
        this.closeModel(undefined);
        if (manual) {
          this.showNotModel();
        }
      } finally {
        this.setState({
          updateURI: res,
        })
      }
    }
  }

  async componentDidMount() {
    await this.getRemoteDate('active');
    AppState.addEventListener('change', this.getRemoteDate);
  }

  componentWillUnmount(): void {
    this.closeModel(undefined);
    this.closeNotModel();
    AppState.removeEventListener('change', this.getRemoteDate);
  }

  render() {
    const { isModalVisible, isModalNotVisible, updateURI } = this.state;
    return (
      <CheckAppUpdateContext.Provider value={{
        handleCheck: async () => { await this.getRemoteDate('active', true) }
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
        >
          <View style={{
            paddingVertical: 15,
            paddingHorizontal: 16,
            justifyContent: 'center',
            backgroundColor: '#fff',
            borderRadius: 8,
          }}>
              <View>
                <View>
                  <Text style={styles.title}>
                    APP更新提示
                  </Text>
                  <Text style={styles.infoText}>
                    发现新版本，马上更新体验吧！
                  </Text>
                </View>
                <View style={styles.btnWrap}>
                  <Button
                      rounded
                      transparent
                      bordered
                      onPress={async () => {
                        this.setState({
                          isNotRemind: true,
                        }, () => {
                          this.closeModel(undefined);
                        })
                      }}
                      style={{
                        flexGrow: 1,
                        justifyContent: 'center',
                      }}
                  >
                    <Text>下次再说</Text>
                  </Button>
                  <View style={{ width: 10, }} />
                  <Button
                      rounded
                      onPress={async () => {
                        this.setState({
                          isNotRemind: true,
                        }, () => {
                          this.closeModel(updateURI);
                        })
                      }}
                      style={{
                        flexGrow: 1,
                        justifyContent: 'center'
                      }}
                  >
                    <Text>立即更新</Text>
                  </Button>
                </View>
              </View>
          </View>
        </Modal>
        <Modal
            coverScreen={false}
            useNativeDriver
            propagateSwipe
            isVisible={isModalNotVisible}
            onBackButtonPress={() => {
              this.closeNotModel()
            }}
        >
          <View style={{
            paddingVertical: 15,
            paddingHorizontal: 16,
            justifyContent: 'center',
            backgroundColor: '#fff',
            borderRadius: 8,
          }}>
            <View>
              <View>
                <Text style={styles.title}>
                  APP暂无更新
                </Text>
                <Text style={styles.infoText}>
                  暂无版本更新！
                </Text>
              </View>
              <View style={styles.btnWrap}>
                <Button
                    rounded
                    onPress={async () => {
                      this.closeNotModel()
                    }}
                    style={{
                      flexGrow: 1,
                      justifyContent: 'center',
                    }}
                >
                  <Text>知道了</Text>
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      </CheckAppUpdateContext.Provider>
    );
  }
}

export default CheckAppUpdateProvider
