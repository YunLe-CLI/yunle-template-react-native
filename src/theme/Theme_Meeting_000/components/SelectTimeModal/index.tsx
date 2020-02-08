import React, { createContext } from 'react';
import {View, AppState, StatusBar, Dimensions, TouchableOpacity} from 'react-native';
import styles from './styles';
import Modal from "react-native-modal";
import _ from "lodash";
import FastImage from 'react-native-fast-image';

import {Button, Text, Content, Header, Left, Icon, Body, Title, Right, List, ListItem, Container} from 'native-base';
import icon from './assets/icon_lineup_slices/icon_lineup.png';
import LinearGradient from "react-native-linear-gradient";
import {NavigationActions} from "react-navigation";
import iconLeft from './assets/icon_left_slices/icon_left.png';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';

export const SelectDateTimeModalContext = createContext({
  handleShowSelectDateTimeModal: () => {}
})
export const SelectDateTimeModalConsumer = SelectDateTimeModalContext.Consumer

export function withSelectDateTimeModal(WrappedComponent: React.ReactNode) {
  return class extends React.Component {
    render() {
      return <>
        <SelectDateTimeModalConsumer>
          {
            ({ handleShowSelectDateTimeModal }) => {
              return <WrappedComponent  {...this.props} handleShowSelectDateTimeModal={handleShowSelectDateTimeModal} />
            }
          }
        </SelectDateTimeModalConsumer>
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
class SelectDateTimeModalProvider extends React.Component<{}, IState> {

  constructor(props: {}) {
    super(props);
  }

  onCallBack: (select: any) => void = () => {};

  state: IState = {
    date: new Date(),
    isModalVisible: false,
    selected: undefined,
  };

  showModel = () => {
    this.setState({
      isModalVisible: true,
      date: new Date(),
    });
  };

  closeModel = () => {
    this.setState({
      isModalVisible: false,
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
      '住院医师',
      '主治医师',
      '副主任医师',
      '主任医师',
    ]
    return (
      <SelectDateTimeModalContext.Provider value={{
        handleShowSelectDateTimeModal: async (onCallBack) => {
          this.showModel();
          this.onCallBack = onCallBack;
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
            this.closeModel()
          }}
          style={{
            margin: 0,
            paddingLeft: 0,
            paddingRight: 0,
            marginLeft: 0,
            marginRight: 0,
            margin: 0,
            flex: 1,
            justifyContent: 'flex-end',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              this.closeModel()
            }}
            activeOpacity={1}
            style={styles.container}>
            <View style={styles.datePickerWrap}>
              <List>
                <ListItem>
                  <Left style={{
                    flex: 0,
                  }}>
                    <Button
                      transparent
                      onPress={() => {
                        this.closeModel()
                      }}
                    >
                      <Text>取消</Text>
                    </Button>
                  </Left>
                  <Body style={{
                    flexGrow: 1,
                  }}>
                    <Text style={{
                      textAlign: 'center'
                    }}>{moment(this.state.date).format('YYYY-MM-DD HH:mm')}</Text>
                  </Body>
                  <Right>
                    <Button
                      transparent
                      onPress={() => {
                        if (this.onCallBack && typeof this.onCallBack === 'function') {
                          this.onCallBack(this.state.date)
                        }
                        this.closeModel()
                      }}
                    >
                      <Text>确定</Text>
                    </Button>
                  </Right>
                </ListItem>
              </List>
              <DatePicker
                style={{
                  width: Dimensions.get('window').width,
                  flexGrow: 1,
                }}
                locale={'zh'}
                date={this.state.date}
                onDateChange={date => this.setState({ date })}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </SelectDateTimeModalContext.Provider>
    );
  }
}

export default SelectDateTimeModalProvider
