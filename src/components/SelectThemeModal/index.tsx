import React, { createContext } from 'react';
import {StatusBar} from 'react-native';
import styles from './styles';
import Modal from "react-native-modal";
import _ from "lodash";
import FastImage from 'react-native-fast-image';

import {Button, Text, Content, Header, Left, Icon, Body, Title, Right, List, ListItem, Container} from 'native-base';

import iconLeft from './assets/icon_left_slices/icon_left.png';
import AsyncStorage from "@react-native-community/async-storage";

import * as themes from '@/theme';

export const SelectThemeModalContext = createContext({
  handleShowSelectThemeModal: () => {}
})
export const SelectThemeModalConsumer = SelectThemeModalContext.Consumer

export function withSelectThemeModal(WrappedComponent: React.ReactNode) {
  return class extends React.Component {
    render() {
      return <>
        <SelectThemeModalConsumer>
          {
            ({ handleShowSelectThemeModal }) => {
              return <WrappedComponent  {...this.props} handleShowSelectThemeModal={handleShowSelectThemeModal} />
            }
          }
        </SelectThemeModalConsumer>
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
class SelectThemeModalProvider extends React.Component<{}, IState> {

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
    const themeID = await AsyncStorage.getItem('__THEME_ID__');
    this.setState({
      selected: themeID,
    })
  }

  componentWillUnmount(): void {
    this.closeModel();
  }

  onSelect = async (theme) => {
    try {
      if (theme) {
        if (global.ROOTVIEW && _.isFunction(global.ROOTVIEW.createThemeNode)) {
          global.ROOTVIEW.selectTheme(theme.id)
        }
      }
    } catch (e) {
    }
  }

  render() {
    const { isModalVisible, isModalNotVisible, updateURI } = this.state;
    const list = Object.values(themes) || [];
    return (
      <SelectThemeModalContext.Provider value={{
        handleShowSelectThemeModal: async (onCallBack) => {
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
                <Title style={styles.title}>主题列表</Title>
              </Body>
              <Right />
            </Header>
            <StatusBar barStyle="dark-content" />
            <Content style={{ backgroundColor: '#F9FBFF' }}>
              <List style={styles.listWrap}>
                {
                  list.map((item) => {
                    const { selected } = this.state;
                    const isSelect = JSON.stringify(item.id) === JSON.stringify(selected)
                    return <ListItem
                      selected={isSelect}
                      key={JSON.stringify(item.id)}
                      style={[styles.listItem]}
                      onPress={async () => {
                        this.setState({
                          selectedID: item.id,
                        }, () => {
                          this.onSelect(item)
                          this.closeModel();
                        })
                    }}>
                      <Text style={styles.listText}>{item.name}</Text>
                    </ListItem>
                  })
                }
              </List>
            </Content>
          </Container>
        </Modal>
      </SelectThemeModalContext.Provider>
    );
  }
}

export default SelectThemeModalProvider
