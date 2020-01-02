import React from 'react';
import {Dimensions, View} from 'react-native';
import { connect } from 'react-redux';
import {Container, Header, Left, Body, Right, Title, Content, Button} from 'native-base';
import styles from './styles';
import {NavigationActions, NavigationEvents} from 'react-navigation';
import VideoPlayer from '@/components/react-native-aliyun-vod-controls'
import Orientation, {OrientationType} from "react-native-orientation-locker";

export interface IProps {}

export interface IState {
  orientationType: OrientationType,
}

@(connect() as any)
class Home extends React.Component<IProps, IState> {

  state = {
    orientationType: 'PORTRAIT',
    video: {
      videoUrl: '',
      videoWidth: undefined,
      height: undefined,
      duration: 0,
    }
  };

  render() {
    const { orientationType } = this.state;
    return (
      <Container style={styles.container}>
      <NavigationEvents
          onWillFocus={payload => {}}
          onDidFocus={payload => {}}
          onWillBlur={payload => {}}
          onDidBlur={payload => {}}
      />
        <Header>
          <Left/>
          <Body>
              <Title>首页</Title>
          </Body>
          <Right />
        </Header>
        <Content
            contentContainerStyle={{
              padding: 12,
            }}
        >
          <Button
              style={{
                marginTop: 20,
                justifyContent: 'center'
              }}
              onPress={async () => {
                const { dispatch } = this.props;
                dispatch(NavigationActions.navigate({
                  routeName: 'VideoPlayer',
                  params: {},
                }));
              }}
          >
            <Title>看视频</Title>
          </Button>
        </Content>
      </Container>
    );
  }
}
export default Home;
