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
import homeIcon from '@/theme/Theme_Education_003/pages/Home/assets/home_icon_slices/icon.png';
import {getStatusBarHeight} from "react-native-status-bar-height";

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


  renderItem = (data: Courses, index) => {
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
        <View style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <View style={{
            flexGrow: 1,
          }}>
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
                    this.signins(data.id);
                    this.props.dispatch(NavigationActions.navigate({
                      routeName: 'Room',
                      params: {
                        metaData: data.metaData,
                      },
                    }))
                  }}
                  style={{ flex: 1, flexGrow: 1, flexDirection: 'row' }}>
                  <Text numberOfLines={1} style={styles.timeText}>
                    时间：{moment(data.startTime).format('YYYY-MM-DD')}
                    <Text> </Text>
                    {moment(data.startTime).format('HH:mm')}
                    -
                    {moment(data.endTime).format('HH:mm')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View>
            <View style={{
              width: 36,
              height: 36,
              borderWidth: 1,
              borderColor: '#16DB9B',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 18,
            }}>
              <Text style={{
                fontSize: 14,
                color: '#17DC9C',
              }}>{index < 10 ? `0${index}` : index}</Text>
            </View>
          </View>
        </View>
        <View style={styles.itemBox_4}>
          <Text style={[styles.checkText,
            check === 1 ? styles.checkEndText : {}]}>
            状态：
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
                <Text style={styles.btnText}>学习资源</Text>
              </Button>
            </View>
          </View>
        </View>
        <View style={styles.itemBox_4}>
          <Text numberOfLines={1} style={styles.nameText}>
            老师：{teacher.userName}
          </Text>
          <View style={{
            flexDirection: 'row',
            flexGrow: 1,
            justifyContent: 'flex-end',
          }}>
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
                        this.props.dispatch(NavigationActions.navigate({
                          routeName: 'Room',
                          params: {
                            metaData: data.metaData,
                          },
                        }))
                      }}
                    >
                      <Text style={[styles.btnText, { color: '#fff' }]}>加入课堂</Text>
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
                    colors={['#12DB9A', '#12DB9A' ]}
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
                      <Text style={[styles.btnText, { color: '#fff' }]}>回看视屏</Text>
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
    const List_1 = {
      title: "正在进行",
      data: [],
    };
    const List_2 = {
      title: "待开始",
      data: [],
    };
    const List_3 = {
      title: "已结束",
      data: [],
    };
    let list = []
    allCourses.forEach((item) => {
      const type = item.status; // (-1-取消 1-进行 2-未开始 3-结束)
      if (type === 1) {
        List_1.data.push(item)
      }
      if (type === 2) {
        List_2.data.push(item)
      }
      if (type === 3) {
        List_3.data.push(item)
      }
    });
    if (type === '正在进行') {
      list = [
        List_1,
      ]
    }
    if (type === '待开始') {
      list = [
        List_2,
      ]
    }
    if (type === '已结束') {
      list = [
        List_3,
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
          {this.renderItem(item, index+1)}
        </View>
      }}
      renderSectionHeader={({ section: { title } }) => {
        return <View style={{ marginBottom: 0, }}>
          {type === '全部课程' ? this.allInfo() : undefined}
        </View>
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

  render() {
    const { active, siginInfo } = this.state;
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
          source={require('./assets/banner_slices/banner.png')}
          style={{

            width: Dimensions.get('window').width,
            height:  Dimensions.get('window').width/(375/210),
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

            </View>
          </Content>
        </ImageBackground>
        <View style={styles.footerWrap}>
          <FooterTab style={{
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
                active === 0 ? <FastImage
                  style={{
                    position: 'absolute',
                    width: 40,
                    height: 40,
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}
                  source={require('./assets/select_bg_slices/index.png')}
                  resizeMode={FastImage.resizeMode.contain}
                /> : undefined
              }
              <Text style={[styles.btnTabText, active === 0 ? styles.activeBtnTabText : {}]}>正在进行</Text>
            </Button>
            <Button
              onPress={() => {
                this.setState({
                  active: 1,
                })
              }}
              full style={styles.btnTab}>
              {
                active === 1 ? <FastImage
                  style={{
                    position: 'absolute',
                    width: 40,
                    height: 40,
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}
                  source={require('./assets/select_bg_slices/index.png')}
                  resizeMode={FastImage.resizeMode.contain}
                /> : undefined
              }
              <Text style={[styles.btnTabText, active === 1 ? styles.activeBtnTabText : {}]}>待开始</Text>
            </Button>
            <Button
              onPress={() => {
                this.setState({
                  active: 2,
                })
              }}
              full style={styles.btnTab}>
              {
                active === 2 ? <FastImage
                  style={{
                    position: 'absolute',
                    width: 40,
                    height: 40,
                    alignContent: 'center',
                    justifyContent: 'center',
                  }}
                  source={require('./assets/select_bg_slices/index.png')}
                  resizeMode={FastImage.resizeMode.contain}
                /> : undefined
              }
              <Text style={[styles.btnTabText, active === 1 ? styles.activeBtnTabText : {}]}>已结束</Text>
            </Button>
          </FooterTab>
        </View>
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
              {this.renderTabList("正在进行")}
            </Tab>
            <Tab
              style={{
              }}
              heading="2">
              {this.renderTabList("待开始")}
            </Tab>
            <Tab
              style={{
              }}
              heading="3">
              {this.renderTabList("已结束")}
            </Tab>
          </Tabs>
        </View>
        <Footer style={styles.footerWrap}>
          <FooterTab style={{
            paddingHorizontal: 16,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <View style={{
              width: 4,
              height: 4,
              borderRadius: 2,
              marginRight:5,
              backgroundColor: '#12DB9A',
            }} />
            <Text style={{
              color: '#12DB9A',
              fontSize: 14,
              lineHeight: 23,
              fontWeight: '400',
            }}>上课数：{siginInfo.allInfoTitle || 0}</Text>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
export default withGoToRoomModal(Home);
