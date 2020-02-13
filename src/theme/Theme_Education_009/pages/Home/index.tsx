import React from 'react';
import {TouchableOpacity, FlatList, Dimensions, ImageBackground, NativeModules, SectionList, View} from 'react-native';
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
    active: 1,
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
        }}>
          <View style={{
            flexGrow: 1,
          }}>
            <View style={{

            }}>
              <FastImage
                style={{
                  width: '100%',
                  height: 81,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
                source={require('./assets/item_bg_slices/index.png')}
                resizeMode={FastImage.resizeMode.cover}
              />
              <View style={[styles.typeWrap,
                type === -1 ? { backgroundColor: '#FF2D2D' } : {},
                type === 1 ? { backgroundColor: '#2A9DFE' } : {},
                type === 2 ? { backgroundColor: '#FF2D2D' } : {},
                type === 3 ? { backgroundColor: '#51549A' } : {},
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
                    metaData: data.metaData,
                  },
                }))
              }}
              style={{ flex: 1, flexGrow: 1,
              flexDirection: 'row', alignItems: 'center',
              paddingHorizontal: 16,
            }}>
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
            paddingHorizontal: 16,
            alignItems: 'center',
          }]}>
            <Text style={styles.nameText}>{teacher.userName}</Text>
          </View>
        </View>
        <View style={styles.itemBox_4}>
          {
            type !== 3 ? (
              <View style={[styles.btnWrap]}>
                <LinearGradient
                  start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                  colors={type === 1 ? ['#51549A', '#51549A'] : ['#51549A', '#51549A']}
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
                    <Text style={[styles.btnText, { color: '#fff' }]}>进入学习</Text>
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
                  colors={['#51549A', '#51549A']}
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
                    <Text style={[styles.btnText, { color: '#fff' }]}>进入回放</Text>
                  </Button>
                </LinearGradient>
              </View>
            ) : undefined
          }
          <View style={{ width: 16 }} />
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
                    coursewares,
                    courses: data,
                  },
                }))
              }}
            >
              <Text style={[styles.btnText, { color: '#51549A' }]}>查看资料</Text>
            </Button>
          </View>
        </View>
      </View>
    )
  }

  renderTabList(type: string) {
    const { allCourses } = this.state;

    let list = [];
    allCourses.forEach((item) => {
      console.log(item.signin)
      if (type === '已签到' && item.signin) {
        list.push(item)
      }
      if (type === '未签到' && !item.signin) {
        list.push(item)
      }
    })

    return <FlatList
      horizontal={false}
      style={{
        flex: 1,
        overflow: 'hidden',
        flexGrow: 1,
        marginLeft: -9,
        backgroundColor: '#F9F9F9'
      }}
      contentContainerStyle={{
        paddingTop: 16,
        //
        paddingHorizontal: 16,
      }}
      columnWrapperStyle={{

      }}
      numColumns={2}
      onEndReachedThreshold={0.3}
      refreshing={this.state.refreshing}
      onRefresh={this._onRefresh}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index, section }) => {
        return <View style={{
          flex: 1,
          marginLeft: 9,
          overflow: 'hidden'
        }} key={JSON.stringify(item)}>
          {this.renderItem(item)}
        </View>
      }}
      data={list || []}
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
        <Header
          transparent
          iosBarStyle="dark-content"
          style={{
          backgroundColor: '#fff'
        }}>
          <Left>

          </Left>
          <Body>
            <Title style={{ color: '#333333' }}>学习中心</Title>
          </Body>
          <Right />
        </Header>
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
              <View>
                <Text style={[styles.btnTabText, active === 0 ? styles.activeBtnTabText : {}]}>已签到</Text>
              </View>
              <View style={[styles.iWrap,  active === 0 ? {
                backgroundColor: '#51549A'
              } : {}]}></View>
            </Button>
            <Button
              onPress={() => {
                this.setState({
                  active: 1,
                })
              }}
              full style={styles.btnTab}>
              <View>
                <Text style={[styles.btnTabText, active === 1 ? styles.activeBtnTabText : {}]}>未签到</Text>
              </View>
              <View style={[styles.iWrap,  active === 1 ? {
                backgroundColor: '#51549A'
              } : {}]}></View>
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
              {this.renderTabList("已签到")}
            </Tab>
            <Tab
              style={{
              }}
              heading="2">
              {this.renderTabList("未签到")}
            </Tab>
          </Tabs>
        </View>
      </Container>
    );
  }
}
export default withGoToRoomModal(Home);
