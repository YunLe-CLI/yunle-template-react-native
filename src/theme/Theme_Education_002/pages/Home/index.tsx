import React from 'react';
import {TouchableOpacity, Dimensions, ImageBackground, NativeModules, SectionList, View} from 'react-native';
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
import home_bg_slices from './assets/home_bg_slices/home_bg.png'
import userImg from './assets/Oval_slices/Oval.png'
import icon_myorder_default_slices from './assets/icon_myorder_default_slices/icon_jrkc_active.png';
import icon_myorder_active_slices from './assets/icon_myorder_active_slices/icon_jrkc_active.png';
import icon_register_default_slices from './assets/icon_register_default_slices/icon_qbkc_default.png';
import icon_register_active_slices from './assets/icon_register_active_slices/icon_qbkc_default.png';
import Oval from './assets/Oval.png';
import activeImg from './assets/active_slices/active.png';

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
        const { nextId, kickId } = res.data || {};
        if (id === nextId) {
          this.props.handleShowGoToRoomModal(item)
        }
        if (nextId !== id) {
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
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}
        >
          <View
            style={[
              {
                minWidth: 128,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
                backgroundColor: 'rgba(109,212,0,0.1)',
                borderBottomLeftRadius: 8,
              },
              check === 1 ? {
                backgroundColor: 'rgba(109,212,0,0.1)',
              } : {
                backgroundColor: 'rgba(50,197,255,0.1)',
              }
            ]}
          >
            <FastImage
              style={{
                width: 12,
                height: 12,
                marginLeft: 10,
                marginRight: 4,
                alignContent: 'center',
                justifyContent: 'center',
              }}
              source={check === 1 ? require('./assets/icon-succeed/icon-succeed.png') : require('./assets/icon-wait/icon-wait.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={[styles.checkText,
              check === 1 ? {
                color: '#6DD400'
              } : {
                color: '#7F8694'
              }]}>
              { check === 1 ? '已签到' : undefined }
              { check !== 1 ? '未签到' : undefined }
            </Text>
            <View style={styles.itemBox_1}>
              <View style={[styles.typeWrap,
                type === -1 ? { backgroundColor: '#32C5FF' } : {},
                type === 1 ? { backgroundColor: '#6DD400' } : {},
                type === 2 ? { backgroundColor: '#32C5FF' } : {},
                type === 3 ? { backgroundColor: '#7F8694' } : {},
              ]}>
                <Text style={styles.type}>
                  {type === -1 ? '未开始' : ''}
                  {type === 1 ? '进行中' : ''}
                  {type === 2 ? '未开始' : ''}
                  {type === 3 ? '已结束' : ''}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{
          flexDirection: 'row',
          paddingHorizontal: 16,
          marginTop: 10,
        }}>
          <View style={{
            flexGrow: 1,
          }}>
            <View style={{
              flexDirection: 'row',
            }}>
              <FastImage
                style={{
                  marginRight: 13,
                  width: 74,
                  height: 84,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
                source={require('./assets/image_slices/image_slices.png')}
                resizeMode={FastImage.resizeMode.contain}
              />
              <View>
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
                      this.signins(data.id);
                      this.props.dispatch(NavigationActions.navigate({
                        routeName: 'Room',
                        params: {
                          id: data.id, metaData: data.metaData,
                        },
                      }))
                    }}
                    style={{ flex: 1, flexGrow: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <FastImage
                      style={{
                        width: 16,
                        height: 16,
                        marginRight: 8,
                        alignContent: 'center',
                        justifyContent: 'center',
                      }}
                      source={require('./assets/icon-time/icon-time.png')}
                      resizeMode={FastImage.resizeMode.contain}
                    />
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
                  marginTop: 8,
                  alignItems: 'center',
                }]}>
                  <FastImage
                    style={{
                      marginRight: 8,
                      width: 20,
                      height: 20,
                      alignContent: 'center',
                      justifyContent: 'center',
                    }}
                    source={require('./assets/u_slices/u.png')}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                  <Text style={styles.nameText}>{teacher.userName}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.itemBox_4}>
          <View style={styles.btnWrap}>
            <Button
              transparent
              style={[styles.btnContent, {
                borderColor: '#F6F9FB',
                backgroundColor: '#F6F9FB'
              }]}
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
              <Text style={[styles.btnText, { color: '#00BCCA' }]}>查看课件</Text>
            </Button>
          </View>
          <View style={{ width: 16 }} />
          {
            type !== 3 ? (
              <View style={[styles.btnWrap]}>
                <LinearGradient
                  start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                  colors={type === 1 ? ['#00BCCA', '#00BCCA'] : ['#D0D5D8', '#D0D5D8']}
                  style={[
                    styles.linearGradientBtn,
                    {
                      opacity: type === 1 ? 1 : 0.4
                    }
                  ]}
                >
                  <Button
                    style={[styles.btnContent, { borderWidth: 0, }]}
                    transparent
                    onPress={() => {
                      this.props.dispatch(NavigationActions.navigate({
                        routeName: 'Room',
                        params: {
                          id: data.id, metaData: data.metaData,
                        },
                      }))
                    }}
                  >
                    <Text style={[styles.btnText, { color: '#fff' }]}>进入教室</Text>
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
                  colors={['#03EEF6', '#00BCCA']}
                  style={[
                    styles.linearGradientBtn,
                  ]}
                >
                  <Button
                    style={[styles.btnContent, { borderWidth: 0, }]}
                    transparent
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
                    <Text style={[styles.btnText, { color: '#fff' }]}>课程回放</Text>
                  </Button>
                </LinearGradient>
              </View>
            ) : undefined
          }
        </View>
      </View>
    )
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
        paddingHorizontal: 16,
      }}
      stickySectionHeadersEnabled
      onEndReachedThreshold={0.3}
      refreshing={this.state.refreshing}
      onRefresh={this._onRefresh}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index, section }) => {
        return <View key={JSON.stringify(item)}>
          {this.renderItem(item)}
        </View>
      }}
      renderSectionHeader={({ section: { title } }) => {
        return <Text />
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
    const { active, siginInfo = {} } = this.state;
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
          {
            marginTop: 32,
          }
        ]}>
          <View style={[styles.userWrap]}>
            <FastImage
              style={{
                width: 24,
                height: 24,
                marginRight: 8,
                alignContent: 'center',
                justifyContent: 'center',
              }}
              source={Oval}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={styles.userName}>
              {user.userName || '游客'}
            </Text>
            <Text style={[styles.userName, {
              flexGrow: 1,
              textAlign: 'right',
            }]}>
              学生上课数：{siginInfo.finishedCount || 0}
            </Text>
          </View>
        </View>
        <View style={styles.footerWrap}>
          <FooterTab style={{
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Button
              onPress={() => {
                this.setState({
                  active: 0,
                })
              }}
              full style={styles.btnTab}>
              {
                active === 0 ? (
                  <FastImage
                    style={{
                      marginLeft: -53,
                      width: 29,
                      height: 29,
                      alignContent: 'center',
                      justifyContent: 'center',
                    }}
                    source={active === 0 ? activeImg : activeImg}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                ) : undefined
              }
              <Text style={[styles.btnTabText, active === 0 ? styles.activeBtnTabText : {}]}>今日课程</Text>
            </Button>
            <Button
              onPress={() => {
                this.setState({
                  active: 1,
                })
              }}
              full style={styles.btnTab}>
              {
                active === 1 ? (
                  <FastImage
                    style={{
                      marginLeft: -53,
                      width: 29,
                      height: 29,
                      alignContent: 'center',
                      justifyContent: 'center',
                    }}
                    source={active === 0 ? activeImg : activeImg}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                ) : undefined
              }
              <Text style={[styles.btnTabText, active === 1 ? styles.activeBtnTabText : {}]}>全部课程</Text>
            </Button>
          </FooterTab>
        </View>
        <View
          style={{
            flex: 1,
            flexGrow: 1,
            overflow: 'hidden',
            backgroundColor: '#F6F9FB',
          }}
        >
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
      </Container>
    );
  }
}
export default withGoToRoomModal(Home);
