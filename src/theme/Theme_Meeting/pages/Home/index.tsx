import React from 'react';
import {Dimensions, ImageBackground, NativeModules, SectionList, StatusBar, View} from 'react-native';
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
import userImg from './assets/user_slices/user.png'
import icon_myorder_default_slices from './assets/icon_meet_default_slices/icon_meet_default.png';
import icon_myorder_active_slices from './assets/icon_meet_active_slices/icon_meet_active.png';
import icon_register_default_slices from './assets/icon_card_default_slices/icon_card_default.png';
import icon_register_active_slices from './assets/icon_card_active_slices/icon_card_active.png';

import icon_live_slices_0 from './assets/icon_live_slices_0/icon_live.png';
import icon_live_slices_1 from './assets/icon_live_slices_1/icon_live.png';
import icon_live_slices_2 from './assets/icon_live_slices_2/icon_live.png';
import LinearGradient from "react-native-linear-gradient";

import { withCancelModal } from '../../components/CancelModal';
import { withGoToRoomModal } from '../../components/GoToRoomModal';

import { MAKE_LIST, MAKE_ITEM, ROOM_MESSAGE } from '../../services/api';

const { MainViewController = {} } = NativeModules || {};
const { SDKLeaveRoom } = MainViewController || {};

import AddressList from '../AddressList';

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
    today: [],
    registrations: [],
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

  async getMakeList() {
    try {
      const res = await MAKE_LIST({});
      console.log(1111, res);
      if (res.code === 0) {
        const { data = {} } = res;
        this.setState({
          today: data.today,
          registrations: data.registrations,
        })
        if (data.today) {
          let isOpenInfo: MAKE_ITEM | undefined = undefined;
          data.today.map((item: MAKE_ITEM) => {
            if (item.status === 3) {
              isOpenInfo = item;
            }
            isOpenInfo = item;
          })
          if (isOpenInfo) {
            this.getIsMe(isOpenInfo)
          }
        }
      }

    } catch (e) {
      alert(e)
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
      await this.getMakeList();
    } catch (e) {

    } finally {
      this.setState({
        refreshing: false,
      });
    }
  }

  renderItem(data: MAKE_ITEM) {
    let type = data.status;
    console.log('type: sss', type)
    let icon = icon_live_slices_0;
    let iconText = styles.itemIconText00;
    let typeText = '未开始';
    // 就诊状态（1-开启 2-关闭 3-进行 4-过期）
    switch (type) {
      case 4: {
        icon = icon_live_slices_2;
        iconText = styles.itemIconText02;
        typeText = '已结束';
       break;
      }
      case 1: {
        icon = icon_live_slices_0;
        iconText = styles.itemIconText00;
        typeText = '已预约';
        break;
      }
      case 3: {
        icon = icon_live_slices_1;
        iconText = styles.itemIconText01;
        typeText = '进行中';
        break;
      }
      case 2: {
        icon = icon_live_slices_2;
        iconText = styles.itemIconText02;
        typeText = '已结束';
        break;
      }
      case 4: {
        icon = icon_live_slices_2;
        iconText = styles.itemIconText02;
        typeText = '已结束';
        break;
      }
      default: {
        icon = icon_live_slices_2;
        iconText = styles.itemIconText02;
        typeText = '已结束';
      }
    }
    return <Card style={styles.itemBox}>
      <CardItem button onPress={() => {
        // this.props.dispatch(NavigationActions.navigate({
        //   routeName: 'AppointmentDetails',
        //   params: {},
        // }));
      }} style={styles.itemBoxBody}>
        <View style={styles.itemBoxContent}>
          <View style={styles.itemBoxLeft}>
            <Text style={[styles.itemIconText, iconText]}>
              {typeText}
            </Text>
          </View>
          <Title style={styles.itemBodyTitle}>
            {moment().format('YYYY.MM.DD HH:mm')}
            -{moment().format('HH:mm')}
          </Title>
          <Text style={[styles.itemBodyText, styles.itemBodyText001]}>
            发起人：{data.name}
          </Text>
          <Text style={[styles.itemBodyText, styles.itemBodyText001]}>
            参会人：小张 小阳 小光 小明 小丑 小吸 等
          </Text>
          <View style={[styles.itemBoxFooter]}>
            <View style={styles.itemBodyBtnWrap}>
              {
                (type) ? <LinearGradient
                  start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                  colors={['#fff', '#fff']}
                  style={[
                    styles.linearGradientBtn,
                    styles.clearButton,
                  ]}
                >
                  <Button
                    full
                    transparent
                    rounded
                    onPress={async () => {
                      // this.props.dispatch(NavigationActions.navigate({
                      //   routeName: 'Room',
                      //   params: {},
                      // }))
                    }}
                    style={[
                      styles.btnDefault,
                      styles.submitButton
                    ]}
                    textStyle={{
                      color: '#fff'
                    }}
                  >
                    <Title style={[styles.btnText, { color: 'rgba(0,0,0,0.85)' }]}>结束会议</Title>
                  </Button>
                </LinearGradient> : undefined
              }
              {
                (type === 3) ? <LinearGradient
                  start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                  colors={['#118DF0', '#118DF0']}
                  style={[
                    styles.linearGradientBtn,
                  ]}
                >
                  <Button
                    full
                    transparent
                    rounded
                    onPress={async () => {
                      this.props.dispatch(NavigationActions.navigate({
                        routeName: 'Room',
                        params: {
                          metaData: data.metaData,
                        },
                      }))
                    }}
                    style={[
                      styles.btnDefault,
                      styles.submitButton
                    ]}
                    textStyle={{
                      color: '#fff'
                    }}
                  >
                    <Title style={styles.btnText}>进入会议</Title>
                  </Button>
                </LinearGradient> : undefined
              }
              {
                (type === 1) ? <LinearGradient
                  start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                  colors={['#FF3B0E', '#FF3B0E']}
                  style={[
                    styles.linearGradientBtn,
                    styles.clearButton,
                  ]}
                >
                  <Button
                    full
                    transparent
                    rounded
                    onPress={async () => {
                      this.props.handleShowCancelModal();
                    }}
                    style={[
                      styles.btnDefault,
                    ]}
                    textStyle={{
                      color: '#fff'
                    }}
                  >
                    <Title style={[styles.btnText, styles.btnClearText]}>取消预约</Title>
                  </Button>
                </LinearGradient> : undefined
              }

            </View>
          </View>
        </View>
      </CardItem>
    </Card>
  }

  renderTabList() {
    const { today, registrations } = this.state;
    const { user = {} } = this.props;
    const todayList = {
      title: "今日预约",
      data: today,
    };
    const registrationsList = {
      title: "全部预约",
      data: registrations,
    };
    let list = [
      todayList,
      registrationsList,
    ]
    if (!today || !today.length) {
      list = [registrationsList]
    }
    return <View style={{
      flex: 1,
      flexGrow: 1,
    }}>
      <View>
        <Content
          scrollEnabled={false}
        />
        <View style={styles.header}>
          <View style={styles.headerUser}>
            <FastImage
              style={{
                marginRight: 8,
                width: 40,
                height: 40,
                alignContent: 'center',
                justifyContent: 'center',
              }}
              source={userImg}
              resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={{
              color: '#404E66',
              marginRight: 8,
              fontSize: 16,
              lineHeight: 22,
              fontWeight: '500',
            }}>{user.name || '未知'}</Text>
          </View>
          <View style={styles.headerBtns}>
            <Button
              style={[styles.headerBtn, { backgroundColor: '#fff' }]}
              onPress={() => {
                this.props.dispatch(NavigationActions.navigate({
                  routeName: 'MakeMeeting',
                  params: {
                    type: "预约会议"
                  },
                }))
              }}
            >
              <Title style={styles.headerBtnText}>
                预约会议
              </Title>
            </Button>
            <Button
              onPress={() => {
                this.props.dispatch(NavigationActions.navigate({
                  routeName: 'MakeMeeting',
                  params: {
                    type: "发起会议"
                  },
                }))
              }}
              style={styles.headerBtn}>
              <Title style={[styles.headerBtnText, { color: '#fff' }]}>
                发起会议
              </Title>
            </Button>
          </View>
        </View>
      </View>
      <SectionList
        style={{
          flexGrow: 1,
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
          if (item === 'MSG') {
            return this.allInfo()
          }
          return <View key={JSON.stringify(item)}>
            {this.renderItem(item)}
          </View>
        }}
        renderSectionHeader={({ section: { title } }) => {
          return <Text style={styles.itemTitle}>{title}</Text>
        }}
        sections={list}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        ListEmptyComponent={() => {
          return <View />
        }}
        keyExtractor={(item, index) => JSON.stringify(item)}
        renderSectionFooter={() => <View><View style={{ height: 20 }} /></View>}
      />
    </View>
  }

  renderTabForm() {
    return <AddressList />
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
        <View
          style={{
            flex: 1,
            flexGrow: 1,
            overflow: 'hidden',
            backgroundColor: '#F9FBFF',
          }}
        >
          <Tabs
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
                backgroundColor: '#F6F6F6',
              }}
              heading="1">
              {this.renderTabList()}
            </Tab>
            <Tab
              style={{
                backgroundColor: '#F6F6F6',
              }}
              heading="2">
              {this.renderTabForm()}
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
              full style={[styles.btnTab, active === 0 ? { backgroundColor: '#118DF0' } : {}]}>
              <FastImage
                style={{
                  width: 16,
                  height: 16,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
                source={active === 0 ? icon_myorder_active_slices : icon_myorder_default_slices}
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={[styles.btnTabText, active === 0 ? styles.activeBtnTabText : {}]}>我的会议</Text>
            </Button>
            <View style={styles.line} />
            <Button
              onPress={() => {
                this.setState({
                  active: 1,
                })
              }}
              full style={[styles.btnTab, active === 1 ? { backgroundColor: '#118DF0' } : {}]}>
              <FastImage
                style={{
                  width: 16,
                  height: 16,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
                source={active === 1 ? icon_register_active_slices : icon_register_default_slices }
                resizeMode={FastImage.resizeMode.contain}
              />
              <Text style={[styles.btnTabText, active === 1 ? styles.activeBtnTabText : {}]}>通讯录</Text>
            </Button>
          </FooterTab>
        </Footer>
        <StatusBar barStyle="dark-content" />
      </Container>
    );
  }
}
export default withGoToRoomModal(withCancelModal(Home));
