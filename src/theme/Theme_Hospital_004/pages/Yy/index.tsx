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
import VideoPlayer from '@/components/react-native-aliyun-vod-controls'
import Orientation, {OrientationType} from "react-native-orientation-locker";
import home_bg_slices from './assets/home_bg_slices/pic_home_bg.png'
import userImg from './assets/user_slices/user.png'
import icon_myorder_default_slices from './assets/icon_myorder_default_slices/icon_myorder_default.png';
import icon_myorder_active_slices from './assets/icon_myorder_active_slices/icon_myorder_active.png';
import icon_register_default_slices from './assets/icon_register_default_slices/icon_register_default.png';
import icon_register_active_slices from './assets/icon_register_active_slices/icon_register_active.png';

import icon_live_slices_0 from './assets/icon_live_slices_0/icon_live.png';
import icon_live_slices_1 from './assets/icon_live_slices_1/icon_live.png';
import icon_live_slices_2 from './assets/icon_live_slices_2/icon_live.png';
import LinearGradient from "react-native-linear-gradient";

import { withCancelModal } from '../../components/CancelModal';
import { withGoToRoomModal } from '../../components/GoToRoomModal';
import { withSelectDepartmentModal } from '../../components/SelectDepartmentModal';
import { withSelectDoctorModal } from '../../components/SelectDoctorModal';
import { withSelectLevelModal } from '../../components/SelectLevelModal';

import { MAKE_LIST, MAKE_ITEM, ROOM_MESSAGE } from '../../services/api';

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
    // this.props.dispatch(NavigationActions.navigate({
    //   routeName: 'PersonalDetails',
    //   params: {},
    // }))
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
          // SDKLeaveRoom();
          // alert('已完成')
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
      <View style={[styles.typeLineDefault]}></View>
      <CardItem button onPress={() => {
        // this.props.dispatch(NavigationActions.navigate({
        //   routeName: 'AppointmentDetails',
        //   params: {},
        // }));
      }} style={styles.itemBoxBody}>
        <View style={styles.itemBoxLeft}>
          <FastImage
            style={{
              width: 40,
              height: 40,
              alignContent: 'center',
              justifyContent: 'center',
            }}
            source={icon}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text  style={[styles.itemIconText, iconText]}>
            {typeText}
          </Text>
        </View>
        <View style={styles.itemBoxContent}>
          <TouchableOpacity
            onPress={() => {
              this.props.dispatch(NavigationActions.navigate({
                routeName: 'Room',
                params: {
                  metaData: data.metaData,
                },
              }))
            }}
          >
            <Title style={styles.itemBodyTitle}>
              {data.timeslot === 1 ? '上午' : ''}
              {data.timeslot === 2 ? '下午' : ''}
              -{data.medicalDepartment}
            </Title>
          </TouchableOpacity>
          <Text style={[styles.itemBodyText, styles.itemBodyText001]}>
            {data.hospitalName} {data.name} {data.professionalTitle}
          </Text>
          <View style={[styles.itemBoxFooter]}>
            {
              data.position >= 0 ? (
                <Text numberOfLines={2} style={[styles.itemBodyText]}>
                  前面还有
                  <Text style={[styles.itemBodyText, styles.itemBodyText002]}>{data.position}</Text>
                  人
                </Text>
              ) : undefined
            }

            <View style={styles.itemBodyBtnWrap}>
              {
                (type === 1) ? <LinearGradient
                  start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                  colors={['#DCE3EE', '#DCE3EE']}
                  style={[
                    styles.linearGradientBtn,
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
                    <Title style={styles.btnText}>进入诊室</Title>
                  </Button>
                </LinearGradient> : undefined
              }
              {
                (type === 3) ? <LinearGradient
                  start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                  colors={['#6AE27C', '#17D397']}
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
                    <Title style={styles.btnText}>进入诊室</Title>
                  </Button>
                </LinearGradient> : undefined
              }
              {
                (type === 1) ? <LinearGradient
                  start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                  colors={['transparent', 'transparent']}
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
    return <SectionList
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
      sections={list || []}
      ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
      ListEmptyComponent={() => {
        return <View />
      }}
      keyExtractor={(item, index) => JSON.stringify(item)}
      renderSectionFooter={() => <View><View style={{ height: 20 }} /></View>}
    />
  }

  renderTabForm() {
    const { segmentActive, department, level } = this.state;
    const { handleShowSelectDepartmentModal, handleShowSelectLevelModal } = this.props;
    return <Content contentContainerStyle={styles.formContent}>
      <Card noShadow style={styles.formCard}>
        <CardItem style={[styles.formItem, styles.center]}>
          <Button
            transparent
              onPress={() => {
                this.setState({
                  segmentActive: 0,
                })
              }}
              style={[styles.segmentBtn, this.state.segmentActive === 0 ? {
                borderBottomColor: '#000000'
              } : {}]} active={segmentActive === 0} first><Text style={styles.segmentBtnText}>挂号当日</Text></Button>
              <View style={{ width: 111, }} />
          <Button
            transparent
            onPress={() => {
              this.setState({
                segmentActive: 1,
              })
            }}
            style={[styles.segmentBtn, this.state.segmentActive === 1 ? {
              borderBottomColor: '#000000'
            } : {}]} active={segmentActive === 1} last><Text style={styles.segmentBtnText}>预约挂号</Text></Button>
        </CardItem>

        <CardItem
        bordered
          onPress={() => {
            handleShowSelectDepartmentModal((department) => {
              this.setState({
                department,
              })
            })
          }}
          button style={styles.formItem}>
          <Text style={styles.formItemLabel}>选择科室</Text>
          <Text style={[styles.ipt, department ? { color: '#404E66' } : {}]}>{department || '请选择'}</Text>
          <Right>
            <Icon style={{ fontSize: 16, color: '#999999' }} name="arrow-forward" />
          </Right>
        </CardItem>
        <CardItem
          onPress={() => {
            handleShowSelectLevelModal((level) => {
              this.setState({
                level,
              })
            })
          }}
          button style={styles.formItem}>
          <Text style={styles.formItemLabel}>医生职称</Text>
          <Text style={[styles.ipt, level ? { color: '#404E66' } : {}]}>{level || '请选择'}</Text>
          <Right>
            <Icon style={{ fontSize: 16, color: '#999999' }} name="arrow-forward" />
          </Right>
        </CardItem>
        <CardItem style={styles.formItem}>
          
        </CardItem>
      </Card>
    </Content>
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
        <Header
        transparent
        >
            <Left>
                <Button
                    transparent
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                        const { dispatch } = this.props;
                        dispatch(NavigationActions.back());
                    }}
                >
                    <Icon style={{ paddingLeft: 12, color: '#333333', fontSize: 26 }} name='arrow-back' />
                    <Text style={{
                      marginTop: -3,
                       color: '#333333', fontSize: 16 
                    }}>返回</Text>
                </Button>
            </Left>
            <Body>
                <Title style={{ color: '#333333' }}>今日预约</Title>
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
                backgroundColor: '#fff',
              }}
              heading="1">
              {this.renderTabForm()}
            </Tab>
            <Tab
              style={{
                backgroundColor: '#fff',
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
              full
              onPress={async () => {
                let postType = '挂号';
                if (this.state.segmentActive === 0) {
                  postType = '挂号'
                }
                if (this.state.segmentActive === 1) {
                  postType = '预约'
                }
                this.props.dispatch({
                  type: "home/setPostType",
                  payload: postType
                })
                this.props.dispatch(NavigationActions.navigate({
                  routeName: 'DoctorList',
                  params: {
                  },
                }))
              }}
              style={styles.submitButton}
              textStyle={{
                color: '#fff'
              }}
            >
              <Title>确定</Title>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
export default withSelectLevelModal(withSelectDoctorModal(withSelectDepartmentModal(withGoToRoomModal(withCancelModal(Home)))));
