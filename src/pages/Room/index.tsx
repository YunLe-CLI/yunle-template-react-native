import React from 'react';
import { View, Text, NativeEventEmitter, NativeModules, Animated, Easing } from 'react-native';
import {NavigationActions, NavigationEvents} from 'react-navigation';
import {Container, Header, Left, Body, Right, Title, Icon, Button, List, ListItem, Content} from 'native-base';
import { connect } from 'react-redux';
import styles from './styles';
import { withCheckAppUpdate } from '@/components/CheckAppUpdate'
import { withLoginModal } from '@/components/LoginModal'
import {META_DATA} from '@/services/api';

import _ from 'lodash';
import FastImage from 'react-native-fast-image';

import loading from './assets/loading_slices/loading.png';

const { MainViewManager = {}, MainViewController = {} } = NativeModules || {};
const { SDKAuth, SDKLogin, SDKGoToRoom } = MainViewController || {};

export interface IProps {}

export interface IState {
  SDK_AUTH: boolean;
  SDK_LOGIN: boolean;
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
  };

  constructor(props: IProps) {
    super(props);
    this.componentDidMount = _.debounce(this.componentDidMount, 800);
  }

  animationLoading: any;

  componentDidMount() {
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
  }

  componentWillUnmount(): void {
    if (this.subscription) {
      this.subscription.remove();
      this.subscription = null;
    }
    if (this.animationLoading) {
      Animated.loop(this.animationLoading).stop()
      this.animationLoading = null;
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
                this.setState({
                  SDK_AUTH: !!data,
                }, () => {
                  const { token } = this.props;
                  if (token && !!data) {
                    SDKLogin(token)
                  }
                })
                break;
              }
              case 'SDK_LOGIN': {
                this.setState({
                  SDK_LOGIN: !!data,
                }, () => {
                  if (!!data) {
                    this.goToRoom()
                  }
                })
                break;
              }
              case 'SDK_LOGOUT': {
                this.setState({
                  SDK_LOGIN: !!!data,
                })
                break;
              }
              case 'SDK_ERROR': {
                break;
              }
              default: {

              }
            }
          } catch (e) {

          }

        }
      );
    } catch (e) {
      console.log(e)
    }
  }

  goBack() {

    const { dispatch } = this.props;
    dispatch(NavigationActions.back());
    // SDKLeaveRoom();
  }

  async initSDK() {
    try {
      await SDKAuth('Iratlr8ZCaVgyPJ5O8xcaNzSUYcEMFd9y1nm', 'ft7jnlQj28pqasbbBqTlRdR1LdbzUaqabgIv');
    } catch (e) {
      console.log(e)
    }
  }

  goToRoom() {
    try {
      const { navigation, exams } = this.props;
      const { params = {} } = navigation.state;
      if (_.isObject(params.metaData)) {
        const metaData: META_DATA = params.metaData
        setTimeout(() => {
          SDKGoToRoom(`${metaData.MeetingNo}`, "", `${metaData.Id}`, `${metaData.MeetingType}`)
        }, 2000)
        setTimeout(() => {
          this.goBack()
        }, 1000 * 10)
      } else {
        throw '房间信息有误'
      }
    } catch (e) {
      alert(e)
      this.goBack()
    }
  }

  render() {
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
            <Header transparent>
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
                <Body>

                </Body>
                <Right />
            </Header>
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
                  <Text style={styles.loadingText}>正在进入，请稍后</Text>
                </Animated.View>
            </View>
        </Container>
    );
  }
}
export default withCheckAppUpdate(withLoginModal(Home));
