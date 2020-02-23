import React, { createContext } from 'react';
import {Image, TouchableOpacity, StatusBar, View, SafeAreaView} from 'react-native';
import styles from './styles';
import Modal from "react-native-modal";

import { Button, Text, Container} from 'native-base';
import AsyncStorage from "@react-native-community/async-storage";
import YSXLocalShareView from '@Global/components/YSXLocalShare'
export const YSXLocalShareModalContext = createContext({
  handleShowYSXLocalShareModal: (id: number, onCallBack: () => void) => {},
  handleHideYSXLocalShareModal: () => {}
})
export const YSXLocalShareModalConsumer = YSXLocalShareModalContext.Consumer

export function withYSXLocalShareModal(WrappedComponent: React.ReactNode) {
  return class extends React.Component {
    render() {
      return <>
        <YSXLocalShareModalConsumer>
          {
            ({ handleShowYSXLocalShareModal, handleHideYSXLocalShareModal }) => {
              return <WrappedComponent  {...this.props}
                                        handleShowYSXLocalShareModal={handleShowYSXLocalShareModal}
                                        handleHideYSXLocalShareModal={handleHideYSXLocalShareModal}
              />
            }
          }
        </YSXLocalShareModalConsumer>
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
class YSXLocalShareModalProvider extends React.Component<{}, IState> {

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
    if (this.onCallBack) {
      this.onCallBack();
      this.onCallBack = undefined;
    }
  };


  async componentDidMount() {
      console.log(this.refView, 112123123)
  }

  componentWillUnmount(): void {
    this.closeModel();
  }

  render() {
    const { isModalVisible, isModalNotVisible, updateURI } = this.state;

    return (
      <YSXLocalShareModalContext.Provider value={{
        handleShowYSXLocalShareModal: async (id, onCallBack) => {
          this.showModel(id);
          this.onCallBack = onCallBack;
        },
        handleHideYSXLocalShareModal: () => {
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
            <View ref={e => this.refView = e} style={{
              borderRadius: 3,
              overflow: 'hidden',
              backgroundColor: '#fff',
            }}>
              <YSXLocalShareView style={{
                flexGrow: 1,
                minWidth: 400,
                minHeight: 400,
              }} activeShareID={this.state.id} />
            </View>
            <View style={{
              marginTop: 20,
            }}>
              <Button
                onPress={() => {
                  this.closeModel()
                }}
                style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text>关闭 Local</Text>
              </Button>
            </View>
            <SafeAreaView />
          </View>
        </Modal>
      </YSXLocalShareModalContext.Provider>
    );
  }
}

export default YSXLocalShareModalProvider
