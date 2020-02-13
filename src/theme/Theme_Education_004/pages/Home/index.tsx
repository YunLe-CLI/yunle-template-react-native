import React from 'react';
import {TouchableOpacity, Dimensions, ImageBackground, NativeModules, SectionList, StatusBar, View} from 'react-native';
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
  Picker,
} from 'native-base';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';
import moment from 'moment';
import styles from './styles';
import {NavigationActions, NavigationEvents} from 'react-navigation';
import Oval from './assets/Oval_slices/Oval.png'
import icon_myorder_default_slices from './assets/icon_myorder_default_slices/icon_jrkc_active.png';
import icon_myorder_active_slices from './assets/icon_myorder_active_slices/icon_jrkc_active.png';
import icon_register_default_slices from './assets/icon_register_default_slices/icon_qbkc_default.png';
import icon_register_active_slices from './assets/icon_register_active_slices/icon_qbkc_default.png';
import icon_jxz_slices from './assets/icon_jxz_slices/icon_jxz.png';
import icon_wks_slices from './assets/icon_wks_slices/icon_wks.png';
import icon_yjs_slices from './assets/icon_yjs_slices/icon_yjs.png';

import LinearGradient from "react-native-linear-gradient";

import { withGoToRoomModal } from '../../components/GoToRoomModal';

import { today_courses, mine_courses, signins } from '../../services/api';

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
        const { nextId, kickId } = res.data;
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
    const { coursewares = {}, teacher = {}, status, signin } = data;
    const type = status; // (-1-取消 1-进行 2-未开始 3-结束)
    const check = signin ? 1 : 0;
    return (
      <LinearGradient
        start={{x: 1, y: 0}} end={{x: 1, y: 1}}
        colors={['#151641', '#151641']}
        key={JSON.stringify(data)}
        style={[
          styles.itemBox,
        ]}
      >
        <View style={styles.itemBox_2}>
          <TouchableOpacity
            onPress={() => {
              this.props.dispatch(NavigationActions.navigate({
                routeName: 'Room',
                params: {
                  metaData: data.metaData,
                },
              }))
            }}
            style={{ flex: 1, flexDirection: 'row' }}>
            <Text numberOfLines={1} style={styles.timeText}>{moment(data.startTime).format('YYYY-MM-DD')} </Text>
            <Text numberOfLines={1} style={styles.timeText}>
              {moment(data.startTime).format('HH:mm')}
              -
              {moment(data.endTime).format('HH:mm')}
            </Text>
          </TouchableOpacity>
          <View style={[styles.typeWrap,
            {
              // justifyContent: 'center',
              alignItems: 'center',
            }
          ]}>
            <Text style={[styles.checkText,
              check === 1 ? styles.checkEndText : {}]}>
              { check === 1 ? '已签到' : undefined }
              { check !== 1 ? '未签到' : undefined }
            </Text>
            <Text style={[styles.type,
              type === -1 ? styles.typeWrap_0 : {},
              type === 1 ? styles.typeWrap_1 : {},
              type === 2 ? styles.typeWrap_2 : {},
              type === 3 ? styles.typeWrap_3 : {},
            ]}>
              /{type === -1 ? '课程未开始' : ''}
              {type === 1 ? '课程正在进行' : ''}
              {type === 2 ? '课程未开始' : ''}
              {type === 3 ? '课程已结束' : ''}
            </Text>
          </View>
        </View>
        <View style={styles.itemBox_3}>
          <View style={{
            flex: 1, flexGrow: 1,
            flexDirection: 'row',
          }}>
            <View style={{ flex: 1, flexDirection: 'row', }}>
              <Text numberOfLines={1} style={styles.titleText}>
                {data.title}
                <Text style={styles.nameText}>  {teacher.userName}</Text>
              </Text>

            </View>
          </View>
        </View>
        <View style={styles.itemBox_4}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
          }} >
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
                <Text style={styles.btnText}>课程文件</Text>
              </Button>
            </View>
            <View style={{ width: 16 }} />
            {
              type !== 3 ? (
                <View style={[styles.btnWrap]}>
                  <LinearGradient
                    start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                    colors={['#5652E7', '#4A48FF']}
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
                            metaData: data.metaData,
                          },
                        }))
                      }}
                    >
                      <Text style={[styles.btnText, { color: '#fff' }]}>进入直播间</Text>
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
                    colors={['#5652E7', '#4A48FF']}
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
                            playbackURL: data.playbackURL
                          },
                        }))
                      }}
                    >
                      <Text style={[styles.btnText, { color: '#fff' }]}>回放视频</Text>
                    </Button>
                  </LinearGradient>
                </View>
              ) : undefined
            }
          </View>
        </View>
      </LinearGradient>
    )
  }

  allInfo = () => {
    const { siginInfo } = this.state;
    return <LinearGradient
      start={{x: 1, y: 0}} end={{x: 1, y: 1}}
      colors={['#151641', '#151641']}
      style={styles.allInfoWrap}
    >
      <View style={styles.allInfoItem}>
        <View>
          <Text numberOfLines={1} style={styles.allInfoTitle}>累计上课数量: </Text>
        </View>
        <View>
          <Text numberOfLines={1} style={styles.allInfoNum}>{siginInfo.courseCount || 0}</Text>
        </View>

      </View>
      <View style={{
        width: 1,
        height: 20,
        backgroundColor:'#fff'
      }}></View>
      <View style={styles.allInfoItem}>
        <View>
          <Text numberOfLines={1} style={styles.allInfoTitle}>累计出勤率: </Text>
        </View>
        <View>
          <Text numberOfLines={1} style={styles.allInfoNum}>{siginInfo.finishedCount || 0}%</Text>
        </View>
      </View>
    </LinearGradient>
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
        backgroundColor: 'transparent',
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
        return <View style={{ marginBottom: 25, }}>
          {type === '全部课程' ? this.allInfo() : undefined}
        </View>
      }}
      sections={list || []}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      ListEmptyComponent={() => {
        return <View />
      }}
      keyExtractor={(item, index) => JSON.stringify(item)}
      renderSectionFooter={() => <View><View style={{ height: 20 }} /></View>}
    />
  }

  render() {
    const { active } = this.state;
    const { user = {} } = this.props;
    return (
      <Container style={styles.container}>
        <StatusBar barStyle="light-content" />
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
          {
            width: Dimensions.get('window').width,
          },
        ]}>
          <ImageBackground
            style={{
              width: Dimensions.get('window').width,
              height: 200,
              alignContent: 'center',
              justifyContent: 'center',
            }}
            source={require('./assets/header_bg/bg.png')}>
            <View style={styles.headerContent}>
              <View style={[styles.userWrap, { width: Dimensions.get('window').width }]}>
                <FastImage
                  style={{
                    width: 86,
                    height: 86,
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}
                  source={require('./assets/avatar_slices/avatar.png')}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={styles.userName}>
                  {user.username || '游客'}
                </Text>
              </View>
            </View>
          </ImageBackground>

        </View>
        <Segment style={styles.segment}>
          <LinearGradient
            start={{x: 0, y: 0}} end={{x: 1, y: 1}}
            colors={['#5652E7', '#4A48FF']}
            style={[
              styles.segmentBtn,
              {
                opacity: this.state.active === 0 ? 1 : 0.4
              }
            ]}
          >
            <Button
              onPress={() => {
                this.setState({
                  active: 0,
                })
              }}
              style={styles.segmentBtn} full first><Text style={styles.segmentBtnText}>今日课程</Text></Button>
          </LinearGradient>
          <LinearGradient
            start={{x: 0, y: 0}} end={{x: 1, y: 1}}
            colors={['#5652E7', '#4A48FF']}
            style={[
              styles.segmentBtn,
              {
                opacity: this.state.active === 1 ? 1 : 0.4
              }
            ]}
          >
            <Button
              onPress={() => {
                this.setState({
                  active: 1,
                })
              }}
              style={styles.segmentBtn} full last><Text  style={styles.segmentBtnText}>全部课程</Text></Button>
          </LinearGradient>
        </Segment>
        <View
          style={{
            flex: 1,
            flexGrow: 1,
            overflow: 'hidden',
            backgroundColor: 'transparent',
          }}
        >
          <Tabs
            style={{
              flexGrow: 1,
              backgroundColor: 'transparent',
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
                backgroundColor: 'transparent',
              }}
              heading="1">
              {this.renderTabList("今日课程")}
            </Tab>
            <Tab
              style={{
                backgroundColor: 'transparent',
              }}
              heading="2">
              {this.renderTabList("全部课程")}
            </Tab>
          </Tabs>
        </View>
      </Container>
    );
  }
}
export default withGoToRoomModal(Home);
