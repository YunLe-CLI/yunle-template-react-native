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
import home_bg_slices from './assets/home_bg_slices/banner.png'
import userImg from './assets/Oval_slices/Oval.png'
import icon_myorder_default_slices from './assets/icon_myorder_default_slices/icon_jrkc_active.png';
import icon_myorder_active_slices from './assets/icon_myorder_active_slices/icon_jrkc_active.png';
import icon_register_default_slices from './assets/icon_register_default_slices/icon_qbkc_default.png';
import icon_register_active_slices from './assets/icon_register_active_slices/icon_qbkc_default.png';
import icon_jxz_slices from './assets/icon_jxz_slices/icon_jxz.png';
import icon_wks_slices from './assets/icon_wks_slices/icon_wks.png';
import icon_yjs_slices from './assets/icon_yjs_slices/icon_yjs.png';
import homeIcon from './assets/home_icon_slices/icon.png';

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
        <ImageBackground
          style={{
            marginRight: 16,
            width: 115,
            height: 132,
            padding: 6,
            // alignContent: 'center',
            // justifyContent: 'center',
          }}
          source={require('./assets/item_img_slices/img.png')}
        >
          <View  style={[styles.type,
            type === -1 ? styles.type_0 : {},
            type === 1 ? styles.type_1 : {},
            type === 2 ? styles.type_2 : {},
            type === 3 ? styles.type_3 : {},
          ]}>
          <Text style={styles.typeText}>
            {type === -1 ? '未开始' : ''}
            {type === 1 ? '进行中' : ''}
            {type === 2 ? '未开始' : ''}
            {type === 3 ? '已结束' : ''}
          </Text>
          </View>
        </ImageBackground>
        <View style={{
          flex: 1,
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
                  this.props.dispatch(NavigationActions.navigate({
                    routeName: 'Room',
                    params: {
                      metaData: data.metaData,
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
              marginHorizontal: 8,
              width: 1,
              height: 14,
              backgroundColor: '#192038',
            }}></View>
            <View>
              <Text numberOfLines={1} style={styles.nameText}>{teacher.userName}</Text>
            </View>
          </View>
          <View style={styles.itemBox_4}>
            <View style={{
              flex: 1,
              flexDirection: 'row',
              // flexGrow: 1,
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
                  <Text style={styles.btnText}>查看课堂资源</Text>
                </Button>
              </View>
              <View style={{ width: 10 }} />
              {
                type !== 3 ? (
                  <View style={[styles.btnWrap]}>
                    <LinearGradient
                      start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                      colors={['#FF6633', '#FF6633' ]}
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
                              metaData: data.metaData,
                            },
                          }))
                        }}
                      >
                        <Text style={[styles.btnText, { color: '#fff' }]}>进入课堂</Text>
                      </Button>
                    </LinearGradient>
                  </View>
                ) : undefined
              }
              {
                type === 3 ? (
                  <View style={[styles.btnWrap, {
                    borderWidth: 1,
                    borderColor: '#FF6633'
                  }]}>
                    <Button
                      transparent
                      style={styles.btnContent}
                      onPress={() => {
                        this.props.dispatch(NavigationActions.navigate({
                          routeName: 'VideoBack',
                          params: {
                            title: data.title,
                            playbackURL: playbackURL,
                          },
                        }))
                      }}
                    >
                      <Text style={[styles.btnText, { color: '#FF6633' }]}>查看课堂视频</Text>
                    </Button>
                  </View>
                ) : undefined
              }
            </View>
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

  renderTabList() {
    let list = []
    if (this.state.todayCourses && this.state.todayCourses.length) {
      list = list.concat({ title: "今日课程", data: this.state.todayCourses })
    }
    list = list.concat({ title: "全部课程", data: [...this.state.allCourses] })
    return <SectionList
      style={{
        flexGrow: 1,
        backgroundColor: '#F9F9F9'
      }}
      contentContainerStyle={{
        // paddingHorizontal: 16,
      }}
      stickySectionHeadersEnabled={false}
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
        return <View style={styles.titleWrap}>
          <View style={styles.dItem} />
          <Text style={styles.title}>{title}</Text>
          <View style={styles.dItem} />
        </View>
      }}
      sections={list || []}
      ItemSeparatorComponent={() => <View style={{ height: 0 }} />}
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
        <View
          style={{
            backgroundColor: '#FD8925'
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
          </Content>
          <ImageBackground
            source={home_bg_slices}
            style={{
              width: '100%',
              height: 210,
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            flexGrow: 1,
            overflow: 'hidden',
            backgroundColor: '#F9FBFF',
          }}
        >
          {this.renderTabList()}
        </View>
        <Footer style={styles.footerWrap}>
          <FooterTab style={{
            paddingHorizontal: 16,
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}>
            <FastImage
              style={{
                marginRight: 14,
                width: 32,
                height: 32,
                alignContent: 'center',
                justifyContent: 'center',
              }}
              source={homeIcon}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={{
              color: '#FF6633',
              fontSize: 14,
              lineHeight: 23,
              fontWeight: '400',
            }}>累计出勤率：{siginInfo.signinRate || 0}%</Text>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
export default withGoToRoomModal(Home);
