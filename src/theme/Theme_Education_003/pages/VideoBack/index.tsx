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
                {/*<Header*/}
                {/*  transparent*/}
                {/*  iosBarStyle={"dark-content"}*/}
                {/*>*/}
                {/*    <Left>*/}
                {/*        <Button transparent*/}
                {/*                style={{*/}
                {/*                    marginLeft: 10,*/}
                {/*                }}*/}
                {/*                onPress={() => {*/}
                {/*                    const { dispatch } = this.props;*/}
                {/*                    dispatch(NavigationActions.back());*/}
                {/*                }}*/}
                {/*        >*/}
                {/*            <Icon style={{ color: '#333333', fontSize: 25, }} color={'#333333'} name='arrow-back' />*/}
                {/*        </Button>*/}
                {/*    </Left>*/}
                {/*    <Body>*/}
                {/*        <Title style={{*/}
                {/*            color: '#333333'*/}
                {/*        }}>{title}</Title>*/}
                {/*    </Body>*/}
                {/*    <Right />*/}
                {/*</Header>*/}
                <View>
                    <VideoPlayer
                      video={{ uri: playbackURL }}
                      videoWidth={video.width}
                      videoHeight={video.height}
                      duration={this.state.video.duration}
                      ref={r => this.player = r}
                      disableFullscreen
                    />
                </View>
                <Content style={{ backgroundColor: '#F4F6FA' }}>
                    <View>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <View style={{ marginTop: 24, paddingHorizontal: 16, }}>
                        <View style={{
                            marginLeft: -17,
                            flex: 1,
                            flexGrow: 1,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                        }}>
                            {
                                [1,2,4,5].map((item) => {
                                    const width = (Dimensions.get('window').width - 16*2 - 17*2 )/3;
                                    return <Button
                                      key={item}
                                      bordered={this.state.videoUrl !== item}
                                      transparent={this.state.videoUrl !== item}
                                      style={[
                                          styles.btn,
                                          {
                                              width,
                                          }
                                      ]}
                                      textStyle={styles.btnText}
                                      onPress={() => {
                                          this.setState({
                                              // videoUrl: playbackURL
                                              videoUrl: item
                                          })
                                      }}>
                                        <Text style={[this.state.videoUrl !== item ? styles.btnText : {}]}>
                                            第一段
                                        </Text>
                                    </Button>

                                })
                            }

                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}
export default Home;
