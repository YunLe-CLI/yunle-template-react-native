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
                <VideoPlayer
                  video={{ uri: playbackURL }}
                  videoWidth={video.width}
                  videoHeight={video.height}
                  duration={this.state.video.duration}
                  ref={r => this.player = r}
                  disableFullscreen
                />
                <Content style={{ backgroundColor: '#F4F6FA' }}>
                    <View>

                    </View>
                    <View>
                        <Text style={styles.title}>回放列表</Text>
                    </View>
                    {/*<View style={{ paddingHorizontal: 16, }}>*/}
                    {/*    <List style={{  backgroundColor: '#fff', marginTop: 12, borderRadius: 5 }}*/}
                    {/*          listNoteColor={'#E3E7EF'}*/}
                    {/*    >*/}
                    {/*        <ListItem noIndent onPress={async () => {*/}
                    {/*            this.setState({*/}
                    {/*                videoUrl: playbackURL*/}
                    {/*            })*/}
                    {/*        }}>*/}
                    {/*            <Left>*/}
                    {/*                <Text style={styles.itemText}>片段1</Text>*/}
                    {/*            </Left>*/}
                    {/*            <Right>*/}
                    {/*                <Icon name="arrow-forward" />*/}
                    {/*            </Right>*/}
                    {/*        </ListItem>*/}
                    {/*    </List>*/}
                    {/*</View>*/}
                </Content>
            </Container>
        );
    }
}
export default Home;
