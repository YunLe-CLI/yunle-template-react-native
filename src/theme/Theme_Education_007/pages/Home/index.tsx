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
import { getStatusBarHeight } from 'react-native-status-bar-height';
import _ from 'lodash';
import moment from 'moment';
import styles from './styles';
import {NavigationActions, NavigationEvents} from 'react-navigation';
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
    return;
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
      const today = [];
      const allCourses = [];
      docs.forEach((item) => {
        if (item.signin === 1) {
          today.push(item);
        } else {
          allCourses.push(item);
        }
      })
      this.setState({
        today,
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
                  <View style={[styles.typeWrap,

                  ]}>
                    {/* <Text style={[styles.checkText,
            check === 1 ? styles.checkEndText : {}]}>
            { check === 1 ? '已签到' : undefined }
            { check !== 1 ? '未签到' : undefined }
          </Text> */}
                    <Text style={[
                      styles.type,
                      type === -1 ? { color: '#4426DB' } : {},
                      type === 1 ? { color: '#24CCB8' } : {},
                      type === 2 ? { color: '#4426DB' } : {},
                      type === 3 ? { color: '#404E66' } : {},
                    ]}>
                      {type === -1 ? '未开始' : ''}
                      {type === 1 ? '进行中' : ''}
                      {type === 2 ? '未开始' : ''}
                      {type === 3 ? '已结束' : ''}
                    </Text>
                  </View>
                  <Text style={styles.nameText}>{teacher.userName}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.itemBox_4}>
          <View style={[styles.btnWrap, {
          }]}>
            <Button
              full
              transparent
              style={[styles.btnContent, {
                backgroundColor: '#fff',
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
              <Text style={[styles.btnText, { color: '#595959' }]}>查看课件</Text>
            </Button>
          </View>
          <View style={{ width: 16 }} />
          {
            type !== 3 ? (
              <View style={[styles.btnWrap]}>
                <LinearGradient
                  start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                  colors={type === 1 ? ['#29EFDE', '#4712DB'] : ['#D8D8D8', '#D8D8D8']}
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
                      this.signins(data.id);
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
              <View style={[styles.btnWrap, {
                borderColor: '#108EE9',
                borderWidth: 1,
              }]}>
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
                    <Text style={[styles.btnText, { color: '#108EE9' }]}>再次回放</Text>
                  </Button>
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
      data: allCourses.filter((data) => {
        const { signin } = data;
        return signin;
      }),
    };
    const registrationsList = {
      title: "全部预约",
      data: allCourses.filter((data) => {
        const { signin } = data;
        return !signin;
      }),
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
        backgroundColor: '#fff'
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
        return <View key={JSON.stringify(item)}>
          {this.renderItem(item)}
        </View>
      }}
      renderSectionHeader={({ section: { title } }) => {
        return <Text />
      }}
      sections={list || []}
      ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: '#EEEEEE' }} />}
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
        ]}>
          <ImageBackground
            style={{
              width: Dimensions.get('window').width,
              height: 119 + getStatusBarHeight(true),
              alignItems: 'center',
              justifyContent: 'center'
            }}
            source={require('./assets/bg/bg.png')}
          >
            <View style={[styles.userWrap, {
              width: Dimensions.get('window').width,
              height: 119 + getStatusBarHeight(true),
            }]}>
              <FastImage
                style={{
                  marginTop: getStatusBarHeight(true)/2,
                  width: 40,
                  height: 40,
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
        <View style={{
          flexGrow: 1,
          flexDirection: 'row'
        }}>
          <View style={styles.footerWrap}>
            <View style={{
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Button
                onPress={() => {
                  this.setState({
                    active: 0,
                  })
                }}
                transparent
                full style={[
                  styles.btnTab,
                  active === 0? {
                    backgroundColor: '#fff',
                    borderLeftWidth: 4,
                    borderLeftColor: '#108EE9'
                  } : {}
                ]}
              >
                <Text style={[styles.btnTabText, active === 0 ? styles.activeBtnTabText : {}]}>已签到</Text>
              </Button>
              <Button
                onPress={() => {
                  this.setState({
                    active: 1,
                  })
                }}
                transparent
                full style={[
                  styles.btnTab,
                  active === 1? {
                    backgroundColor: '#fff',
                    borderLeftWidth: 4,
                    borderLeftColor: '#108EE9'
                  } : {}
                ]}
              >
                <Text style={[styles.btnTabText, active === 1 ? styles.activeBtnTabText : {}]}>未签到</Text>
              </Button>
            </View>
          </View>
          <View
            style={{
              flex: 1,
              flexGrow: 1,
              overflow: 'hidden',
              backgroundColor: '#fff',
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
        </View>


      </Container>
    );
  }
}
export default withGoToRoomModal(Home);
