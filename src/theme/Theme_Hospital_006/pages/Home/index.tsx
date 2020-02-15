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
import bg from '@/theme/Theme_Hospital_006/components/LoginModal/assets/bg/bg.png';
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
    today: [],
    registrations: [],
    isNext: false,
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
    //   routeName: 'Room',
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
              this.getIsMe(item)
            }
            isOpenInfo = item;
          })
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
        const { nextId, kickId } = res.data || {};
        console.log('nextId', nextId, "id", id)
        if (id === nextId) {
          this.props.handleShowGoToRoomModal(item)
        }
        if (item.position === 0) {
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

  renderItem(data: MAKE_ITEM, typeTitle: string, itemIndex: number) {
    let type = data.status;
    console.log('type: sss', data)
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
        typeText = '未开始';
        break;
      }
      case 3: {
        icon = icon_live_slices_1;
        iconText = styles.itemIconText01;
        typeText = '正在进行';
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
        <View style={{
          marginRight: 20,
        }}>
          {
            typeTitle === '今日预约' ? (
              <>
                <Text style={{
                  textAlign: 'center',
                  color: '#212121',
                  fontSize: 15,
                  lineHeight: 15,
                  fontWeight: '500',
                }}>
                  {data.timeslot === 1 ? '上午' : ''}
                  {data.timeslot === 2 ? '下午' : ''}
                </Text>
                {
                  type || (type === 3) ? <LinearGradient
                    start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                    colors={['#7FA8FB', '#7FA8FB']}
                    style={[
                      styles.linearGradientBtn,
                      {
                        marginLeft: 0,
                        marginTop: 23,
                      }
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
                            id: data.id, metaData: data.metaData,
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
                      <Title style={styles.btnText}>点击进入</Title>
                    </Button>
                  </LinearGradient> : undefined
                }
              </>
            ) : undefined
          }
          {
            typeTitle === '全部预约' && itemIndex === 0 ? (
              <>
                <Text style={{
                  textAlign: 'center',
                  color: '#212121',
                  fontSize: 15,
                  lineHeight: 15,
                  fontWeight: '500',
                }}>
                  全部
                </Text>
                <Text style={{
                  textAlign: 'center',
                  color: '#212121',
                  fontSize: 15,
                  lineHeight: 15,
                  fontWeight: '500',
                }}>
                  预约
                </Text>
              </>
            ) : <>
              <Text style={{
                textAlign: 'center',
                color: '#fff',
                fontSize: 15,
                lineHeight: 15,
                fontWeight: '500',
              }}>
                全部
              </Text>
              <Text style={{
                textAlign: 'center',
                color: '#fff',
                fontSize: 15,
                lineHeight: 15,
                fontWeight: '500',
              }}>
                预约
              </Text>
            </>
          }
        </View>
        <View style={styles.itemBoxContent}>
          <TouchableOpacity
            onPress={() => {
              this.props.dispatch(NavigationActions.navigate({
                routeName: 'Room',
                params: {
                  id: data.id, metaData: data.metaData,
                },
              }))
            }}
            style={{
              flex: 1,
              flexDirection: 'row'
            }}
          >
            <Text  style={[styles.itemIconText, iconText]}>
              {typeText}
            </Text>
            <Title style={styles.itemBodyTitle}>
              {moment(data.date).format('YYYY年MM月DD日')}
              <View style={{ width: 20, }}></View>
              {data.timeslot === 1 ? '上午' : ''}
              {data.timeslot === 2 ? '下午' : ''}
            </Title>
          </TouchableOpacity>
          <Text style={[styles.itemBodyText, styles.itemBodyText001]}>
            {data.medicalDepartment} {data.hospitalName} {data.professionalTitle} {data.name}
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
                  colors={['#909090', '#909090']}
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
                (type === 1) ? <LinearGradient
                  start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                  colors={['#7FA8FB', '#7FA8FB']}
                  style={[
                    styles.linearGradientBtn,
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
                    <Title style={[styles.btnText]}>取消预约</Title>
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
        // paddingHorizontal: 16,
      }}
      stickySectionHeadersEnabled
      onEndReachedThreshold={0.3}
      refreshing={this.state.refreshing}
      onRefresh={this._onRefresh}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index, section }) => {
        return <View key={JSON.stringify(item)}>
          {this.renderItem(item, section.title, index)}
        </View>
      }}
      renderSectionHeader={({ section: { title } }) => {
        if (title === '今日预约') {
          return null;
        }

        return <View style={{ height: 10, backgroundColor: '#F4F4F4' }} />
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
        <CardItem style={[styles.formItem]}>
          {/*<Segment style={styles.segmentWrap}>*/}
          {/*  <Button*/}
          {/*    onPress={() => {*/}
          {/*      this.setState({*/}
          {/*        segmentActive: 0,*/}
          {/*      })*/}
          {/*    }}*/}
          {/*    style={styles.segmentBtn} active={segmentActive === 0} first><Text style={styles.segmentBtnText}>挂号当日</Text></Button>*/}
          {/*  <Button*/}
          {/*    onPress={() => {*/}
          {/*      this.setState({*/}
          {/*        segmentActive: 1,*/}
          {/*      })*/}
          {/*    }}*/}
          {/*    style={styles.segmentBtn} active={segmentActive === 1} last><Text style={styles.segmentBtnText}>预约挂号</Text></Button>*/}
          {/*</Segment>*/}
          <Text>挂号类型</Text>
        </CardItem>

        <CardItem
          button style={styles.formItem}>
          <TouchableOpacity
            style={{
              marginLeft: 27,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => {
              this.setState({
                segmentActive: 0,
              })
            }}
          >
            <View style={{
              marginRight: 10,
              width: 18,
              height: 18,
              borderRadius: 9,
              backgroundColor: segmentActive === 0 ? '#6093FB' : '#F4F4F4',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {
                segmentActive === 0 ? ( <View style={{
                    height: 7,
                    width: 7,
                    borderRadius: 4,
                    backgroundColor: '#fff',
                  }} />) : null
              }
            </View>
            <Text>
              挂号
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              marginLeft: 27,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onPress={() => {
              this.setState({
                segmentActive: 1,
              })
            }}
          >
            <View style={{
              marginRight: 10,
              width: 18,
              height: 18,
              borderRadius: 9,
              backgroundColor: segmentActive === 1 ? '#6093FB' : '#F4F4F4',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              {
                segmentActive === 1 ? ( <View style={{
                  height: 7,
                  width: 7,
                  borderRadius: 4,
                  backgroundColor: '#fff',
                }} />) : null
              }
            </View>
            <Text>
              预约
            </Text>
          </TouchableOpacity>
        </CardItem>

        <CardItem style={styles.formItem}>
          <LinearGradient
            start={{x: 0, y: 0}} end={{x: 1, y: 1}}
            colors={['#6093FB', '#6093FB']}
            style={[
              styles.linearGradientBtn2,
              {
                opacity: 1
              }
            ]}
          >
            <Button
              full
              transparent
              rounded
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
                this.setState({
                  isNext: true,
                })
                // this.props.dispatch(NavigationActions.navigate({
                //   routeName: 'DoctorList',
                //   params: {
                //   },
                // }))
              }}
              style={styles.submitButton}
              textStyle={{
                color: '#fff'
              }}
            >
              <Title>下一步</Title>
            </Button>
          </LinearGradient>
        </CardItem>
      </Card>
    </Content>
  }

  renderTabForm2() {
    const { segmentActive, department, level } = this.state;
    const { handleShowSelectDepartmentModal, handleShowSelectLevelModal } = this.props;
    return <Content contentContainerStyle={styles.formContent}>
      <Card noShadow style={styles.formCard}>
        <CardItem style={[styles.formItem]}>
          <Text>选择科室</Text>
        </CardItem>

        <CardItem
          onPress={() => {
            handleShowSelectDepartmentModal((department) => {
              this.setState({
                department,
              })
            })
          }}
          button style={[styles.formItem, {
            marginHorizontal: 15,
            backgroundColor: '#f3f3f3',
        }]}>
          <Text style={[styles.ipt, department ? { color: '#404E66' } : {}]}>{department || '请选择科室'}</Text>
          <Right>
            <FastImage
              style={{
                marginRight: 10,
                width: 20,
                height: 22,
                alignContent: 'center',
                justifyContent: 'center',
                backgroundColor: '#F4F4F4',
              }}
              source={require('./assets/sj/sj.png')}
              resizeMode={FastImage.resizeMode.contain}
            />
          </Right>
        </CardItem>

        <CardItem style={styles.formItem}>
          <LinearGradient
            start={{x: 0, y: 0}} end={{x: 1, y: 1}}
            colors={['#6093FB', '#6093FB']}
            style={[
              styles.linearGradientBtn2,
              {
                opacity: 1
              }
            ]}
          >
            <Button
              full
              transparent
              rounded
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
          </LinearGradient>
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
        <ImageBackground
          source={bg}
          style={{
            flex: 1,
            flexGrow: 1,
            width: '100%',
          }}
        >
          <View style={{
            marginTop: getStatusBarHeight(true),
            height: 108,
            paddingBottom: 18,
            justifyContent: 'center',
          }}>
            <View style={{
              paddingHorizontal: 16,
            }}>
              <Text style={{
                fontSize: 18,
                fontWeight: '500',
                textAlign: 'center',
                color: '#FFFFFF'
              }}>
                {active === 1 ? '挂号预约' : '我的预约'}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginTop: -18,
              // paddingHorizontal: 32.5,
              flex: 1,
              borderTopLeftRadius: 18,
              borderTopRightRadius: 18,
              overflow: 'hidden',
              backgroundColor: '#fff'
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                paddingVertical: 20,
                paddingHorizontal: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#F4F4F4',
              }}
            >
              <View>
                <FastImage
                  style={{
                    marginRight: 10,
                    width: 41,
                    height: 41,
                    alignContent: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#F4F4F4',
                  }}
                  source={userImg}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
              <View>
                <Text style={{
                  color: '#212121',
                  fontSize: 15,
                  lineHeight: 20,
                  fontWeight: '400',
                }}>{user.name || '未知'}</Text>
                <Text style={{
                  color: '#BBBABA',
                  fontSize: 12,
                  lineHeight: 22.5,
                  fontWeight: '400',
                }}>累计就诊次数：10次</Text>
              </View>
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
                  {this.renderTabList()}
                </Tab>
                <Tab
                  style={{
                    backgroundColor: '#fff',
                  }}
                  heading="2">
                  {this.state.isNext ? this.renderTabForm2() : this.renderTabForm()}
                </Tab>
              </Tabs>
            </View>
            <Footer style={styles.footerWrap}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Button
                  onPress={() => {
                    this.setState({
                      active: 0,
                    })
                  }}
                  full style={[styles.btnTab,
                  {
                    backgroundColor: this.state.active === 0 ? '#95B8FE' : '#6093FB'
                  },
                ]}>
                  <Text style={[styles.btnTabText, active === 0 ? styles.activeBtnTabText : {}]}>我的预约</Text>
                </Button>
                <View style={styles.line} />
                <Button
                  onPress={() => {
                    this.setState({
                      active: 1,
                    })
                  }}
                  full style={[styles.btnTab,
                  {
                    backgroundColor: this.state.active === 1 ? '#95B8FE' : '#6093FB'
                  },
                ]}>
                  <Text style={[styles.btnTabText, active === 1 ? styles.activeBtnTabText : {}]}>我的挂号</Text>
                </Button>
              </View>
            </Footer>
          </View>
        </ImageBackground>
      </Container>
    );
  }
}
export default withSelectLevelModal(withSelectDoctorModal(withSelectDepartmentModal(withGoToRoomModal(withCancelModal(Home)))));
