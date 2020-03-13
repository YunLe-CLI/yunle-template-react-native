import React, { createContext } from 'react';
import { TouchableOpacity, StatusBar, View } from 'react-native';
import styles from './styles';
import Modal from "react-native-modal";
import _ from "lodash";
import FastImage from 'react-native-fast-image';

import {CheckBox, Card,CardItem, Button, Text, Content, Header, Left, Icon, Body, Title, Right, List, Container} from 'native-base';
import iconLeft from './assets/icon_left_slices/icon_left.png';
import AsyncStorage from "@react-native-community/async-storage";

import * as themes from '@/Apps';
import moment from 'moment';

export const SelectThemeModalContext = createContext({
  handleShowSelectThemeModal: (onCallBack: Function) => {}
})
export const SelectThemeModalConsumer = SelectThemeModalContext.Consumer

export function withSelectThemeModal(WrappedComponent: new() => React.Component<any, any>) {
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
  selected: string | undefined | null;
  images: any[];
}
class SelectThemeModalProvider extends React.Component<{}, IState> {

  constructor(props: {}) {
    super(props);
  }

  onCallBack: (select: any) => void = () => {};

  state: IState = {
    isModalVisible: false,
    selected: undefined,
    images: [],
  };

  showModel = () => {
    this.componentDidMount();
    this.setState({
      isModalVisible: true,
    });
  };

  closeModel = () => {
    this.setState({
      isModalVisible: false,
      selected: undefined,
    })
    this.onCallBack = () => {};
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

  onSelect = async (theme: any) => {
    try {
      global.$selectApp(theme.id);
    } catch (e) {
    }
  }

  renderItem(item: any) {
    const { selected } = this.state;
    return  <TouchableOpacity
        key={JSON.stringify(item.id)}
        onPress={() => {
          this.setState({
            selectedID: item.id,
          }, () => {
            this.onSelect(item)
            this.closeModel();
          })
        }}
    >
        <Card>
          <CardItem>
            <Left>
              <FastImage
                style={{
                  width: 50,
                  height: 50,
                  alignContent: 'center',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}
                source={{uri: 'https://dagouzhi.oss-cn-qingdao.aliyuncs.com/com.dagouzhi.app.temp/App%20Store.jpg'}}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Body>
                <Text>{item.name}</Text>
                <Text note>{item.author}</Text>
              </Body>
            </Left>
            <Right>
              <View style={{
                marginRight: 10,
              }}>
                <CheckBox
                  onPress={() => {
                    this.setState({
                      selectedID: item.id,
                    }, () => {
                      this.onSelect(item)
                      this.closeModel();
                    })
                  }}
                  checked={JSON.stringify(item.id) === JSON.stringify(selected)} />
              </View>
            </Right>
          </CardItem>
          <CardItem
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            cardBody>
            <TouchableOpacity
              style={{
                width: 200,
                height: 200,
              }}
            >
              <FastImage
                style={{
                  width: '100%',
                  height: 200,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
                source={item.preview ? item.preview : null}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Icon active name="thumbs-up" />
                <Text>12 喜欢</Text>
              </Button>
            </Left>
            <Body>
              <Button transparent>
                <Icon active name="chatbubbles" />
                <Text>4 评论</Text>
              </Button>
            </Body>
            <Right>
              <Text numberOfLines={1}>{moment().format('YYYY-MM-DD HH:mm:ss')}</Text>
            </Right>
          </CardItem>
        </Card>
      </TouchableOpacity>
  }

  render() {
    const { isModalVisible } = this.state;
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
            <Content
              style={{ backgroundColor: '#F9FBFF' }}
              contentContainerStyle={{
                padding: 16,
              }}
            >
              <List style={styles.listWrap}>
                {
                  list.map((item) => {
                    const { selected } = this.state;
                    const isSelect = JSON.stringify(item.id) === JSON.stringify(selected)
                    return this.renderItem(item);
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
