import React from 'react';
import {
    FlatList,
    StatusBar,
    Dimensions,
    View,
    Text,
    NativeEventEmitter,
    NativeModules,
    Animated,
    Easing,
    TouchableOpacity,
    SafeAreaView,
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
import { withAlertModal } from '@/theme/Theme_Education_002/components/AlertModal'
import { withLoginModal } from '../../components/LoginModal'
import {META_DATA} from '../../services/api';

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

import share_1 from './assets/ico_share_slices/ico_share.png';
import share_2 from './assets/icon_share_active_slices/icon_share_active.png';
import Modal from 'react-native-modal';
import {withYSXLocalShareModal} from '@/components/YSXLocalShareModal';
import {withYSXRemoteShareModal} from '@/components/YSXRemoteShareModal';

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

@(connect(({ auth }) => {
    return {
        token: auth.token,
    }
}) as any)
class Home extends React.Component<IProps, IState> {

    state = {
        SDK_AUTH: false,
        SDK_LOGIN: false,
        rotateVal: new Animated.Value(0),
        inRoom: false,
        userList: [],
        usersInfo: {},
        audioType: true,
        videoType: true,
        shareType: false,
        up: false,
    };

    constructor(props: IProps) {
        super(props);
        this.componentDidMount = _.debounce(this.componentDidMount, 800);
    }

    animationLoading: any;
    setIntervalGetUsers: any;

    componentDidMount() {
        try {
            StatusBar.setHidden(true);
            this.addEventBind();
            this.initSDK();
            if (this.animationLoading) {
                Animated.loop(this.animationLoading).stop()
                this.animationLoading = null;
            }
            this.animationLoading = Animated.timing(
                this.state.rotateVal, // 初始值
                {
                    duration: 3000,
                    toValue: 360, // 终点值
                    easing: Easing.linear, // 这里使用匀速曲线，详见RN-api-Easing
                    useNativeDriver: true,
                }
            );
            Animated.loop(this.animationLoading).start();
        } catch (e) {

        }
    }

    componentWillUnmount(): void {
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
                            case "SDK_ACTIVE_SHARE": {
                                //共享开始时的回调事件。
                                this.getUsers();
                                if (data) {
                                    this.setState({
                                        shareType: true,
                                    })
                                    this.props.handleShowYSXRemoteShareModal(data, () => {
                                        this.setState({
                                            shareType: false,
                                        })
                                    })
                                } else {
                                    this.props.handleHideYSXRemoteShareModal()
                                    this.setState({
                                        shareType: false,
                                    })
                                }
                                break;
                            }
                            case "SDK_ACTIVE_SHARE_RECEIVIING": {
                                //共享内容更改时的回调事件。
                                this.getUsers();
                                if (data) {
                                    this.setState({
                                        shareType: true,
                                    })
                                    this.props.handleShowYSXRemoteShareModal(data, () => {
                                        this.setState({
                                            shareType: false,
                                        })
                                    })
                                } else {
                                    this.props.handleHideYSXRemoteShareModal()
                                    this.setState({
                                        shareType: false,
                                    })
                                }
                                break;
                            }
                            case "SDK_ACTIVE_SHARE_SIZE_CHANGE": {
                                //共享者调整共享内容大小时的回调事件。
                                this.getUsers();
                                if (data) {
                                    this.setState({
                                        shareType: true,
                                    })
                                    this.props.handleShowYSXRemoteShareModal(data, () => {
                                        this.setState({
                                            shareType: false,
                                        })
                                    })
                                } else {
                                    this.props.handleHideYSXRemoteShareModal()
                                    this.setState({
                                        shareType: false,
                                    })
                                }
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

    showAlert(text, onOk, onClear) {
        if (this.props.handleShowAlertModal) {
            this.props.handleShowAlertModal({
                text,
                onOk,
                onClear,
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

    renderVideo = ({ item }) => {
        const { userList = [], usersInfo = {} } = this.state;
        const list = userList;
        const width = Dimensions.get('window').width;
        const videoWidth = 135;
        const info = usersInfo[item] || {};
        if (info.isHostUser) {
            return null;
        }
        return <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap'
        }}>
            <TouchableOpacity
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
        const height = Dimensions.get('window').width / (375/211);
        return <View
          style={{
              flexGrow: 1,
              // width,
              // height,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#000'
          }}
        >
            {
                userID ? (
                  <YSXVideo
                    uid={userID}
                    style={{
                        flexGrow: 1,
                        width,
                        height,
                    }}
                  />
                ) : <View>
                    <Text style={styles.loadingTText}>老师正在赶来，请稍等…</Text>
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
              right: 16,
              top: 45,
              width: 102,
              height: 102,
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
                        width: 100,
                        height: 100,
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
            <Container style={styles.container}>
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
                    this.state.inRoom ? <Header transparent style={styles.footerWrap}>
                        <Left>
                            <View style={{
                                flexGrow: 1,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Button
                                  style={styles.btnWrap}
                                  onPress={() => {
                                      this.showAlert(`是否退出`, () => {
                                          this.goBack();
                                      })
                                  }}>
                                    <FastImage
                                      style={{
                                          width: 32,
                                          height: 32,
                                          alignContent: 'center',
                                          justifyContent: 'center',
                                      }}
                                      source={require('./assets/left-circle_slices/left-circle.png')}
                                      resizeMode={FastImage.resizeMode.contain}
                                    />
                                </Button>
                            </View>
                        </Left>
                        <Body style={{
                            flexGrow: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <View style={{
                                marginLeft: 16,
                                flexGrow: 1,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Button
                                  style={styles.btnWrap}
                                  onPress={() => {
                                      this.handleSDKSetAudio();
                                  }}>
                                    <FastImage
                                      style={{
                                          width: 32,
                                          height: 32,
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
                                          width: 32,
                                          height: 32,
                                          alignContent: 'center',
                                          justifyContent: 'center',
                                      }}
                                      source={this.state.videoType ? video_1 : video_2}
                                      resizeMode={FastImage.resizeMode.contain}
                                    />
                                </Button>
                                <Button
                                  style={styles.btnWrap}
                                  onPress={() => {
                                      if (this.state.shareType) {
                                          this.setState({
                                              shareType: false,
                                          })
                                          this.props.handleHideYSXRemoteShareModal()
                                          this.props.handleHideYSXLocalShareModal()
                                      } else {
                                          this.setState({
                                              shareType: true,
                                          })
                                          this.props.handleShowYSXLocalShareModal(1, () => {
                                              this.setState({
                                                  shareType: false,
                                              })
                                          })
                                      }
                                  }}>
                                    <FastImage
                                      style={{
                                          width: 32,
                                          height: 32,
                                          alignContent: 'center',
                                          justifyContent: 'center',
                                      }}
                                      source={!this.state.shareType ? share_1 : share_2}
                                      resizeMode={FastImage.resizeMode.contain}
                                    />
                                </Button>
                            </View>
                        </Body>
                        <Right>
                            <View style={{
                                flexGrow: 1,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>

                            </View>
                        </Right>
                    </Header> : undefined
                }
                <View
                    style={{
                        flex: 1,
                        flexGrow: 1,
                    }}
                    contentContainerStyle={{
                        flex: 1,
                        flexGrow: 1,
                    }}
                >
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
                                                width: 48,
                                                height: 48,
                                                alignContent: 'center',
                                                justifyContent: 'center',
                                            }}
                                            source={loading}
                                            resizeMode={FastImage.resizeMode.contain}
                                        />
                                    </Animated.View>
                                    <Text style={styles.loadingText}>正在进入课堂，请稍后</Text>
                                </Animated.View>
                            </View>
                        ) : <View style={{
                            flexGrow: 1,
                        }}>
                            {this.renderHost()}
                            <View style={{
                                height: 135,
                            }}>
                                <FlatList
                                  style={{
                                      flexGrow: 1,
                                  }}
                                  contentContainerStyle={{
                                      paddingHorizontal: 0,
                                      paddingVertical: 0,
                                  }}
                                  data={this.state.userList}
                                  keyExtractor={(item, index) => item}
                                  ItemSeparatorComponent={() => <View style={{ width: 0, }} />}
                                  renderItem={this.renderVideo}
                                  horizontal={true}
                                  showsHorizontalScrollIndicator={false}
                                />
                            </View>
                        </View>
                    }
                </View>
            </Container>
        );
    }
}
export default withYSXLocalShareModal(withYSXRemoteShareModal(withAlertModal(withLoginModal(Home))));
