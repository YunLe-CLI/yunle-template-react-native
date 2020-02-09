import React, { createContext } from 'react';
import { View, AppState,} from 'react-native';
import styles from './styles';
import Modal from "react-native-modal";
import _ from "lodash";
import FastImage from 'react-native-fast-image';

import {Button, Text, Content} from 'native-base';
import icon from './assets/icon_lineup_slices/icon_lineup.png';
import LinearGradient from "react-native-linear-gradient";
import {NavigationActions} from "react-navigation";
import {connect} from 'react-redux';
import {MAKE_ITEM} from '@/services/api';

export const GoToRoomContext = createContext({
  handleShowGoToRoomModal: () => {}
})
export const GoToRoomModalConsumer = GoToRoomContext.Consumer

export function withGoToRoomModal(WrappedComponent: React.ReactNode) {
  return class extends React.Component {
    render() {
      return <>
        <GoToRoomModalConsumer>
          {
            ({ handleShowGoToRoomModal }) => {
              return <WrappedComponent  {...this.props} handleShowGoToRoomModal={handleShowGoToRoomModal} />
            }
          }
        </GoToRoomModalConsumer>
      </>
    }
  }
}

export interface IState {
  isModalVisible: boolean;
  room: MAKE_ITEM;
}
@(connect() as any)
class GoToRoomModalProvider extends React.Component<{}, IState> {

  constructor(props: {}) {
    super(props);
  }

  state: IState = {
    isModalVisible: false,
    room: {},
  };

  showModel = (data: MAKE_ITEM) => {
    this.setState({
      isModalVisible: true,
      room: data,
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
    const { isModalVisible, room } = this.state;
    return (
      <GoToRoomContext.Provider value={{
        handleShowGoToRoomModal: async (data: MAKE_ITEM) => {
          this.showModel(data)
        }
      }}>
        {this.props.children}
        <Modal
          coverScreen={false}
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
            borderRadius: 8,
          }}>
            <View style={{
                marginTop: -40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <FastImage
                  style={{
                    width: 80,
                    height: 80,
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}
                  source={require('./assets/icon/index.png')}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
              <View>
                <View style={styles.header}>
                  <Text style={styles.title}>
                  该您看病了，赶快进去吧！
                  </Text>
                </View>
                <View style={styles.body}>
                  <Text style={styles.infoText}>
                    医生姓名：{room.name}
                  </Text>
                  <Text style={styles.infoText}>
                    所在科室：{room.medicalDepartment}
                  </Text>
                  <Text style={styles.infoText}>
                    医生职称：{room.professionalTitle}
                  </Text>
                  <Text style={styles.infoText}>
                    所在医院：{room.hospitalName}
                  </Text>
                </View>
                <View style={styles.btnWrap}>
                  <Button
                      full
                        bordered={false}
                        onPress={async () => {
                          this.props.dispatch(NavigationActions.navigate({
                            routeName: 'Room',
                            params: {
                              metaData: room.metaData,
                            },
                          }))
                          this.closeModel();
                        }}
                        style={[styles.btn, {
                          backgroundColor: '#000'
                        }]}
                    >
                      <Text style={[styles.btnText, styles.okText]}>进入诊室</Text>
                    </Button>
                    <View style={{ width: 15, height: 10 }} />
                    <Button
                      full
                      transparent
                      onPress={async () => {
                        if (typeof this.onOkCallback === 'function') {
                          this.onOkCallback()
                        }
                        this.closeModel();
                      }}
                      style={styles.btn}
                  >
                    <Text style={[styles.btnText]}>不了，等一会</Text>
                  </Button>
                </View>
              </View>
          </View>
        </Modal>
      </GoToRoomContext.Provider>
    );
  }
}

export default GoToRoomModalProvider
