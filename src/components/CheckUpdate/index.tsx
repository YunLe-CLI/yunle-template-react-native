import React from 'react';
import {Platform, View, Linking, AppState, Text, Button} from 'react-native';
import styles from './styles';
import Modal from "react-native-modal";
import _ from "lodash";
import { getAppVersion } from '@/services/api'
import { IAppInfo, checkAppVersion } from '@/utils/utils'

export interface IState {
  isModalVisible: boolean;
  isNotRemind: boolean;
}
class CheckUpdate extends React.Component<{}, IState> {

  constructor(props: {}) {
    super(props);
    this.getRemoteDate = _.debounce(this.getRemoteDate, 1000)
  }

  state: IState = {
    isModalVisible: false,
    isNotRemind: false,
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

  getRemoteDate = async (nextAppState: string) => {
    if (nextAppState === 'active') {
      try {
        const res = await getAppVersion();
        const code = _.get(res, 'code', undefined);
        const data = _.get(res, 'data', undefined);
        if (code === 0) {
          let appPlatform = 'ios';
          if (_.toNumber(_.get(data, 'os', undefined)) === 1) {
            appPlatform = 'android'
          }
          if (_.toNumber(_.get(data, 'os', undefined)) === 2) {
            appPlatform = 'ios'
          }
          const remoteVersion: IAppInfo = {
            appPlatform: appPlatform,
            appVersion: _.get(data, 'version', undefined),
            appBuildNumber: _.get(data, 'build', undefined),
          }
          const isUpdate: boolean = checkAppVersion(remoteVersion);
          if (isUpdate) {
            if (!this.state.isNotRemind) {
              this.showModel();
            }
          }
        }
      } catch (e) {

      } finally {

      }
    }
  }

  async componentDidMount() {
    await this.getRemoteDate('active');
    AppState.addEventListener('change', this.getRemoteDate);
  }

  componentWillUnmount(): void {
    this.closeModel();
    AppState.removeEventListener('change', this.getRemoteDate);
  }

  render() {
    const { isModalVisible } = this.state;
    return (
      <Modal
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
          <View>
            <Text style={styles.title}>
              APP更新提示
            </Text>
            <Text style={styles.infoText}>
              发现新版本，马上更新体验吧！
            </Text>
            <Text style={styles.infoText}>
              马上更新体验吧！
            </Text>
          </View>
          <View style={styles.btnWrap}>
            <Button
              type="outline"
              containerStyle={{
                flexGrow: 1,
              }}
              buttonStyle={styles.buttonStyle2}
              titleProps={{
                style: styles.buttonTitleProps2,
              }}
              onPress={() => {
                this.setState({
                  isNotRemind: true,
                }, () => {
                  this.closeModel();
                })
              }}
              title="下次再说" />
            <View style={{ width: 10, }} />
            <Button
              containerStyle={{
                flexGrow: 1,
              }}
              buttonStyle={styles.buttonStyle}
              titleProps={{
                style: styles.buttonTitleProps,
              }}
              onPress={() => {
                if (Platform.OS === 'ios') {
                  Linking.openURL('https://apps.apple.com/cn/app/%E5%B0%8F%E5%95%86%E4%B8%9A/id1478687087');
                }
                if (Platform.OS === 'android') {
                  Linking.openURL('https://a.app.qq.com/o/simple.jsp?pkgname=net.xiaoshangye.app.android');
                }
              }}
              title="立即更新" />
          </View>
        </View>
      </Modal>
    );
  }
}

export default CheckUpdate
