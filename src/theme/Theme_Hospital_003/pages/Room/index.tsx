import React from 'react';
import {
    StatusBar,
    Dimensions,
    View,
    Text,
    NativeEventEmitter,
    NativeModules,
    Animated,
    Easing,
    TouchableOpacity,
} from 'react-native';
import {NavigationActions, NavigationEvents} from 'react-navigation';
import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Title,
    Icon,
    Button,
    List,
    ListItem,
    Content,
    FooterTab, Footer
} from 'native-base';
import { connect } from 'react-redux';
import styles from './styles';
import { withAlertModal } from '@/theme/Theme_Hospital_003/components/AlertModal'
import { withLoginModal } from '../../components/LoginModal'
import {META_DATA,ROOM_MESSAGE} from '../../services/api';

import _ from 'lodash';
import FastImage from 'react-native-fast-image';
console.log('NativeModules', NativeModules)
console.log('NativeModules RNVideoViewManager', NativeModules.RNVideoViewManager)
// import YSXVideo from '@/theme/Theme_Meeting/components/YSXVideo';

import loading from './assets/loading_slices/loading.png';
import YSXVideo from "@/components/YSXVideo";
import backIMG from './assets/icon_return_hover_slices/icon_return_hover.png';
import closeIMG from './assets/icon_poweroff_de_slices/icon_poweroff_de.png';

import audio_IMG_1 from './assets/icon_audio_de_slices/icon_audio_de.png';
import audio_IMG_2 from './assets/icon_audio_ac_slices/icon_audio_ac.png';

import video_1 from './assets/icon_video_de_slices2/icon_video_de.png';
import video_2 from './assets/icon_video_ac_slices/icon_video_ac.png';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const { MainViewManager = {}, MainViewController = {} } = NativeModules || {};
const { SDKAuth, SDKLogin, SDKGoToRoom, SDKGetUsers, SDKGetUserInfo, SDKSetVideo, SDKSetAudio } = MainViewController || {};
const { SDKLeaveRoom, SDKEndRoom } = MainViewController || {};

export interface IProps {}

export interface IState {
    SDK_AUTH: boolean;
    SDK_LOGIN: boolean;
    inRoom: boolean;
    userList: number[];
    usersInfo: Array<USER_INO>;
}

export interface USER_INO {
    "accountID": string,
    "emailAddress": string,
    "isHostUser": boolean,
    "isMyself": boolean,
    "userID": number,
    "userName": string,
    "audioStatus": {
        "audioType": number,
        "isMuted": boolean,
        "isTalking": boolean
    },
    "videoStatus": {
        "isReceiving": boolean,
        "isSending": boolean, "isSource": boolean
    }
}

@(connect(({ auth, user }) => {
    return {
        user: user.info,
        token: auth.token,
    }
}) as any)
class Home extends React.Component<IProps, IState> {

    state = {
        SDK_AUTH: false,
        SDK_LOGIN: false,
        rotateVal: new Animated.Value(0),
        inRoom: true,
        userList: [],
        usersInfo: {},
        audioType: true,
        videoType: true,
    };

    constructor(props: IProps) {
        super(props);
        this.componentDidMount = _.debounce(this.componentDidMount, 800);
    }

    animationLoading: any;
    setIntervalGetUsers: any;

    componentDidMount() {
        try {
            // StatusBar.setHidden(true);
            this.addEventBind();
            this.initSDK();
            if (this.animationLoading) {
                Animated.loop(this.animationLoading).stop()
                this.animationLoading = null;
            }
            // this.animationLoading = Animated.timing(
            //     this.state.rotateVal, // 初始值
            //     {
            //         duration: 3000,
            //         toValue: 360, // 终点值
            //         easing: Easing.linear, // 这里使用匀速曲线，详见RN-api-Easing
            //         useNativeDriver: true,
            //     }
            // );
            // Animated.loop(this.animationLoading).start();
        } catch (e) {

        }
        this.getIsMe();
        this.getInfoTime = setInterval(() => {
            if (this) {
                this.getIsMe();
            } else {
                
            }
            
        }, 1000 * 10)
     
    }

    getIsMe = async () => {
        try {
            const { navigation, exams } = this.props;
            const { params = {} } = navigation.state;
          const { id } = this.props.user || {};
          const res = await ROOM_MESSAGE({ mettingNo: params.metaData.MeetingNo  })
          if (res.code === 0) {
            const { nextId, kickId } = res.data || {};

            if (nextId !== id) {
              // 离开房间
              this.showAlert('就诊已结束，祝您身体健康', () => {
                this.goBack();
            }, () => {
                this.goBack();
            }, true)
            }
          } else {
            throw '';
        }
        } catch (e) {
          alert('就诊已结束')
          this.goBack();
        }
      }

    componentWillUnmount(): void {
        if (this.getInfoTime) {
            clearInterval(this.getInfoTime)
            this.getInfoTime = undefined;
        }
        try {
            StatusBar.setHidden(false);
            if (this.subscription) {
                this.subscription.remove();
                this.subscription = null;
            }
            if (this.animationLoading) {
                Animated.loop(this.animationLoading).stop()
                this.animationLoading = null;
            }
            if (this.setIntervalGetUsers) {
                clearInterval(this.setIntervalGetUsers)
                this.setIntervalGetUsers = null;
            }
            SDKLeaveRoom();
        } catch (e) {

        }
    }

    subscription: any;

    addEventBind = () => {
        try {
            const AppEmitter = new NativeEventEmitter(MainViewManager);
            if (this.subscription) {
                this.subscription.remove();
                this.subscription = null;
            }
            this.subscription = AppEmitter.addListener(
                'onYSXSDKChange',
                (reminder = {}) => {
                    console.log(reminder)
                    const { type, data } = reminder;
                    try {
                        switch (type) {
                            case "SDK_MY_AUDIO_STSATE_CHANGE": {
                                this.getUsers();
                                this.setState({
                                    audioType: !reminder.isMyAudioMuted,
                                })
                                break;
                            }
                            case 'SDK_AUTH': {
                                if (data === 0) {
                                    this.setState({
                                        SDK_AUTH: true,
                                    }, () => {
                                        const { token } = this.props;
                                        if (token) {
                                            SDKLogin(token)
                                        }
                                    })
                                } else {
                                    console.log(`sdk认证失败code：${data}`);
                                    this.goBack();
                                }
                                break;
                            }
                            case 'SDK_LOGIN': {
                                if (data === 0) {
                                    this.setState({
                                        SDK_LOGIN: true,
                                    }, () => {
                                        this.goToRoom()
                                    })
                                } else {
                                    console.log(`sdk登陆失败code：${data}`);
                                    this.goBack();
                                }
                                break;
                            }
                            case 'SDK_LOGOUT': {
                                if (data === 0) {
                                    this.setState({
                                        SDK_LOGIN: false,
                                    })
                                } else {
                                    console.log(`sdk退出失败code：${data}`);
                                    this.goBack();
                                }
                                break;
                            }
                            case 'SDK_ERROR': {
                                this.getUsers();
                                switch (data) {
                                  // 启会／加入成功
                                    case 0: {
                                        this.setState({
                                            inRoom: true,
                                        }, () => {
                                            if (this.setIntervalGetUsers) {
                                                clearInterval(this.setIntervalGetUsers)
                                                this.setIntervalGetUsers = null;
                                            }
                                            this.getUsers()
                                            this.setIntervalGetUsers = setInterval(() => {
                                                this.getUsers()
                                            }, 1000 * 10 * 1);
                                        })
                                        break;
                                    }
                                  // 会议已结束
                                    case 6: {
                                        this.showAlert('就诊已结束', () => {
                                            this.goBack();
                                        }, () => {
                                            this.goBack();
                                        })
                                        break
                                    }
                                    // 被主持人移除
                                    case 61: {
                                        this.showAlert('就诊已结束，祝您身体健康', () => {
                                            this.goBack();
                                        }, () => {
                                            this.goBack();
                                        })
                                        break
                                    }
                                    default: {
                                        this.showAlert(`错误code: ${data}`, () => {
                                            this.goBack();
                                        })
                                    }
                                }
                                break;
                            }
                            case "SDK_JOIN_MEETING": {
                                this.getUsers();
                                console.log(`添加${data}`)
                                break;
                            }
                            case "SDK_LEAVE_MEETING": {
                                this.getUsers();
                                console.log(`离开${data}`)
                                break;
                            }
                            default: {

                            }
                        }
                    } catch (e) {
                        alert(e)
                    }
                }
            );
        } catch (e) {
            console.log(e)
        }
    }

    getUsers = async () => {
        try {
            const res = await SDKGetUsers()
            console.log('getUsers: ', res)
            this.setState({
                userList: (_.isArray(res) ? res : []),
            }, () => {
                this.state.userList.map(async (item) => {
                    await this.getUserInfo(item)
                })
            });
        } catch (e) {
            alert(e)
        }
    }

    getUserInfo = async (userID: number) => {
        try {
            const userInfo = await SDKGetUserInfo(userID);
            console.log('userInfo: ', userInfo)
            this.setState({
                usersInfo: {
                  ...this.state.usersInfo,
                  [userID]: userInfo,
                }
            })
        } catch (e) {

        }
    }

    goBack() {
        const { dispatch } = this.props;
        dispatch(NavigationActions.back());
        SDKLeaveRoom();
    }

    async initSDK() {
        try {
            await SDKAuth('CDxp0JymWh0j0H2EkOat88m69cfxbcWJytLV', 'Sc0kQUDPrHYcmLMIuz8hKwCnpGwdeeoD127v');
        } catch (e) {
            console.log(e)
        }
    }

    showAlert(text, onOk, onClear, oneBtn) {
        if (this.props.handleShowAlertModal) {
            this.props.handleShowAlertModal({
                text,
                onOk,
                onClear,
                oneBtn
            })
        }
    }

    goToRoom() {
        try {
            const { navigation, exams } = this.props;
            const { params = {} } = navigation.state;
            if (_.isObject(params.metaData)) {
                const metaData: META_DATA = params.metaData
                setTimeout(() => {
                    SDKGoToRoom(`${metaData.MeetingNo}`, "", `${metaData.Id}`, `${metaData.MeetingType}`, true);
                }, 2000)

            } else {
                throw '房间信息有误'
            }
        } catch (e) {
            alert(e)
            this.goBack()
        }
    }

    handleSDKSetVideo = async () => {
        try {
            const i = await SDKSetVideo();
            console.log(i)
            this.setState({
                videoType: !this.state.videoType,
            })
        } catch (e) {
            alert(e)
        }
    }

    handleSDKSetAudio = async () => {
        try {
            const i = await SDKSetAudio();
            console.log(i)
            this.setState({
                audioType: i,
            })
        } catch (e) {
            alert(e)
        }
    }

    renderVideo() {
        const { userList = [], usersInfo = {} } = this.state;
        const list = userList;
        const width = Dimensions.get('window').width;
        const videoWidth = width/2;
        return <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap'
        }}>
            {
                list.map((item, index) => {
                    const info = usersInfo[item] || {};
                    return <TouchableOpacity
                      key={JSON.stringify(item)}
                      onPress={() => {
                          this.setState({
                              bigVideoUserID: item,
                          })
                      }}
                    >
                        <View
                          style={{
                              width: videoWidth,
                              height: videoWidth,
                              backgroundColor: '#000'
                          }}
                        >
                            <YSXVideo
                              uid={item}
                              style={{
                                  width: videoWidth,
                                  height: videoWidth,
                              }}
                            />
                            <View style={styles.userNameWrap}>
                                <Text style={styles.userNameText}>{info.userName || info.userID || item || '加载中...'}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                })
            }

        </View>
    }

    renderBigVideo(userID: number)  {
        const { userList = [], usersInfo = {} } = this.state;
        const width = Dimensions.get('window').width;
        const height = Dimensions.get('window').height;
        const videoWidth = width;
        const videoHiehgt = height;
        const info = usersInfo[userID] || {};
        return <TouchableOpacity
          onPress={() => {
              this.setState({
                  bigVideoUserID: undefined,
              })
          }}
        >
            <View style={{
                width: videoWidth,
                height: videoWidth,
                flexDirection: 'row',
                flexWrap: 'wrap',
                backgroundColor: '#000'
            }}>
                <View
                  style={{
                      width: videoWidth,
                      height: videoWidth,
                      backgroundColor: '#000'
                  }}
                  key={JSON.stringify(userID)}>
                    <YSXVideo
                      uid={userID}
                      style={{
                          width: videoWidth,
                          height: videoHiehgt,
                      }}
                    />
                    <View style={styles.userNameWrap}>
                        <Text style={styles.userNameText}>{info.userName || '加载中...'}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    }
    renderHost() {
        const { bigVideoUserID, userList, usersInfo = {} } = this.state;
        const hostUser = userList.filter((id) => {
            return (usersInfo[id] || {}).isHostUser
        })
        const userID = hostUser && hostUser.length ? hostUser[0] : undefined;
        const info = usersInfo[userID] || {};
        const width = Dimensions.get('window').width;
        const height = Dimensions.get('window').height;
        return <View
          style={{
              flex: 1,
              position: 'absolute',
              width,
              height,
              flexGrow: 1,
              justifyContent: 'center',
              alignItems: 'center',
          }}
        >
            {
                userID ? (
                  <YSXVideo
                    uid={userID}
                    style={{
                        width,
                        height,
                    }}
                  />
                ) : <View>
                    <Text style={styles.loadingTText}>等待医生进入诊室</Text>
                </View>
            }
        </View>
    }
    renderMe() {
        const { bigVideoUserID, userList, usersInfo = {} } = this.state;
        const meUser = userList.filter((id) => {
            return (usersInfo[id] || {}).isMyself
        })
        const userID = meUser && meUser.length ? meUser[0] : undefined;
        const info = usersInfo[userID] || {};
        return <View
          style={{
              position: 'absolute',
              right: 17,
              top: 70 + getStatusBarHeight(),
              width: 120,
              height: 151,
              backgroundColor: '#000',
              borderWidth: 1,
              borderColor: '#FFFFFF',
              overflow: 'hidden'
          }}
        >
            {
                userID ? (
                  <YSXVideo
                    uid={userID}
                    style={{
                        width: 120,
                        height: 151,
                    }}
                  />
                ) : undefined
            }
            {/*<View style={styles.userNameWrap}>*/}
            {/*    <Text style={styles.userNameText}>{info.userName || info.userID || '加载中...'}</Text>*/}
            {/*</View>*/}
        </View>
    }
    render() {
        const { bigVideoUserID, userList, usersInfo = {} } = this.state;
        const hostUser = userList.filter((id) => {
            return (usersInfo[id] || {}).isHostUser
        })
        const meUser = userList.filter((id) => {
            return (usersInfo[id] || {}).isMyself
        })
        console.log(meUser, "主持人");
        return (
            <Container style={[
                styles.container,
                !this.state.inRoom ? {
                    backgroundColor: '#16183E',
                } : {
                    backgroundColor: '#16183E',
                }
            ]}>
                <NavigationEvents
                    onWillFocus={async payload => {

                    }}
                    onDidFocus={async payload => {
                        await this.componentDidMount();
                    }}
                    onWillBlur={payload => {

                    }}
                    onDidBlur={payload => {

                    }}
                />
                {
                     this.state.inRoom ? (
                        <Header>
                            <Left>
                                <Button
                                    transparent
                                    onPress={() => {
                                        const { dispatch } = this.props;
                                        dispatch(NavigationActions.back());
                                    }}
                                >
                                    <Icon style={{ paddingHorizontal: 12, color: '#fff', fontSize: 26 }} name='arrow-back' />
                                </Button>
                            </Left>
                            <Body style={{
                                    flexGrow: 1,
                                    paddingRight: 35,
                                    justifyContent: 'center',
                                    height: 50,
                                }}>
                                    <View style={{
                                        flexGrow: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: 50,
                                    }}>
                                        <Button
                                        style={styles.btnWrap}
                                        onPress={() => {
                                            this.handleSDKSetAudio();
                                        }}>
                                            <FastImage
                                            style={{
                                                width: 30,
                                                height: 27,
                                                alignContent: 'center',
                                                justifyContent: 'center',
                                            }}
                                            source={this.state.audioType ? audio_IMG_1 : audio_IMG_2}
                                            resizeMode={FastImage.resizeMode.contain}
                                            />
                                        </Button>
                                        <Button
                                        style={styles.btnWrap}
                                        onPress={() => {
                                            this.handleSDKSetVideo();
                                        }}>
                                            <FastImage
                                            style={{
                                                width: 37,
                                                height: 27,
                                                alignContent: 'center',
                                                justifyContent: 'center',
                                            }}
                                            source={this.state.videoType ? video_1 : video_2}
                                            resizeMode={FastImage.resizeMode.contain}
                                            />
                                        </Button>
                                    </View>
                                </Body>
                            <Right />
                        </Header>
                     ) : null
                }
                <Content
                    style={{
                        flex: 1,
                        flexGrow: 1,
                    }}
                    contentContainerStyle={{
                        flex: 1,
                        flexGrow: 1,
                    }}
                >
                    {/* <View style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 36,
                        zIndex: 99999999999,
                        width: 50,
                        height: 50,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Button
                          transparent
                          onPress={() => {
                              const { dispatch } = this.props;
                              dispatch(NavigationActions.back());
                          }}
                        >
                            <FastImage
                              style={{
                                  width: 28,
                                  height: 28,
                                  alignContent: 'center',
                                  justifyContent: 'center',
                              }}
                              source={require('./assets/ico_arrowleft_slices/ico_arrowleft.png')}
                              resizeMode={FastImage.resizeMode.contain}
                            />
                        </Button>
                    </View> */}
                    {
                        !this.state.inRoom ? (
                            <View style={{ flex: 1, flexGrow: 1, paddingHorizontal: 12, justifyContent: 'center', alignItems: 'center' }}>
                                <Animated.View style={[
                                    styles.loadingWrap,
                                ]}>
                                    <Animated.View style={[
                                        {
                                            transform: [{ // 动画属性
                                                rotate: this.state.rotateVal.interpolate({
                                                    inputRange: [0, 360],
                                                    outputRange: ['0deg', '360deg'],
                                                })
                                            }]
                                        }
                                    ]}>
                                        <FastImage
                                            style={{
                                                width: 176,
                                                height: 187,
                                                alignContent: 'center',
                                                justifyContent: 'center',
                                            }}
                                            source={require('./assets/Bitmap_slices/Bitmap.png')}
                                            resizeMode={FastImage.resizeMode.contain}
                                        />
                                    </Animated.View>
                                    <Text style={styles.loadingText}>正在进入诊室，请稍等</Text>
                                </Animated.View>
                            </View>
                        ) : <View>
                            {this.renderHost()}
                        </View>
                    }
                </Content>
                {this.state.inRoom ? this.renderMe() : undefined}
            </Container>
        );
    }
}
export default withAlertModal(withLoginModal(Home));
