import React from 'react';
import {Dimensions, ImageBackground, NativeModules, SectionList, TouchableOpacity, View} from 'react-native';
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
import Oval from './assets/Oval.png';
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
      console.log('signins', res)
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
    return (
      <View key={JSON.stringify(data)} style={styles.itemBox}>
        <View style={styles.itemBox_1}>
          <View style={[styles.typeWrap,
          ]}>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
              <View style={[
                styles.icon_typeWrap,
                type === -1 ? styles.icon_typeWrap_0 : {},
                type === 1 ? styles.icon_typeWrap_1 : {},
                type === 2 ? styles.icon_typeWrap_2 : {},
                type === 3 ? styles.icon_typeWrap_3 : {},
              ]}>
                <View
                  style={[
                    styles.icon_typeWrap_min,
                    type === -1 ? styles.icon_typeWrap_0_min : {},
                    type === 1 ? styles.icon_typeWrap_1_min : {},
                    type === 2 ? styles.icon_typeWrap_2_min : {},
                    type === 3 ? styles.icon_typeWrap_3_min : {},
                  ]}
                />
              </View>
              <Text style={[styles.type,
                type === -1 ? styles.type_0 : {},
                type === 1 ? styles.type_1 : {},
                type === 2 ? styles.type_2 : {},
                type === 3 ? styles.type_3 : {},
              ]}>
                {type === -1 ? '未开始' : ''}
                {type === 1 ? '进行中' : ''}
                {type === 2 ? '未开始' : ''}
                {type === 3 ? '已结束' : ''}
              </Text>
            </View>
            <ImageBackground
              style={{
                width: 62,
                height: 22,
                justifyContent: 'center',
              }}
              source={check === 1 ? require('./assets/ico_checkin/ico_checkin.png') : require('./assets/ico_uncheck/ico_uncheck.png')}
            >
              <Button
                transparent
                style={[styles.checkWrap,
                  check === 1 ? styles.checkEndWrap : {}]}
              >
                <Text style={[styles.checkText,
                  check === 1 ? styles.checkEndText : {}]}>
                  { check === 1 ? '已签到' : undefined }
                  { check !== 1 ? '未签到' : undefined }
                </Text>
              </Button>
            </ImageBackground>
          </View>
        </View>
        <View style={styles.itemBox_2}>
          <View style={{
            flex: 1, flexGrow: 1,
            // flexDirection: 'row',
          }}>
            <TouchableOpacity
              style={{ flex: 1, flexGrow: 1, }}
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
              <Text numberOfLines={1} style={styles.timeText}>
                {moment(data.startTime).format('YYYY-MM-DD')}
                <Text> </Text>
                {moment(data.startTime).format('HH:mm')}
                -
                {moment(data.endTime).format('HH:mm')}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.itemBox_3}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
            <View style={{
            }}>
              <Text  numberOfLines={1} style={[
                styles.titleText,
              ]}>
                {data.title}
              </Text>
            </View>
            <View style={{
              marginHorizontal: 8,
              width: 1,
              height: 14,
            }}></View>
            <View>
              <FastImage
                style={{
                  width: 20,
                  height: 20,
                  marginRight: 8,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
                source={require('./assets/u_slices/u.png')}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <View>
              <Text numberOfLines={1} style={styles.nameText}>{teacher.userName}</Text>
            </View>
          </View>
        </View>
        <View style={styles.itemBox_4}>
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
              <Text style={styles.btnText}>查看课程资源</Text>
            </Button>
          </View>
          <View style={{ width: 16 }} />
          {
            type !== 3 ? (
              <View style={[styles.btnWrap]}>
                <LinearGradient
                  start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                  colors={['#224DFF', '#6B50FF' ]}
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
                      alert(data.id)
                      this.props.dispatch(NavigationActions.navigate({
                        routeName: 'Room',
                        params: {
                          metaData: data.metaData,
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
                  colors={['#224DFF', '#6B50FF' ]}
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
                    <Text style={[styles.btnText, { color: '#fff' }]}>查看回放</Text>
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
          <Text numberOfLines={1} style={styles.allInfoNum}>{siginInfo.courseCount || 0}</Text>
        </View>
        <View>
          <Text numberOfLines={1} style={styles.allInfoTitle}>已排课程数</Text>
        </View>
      </View>
      <View style={styles.allInfoItem}>
        <View>
          <Text numberOfLines={1} style={styles.allInfoNum}>{siginInfo.finishedCount || 0}</Text>
        </View>
        <View>
          <Text numberOfLines={1} style={styles.allInfoTitle}>已上课程数</Text>
        </View>
      </View>
      <View style={styles.allInfoItem}>
        <View>
          <Text numberOfLines={1} style={styles.allInfoNum}>{siginInfo.signinRate || 0}%</Text>
        </View>
        <View>
          <Text numberOfLines={1} style={styles.allInfoTitle}>出勤率</Text>
        </View>
      </View>
    </View>
  }

  renderTabList(type) {
    const { user = {} } = this.props;
    console.log(this.state)
    let list = []
    if (this.state.todayCourses && this.state.todayCourses.length) {
      list = list.concat({ title: "今日课程", data: this.state.todayCourses })
    }
    list = list.concat({ title: "全部课程", data: ['MSG', ...this.state.allCourses] })
    return <SectionList
      style={{
        flex:1,
        flexGrow: 1,
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
        return <Text style={styles.title}>{title}</Text>
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
        <Content
          style={{
            backgroundColor: '#F4F6FA',
            marginBottom: 0,
          }}
          scrollEnabled={false}
          contentContainerStyle={{
            backgroundColor: '#F4F6FA',
            flexGrow: 1,
            flex: 1,
          }}
        >
          <View style={{
            flexGrow: 1,
            flex: 1,
          }}>
            <View style={styles.header}>
              <ImageBackground
                style={{
                  width: 369,
                  height: 182,
                  justifyContent: 'center',
                }}
                source={require('./assets/user_card/pic_card.png')}
              >
                <View style={[styles.userWrap]}>
                  <FastImage
                    style={{
                      width: 60,
                      height: 60,
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
              }}
            >
              <View
                style={{
                  flex: 1,
                  flexGrow: 1,
                }}
              >
                {this.renderTabList()}
              </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}
export default withGoToRoomModal(Home);
