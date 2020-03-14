import React, { createContext } from 'react';
import { TouchableOpacity, StatusBar, View } from 'react-native';
import styles from './styles';
import Modal from "react-native-modal";
import _ from "lodash";
import FastImage from 'react-native-fast-image';
import { connect } from "react-redux";
import {CheckBox, Card,CardItem, Button, Text, Content, Header, Left, Icon, Body, Title, Right, List, Container} from 'native-base';
import iconLeft from './assets/icon_left_slices/icon_left.png';
import AsyncStorage from "@react-native-community/async-storage";
import { ConnectState, ConnectProps } from '@Global/models/connect';
import themes from '@Global/utils/themes';
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
  
  }

  componentWillUnmount(): void {
    this.closeModel();
  }

  onSelect = async (theme: string) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'theme/setTheme',
      theme: theme
    })
    // this.closeModel();
  }

  renderItem(item: string) {
    const info = themes[item];
    const colos = [];
    if (info.brandPrimary) {
      colos.push({
        name: 'brandPrimary',
        color: info.brandPrimary,
      })
    }
    if (info.brandInfo) {
      colos.push({
        name: 'brandInfo',
        color: info.brandInfo,
      })
    }
    if (info.brandSuccess) {
      colos.push({
        name: 'brandSuccess',
        color: info.brandSuccess,
      })
    }
    if (info.brandDanger) {
      colos.push({
        name: 'brandDanger',
        color: info.brandDanger,
      })
    }
    if (info.brandWarning) {
      colos.push({
        name: 'brandWarning',
        color: info.brandWarning,
      })
    }
    if (info.brandDark) {
      colos.push({
        name: 'brandDark',
        color: info.brandDark,
      })
    }
    if (info.brandLight) {
      colos.push({
        name: 'brandLight',
        color: info.brandLight,
      })
    }
    return  <TouchableOpacity
        key={JSON.stringify(item)}
        onPress={() => {
          this.onSelect(item);
        }}
    >
        <Card>
          <CardItem style={{
          backgroundColor: '#eee'
        }}>
            <Left>
              <Body>
                <Text>{item}</Text>
              </Body>
            </Left>
            <Right>
              <View style={{
                marginRight: 10,
              }}>
                <CheckBox
                  onPress={() => {
                    this.onSelect(info);
                  }}
                  checked={JSON.stringify(item) === JSON.stringify(this.props.theme)} />
              </View>
            </Right>
          </CardItem>
          <CardItem
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              backgroundColor: '#eee'
            }}
            cardBody>
              {
                colos.map((item) => {
                  return (
                    <View key={JSON.stringify(item)}>
                      <Button rounded style={{
                        margin: 5,
                        marginHorizontal: 10,
                        width: 50,
                        height: 50,
                        backgroundColor: item.color,
                      }}/>
                      <Text style={{
                        textAlign: 'center',
                        fontSize: 10,
                        }}>
                          {item.name}
                      </Text>
                    </View>
                  )
                })
              }
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
    const list = Object.keys(themes) || [];
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
            <Header>
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
                <Title>主题列表</Title>
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

export default connect((state: ConnectState) => {
  return {
    theme: state.theme.theme,
  }
})(SelectThemeModalProvider)
