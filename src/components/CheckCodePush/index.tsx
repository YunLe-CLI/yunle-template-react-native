import React, { createContext } from 'react';
import { View, AppState,} from 'react-native';
import styles from './styles';
import Modal from "react-native-modal";
import _ from "lodash";
import {Button, Text} from 'native-base';
import codePush, {DownloadProgress, RemotePackage} from 'react-native-code-push'
import * as Progress from 'react-native-progress';

export const CheckUpdateContext = createContext({
  handleCheck: () => {}
})
export const CheckUpdateConsumer = CheckUpdateContext.Consumer

export function withCheckUpdate(WrappedComponent: React.ReactNode) {
  return class extends React.Component {
    render() {
      return <>
        <CheckUpdateContext.Consumer>
          {
            ({ handleCheck }) => {
              return <WrappedComponent {...this.props} handleCheckCodePush={handleCheck} />;
            }
          }
        </CheckUpdateContext.Consumer>
      </>
    }
  }
}

export interface IState {
  info: RemotePackage | null;
  status: SyncStatus | undefined;
  downloadProgress: DownloadProgress | undefined;
  isModalVisible: boolean;
  isNotRemind: boolean;
  isModalNotVisible: boolean;
  updateURI: undefined | string;
}
class CheckUpdateProvider extends React.Component<{}, IState> {

  constructor(props: {}) {
    super(props);
    this.getRemoteDate = _.debounce(this.getRemoteDate, 3000)
  }

  state: IState = {
    info: null,
    status: undefined,
    downloadProgress: undefined,
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

  closeModel = (notClear: boolean | undefined) => {
    this.setState({
      isModalVisible: false,
    }, () => {
      if (!notClear) {
        this.setState({
          info: null,
          status: null,
          downloadProgress: undefined,
        })
      }
    })
  };

  getRemoteDate = async (nextAppState: string, manual: boolean = false) => {
    if (nextAppState === 'active') {
      let res: RemotePackage | null = null;
      try {
        res = await codePush.checkForUpdate();
        this.setState({
          info: res,
        }, () => {
          if (res) {
            this.showModel();
          }
        })
      } catch (e) {
        this.closeModel(undefined);
      }
    }
  }

  handleUpdate = async () => {
    codePush.sync({
      updateDialog: false,
      mandatoryInstallMode: codePush.InstallMode.ON_NEXT_RESUME
    }, (status) => {
      switch (status) {
        case codePush.SyncStatus.CHECKING_FOR_UPDATE:
          this.setState({ syncMessage: "检查更新!" });
          break;
        case codePush.SyncStatus.DOWNLOADING_PACKAGE:
          this.setState({ syncMessage: "正常下载安装包!" });
          this.setState({
            status,
          })
          break;
        case codePush.SyncStatus.AWAITING_USER_ACTION:
          this.setState({ syncMessage: "等待用户操作!" });
          break;
        case codePush.SyncStatus.INSTALLING_UPDATE:
          this.setState({ syncMessage: "正在安装...,请等待!" });
          this.setState({
            isModalVisible: true,
            status,
          })
          break;
        case codePush.SyncStatus.UP_TO_DATE:
          this.setState({ syncMessage: "已经是最新版本了！", progress: false });
          break;
        case codePush.SyncStatus.UPDATE_IGNORED:
          this.setState({ syncMessage: "更新取消！", progress: false });
          break;
        case codePush.SyncStatus.UPDATE_INSTALLED:{
          this.setState({ syncMessage: "新的版本已经安装完成,请重新登录!", progress: false });
          // codePush.restartApp();
          break;
        }
        case codePush.SyncStatus.UNKNOWN_ERROR:
          this.setState({ syncMessage: "更新发生错误,请重新启动程序！", progress: false });
          this.setState({
            isModalVisible: true,
            status,
          })
          break;
      }
    }, (res) => {
      this.setState({
        downloadProgress: res,
      })
    }, () => {

    });
  }

  restartApp = () => {
    try {
      this.closeModel(undefined);
      setTimeout(() => {
        codePush.restartApp();
      }, 300);
    } catch (e) {

    }
  }

  async componentDidMount() {
    await this.getRemoteDate('active');
    AppState.addEventListener('change', this.getRemoteDate);
  }

  componentWillUnmount(): void {
    this.closeModel(undefined);
    AppState.removeEventListener('change', this.getRemoteDate);
  }

  renderDownload = () => {
    const { isModalVisible, info = {}, downloadProgress } = this.state;
    const size = info && info.packageSize > 0 ? (info.packageSize/1024/1024).toFixed(2) : 0.00
    return (
        <View>
          <View>
            <View>
              <Text style={styles.title}>
                发现最新数据
              </Text>
              <Text style={styles.infoText}>
                发现最新数据({size || 0.00}M)，是否立即加载？
              </Text>
            </View>
            <View style={styles.btnWrap}>
              <Button
                  rounded
                  transparent
                  bordered
                  onPress={async () => {
                    this.closeModel(undefined);
                  }}
                  style={{
                    flexGrow: 1,
                    justifyContent: 'center',
                  }}
              >
                <Text style={{ color: 'rgba(250, 28, 48, 1)' }}>下次再说</Text>
              </Button>
              <View style={{ width: 10, }} />
              <Button
                  rounded
                  onPress={async () => {
                    this.setState({
                      isNotRemind: true,
                    }, () => {
                      this.handleUpdate();
                    })
                  }}
                  style={{
                    flexGrow: 1,
                    justifyContent: 'center'
                  }}
              >
                <Text style={{ color: '#fff' }}>立即加载</Text>
              </Button>
            </View>
          </View>
        </View>
    )
  }

  renderProgress = () => {
    const { downloadProgress = {} } = this.state;
    const { totalBytes = 0, receivedBytes = 0 } = downloadProgress;
    const total = totalBytes ? (totalBytes/1024/1024).toFixed(2) : 0.00;
    const received = receivedBytes ? (receivedBytes/1024/1024).toFixed(2) : 0.00;
    const progress = received/total;
    return (
        <View>
          <View>
            <Text style={styles.title}>
              数据下载中
            </Text>
            <View style={styles.progress}>
              <View>
                <Progress.Bar progress={progress > 0 ? progress : 0} width={200} />
              </View>
              <Text style={[styles.infoText, { marginTop: 0 }]}>{received}/{total}</Text>
            </View>
          </View>
          <View style={styles.btnWrap}>
            <Button
                rounded
                transparent
                bordered
                onPress={async () => {
                  this.closeModel(true);
                }}
                style={{
                  flexGrow: 1,
                  justifyContent: 'center',
                }}
            >
              <Text style={{ color: 'rgba(250, 28, 48, 1)' }}>后台下载</Text>
            </Button>
          </View>
        </View>
    )
  }

  renderSuccess = () => {
    const { downloadProgress = {} } = this.state;
    const { totalBytes = 0, receivedBytes = 0 } = downloadProgress;
    const total = totalBytes ? (totalBytes/1024/1024).toFixed(2) : 0.00;
    const received = receivedBytes ? (receivedBytes/1024/1024).toFixed(2) : 0.00;
    const progress = received/total;
    return (
          <View>
            <View>
              <Text style={styles.title}>
                数据下载完成
              </Text>
              <View style={styles.progress}>
                <View>
                  <Progress.Bar progress={1} width={200} />
                </View>
                <Text style={[styles.infoText, { marginTop: 0 }]}>{received}/{total}</Text>
              </View>
            </View>
            <View style={styles.btnWrap}>
              <Button
                  rounded
                  transparent
                  bordered
                  onPress={async () => {
                    this.closeModel(undefined);
                  }}
                  style={{
                    flexGrow: 1,
                    justifyContent: 'center',
                  }}
              >
                <Text style={{ color: 'rgba(250, 28, 48, 1)' }}>下次再说</Text>
              </Button>
              <View style={{ width: 10, }} />
              <Button
                  rounded
                  onPress={async () => {
                    this.setState({
                      isNotRemind: true,
                    }, () => {
                      this.restartApp();
                    })
                  }}
                  style={{
                    flexGrow: 1,
                    justifyContent: 'center'
                  }}
              >
                <Text style={{ color: '#fff' }}>立即重启</Text>
              </Button>
            </View>
        </View>
    )
  }

  renderError = () => {
    const { downloadProgress } = this.state;
    return (
        <View>
          <View>
            <Text style={styles.title}>
              数据下载失败
            </Text>
            <Text style={styles.infoText}>
              请稍后再试或者重启app！
            </Text>
          </View>
          <View style={styles.btnWrap}>
            <Button
                rounded
                onPress={async () => {
                  this.closeModel(undefined);
                }}
                style={{
                  flexGrow: 1,
                  justifyContent: 'center'
                }}
            >
              <Text style={{ color: '#fff' }}>知道了</Text>
            </Button>
          </View>
        </View>
    )
  }

  render() {
    const { isModalVisible, info, downloadProgress, status } = this.state;
    return (
      <CheckUpdateContext.Provider value={{
        handleCheck: async () => { await this.getRemoteDate('active', true) }
      }}>
        {this.props.children}
        <Modal
          coverScreen={false}
          useNativeDriver
          propagateSwipe
          isVisible={isModalVisible}
          onBackButtonPress={() => {

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
            {
              !status ? (
                  this.renderDownload()
              ) : undefined
            }
            {
              status === codePush.SyncStatus.DOWNLOADING_PACKAGE ? (
                  this.renderProgress()
              ) : undefined
            }
            {
              status === codePush.SyncStatus.INSTALLING_UPDATE ? (
                  this.renderSuccess()
              ) : undefined
            }
            {
              status === codePush.SyncStatus.UNKNOWN_ERROR ? (
                  this.renderError()
              ) : undefined
            }
          </View>
        </Modal>
      </CheckUpdateContext.Provider>
    );
  }
}

export default CheckUpdateProvider
