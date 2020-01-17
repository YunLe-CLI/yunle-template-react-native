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

export const SelectLevelModalContext = createContext({
  handleShowSelectLevelModal: () => {}
})
export const SelectLevelModalConsumer = SelectLevelModalContext.Consumer

export function withSelectLevelModal(WrappedComponent: React.ReactNode) {
  return class extends React.Component {
    render() {
      return <>
        <SelectLevelModalConsumer>
          {
            ({ handleShowSelectLevelModal }) => {
              return <WrappedComponent  {...this.props} handleShowSelectLevelModal={handleShowSelectLevelModal} />
            }
          }
        </SelectLevelModalConsumer>
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
class SelectLevelModalProvider extends React.Component<{}, IState> {

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
      '住院医师',
      '主治医师',
      '副主任医师',
      '主任医师',
    ]
    return (
      <SelectLevelModalContext.Provider value={{
        handleShowSelectLevelModal: async (onCallBack) => {
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
          <Container style={styles.container}>
            <Header transparent>
              <Left>
                <Button
                  transparent
                  onPress={() => {
                    this.closeModel();
                  }}
                >
                  <FastImage
                    style={{
                      marginLeft: 16,
                      width: 20,
                      height: 20,
                      alignContent: 'center',
                      justifyContent: 'center',
                    }}
                    source={iconLeft}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </Button>
              </Left>
              <Body>
                <Title style={styles.title}>职称列表</Title>
              </Body>
              <Right />
            </Header>
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
        </Modal>
      </SelectLevelModalContext.Provider>
    );
  }
}

export default SelectLevelModalProvider
