import React, { createContext } from 'react';
import {View, AppState, StatusBar} from 'react-native';
import styles from './styles';
import Modal from "react-native-modal";
import _ from "lodash";
import FastImage from 'react-native-fast-image';

import {Button, Text, Content, Header, Left, Icon, Body, Title, Right, List, ListItem, Container, Card, CardItem} from 'native-base';
import icon from './assets/icon_lineup_slices/icon_lineup.png';
import LinearGradient from "react-native-linear-gradient";
import {NavigationActions} from "react-navigation";
import iconLeft from './assets/icon_left_slices/icon_left.png';
import logoImg from '@/components/LoginModal/assets/logo_slices/pic_logo_s.png';

export const SelectDoctorModalContext = createContext({
  handleShowSelectDoctorModal: () => {}
})
export const SelectDoctorModalConsumer = SelectDoctorModalContext.Consumer

export function withSelectDoctorModal(WrappedComponent: React.ReactNode) {
  return class extends React.Component {
    render() {
      return <>
        <SelectDoctorModalConsumer>
          {
            ({ handleShowSelectDoctorModal }) => {
              return <WrappedComponent  {...this.props} handleShowSelectDoctorModal={handleShowSelectDoctorModal} />
            }
          }
        </SelectDoctorModalConsumer>
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
class SelectDoctorModalProvider extends React.Component<{}, IState> {

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
      '王医生',
      '李医生',
    ]
    return (
      <SelectDoctorModalContext.Provider value={{
        handleShowSelectDoctorModal: async (onCallBack) => {
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
                <Title style={styles.title}>医生列表</Title>
              </Body>
              <Right />
            </Header>
            <StatusBar barStyle="dark-content" />
            <Content style={{ backgroundColor: '#F9FBFF' }}
                     contentContainerStyle={{
                       padding: 16,
                     }}
            >
              <Card noShadow style={styles.card}>
                {
                  list.map((item) => {
                    const { selected } = this.state;
                    const isSelect = JSON.stringify(item) === JSON.stringify(selected)
                    return <CardItem
                      button
                      onPress={async () => {
                        this.setState({
                          selected: item,
                        }, () => {
                          if (this.onCallBack) {
                            this.onCallBack(item);
                          }
                          this.closeModel();
                        })
                      }}
                      key={JSON.stringify(item)}>
                        <Left>
                          <FastImage
                            style={{
                              width: 48,
                              height: 48,
                              marginRight: 16,
                              borderRadius: 24,
                              alignContent: 'center',
                              justifyContent: 'center',
                            }}
                            source={logoImg}
                            resizeMode={FastImage.resizeMode.contain}
                          />
                          <Body>
                            <View style={styles.itemHeader}>
                              <Text style={styles.nameText}>
                                {item}
                              </Text>
                              <Text style={[styles.note, styles.span]}>
                                主任医师
                              </Text>
                            </View>

                            <Text style={styles.note}>河南开封中心医院 皮肤科</Text>
                            <Text  style={[styles.note, styles.strong]}>擅长：皮炎湿疹皮炎湿疹皮炎湿疹皮炎湿疹…</Text>
                          </Body>
                        </Left>
                      </CardItem>
                  })
                }
              </Card>
            </Content>
          </Container>
        </Modal>
      </SelectDoctorModalContext.Provider>
    );
  }
}

export default SelectDoctorModalProvider
