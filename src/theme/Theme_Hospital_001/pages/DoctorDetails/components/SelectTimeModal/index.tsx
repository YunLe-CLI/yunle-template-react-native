import React, { createContext } from 'react';
import {View, AppState, StatusBar, TouchableOpacity} from 'react-native';
import styles from './styles';
import Modal from "react-native-modal";
import _ from "lodash";
import FastImage from 'react-native-fast-image';

import {Tab, Tabs, Button, Text, Content, Header, Left, Icon, Body, Title, Right, List, ListItem, Container, Card, CardItem} from 'native-base';
import iconLeft from './assets/icon_left_slices/icon_left.png';
import logoImg from '../LoginModal/assets/logo_slices/pic_logo_s.png';
import {DOCTOR_ITEM, REGISTRATIONS_ITEM} from '@/theme/Theme_Hospital_001/services/api';
import {NavigationActions} from "react-navigation";
import moment from 'moment';

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
    tab: 0,
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
    const { select = {} } = this.state;
    const { appointment = {} } = this.props;
    const { registrations = [] } = appointment;
    const tableData1 = [];
    const tableData2 = [];
    registrations.forEach((item: REGISTRATIONS_ITEM) => {
      const { data = [] } = item;
      let NODE_AM = '';
      let NODE_PM = '';
      if (data && _.isArray(data) && data.length) {
        data.forEach((cItem) => {
          let NODE = undefined;
          if (cItem.timeslot === 1) {
            NODE_AM = ({
              ...cItem,
              timeslot: 1,
              date: item.date,
            });
          }
          if (cItem.timeslot === 2) {
            NODE_PM = ({
              ...cItem,
              timeslot: 2,
              date: item.date,
            });
          }
        })
      } else {
        NODE_AM = ({
          timeslot: 1,
          date: item.date,
        });
        NODE_PM = ({
          timeslot: 2,
          date: item.date,
        });
      }
      tableData1.push(NODE_AM);
      tableData2.push(NODE_PM);
      console.log(item, 222, 333);
    });


    return (
      <Modal
        coverScreen={false}
        useNativeDriver
        propagateSwipe
        isVisible={this.props.isModalVisible}
        onBackButtonPress={() => {
          this.props.onClose()
        }}
        onBackdropPress={() => {
          this.props.onClose()
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
            <ListItem style={{
              marginLeft: 0,
              height: 50,
            }}>
              <Left style={{
                flexGrow: 1,
              }}>
                <Button
                  transparent
                  onPress={() => {
                    this.props.onClose()
                  }}
                >
                  <Title style={{
                    color: '#999999',
                    fontSize: 15,
                    fontWeight: '400',
                  }}>返回</Title>
                </Button>
              </Left>
              <Body style={{
                flex: 1,
                flexGrow: 1,
              }}>
                <Title style={styles.title}>出诊信息</Title>
              </Body>
              <Right style={{
                flexGrow: 1,
              }}>
                <Button
                  transparent
                  onPress={() => {
                    this.props.onOk(select);
                  }}
                >
                  <Title style={{
                    color: '#F86358',
                    fontSize: 15,
                    fontWeight: '400',
                  }}>下一步</Title>
                </Button>
              </Right>
            </ListItem>
            <StatusBar barStyle="dark-content" />
            <View style={{ backgroundColor: '#F9FBFF' }}>
              <View style={{
                flexDirection: "row",
                height: 200,
              }}>
                <View>
                  <Button
                    transparent
                    style={[
                      {
                        paddingLeft: 0,
                        paddingRight: 0,
                        width: 64,
                        flexGrow: 1,
                      },
                      this.state.tab === 0 ? {
                        backgroundColor: '#FFEFEE'
                      } : {}
                    ]}
                    full
                    onPress={() => {
                      this.setState({
                        tab: 0,
                      });
                    }}
                  >
                    <Text style={{
                      color: '#4A4A4A',
                      fontSize: 12,
                    }}>上午</Text>
                  </Button>
                  <Button
                    transparent
                    style={[
                      {
                        paddingLeft: 0,
                        paddingRight: 0,
                        width: 64,
                        flexGrow: 1,
                      },
                      this.state.tab === 1 ? {
                        backgroundColor: '#FFEFEE'
                      } : {}
                    ]}
                    full
                    onPress={() => {
                      this.setState({
                        tab: 1,
                      });
                    }}
                  >
                    <Text style={{
                      color: '#4A4A4A',
                      fontSize: 12,
                    }}>下午</Text>
                  </Button>
                </View>
                <View>
                  <Tabs page={this.state.tab} renderTabBar={() => <View />} tabBarPosition={"bottom"}>
                    <Tab heading="Tab1">
                      <Content>
                        <List>
                          {
                            tableData1.map((item) => {
                              console.log(item, 333)
                              return <ListItem
                                key={JSON.stringify(item)}
                                style={{
                                  marginLeft: 0,
                                  height: 50,
                                    paddingHorizontal: 25,
                                }}
                                button
                                onPress={() => {
                                  this.setState({
                                    select: item,
                                  })
                                }}
                              >
                                <Text style={[
                                  styles.font,
                                  JSON.stringify(item) === JSON.stringify(select) ? {
                                    color: '#F86358'
                                  } : {}
                                ]}>
                                  {`${moment(item.date).format('MM-DD')}`}
                                </Text>
                                <Text style={[
                                  styles.font,
                                  JSON.stringify(item) === JSON.stringify(select) ? {
                                    color: '#F86358'
                                  } : {}
                                ]}>
                                  周三
                                </Text>
                                <View>
                                  {
                                    item.remainCount > 0 ? (<Text style={[styles.font, JSON.stringify(item) === JSON.stringify(select) ? {
                                      color: '#F86358'
                                    } : {}]}>剩余{item.remainCount}</Text>) : undefined
                                  }
                                  {
                                    item.remainCount=== 0 ? (<Text style={[styles.font, styles.end, JSON.stringify(item) === JSON.stringify(select) ? {
                                      color: '#F86358'
                                    } : {}]}>挂满</Text>) : undefined
                                  }
                                  {
                                    item.remainCount !== 0 && !item.remainCount ? (<Text style={[styles.font, styles.end, JSON.stringify(item) === JSON.stringify(select) ? {
                                      color: '#F86358'
                                    } : {}]}>挂满</Text>) : undefined
                                  }
                                </View>
                              </ListItem>
                            })
                          }
                        </List>
                      </Content>
                    </Tab>
                    <Tab heading="Tab2">
                      <Content>
                        {
                          tableData2.map((item) => {
                            return <ListItem
                              key={JSON.stringify(item)}
                              style={{
                                marginLeft: 0,
                                height: 50,
                                paddingHorizontal: 25,
                              }}
                              button
                              onPress={() => {
                                this.setState({
                                  select: item,
                                })
                              }}
                            >
                              <Text style={[styles.font]}>
                                {`${moment(item.date).format('MM-DD')}`}
                              </Text>
                              <Text style={[
                                styles.font,
                                JSON.stringify(item) === JSON.stringify(select) ? {
                                  color: '#F86358'
                                } : {}
                              ]}>
                                周三
                              </Text>
                              <View>
                                {
                                  item.remainCount > 0 ? (<Text style={[styles.font, styles.start]}>剩余{item.remainCount}</Text>) : undefined
                                }
                                {
                                  item.remainCount=== 0 ? (<Text style={[styles.font, styles.end]}>挂满</Text>) : undefined
                                }
                                {
                                  item.remainCount !== 0 && !item.remainCount ? (<Text style={[styles.font, styles.end]}>挂满</Text>) : undefined
                                }
                              </View>
                            </ListItem>
                          })
                        }
                      </Content>
                    </Tab>
                  </Tabs>
                </View>
              </View>
            </View>
          </Container>
        </View>
      </Modal>
    );
  }
}

export default SelectDoctorModalProvider
