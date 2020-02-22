import React, { createContext } from 'react';
import {Image, TouchableOpacity, StatusBar, View, SafeAreaView} from 'react-native';
import styles from './styles';
import Modal from "react-native-modal";

import { Button, Text, Container} from 'native-base';
import AsyncStorage from "@react-native-community/async-storage";
import YSXRemoteShareView from '@/components/YSXRemoteShare'
export const YSXRemoteShareModalContext = createContext({
  handleShowYSXRemoteShareModal: (id: number, onCallBack: () => void) => {},
  handleHideYSXRemoteShareModal: () => {}
})
export const YSXRemoteShareModalConsumer = YSXRemoteShareModalContext.Consumer

export function withYSXRemoteShareModal(WrappedComponent: React.ReactNode) {
  return class extends React.Component {
    render() {
      return <>
        <YSXRemoteShareModalConsumer>
          {
            ({ handleShowYSXRemoteShareModal, handleHideYSXRemoteShareModal }) => {
              return <WrappedComponent  {...this.props}
                                        handleShowYSXRemoteShareModal={handleShowYSXRemoteShareModal}
                                        handleHideYSXRemoteShareModal={handleHideYSXRemoteShareModal}
              />
            }
          }
        </YSXRemoteShareModalConsumer>
      </>
    }
  }
}

export interface IState {
  id: number | undefined;
  isModalVisible: boolean;
  isNotRemind: boolean;
  isModalNotVisible: boolean;
  updateURI: undefined | string;
}
class YSXRemoteShareModalProvider extends React.Component<{}, IState> {

  constructor(props: {}) {
    super(props);
  }

  onCallBack: (select: any) => void = () => {};

  state: IState = {
    isModalVisible: false,
    selected: undefined,
    images: [],
    id: 12,
    isImageViewVisible: false,
  };

  showModel = (id: number) => {
    this.componentDidMount();
    this.setState({
      id,
      isModalVisible: true,
    });
  };

  closeModel = () => {
    this.setState({
      isModalVisible: false,
      selected: undefined,
    })
    this.onCallBack = undefined;
  };


  async componentDidMount() {

  }

  componentWillUnmount(): void {
    this.closeModel();
  }

  render() {
    const { isModalVisible, isModalNotVisible, updateURI } = this.state;
    return (
      <YSXRemoteShareModalContext.Provider value={{
        handleShowYSXRemoteShareModal: async (id, onCallBack) => {
          this.showModel(id);
          this.onCallBack = onCallBack;
        },
        handleHideYSXRemoteShareModal: () => {
          this.closeModel()
        }
      }}>
        {this.props.children}
        <Modal
          // backdropColor={'transparent'}
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
            // margin: 0,
            // paddingLeft: 0,
            // paddingRight: 0,
            // marginLeft: 0,
            // marginRight: 0,
            justifyContent: 'flex-end',
          }}
        >
          <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={{
              borderRadius: 3,
              overflow: 'hidden',
              backgroundColor: 'red',
            }}>
              <YSXRemoteShareView style={{
                flexGrow: 1,
                width: 400,
                height: 400,
              }} activeShareID={this.state.id} />
            </View>
            <View style={{
              marginTop: 20,
            }}>
              <Button
                onPress={() => {
                  this.setState({
                    isModalVisible: false,
                  })
                }}
                style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text>关闭</Text>
              </Button>
            </View>
            <SafeAreaView />
          </View>
        </Modal>
      </YSXRemoteShareModalContext.Provider>
    );
  }
}

export default YSXRemoteShareModalProvider
