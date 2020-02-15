import React from 'react';
import { SafeAreaView, TouchableOpacity, Dimensions, ImageBackground, NativeModules, SectionList, TouchableOpacityComponent, View} from 'react-native';
import { connect } from 'react-redux';
import {
  Card,
  CardItem,
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Content,
  Button,
  Text,
  Footer,
  FooterTab,
  Input, Icon,
  Segment,
  Tabs,
  Tab,
  Picker, List, ListItem,
} from 'native-base';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';
import moment from 'moment';
import styles from './styles';
import {NavigationActions, NavigationEvents} from 'react-navigation';
import LinearGradient from "react-native-linear-gradient";

import { withGoToRoomModal } from '../../components/GoToRoomModal';

import { today_courses, mine_courses, signins } from '../../services/api';
import Oval from './assets/Oval.png';
import Modal from 'react-native-modal';

const { MainViewController = {} } = NativeModules || {};
const { SDKLeaveRoom } = MainViewController || {};

export interface IProps {}

export interface IState {
  refreshing: boolean;
  segmentActive: number;
  department: undefined | string,
  level: undefined | string,
  today: Array<MAKE_ITEM>;
  registrations: Array<MAKE_ITEM>,
}

let TEST_NNN = 0;

@(connect(({ user = {} }) => {
  return {
    user: user.info || {},
  }
}) as any)
class Home extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.componentDidMount = _.debounce(this.componentDidMount, 800);
    this._onRefresh = _.debounce(this._onRefresh, 800);
    this._onRefresh = this._onRefresh.bind(this);
  }

  state = {
    refreshing: false,
    active: 0,
    segmentActive: 0,
    department: undefined,
    level: undefined,
    todayCourses: [],
    allCourses: [],
    siginInfo: {},
    isModalVisible: false,
  };
  setIntervalEvent: any = undefined;
  async componentDidMount() {
    await this._onRefresh()
    if (this.setIntervalEvent) {
      clearTimeout(this.setIntervalEvent);
      this.setIntervalEvent = undefined;
    }
    TEST_NNN += 1;
    console.log('TEST_NNN', TEST_NNN);
    this.setIntervalEvent = setInterval(() => {
      this.componentDidMount()
    }, 1000 * 60)
  }

  componentWillUnmount(): void {
    if (this.setIntervalEvent) {
      clearTimeout(this.setIntervalEvent);
      this.setIntervalEvent = undefined;
    }
  }

  async getIsMe(item: MAKE_ITEM) {
    try {
      const { id } = this.props.user;
      const res = await ROOM_MESSAGE({ mettingNo: item.metaData.MeetingNo  })
      if (res.code === 0) {
        const { nextId, kickId } = res.data || {};
        if (id === nextId) {
          this.props.handleShowGoToRoomModal(item)
        }
        if (kickId === id) {
          // 离开房间
          SDKLeaveRoom();
          alert('已完成')
        }
      }
    } catch (e) {

      // alert('已完成')
      // alert(e)
    }
  }

  async _onRefresh() {
    this.setState({
      refreshing: true,
    });
    try {
      await this.today_courses();
      await this.mine_courses();
    } catch (e) {
      alert(e)
    } finally {
      this.setState({
        refreshing: false,
      });
    }
  }
  async today_courses() {
    const res = await today_courses({});
    console.log('today_courses', res)
    if (res.code === 0) {
      const { data = [{}] } = res;
      this.setState({
        todayCourses: data,
      })
    }
  }

  async mine_courses() {
    const res = await mine_courses({});
    console.log('mine_courses', res)
    if (res.code === 0) {
      const { docs = [{}], siginInfo = {} } = res.data;
      this.setState({
        allCourses: docs,
        siginInfo
      })
    }
  }

  async signins(courseId: string) {
    try {
      const res = await signins({courseId});
      console.log('mine_courses', res)
    } catch (e) {
  
    } finally {
        await this.today_courses();
        await this.mine_courses();
    }
  }


  renderItem = (data: Courses) => {
    const { coursewares = {}, teacher = {}, status, signin, playbackURL } = data;
    const type = status; // (-1-取消 1-进行 2-未开始 3-结束)
    const check = signin ? 1 : 0;
    let bg = undefined;
    switch (type) {
      case -1:{
        bg = require('./assets/type_2/2.png')
        break;
      }
      case 1:{
        bg = require('./assets/type_1/1.png')
        break;
      }
      case 2:{
        bg = require('./assets/type_2/2.png')
        break;
      }
      case 3:{
        bg = require('./assets/type_3/3.png')
        break;
      }
      default: {
        bg = require('./assets/type_2/2.png')
      }
    }
    return (
      <View key={JSON.stringify(data)} style={styles.itemBox}>
        <ImageBackground source={bg}
                         style={{
                           height: 24,
                         }}
                         imageStyle={{
                           width: 71,
                           height: 24,
                         }}
        >
          <View style={[styles.itemBox_1, {
            flexDirection: 'row',
            flexGrow: 1,
            justifyContent: 'space-between'
          }]}>
            <View style={[styles.typeWrap,]}>
              <Text style={styles.type}>
                {type === -1 ? '未开始' : ''}
                {type === 1 ? '进行中' : ''}
                {type === 2 ? '未开始' : ''}
                {type === 3 ? '已结束' : ''}
              </Text>
            </View>
            <Button
              transparent
              style={[styles.checkWrap,
                check === 1 ? styles.checkEndWrap : {}]}
              onPress={() => this.signins(data.id)}
            >
              <Text style={[styles.checkText,
                check === 1 ? styles.checkEndText : {}]}>
                { check === 1 ? '已签到' : undefined }
                { check !== 1 ? '未签到' : undefined }
              </Text>
            </Button>
          </View>
        </ImageBackground>
        <View style={{
          flexDirection: 'row',
          paddingHorizontal: 16,
          marginTop: 10,
        }}>
          <View style={{
            flexGrow: 1,
          }}>
            <View style={styles.itemBox_2}>
              <View style={{
                flex: 1, flexGrow: 1,
                flexDirection: 'row',
              }}>
                <View style={{ flex: 1, flexGrow: 1, }}>
                  <Text numberOfLines={1} style={styles.titleText}>
                    {data.title}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.itemBox_3}>
              <TouchableOpacity
                onPress={() => {
                  this.props.dispatch(NavigationActions.navigate({
                    routeName: 'Room',
                    params: {
                      id: data.id, metaData: data.metaData,
                    },
                  }))
                }}
                style={{ flex: 1, flexGrow: 1, }}>
                <Text numberOfLines={1} style={styles.timeText}>
                  <Text numberOfLines={1} style={styles.timeText}>{moment(data.startTime).format('YYYY-MM-DD')} </Text>
                  {moment(data.startTime).format('HH:mm')}
                  -
                  {moment(data.endTime).format('HH:mm')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.itemBox_3, {
              flexDirection: 'row',
              alignItems: 'center',
            }]}>
              <FastImage
                style={{
                  marginRight: 8,
                  width: 24,
                  height: 24,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
                source={require('./assets/u_slices/u.png')}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={styles.nameText}>{teacher.userName}</Text>
            </View>
          </View>
          <View>
            <View style={styles.itemBox_4}>
              {
                type !== 3 && type !== 1 ? (
                  <View style={[styles.btnWrap]}>
                    <LinearGradient
                      start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                      colors={['#C6CCD8', '#C6CCD8']}
                      style={[
                        styles.linearGradientBtn,
                        {
                          opacity: type === 1 ? 1 : 0.4
                        }
                      ]}
                    >
                      <Button
                        style={[styles.btnContent, { borderWidth: 0, }]}
                        rounded transparent
                        onPress={() => {
                          // this.signins(data.id);
                          // this.props.dispatch(NavigationActions.navigate({
                          //   routeName: 'Room',
                          //   params: {
                          //     id: data.id, metaData: data.metaData,
                          //   },
                          // }))
                        }}
                      >
                        <Text style={[styles.btnText, { color: '#fff' }]}>开始上课</Text>
                      </Button>
                    </LinearGradient>
                  </View>
                ) : undefined
              }
              {
                type === 1 ? (
                  <View style={[styles.btnWrap]}>
                    <LinearGradient
                      start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                      colors={['#FE3D00', '#FE3D00']}
                      style={[
                        styles.linearGradientBtn,
                        {
                          opacity: type === 1 ? 1 : 0.4
                        }
                      ]}
                    >
                      <Button
                        style={[styles.btnContent, { borderWidth: 0, }]}
                        rounded transparent
                        onPress={() => {
                          this.signins(data.id);
                          this.props.dispatch(NavigationActions.navigate({
                            routeName: 'Room',
                            params: {
                              id: data.id, metaData: data.metaData,
                            },
                          }))
                        }}
                      >
                        <Text style={[styles.btnText, { color: '#fff' }]}>开始上课</Text>
                      </Button>
                    </LinearGradient>
                  </View>
                ) : undefined
              }
              {
                type === 3 ? (
                  <View style={[styles.btnWrap]}>
                    <LinearGradient
                      start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                      colors={['#FE3D00', '#FE3D00']}
                      style={[
                        styles.linearGradientBtn,
                      ]}
                    >
                      <Button
                        style={[styles.btnContent, { borderWidth: 0, }]}
                        rounded transparent
                        onPress={async () => {
                          this.props.dispatch(NavigationActions.navigate({
                            routeName: 'VideoBack',
                            params: {
                              title: data.title,
                              playbackURL: playbackURL
                            },
                          }))
                        }}
                      >
                        <Text style={[styles.btnText, { color: '#fff' }]}>观看回放</Text>
                      </Button>
                    </LinearGradient>
                  </View>
                ) : undefined
              }
              <View style={{ height: 16 }} />
              <View style={styles.btnWrap}>
                <Button
                  transparent
                  style={styles.btnContent}
                  onPress={() => {
                    this.props.dispatch(NavigationActions.navigate({
                      routeName: 'Assets',
                      params: {
                        title: data.title,
                        coursewares
                      },
                    }))
                  }}
                >
                  <Text style={styles.btnText}>文件管理</Text>
                </Button>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }

  allInfo = () => {
    const { siginInfo } = this.state;
    return <TouchableOpacity
      onPress={() => {
        this.showModel()
      }}
      style={styles.allInfoWrap}>
      <View style={styles.allInfoItem}>
        <View>
          <Text numberOfLines={1} style={styles.allInfoTitle}>课程筛选 </Text>
        </View>
        <View style={{
          flexGrow: 1,
        }}>
          <Text numberOfLines={1} style={styles.allInfoNum}>
            {this.state.active === 0 ? '今日课程' : '全部课程'}
          </Text>
        </View>
        <View>
          <Icon style={{
            fontSize: 14,
            color: '#000000'
          }} name="arrow-forward" />
        </View>
      </View>
    </TouchableOpacity>
  }

  renderTabList(type) {
    const { todayCourses, allCourses } = this.state;

    const todayList = {
      title: "今日预约",
      data: todayCourses,
    };
    const registrationsList = {
      title: "全部预约",
      data: allCourses,
    };
    let list = []
    if (type === '今日课程') {
      list = [
        todayList,
      ]
    }
    if (type === '全部课程') {
      list = [
        registrationsList,
      ]
    }
    return <SectionList
      style={{
        flexGrow: 1,
        backgroundColor: '#F9F9F9'
      }}
      contentContainerStyle={{
        // paddingHorizontal: 16,
      }}
      stickySectionHeadersEnabled
      onEndReachedThreshold={0.3}
      refreshing={this.state.refreshing}
      onRefresh={this._onRefresh}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index, section }) => {
        if (item === 'MSG') {
          return this.allInfo()
        }
        return <View key={JSON.stringify(item)}>
          {this.renderItem(item)}
        </View>
      }}
      renderSectionHeader={({ section: { title } }) => {
        return <View></View>
      }}
      sections={list || []}
      ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
      ListEmptyComponent={() => {
        return <View />
      }}
      keyExtractor={(item, index) => JSON.stringify(item)}
      renderSectionFooter={() => <View><View style={{ height: 20 }} /></View>}
    />
  }

  showModel = () => {
    this.setState({
      isModalVisible: true,
    });
  };

  closeModel = () => {
    this.setState({
      isModalVisible: false,
    })
  };


  render() {
    const { active } = this.state;
    const { user = {} } = this.props;
    return (
      <Container style={styles.container}>
        <NavigationEvents
            onWillFocus={async payload => {
              try {
                const { navigation, exams } = this.props;
                const { params = {} } = navigation.state;
                if (_.isNumber(params.active)) {
                  this.setState({
                    active: params.active
                  })
                }
              } catch (e) {

              }
              await this.componentDidMount();
            }}
            onDidFocus={async payload => {

            }}
            onWillBlur={payload => {
              this.componentWillUnmount()
            }}
            onDidBlur={payload => {

            }}
        />
        <View style={[
          styles.header,
        ]}>
          <ImageBackground
            style={{
              width: Dimensions.get('window').width,
              height: 174,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            source={require('./assets/bg/bg.png')}
          >
            <View style={[styles.userWrap, { width: Dimensions.get('window').width }]}>
              <FastImage
                style={{
                  width: 65,
                  height: 65,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
                source={Oval}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={styles.userName}>
                {user.userName || '游客'}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View
          style={{
            flex: 1,
            flexGrow: 1,
            overflow: 'hidden',
            backgroundColor: '#F9FBFF',
          }}
        >
          { this.allInfo()}
          <Tabs
            style={{
              flexGrow: 1,
            }}
            page={active}
            renderTabBar={() => <View />}
            onChangeTab={({i}) => {
              this.setState({
                active: i
              })
            }}
          >
            <Tab
              style={{
              }}
              heading="1">
              {this.renderTabList("今日课程")}
            </Tab>
            <Tab
              style={{
              }}
              heading="2">
              {this.renderTabList("全部课程")}
            </Tab>
          </Tabs>
        </View>
        <Modal
          coverScreen={false}
          useNativeDriver
          propagateSwipe
          isVisible={this.state.isModalVisible}
          onBackButtonPress={() => {
            this.closeModel()
          }}
          onBackdropPress={() => {
            this.closeModel()
          }}
          style={{
            margin: 0,
            alignSelf: 'flex-end',
            width: '100%',
            justifyContent: 'flex-end',
          }}
        >
          <View style={styles.datePickerWrap}>
              <List>
                <ListItem
                style={[{marginLeft: 0,}]}
                 noBorder>
                  <Body style={{
                    flexGrow: 1,
                  }}>
                    <Text style={{
                      fontSize: 16,
                      color: '#192038',
                      textAlign: 'center',
                      lineHeight: 28,
                    }}>
                      课程筛选
                    </Text>
                  </Body>
                </ListItem>
                <ListItem
                  noBorder
                  button
                  style={[{marginLeft: 0,}, this.state.active === 0 ? { backgroundColor: '#F8F6F9' } : {}]}
                  onPress={() => {
                    this.setState({
                      active: 0,
                    }, this.closeModel)
                  }}
                >
                  <Body style={{
                    flexGrow: 1,
                  }}>
                    <Text style={{
                      fontSize: 16,
                      color: '#192038',
                      textAlign: 'center',
                      lineHeight: 28,
                    }}>
                      今日课程
                    </Text>
                  </Body>
                </ListItem>
                <ListItem
                  noBorder
                  button
                  style={[{marginLeft: 0,}, this.state.active === 1 ? { backgroundColor: '#F8F6F9' } : {}]}
                  onPress={() => {
                    this.setState({
                      active: 1,
                    }, this.closeModel)
                  }}
                >
                  <Body style={{
                    flexGrow: 1,
                  }}>
                    <Text style={{
                      fontSize: 16,
                      color: '#192038',
                      textAlign: 'center',
                      lineHeight: 28,
                    }}>
                      全部课程
                    </Text>
                  </Body>
                </ListItem>
              </List>
              <SafeAreaView />
            </View>
        </Modal>
      </Container>
    );
  }
}
export default withGoToRoomModal(Home);
