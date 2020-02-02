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
import icon_jxz_slices from './assets/icon_jxz_slices/icon_jxz.png';
import icon_wks_slices from './assets/icon_wks_slices/icon_wks.png';
import icon_yjs_slices from './assets/icon_yjs_slices/icon_yjs.png';

import LinearGradient from "react-native-linear-gradient";

import { withGoToRoomModal } from '../../components/GoToRoomModal';

import { today_courses, mine_courses } from '../../services/api';

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


  renderItem = (data: Courses) => {
    const { coursewares = {}, teacher = {}, status, signin } = data;
    const type = status; // (-1-取消 1-进行 2-未开始 3-结束)
    const check = signin ? 1 : 0;
    return (
      <View key={JSON.stringify(data)} style={styles.itemBox}>
        <View style={styles.itemBox_1}>
          <View style={[styles.typeWrap,
            type === -1 ? styles.typeWrap_0 : {},
            type === 1 ? styles.typeWrap_1 : {},
            type === 2 ? styles.typeWrap_2 : {},
            type === 3 ? styles.typeWrap_3 : {},
          ]}>
            <Text style={styles.type}>
              {type === -1 ? '未开始' : ''}
              {type === 1 ? '进行' : ''}
              {type === 2 ? '未开始' : ''}
              {type === 3 ? '结束' : ''}
            </Text>
          </View>
        </View>
        <View style={styles.itemBox_2}>
          <View
            transparent
            style={[styles.checkWrap,
              check === 1 ? styles.checkEndWrap : {}]}
          >
            <Text style={[styles.checkText,
              check === 1 ? styles.checkEndText : {}]}>
              { check === 1 ? '已签到' : undefined }
              { check !== 1 ? '未签到' : undefined }
            </Text>
          </View>
          <View style={{
            flex: 1, flexGrow: 1,
            flexDirection: 'row',
          }}>
            <TouchableOpacity
              onPress={() => {
                this.props.dispatch(NavigationActions.navigate({
                  routeName: 'Room',
                  params: {
                    metaData: data.metaData,
                  },
                }))
              }}
              style={{ flex: 1, flexGrow: 1, }}>
              <Text numberOfLines={1} style={styles.timeText}>
                {moment(data.startTime).format('YYYY-MM-DD')}
                {moment(data.startTime).format('HH:mm')}
                -
                {moment(data.endTime).format('HH:mm')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.itemBox_3, {
          marginTop: 11,
          marginBottom: 15,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }]}>
          <View style={{ flex: 1, flexGrow: 1, }}>
            <Text numberOfLines={1} style={styles.titleText}>
              {data.title}
            </Text>
          </View>
          <Text style={styles.nameText}>{teacher.userName}</Text>
        </View>
        <View style={styles.itemBox_4}>
          <View style={styles.btnWrap}>
            <Button
              rounded transparent
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
              <Text style={styles.btnText}>查看资源</Text>
            </Button>
          </View>
          <View style={{ width: 16 }} />
          {
            type !== 3 ? (
              <View style={[styles.btnWrap]}>
                <LinearGradient
                  start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                  colors={['#45A4FF', '#7BD1FF']}
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
                      this.props.dispatch(NavigationActions.navigate({
                        routeName: 'Room',
                        params: {
                          metaData: data.metaData,
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
                  colors={['#45A4FF', '#7BD1FF']}
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
                    <Text style={[styles.btnText, { color: '#fff' }]}>观看课程回放</Text>
                  </Button>
                </LinearGradient>
              </View>
            ) : undefined
          }
        </View>
      </View>
    )
  }

  allInfo = () => {
    const { siginInfo } = this.state;
    return <View style={styles.allInfoWrap}>
      <View style={styles.allInfoItem}>
        <View>
          <Text numberOfLines={1} style={styles.allInfoTitle}>已上课程数: </Text>
        </View>
        <View>
          <Text numberOfLines={1} style={styles.allInfoNum}>{siginInfo.finishedCount || 0}</Text>
        </View>
      </View>
      <View style={styles.allInfoItem}>
        <View>
          <Text numberOfLines={1} style={styles.allInfoTitle}>出勤率: </Text>
        </View>
        <View>
          <Text numberOfLines={1} style={styles.allInfoNum}>{siginInfo.signinRate || 0}%</Text>
        </View>
      </View>
    </View>
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
        paddingTop: 20,
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
        return <View />
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
    const { user = {}, navigation } = this.props;
    const { playbackURL = '', title = '' } = navigation.state.params;
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
        <Header
          transparent
          iosBarStyle="dark-content"
          style={{
            backgroundColor: '#fff'
          }}
        >
          <Left>
            <Button
              transparent
              onPress={() => {
                const { dispatch } = this.props;
                dispatch(NavigationActions.back());
              }}
            >
              <Icon style={{ paddingHorizontal: 12, color: '#333333', fontSize: 26 }} name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Text sytle={{
              fontWeight: '500',
              fontSize: 18,
              color: '#333333'
            }}>
              {title}
            </Text>
          </Body>
          <Right />
        </Header>
        <View
          style={{
            flex: 1,
            flexGrow: 1,
            overflow: 'hidden',
            backgroundColor: '#F9FBFF',
          }}
        >
          <View
            style={{
              flexGrow: 1,
            }}
          >
            {this.renderTabList(title === "今日课程" ? '今日课程' : '全部课程')}
          </View>
        </View>
      </Container>
    );
  }
}
export default withGoToRoomModal(Home);
