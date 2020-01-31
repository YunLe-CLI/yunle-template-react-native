import React from 'react';
import { StatusBar, ScrollView, Dimensions, View} from 'react-native';
import { connect } from 'react-redux';
import {Container, Header, Left, Body, Right, Title, Content, Button, Icon} from 'native-base';
import styles from './styles';
import {NavigationActions, NavigationEvents} from 'react-navigation';
import VideoPlayer from '../../components/react-native-aliyun-vod-controls'
import Orientation, {OrientationType} from "react-native-orientation-locker";
import AutoHeightWebView from 'react-native-autoheight-webview'
import _ from "lodash";

export interface IProps {}

export interface IState {
    orientationType: OrientationType,
}

@(connect() as any)
class Home extends React.Component<IProps, IState> {

    constructor(props) {
        super(props);
        this.onSizeUpdated = _.debounce(this.onSizeUpdated, 1000)
    }

    state = {
        orientationType: 'PORTRAIT',
        videoWrap: {
            width: undefined,
            height: undefined,
        },
        video: {
            videoUrl: '',
            width: 1280,
            height: 720,
            fullScreenWidth: Dimensions.get('window').height,
            fullScreenHeight: Dimensions.get('window').width,
            duration: 0,
        }
    };

    onSizeUpdated = (size) => {
        this.setState({
            webHeight: size.height,
        })
    }

    render() {
        const { orientationType, video } = this.state;
        const { navigation } = this.props;
        const { playbackURL = '', title = '' } = navigation.state.params;
        return (
          <Container style={styles.container}>
              <View style={{
                  position:'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  zIndex: 9999,
                  elevation: 9999,
              }}>
                  <Header transparent
                          iosBarStyle={"light-content"}
                  >
                      <Left>
                          <Button
                            transparent
                            onPress={() => {
                                const { dispatch } = this.props;
                                Orientation.getOrientation((orientationType) => {
                                    if (orientationType === 'PORTRAIT') {
                                        dispatch(NavigationActions.back());
                                    } else {
                                        Orientation.lockToPortrait();
                                    }
                                    this.setState({
                                        orientationType,
                                    })
                                })
                            }}
                          >
                              <Icon style={{ paddingHorizontal: 12, color: '#fff', fontSize: 26 }} name='arrow-back' />
                          </Button>
                      </Left>
                      <Body >
                          <Title style={{
                              color: '#fff'
                          }}>{title}</Title>
                      </Body>
                      <Right />
                  </Header>
              </View>
              <View
                ref={e => this.videoRef = e}
                style={{
                    // position:'absolute',
                    // top: 0,
                    // left: 0,
                    // zIndex: 3,
                }}
              >
                  <NavigationEvents
                    onWillFocus={payload => {
                        Orientation.lockToPortrait();
                    }}
                    onDidFocus={payload => {
                        Orientation.lockToPortrait();
                    }}
                    onWillBlur={payload => {
                        Orientation.lockToPortrait();
                    }}
                    onDidBlur={payload => {
                        Orientation.lockToPortrait();
                    }}
                  />
                  <StatusBar hidden={orientationType !== 'PORTRAIT'} />
                  <VideoPlayer
                    video={{ uri: this.state.videoUrl || playbackURL }}
                    videoWidth={orientationType === 'PORTRAIT' ? video.width : video.fullScreenWidth}
                    videoHeight={orientationType === 'PORTRAIT' ? video.height : video.fullScreenHeight}
                    onLayout={(event) => {
                        console.log(event.nativeEvent.layout)
                        const { width, height } = event.nativeEvent.layout;
                    }}
                    duration={this.state.video.duration}
                    ref={r => this.player = r}
                    onToggleFullScreen={() => {
                        Orientation.getOrientation((orientationType) => {
                            if (orientationType === 'PORTRAIT') {
                                Orientation.lockToLandscapeRight();
                                this.setState({
                                    orientationType: 'LANDSCAPE-RIGHT',
                                })
                            } else {
                                Orientation.lockToPortrait();
                                this.setState({
                                    orientationType: 'PORTRAIT',
                                })
                            }
                            console.log(orientationType, video)

                        })
                    }}
                  />

              </View>
          </Container>
        );
    }
}
export default Home;
