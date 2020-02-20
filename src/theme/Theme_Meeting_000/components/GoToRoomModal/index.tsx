import React, { createContext } from 'react';
import { View, AppState,} from 'react-native';
import styles from './styles';
import Modal from "react-native-modal";
import _ from "lodash";
import FastImage from 'react-native-fast-image';

import {Button, Text, Content} from 'native-base';
import icon from './assets/pic_sky_slices/pic_sky.png';
import LinearGradient from "react-native-linear-gradient";
import {NavigationActions} from "react-navigation";
import {connect} from 'react-redux';
import {MAKE_ITEM} from '@/services/api';
import moment from 'moment';

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
    const presenter = room.presenter || {}
    const participants = room.participants || [];
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
              <View>
                <View style={styles.header}>
                  <FastImage
                    style={{
                      marginVertical: 10,
                      width: 82,
                      height: 80,
                      alignContent: 'center',
                      justifyContent: 'center',
                    }}
                    source={icon}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
                <Text style={styles.title}>
                  会议已开始，请尽快进入会议
                </Text>
                <View style={styles.body}>
                  <Text style={styles.infoText}>
                    会议姓名：{room.name}
                  </Text>
                  <Text style={styles.infoText}>
                    会议时间：{moment(room.startTime).format('YYYY-MM-DD HH:mm:ss')}
                  </Text>
                  <Text style={styles.infoText}>
                    发起人：{presenter.name}
                  </Text>
                  <Text style={styles.infoText}>
                    参会人：{participants.map((i) => {
                      return i.name || ''
                    }).join(',')}
                  </Text>
                </View>
                <View style={styles.btnWrap}>
                  <Button
                      rounded
                      bordered
                      onPress={async () => {
                        this.setState({
                          isNotRemind: true,
                        }, () => {
                          this.closeModel();
                        })
                      }}
                      style={styles.btn}
                  >
                    <Text style={[styles.btnText, styles.okText]}>稍后进入</Text>
                  </Button>
                  <View style={{ width: 15, height: 40 }} />
                  <LinearGradient
                    start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                    colors={['#6AE27C', '#17D397']}
                    style={[
                      styles.btn,
                    ]}
                  >
                    <Button
                      full
                        rounded
                        bordered={false}
                        onPress={async () => {
                          this.props.dispatch(NavigationActions.navigate({
                            routeName: 'Room',
                            params: {
                              presenter,
                              id: room.id,
                              metaData: room.metaData,
                            },
                          }))
                          this.closeModel();
                        }}
                        style={styles.btn}
                    >
                      <Text style={[styles.btnText]}>进入会议</Text>
                    </Button>
                  </LinearGradient>
                </View>
              </View>
          </View>
        </Modal>
      </GoToRoomContext.Provider>
    );
  }
}

export default GoToRoomModalProvider
