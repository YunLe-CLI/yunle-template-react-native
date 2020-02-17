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
    const { coursewares = {}, teacher = {}, status, signin, playbackURL } = data;
    const type = status; // (-1-取消 1-进行 2-未开始 3-结束)
    const check = signin ? 1 : 0;
    // {type === -1 ? '未开始' : ''}
    // {type === 1 ? '进行中' : ''}
    // {type === 2 ? '未开始' : ''}
    // {type === 3 ? '已结束' : ''}
    let typeImg = icon_yjs_slices;
    if (type === -1) {
      typeImg = icon_yjs_slices;
    }
    if (type === 1) {
      typeImg = icon_jxz_slices;
    }
    if (type === 2) {
      typeImg = icon_wks_slices;
    }
    if (type === 3) {
      typeImg = icon_yjs_slices;
    }
    return (
      <View key={JSON.stringify(data)} style={styles.itemBox}>
        <View style={styles.itemBox_1}>
          <View style={{
            position: 'absolute',
            right: 8,
            top: -16,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}>
            <ImageBackground
              style={{
                alignSelf: 'flex-end',
                width: 48,
                height: 35,
                justifyContent: 'center',
              }}
              source={typeImg}
            >

              {/*<Text style={[styles.type,*/}
              {/*  type === -1 ? styles.type_0 : {},*/}
              {/*  type === 1 ? styles.type_1 : {},*/}
              {/*  type === 2 ? styles.type_2 : {},*/}
              {/*  type === 3 ? styles.type_3 : {},*/}
              {/*]}>*/}
              {/*  {type === -1 ? '未开始' : ''}*/}
              {/*  {type === 1 ? '进行中' : ''}*/}
              {/*  {type === 2 ? '未开始' : ''}*/}
              {/*  {type === 3 ? '已结束' : ''}*/}
              {/*</Text>*/}
            </ImageBackground>
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

          </View>
        </View>
        <View style={styles.itemBox_2}>
          <View style={{
            flex: 1, flexGrow: 1,
            justifyContent: 'center',
            // flexDirection: 'row',
          }}>
            <TouchableOpacity
              onPress={() => {
                this.props.dispatch(NavigationActions.navigate({
                  routeName: 'Room',
                  params: {
                    id: data.id, metaData: data.metaData,
                  },
                }))
              }}
              style={{ flex: 1, flexGrow: 1, flexDirection: 'row' }}>
              <Text numberOfLines={1} style={styles.timeText}>
                {moment(data.startTime).format('YYYY-MM-DD')}
                <Text> </Text>
                {moment(data.startTime).format('HH:mm')}
                -
                {moment(data.endTime).format('HH:mm')}
              </Text>
              <View style={{
                marginHorizontal: 8,
                width: 1,
                height: 14,
                backgroundColor: '#192038',
              }}></View>
              <View>
                <Text numberOfLines={1} style={styles.nameText}>{teacher.userName}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.itemBox_4}>
          <Text style={[styles.checkText,
            check === 1 ? styles.checkEndText : {}]}>
            { check === 1 ? '已签到' : undefined }
            { check !== 1 ? '未签到' : undefined }
          </Text>
          <View style={{
            flexDirection: 'row',
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}>
            <View style={[styles.btnWrap, {
              borderWidth: 1,
              borderColor: '#DEDEDE'
            }]}>
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
                <Text style={styles.btnText}>查看资源</Text>
              </Button>
            </View>
            <View style={{ width: 10 }} />
            {
              type !== 3 ? (
                <View style={[styles.btnWrap]}>
                  <LinearGradient
                    start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                    colors={['#FFE304', '#FFE304' ]}
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
                      <Text style={[styles.btnText, { color: '#030600' }]}>进入课堂</Text>
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
                    colors={['#FFE304', '#FFE304' ]}
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
                            playbackURL: playbackURL
                          },
                        }))
                      }}
                    >
                      <Text style={[styles.btnText, { color: '#030600' }]}>观看课程回放</Text>
                    </Button>
                  </LinearGradient>
                </View>
              ) : undefined
            }
          </View>
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
            height: 176,
          }}
        >
          <Content
            scrollEnabled={false}
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View>
              <FastImage
                style={{
                  width: 52,
                  height: 52,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
                source={userImg}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <Text style={{
              marginTop: 16,
              color: '#404E66',
              fontSize: 20,
              lineHeight: 28,
              fontWeight: '500',
            }}>{user.name || '未知'}</Text>
          </Content>
        </ImageBackground>
        <View
          style={{
            flex: 1,
            flexGrow: 1,
            overflow: 'hidden',
            backgroundColor: '#F9FBFF',
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
        <Footer style={styles.footerWrap}>
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
              <FastImage
                style={{
                  width: 24,
                  height: 24,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
                source={active === 0 ? icon_myorder_active_slices : icon_myorder_default_slices}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={[styles.btnTabText, active === 0 ? styles.activeBtnTabText : {}]}>今日课程</Text>
            </Button>
            <Button
              onPress={() => {
                this.setState({
                  active: 1,
                })
              }}
              full style={styles.btnTab}>
              <FastImage
                style={{
                  width: 24,
                  height: 24,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
                source={active === 1 ? icon_register_active_slices : icon_register_default_slices }
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={[styles.btnTabText, active === 1 ? styles.activeBtnTabText : {}]}>全部课程</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
export default withGoToRoomModal(Home);
