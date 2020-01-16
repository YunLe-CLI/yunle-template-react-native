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
              <View>
                <View style={styles.header}>
                  <FastImage
                    style={{
                      marginRight: 6,
                      width: 22,
                      height: 22,
                      alignContent: 'center',
                      justifyContent: 'center',
                    }}
                    source={icon}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                  <Text style={styles.title}>
                    已排到您，请尽快进入诊室
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
                    <Text style={[styles.btnText, styles.okText]}>取消</Text>
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
                              metaData: room.metaData,
                            },
                          }))
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
      </GoToRoomContext.Provider>
    );
  }
}

export default GoToRoomModalProvider
