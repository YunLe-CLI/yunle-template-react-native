import React from 'react';
import {Dimensions, ImageBackground, NativeModules, SectionList, View} from 'react-native';
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
import Oval from './assets/Oval_slices/Oval.png'
import rightIcon from './assets/right_slices/right.png'

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
        <ImageBackground
          source={home_bg_slices}
          style={{
            width: '100%',
            height: 154,
          }}
        >
          <Content
            scrollEnabled={false}
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <View style={{
              flexGrow: 1,
              paddingHorizontal: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexGrow: 1,
              }}>
                <FastImage
                  style={{
                    marginRight: 12,
                    width: 45,
                    height: 45,
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}
                  source={Oval}
                  resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={{
                  color: '#fff',
                  fontSize: 20,
                  lineHeight: 28,
                  fontWeight: '500',
                }}>{user.name || '未知'}</Text>
              </View>
              <Text style={{
                color: '#fff',
                fontSize: 16,
                lineHeight: 28,
                fontWeight: '500',
              }}>上课数：{siginInfo.finishedCount || '未知'}</Text>
            </View>
          </Content>
        </ImageBackground>
        <Content
          padder
          style={{
            marginTop: 0,
            flex: 1,
            flexGrow: 1,
            overflow: 'hidden',
            paddingHorizontal: 20,
          }}
          contentContainerStyle={{
            paddingTop: 20,
          }}
        >
          <LinearGradient
            start={{x: 0, y: 0}} end={{x: 1, y: 1}}
            colors={['#2CD7A2', '#33E294' ]}
            style={[
              styles.linearGradientBtn,
            ]}
          >
            <Card transparent style={{
              marginTop: 0,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: 0,
              paddingHorizontal: 20,
              paddingVertical: 14,
            }}>
              <CardItem
                header button
                onPress={() => {
                  this.props.dispatch(NavigationActions.navigate({
                    routeName: 'CourseList',
                    params: {
                      title: "今日课程"
                    },
                  }))
                }}
                style={{
                  paddingTop: 0,
                  paddingRight: 0,
                  paddingBottom: 0,
                  paddingLeft: 0,
                  backgroundColor:'transparent'
                }}
              >
                <Left style={styles.boxLeft}>
                  <View>
                    <Text style={[styles.boxTitle]}>今日课程</Text>
                  </View>
                  <View>
                    <Text style={[styles.boxTitle, styles.boxTitle_1]}>精品课程老师精讲</Text>
                  </View>
                  <View style={styles.boxIconWrap}>
                    <Text style={[styles.boxTitle, styles.boxTitle_2]}>马上查看</Text>
                    <FastImage
                      style={{
                        marginLeft: 7,
                        width: 14,
                        height: 14,
                        alignContent: 'center',
                        justifyContent: 'center',
                      }}
                      source={rightIcon}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </View>
                </Left>
                <Right style={styles.boxRight}>
                  <FastImage
                    style={{
                      width: 86,
                      height: 86,
                      alignContent: 'center',
                      justifyContent: 'center',
                    }}
                    source={require('./assets/icon_today_slices/index.png')}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </Right>
              </CardItem>
            </Card>
          </LinearGradient>

          <LinearGradient
            start={{x: 0, y: 0}} end={{x: 1, y: 1}}
            colors={['#FFA561', '#FF6C32', '#FF6C32' ]}
            style={[
              styles.linearGradientBtn,
            ]}
          >
            <Card transparent style={{
              marginTop: 0,
              marginRight: 0,
              marginBottom: 0,
              marginLeft: 0,
              paddingHorizontal: 20,
              paddingVertical: 14,
            }}>
              <CardItem
                header button
                onPress={() => {
                  this.props.dispatch(NavigationActions.navigate({
                    routeName: 'CourseList',
                    params: {
                      title: "我的课程"
                    },
                  }))
                }}
                style={{
                  paddingTop: 0,
                  paddingRight: 0,
                  paddingBottom: 0,
                  paddingLeft: 0,
                  backgroundColor:'transparent'
                }}
              >
                <Left style={styles.boxLeft}>
                  <View>
                    <Text style={[styles.boxTitle]}>我的课程</Text>
                  </View>
                  <View>
                    <Text style={[styles.boxTitle, styles.boxTitle_1]}>精品课程老师精讲</Text>
                  </View>
                  <View style={styles.boxIconWrap}>
                    <Text style={[styles.boxTitle, styles.boxTitle_2]}>马上查看</Text>
                    <FastImage
                      style={{
                        marginLeft: 7,
                        width: 14,
                        height: 14,
                        alignContent: 'center',
                        justifyContent: 'center',
                      }}
                      source={rightIcon}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  </View>
                </Left>
                <Right style={styles.boxRight}>
                  <FastImage
                    style={{
                      width: 86,
                      height: 86,
                      alignContent: 'center',
                      justifyContent: 'center',
                    }}
                    source={require('./assets/icon_me_slices/index.png')}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </Right>
              </CardItem>
            </Card>
          </LinearGradient>
        </Content>
      </Container>
    );
  }
}
export default withGoToRoomModal(Home);
