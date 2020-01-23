import React from 'react';
import {Dimensions, View} from 'react-native';
import { NavigationActions } from 'react-navigation';
import {Text, Container, Header, Left, Body, Right, Title, Icon, Button, List, ListItem, Content} from 'native-base';
import { connect } from 'react-redux';
import styles from './styles';
import { getOnlineAppVersion } from '@/services/api'
import VideoPlayer from '../../components/react-native-aliyun-vod-controls'
import nativeAutoUpdate from '@/utils/native-auto-update';
import { checkAppVersion } from '@/utils/utils'
import FastImage from "react-native-fast-image";
import bg from "./assets/b.png";
import WebView from 'react-native-webview';

export interface IProps {}

export interface IState {
}

@(connect() as any)
class Home extends React.Component<IProps, IState> {

    state = {
        video: {
            videoUrl: '',
            width: 1280,
            height: 720,
            fullScreenWidth: Dimensions.get('window').height,
            fullScreenHeight: Dimensions.get('window').width,
            duration: 0,
        }
    };

    render() {
        const { video } = this.state;
        const { navigation } = this.props;
        const { playbackURL = '', title = '' } = navigation.state.params;
        return (
            <Container style={styles.container}>
                <Header
                  transparent
                  style={{
                      backgroundColor: '#fff'
                  }}
                  iosBarStyle={"dark-content"}
                >
                    <Left>
                        <Button transparent
                                style={{
                                    marginLeft: 10,
                                }}
                                onPress={() => {
                                    const { dispatch } = this.props;
                                    dispatch(NavigationActions.back());
                                }}
                        >
                            <Icon style={{ color: '#333333', fontSize: 25, }} color={'#333333'} name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{
                            color: '#333333'
                        }}>{title}</Title>
                    </Body>
                    <Right />
                </Header>
                <Content style={{ backgroundColor: '#F4F6FA' }}>
                    {/*<View>*/}
                    {/*    <VideoPlayer*/}
                    {/*        video={{ uri: playbackURL }}*/}
                    {/*        videoWidth={video.width}*/}
                    {/*        videoHeight={video.height}*/}
                    {/*        duration={this.state.video.duration}*/}
                    {/*        ref={r => this.player = r}*/}
                    {/*        disableFullscreen*/}
                    {/*    />*/}
                    {/*</View>*/}
                    {/*<View>*/}
                    {/*    <Text style={styles.title}>回放列表</Text>*/}
                    {/*</View>*/}
                    <View style={{}}>
                        <List style={{  backgroundColor: '#fff' }}
                              listNoteColor={'#E3E7EF'}
                        >
                            <ListItem
                              style={{
                                  height: 60,
                              }}
                              noIndent onPress={async () => {
                                this.setState({
                                    videoUrl: ''
                                }, () => {
                                    this.setState({
                                        videoUrl: 'https://player.alicdn.com/video/aliyunmedia.mp4',
                                    })
                                })
                            }}>
                                <Left>
                                    <Text style={styles.itemText}>片段1</Text>
                                </Left>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                        </List>
                    </View>
                    <View style={{
                        width: 0,
                        height: 0,
                    }}>
                        {
                            this.state.videoUrl ? <WebView ref={e => this.webView = e} source={{ uri: this.state.videoUrl }} /> : undefined
                        }
                    </View>
                </Content>
            </Container>
        );
    }
}
export default Home;
