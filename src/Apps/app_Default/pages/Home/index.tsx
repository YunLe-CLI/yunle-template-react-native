import React from 'react';
import { Image } from 'react-native';
import { connect } from 'react-redux';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import {
  Body,
  Content,
  Container, Header, 
  Left, Right, Title,
  Text, 
  Button, Icon
} from 'native-base';
import _ from 'lodash';
import { withMinProgram, withMinProgramProps } from '@Global/components/MinProgram';
import { ConnectProps, ConnectState } from '../../models/connect';
import styles from './styles';

import { getUsers } from '../../services/api'

export type RootStackParamList = {
  Home: { test: string; };
};
export interface IProps extends ConnectProps, withMinProgramProps {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  router: RouteProp<RootStackParamList, 'Home'>,
}

export interface IState {}

class Home extends React.Component<IProps, IState> {
  state = {
    users: {}
  };
  async componentDidMount() {
    console.log('props 11111: ', this.props)
    try {
      const users = await getUsers();
      console.log(users, 1111)
      this.setState({
        users: users,
      })
    } catch (e) {
      console.log('props 11111', e)
    }
   
  }
  render() {
    const { global, theme } = this.props;
    return (
      <Container style={styles.container}>
        <Header>
          <Left />
          <Body>
            <Title>{$t('pages.Home.home')} ({global.mode})</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ padding: 15, }}>
          <Button onPress={() => {
            this.props.openMinProgram()
          }}>
            <Icon name={'ios-return-left'} /><Text>打开狗吱小程序</Text>
          </Button>
          <Text>
            {JSON.stringify(global)}
          </Text>
          <Button onPress={() => {
            this.componentDidMount()
          }}>
            <Text>Theme</Text>
          </Button>
          <Text>
            {JSON.stringify(theme)}
          </Text>
          <Button onPress={() => {
            this.componentDidMount()
          }}>
            <Text>mock data</Text>
          </Button>
          <Text>
          {JSON.stringify(this.state.users)}
          </Text>
        </Content>
      </Container>
    );
  }
}
export default (connect(({ global, theme }: ConnectState) => {
  return {
    global,
    theme,
  }
}))(withMinProgram(Home));
