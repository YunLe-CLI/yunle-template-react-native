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
    isToday: false,
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
      <CardItem button onPress={() => {
        // this.props.dispatch(NavigationActions.navigate({
        //   routeName: 'AppointmentDetails',
        //   params: {},
        // }));
      }} style={styles.itemBoxBody}>
        <View style={styles.itemBoxContent}>
          <View style={{
             flex: 1,
             flexGrow: 1,
             marginBottom: 19,
             width: '100%'
          }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexGrow: 1,
                }}
                onPress={() => {
                  this.props.dispatch(NavigationActions.navigate({
                    routeName: 'Room',
                    params: {
                      metaData: data.metaData,
                    },
                  }))
                }}
              >
                <View style={{
                  flex: 1,
                  flexGrow: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <Text style={{
                    flexGrow: 1,
                  }}>
                    {typeText}
                  </Text>
                  <Text  style={{
                    flexGrow: 1,
                    textAlign: 'center'
                  }}>
                    {data.timeslot === 1 ? '上午' : ''}
                    {data.timeslot === 2 ? '下午' : ''}
                  </Text>
                  <View style={{
                    flexGrow: 1,
                  }}>
                    <View style={styles.itemBodyBtnWrap}>
                      {
                        (type === 1) ? <LinearGradient
                          start={{x: 0, y: 0}} end={{x: 1, y: 1}}
                          colors={['#999999', '#999999']}
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
                          colors={['#5277F1', '#5277F1']}
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
              </TouchableOpacity>
          </View>
          
          <Text style={[styles.itemBodyText, styles.itemBodyText001]}>
                    {data.medicalDepartment}
                    <View style={{ width: 56 }}/>
                    {data.hospitalName}{data.professionalTitle} {data.name}
          </Text>
          <View style={[styles.itemBoxFooter]}>
            {
              data.position >= 0 ? (
                <Text numberOfLines={2} style={[styles.itemBodyText]}>
                  目前还有
                  <Text style={[styles.itemBodyText, styles.itemBodyText002]}>{data.position}</Text>
                  人
                </Text>
              ) : undefined
            }

            
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
    if(this.state.isToday) {
      list = [todayList]
    } else {
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
          {this.renderItem(item)}
        </View>
      }}
      renderSectionHeader={({ section: { title } }) => {
        return <View />
      }}
      sections={list || []}
      ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
      ListEmptyComponent={() => {
        return <View />
      }}
      keyExtractor={(item, index) => JSON.stringify(item)}
      renderSectionFooter={() => <View><View style={{ height: 1 }} /></View>}
    />
  }

  renderTabForm() {
    const { segmentActive, department, level } = this.state;
    const { handleShowSelectDepartmentModal, handleShowSelectLevelModal } = this.props;
    return <Content contentContainerStyle={styles.formContent}>
      <Card noShadow style={styles.formCard}>
  
        <CardItem
          onPress={() => {
            handleShowSelectDepartmentModal((department) => {
              this.setState({
                department,
              })
            })
          }}
          button style={styles.formItem}>
          <Text style={styles.formItemLabel}>选择挂号类型</Text>
          <Right style={{
            flexGrow: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
            <Button
              transparent
              onPress={() => {
                this.setState({
                  segmentActive: 0,
                })
              }}
              style={styles.segmentBtn} active={segmentActive === 0} first>
                <View style={{
                  borderColor:'#979797',
                  borderWidth: 1,
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor:segmentActive=== 1 ? '#fff' : '#5277F1',
                }}>
                  <View></View>
                </View>
                <Text style={styles.segmentBtnText}>挂号当日</Text>
              </Button>
            <Button
            transparent
              onPress={() => {
                this.setState({
                  segmentActive: 1,
                })
              }}
              style={styles.segmentBtn} active={segmentActive === 1} last>
                <View style={{
                  borderColor:'#979797',
                  borderWidth: 1,
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor:segmentActive === 0 ? '#fff' : '#5277F1',
                }}>
                  <View></View>
                </View>
                <Text style={styles.segmentBtnText}>预约挂号</Text>
            </Button>
          </Right>
        </CardItem>
        <CardItem
          onPress={() => {
            handleShowSelectDepartmentModal((department) => {
              this.setState({
                department,
              })
            })
          }}
          button style={styles.formItem}>
          <Text style={styles.formItemLabel}>选择科室</Text>
          <Text style={[styles.ipt, department ? { color: '#404E66' } : {}, {
            textAlign: 'right',
            marginRight: -70,
          }]}>{department || '请选择科室'}</Text>
          <Right>
            <Icon style={{ fontSize: 16, color: '#D0D0D0' }} name="arrow-down" />
          </Right>
        </CardItem>
        {/* <CardItem
          onPress={() => {
            handleShowSelectLevelModal((level) => {
              this.setState({
                level,
              })
            })
          }}
          button style={styles.formItem}>
          <Text style={styles.formItemLabel}>医生职称</Text>
          <Text style={[styles.ipt, level ? { color: '#404E66' } : {}]}>{level || '请选择医生职称'}</Text>
          <Right>
            <Icon style={{ fontSize: 16, color: '#404E66' }} name="arrow-forward" />
          </Right>
        </CardItem> */}
        <CardItem style={[styles.formItem, {
          marginTop: 100,
        }]}>
          <LinearGradient
            start={{x: 0, y: 0}} end={{x: 1, y: 1}}
            colors={['#5277F1', '#5277F1']}
            style={[
              styles.linearGradientBtn2,
              {
                opacity: department ? 1 : 0.4
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
                    department
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
          source={home_bg_slices}
          style={{
            width: '100%',
          }}
        >
          <Header transparent>
              <Left>
                {
                  this.state.active ? (
                    <Button
                      transparent
                      onPress={() => {
                          // const { dispatch } = this.props;
                          // dispatch(NavigationActions.back());
                          this.setState({
                            active: 0,
                          })
                      }}
                  >
                      <Icon style={{ paddingHorizontal: 12, color: '#fff', fontSize: 26 }} name='arrow-back' />
                  </Button>
                  ) : null
                }
                  
              </Left>
              <Body>
                  <Title style={{ color: '#fff' }}>{this.state.active === 0 ? '我的预约' : '挂号预约'}</Title>
              </Body>
              <Right />
          </Header>
          <View
            style={{
              paddingVertical: 39,
              flexGrow: 1,
              // justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}
          >
            <View>
              <FastImage
                style={{
                  marginLeft: 54,
                  marginRight: 14,
                  width: 50,
                  height: 50,
                  alignContent: 'center',
                  justifyContent: 'center',
                }}
                source={userImg}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            {
              this.state.active === 0 ? (
                <>
                <Text style={{
                  color: '#404E66',
                  fontSize: 15,
                  lineHeight: 22.5,
                  fontWeight: '400',
                }}>{user.name || '未知'}</Text>
                <Text style={{
                  position: 'absolute',
                  bottom: 11,
                  right: 23,
                  fontSize: 11,
                }}>
                就诊量：<Text style={{
                  fontSize: 11,
                  color: '#5277F1'
                }}>120</Text>
                </Text>
                </>
              ) : null
            }
            
          </View>
        </ImageBackground>
        <View
          style={{
            flex: 1,
            flexGrow: 1,
            overflow: 'hidden',
            backgroundColor: '#F9FBFF',
          }}
        >
          {
            this.state.active === 0 ? (
              <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Button
                  transparent
                  onPress={() => {
                    this.setState({
                      isToday: true,
                    })
                  }}
                  full style={[styles.btnTab, {
                    flexGrow: 1,
                  }]}>
                    <View style={{
                      borderBottomColor: this.state.isToday ? '#5277F1' : 'transparent',
                      borderBottomWidth: 1,
                    }}>
                      <Text style={[styles.btnTabText, this.state.isToday ? styles.activeBtnTabText : {}, {
                        paddingBottom: 3.5,
                        paddingLeft: 0,
                        paddingRight: 0,
                        fontSize: 15,
                        fontWeight: '500'
                      }]}>我的预约</Text>
                    </View>
                </Button>
                <View style={styles.line} />
                <Button
                  transparent
                  onPress={() => {
                    this.setState({
                      isToday: false,
                    })
                  }}
                  full style={[styles.btnTab, {
                    flexGrow: 1,
                  }]}>
                    <View style={{
                      borderBottomColor: !this.state.isToday ? '#5277F1' : 'transparent',
                      borderBottomWidth: 1,
                    }}>
                      <Text style={[styles.btnTabText, !this.state.isToday ? styles.activeBtnTabText : {}, {
                        paddingBottom: 3.5,
                        paddingLeft: 0,
                        paddingRight: 0,
                        fontSize: 15,
                        fontWeight: '500'
                      }]}>挂号预约</Text>
                    </View>
                </Button>
              </View>
            ) : null
          }
          
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
                backgroundColor: '#F9FBFF',
              }}
              heading="1">
              {this.renderTabList()}
            </Tab>
            <Tab
              style={{
                backgroundColor: '#F9FBFF',
              }}
              heading="2">
              {this.renderTabForm()}
            </Tab>
          </Tabs>
        </View>
        {
          this.state.active === 0 ? (
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
                  <Text style={[styles.btnTabText, active === 0 ? styles.activeBtnTabText : {}]}>我的预约</Text>
                </Button>
                <View style={styles.line} />
                <Button
                  onPress={() => {
                    this.setState({
                      active: 1,
                    })
                  }}
                  full style={styles.btnTab}>
                  <Text style={[styles.btnTabText, active === 1 ? styles.activeBtnTabText : {}]}>挂号预约</Text>
                </Button>
              </FooterTab>
            </Footer>
          ) : null
        }
      </Container>
    );
  }
}
export default withSelectLevelModal(withSelectDoctorModal(withSelectDepartmentModal(withGoToRoomModal(withCancelModal(Home)))));
