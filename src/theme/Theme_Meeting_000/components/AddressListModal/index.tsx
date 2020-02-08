import React, { createContext } from 'react';
import {View, AppState, StatusBar} from 'react-native';
import styles from './styles';
import Modal from "react-native-modal";
import _ from "lodash";
import FastImage from 'react-native-fast-image';

import {Button, Text, Content, Header, Left, Icon, Body, Title, Right, List, ListItem, Container} from 'native-base';
import iconLeft from './assets/icon_left_slices/icon_left.png';

import AddressList from '../../pages/AddressList';

export const AddressListModalContext = createContext({
  handleShowAddressListModal: () => {}
})
export const AddressListModalConsumer = AddressListModalContext.Consumer

export function withAddressListModal(WrappedComponent: React.ReactNode) {
  return class extends React.Component {
    render() {
      return <>
        <AddressListModalConsumer>
          {
            ({ handleShowAddressListModal }) => {
              return <WrappedComponent  {...this.props} handleShowAddressListModal={handleShowAddressListModal} />
            }
          }
        </AddressListModalConsumer>
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
class AddressListModalProvider extends React.Component<{}, IState> {

  constructor(props: {}) {
    super(props);
  }

  onCallBack: (select: any) => void = () => {};

  state: IState = {
    isModalVisible: false,
    selected: undefined,
  };

  showModel = () => {
    this.setState({
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
    const list = [
      '科室一',
      '科室二',
    ]
    return (
      <AddressListModalContext.Provider value={{
        handleShowAddressListModal: async (onCallBack) => {
          this.showModel();
          this.onCallBack = onCallBack;
        }
      }}>
        {this.props.children}
        <Modal
          backdropColor={'transparent'}
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
            margin: 0,
            paddingLeft: 0,
            paddingRight: 0,
            marginLeft: 0,
            marginRight: 0,
            margin: 0,
          }}
        >
          <AddressList type={'add'} onClose={this.closeModel} onOk={(data) => {
            if (this.onCallBack) {
              this.onCallBack(data)
            }
            this.closeModel()
          }} />
        </Modal>
      </AddressListModalContext.Provider>
    );
  }
}

export default AddressListModalProvider
