import React, { createContext } from 'react';
import {View, AppState, StatusBar} from 'react-native';
import styles from './styles';
import Modal from "react-native-modal";
import _ from "lodash";
import FastImage from 'react-native-fast-image';

import {Button, Text, Content, Header, Left, Icon, Body, Title, Right, List, ListItem, Container} from 'native-base';
import icon from './assets/icon_lineup_slices/icon_lineup.png';
import LinearGradient from "react-native-linear-gradient";
import {NavigationActions} from "react-navigation";
import iconLeft from './assets/icon_left_slices/icon_left.png';

export const SelectDepartmentModalContext = createContext({
  handleShowSelectDepartmentModal: () => {}
})
export const SelectDepartmentModalConsumer = SelectDepartmentModalContext.Consumer

export function withSelectDepartmentModal(WrappedComponent: React.ReactNode) {
  return class extends React.Component {
    render() {
      return <>
        <SelectDepartmentModalConsumer>
          {
            ({ handleShowSelectDepartmentModal }) => {
              return <WrappedComponent  {...this.props} handleShowSelectDepartmentModal={handleShowSelectDepartmentModal} />
            }
          }
        </SelectDepartmentModalConsumer>
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
class SelectDepartmentModalProvider extends React.Component<{}, IState> {

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
      '儿科',
      '精神科',
      '心内科',
      '口腔科',
      '男科',
      '骨科',
    ]
    return (
      <SelectDepartmentModalContext.Provider value={{
        handleShowSelectDepartmentModal: async (onCallBack) => {
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

          }}
          style={{
            paddingLeft: 0,
            paddingRight: 0,
            marginLeft: 0,
            marginRight: 0,
            margin: 0,
            alignContent: 'flex-end',
            justifyContent: 'flex-end',
          }}
        >
          <View style={styles.container}>
            <Container style={styles.container}>
              <ListItem
                style={{
                  height: 50,
                  marginLeft: 0,
                }}
                transparent>
                <Left style={{
                  flexGrow: 1,
                }}>
                  <Button
                    transparent
                    onPress={() => {
                      this.closeModel();
                    }}
                  >
                    <Title style={{
                      color: '#999999',
                      fontSize: 15,
                      fontWeight: '400',
                    }}>取消</Title>
                  </Button>
                </Left>
                <Body style={{
                  flex: 1,
                  flexGrow: 1,
                }}>
                  <Title style={styles.title}>选择科室</Title>
                </Body>
                <Right style={{
                  flexGrow: 1,
                }}>
                  <Button
                    transparent
                    onPress={() => {
                      this.closeModel();
                    }}
                  >
                    <Title style={{
                      color: '#F86358',
                      fontSize: 15,
                      fontWeight: '400',
                    }}>确认</Title>
                  </Button>
                </Right>
              </ListItem>
              <StatusBar barStyle="dark-content" />
              <Content style={{ backgroundColor: '#F9FBFF' }}>
                <List style={styles.listWrap}>
                  {
                    list.map((item) => {
                      const { selected } = this.state;
                      const isSelect = JSON.stringify(item) === JSON.stringify(selected)
                      return <ListItem selected={isSelect} key={JSON.stringify(item)} style={[styles.listItem, isSelect ? styles.selected : {}]}
                                       onPress={async () => {
                          this.setState({
                            selected: item,
                          }, () => {
                            if (this.onCallBack) {
                              this.onCallBack(item);
                            }
                            this.closeModel();
                          })
                      }}>
                        <Text style={styles.listText}>{item}</Text>
                      </ListItem>
                    })
                  }

                </List>
              </Content>
            </Container>
          </View>
        </Modal>
      </SelectDepartmentModalContext.Provider>
    );
  }
}

export default SelectDepartmentModalProvider
