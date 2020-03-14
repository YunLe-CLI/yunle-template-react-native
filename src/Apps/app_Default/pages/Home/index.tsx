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
import { withMinProgram, withMinProgramProps } from '@Global/components/MinProgram';
import { ConnectProps, ConnectState } from '../../models/connect';
import styles from './styles';

export interface IProps extends ConnectProps, withMinProgramProps {
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
          <Button onPress={() => {
            this.props.openMinProgram()
          }}>
            <Text>打开狗吱小程序</Text>
          </Button>
          <Text>
            {JSON.stringify(global)}
          </Text>
        </Content>
      </Container>
    );
  }
}
export default (connect(({ global }: ConnectState) => {
  return {
    global,
  }
}))(withMinProgram(Home));
