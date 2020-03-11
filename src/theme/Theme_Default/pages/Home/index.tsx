import React from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import {
  Body,
  Content,
  Container, Header, 
  Left, Right, Title,
  Card, CardItem, 
  Thumbnail, Text, 
  Button, Icon
} from 'native-base';
import _ from 'lodash';
import { NavigationEvents } from 'react-navigation';
import { ConnectProps, ConnectState } from '../../models/connect';
import styles from './styles';

export interface IProps extends ConnectProps {
  global: {}
}

export interface IState {}


class Home extends React.Component<IProps, IState> {
  state = {

  };
  componentDidMount() {
    console.log('props: ', this.props)
  }
  render() {
    const { global } = this.props;
    return (
      <Container style={styles.container}>
        <NavigationEvents
            onWillFocus={payload => {
            
            }}
            onDidFocus={payload => {

            }}
            onWillBlur={payload => {
              
            }}
            onDidBlur={payload => {

            }}
        />
        <Header>
          <Left />
          <Body>
          <Title>{$t('pages.Home.home')} ({global.mode})</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ padding: 15, }}>
          <Text>
            {JSON.stringify(global)}
          </Text>
          <Card>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: `https://bing.ioliu.cn/v1/rand?w=${300}&h=${300}`}} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>GeekyAnts</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: 'https://bing.ioliu.cn/v1/rand' }} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active name="thumbs-up" />
                  <Text>12 Likes</Text>
                </Button>
              </Left>
              <Body>
                <Button transparent>
                  <Icon active name="chatbubbles" />
                  <Text>4 Comments</Text>
                </Button>
              </Body>
              <Right>
                <Text>11h ago</Text>
              </Right>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}
export default (connect(({ global }: ConnectState) => {
  return {
    global,
  }
}))(Home);
