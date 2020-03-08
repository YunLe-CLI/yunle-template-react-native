import React from 'react';
import { connect } from 'react-redux';
import {
  Body,
  Content,
  Container, Header, 
  Left, Right, Title,
} from 'native-base';
import _ from 'lodash';
import { NavigationEvents } from 'react-navigation';
import { ConnectProps, ConnectState } from '@Theme/Theme_Default/models/connect';
import styles from './styles';

export interface IProps extends ConnectProps {
  user: {}
}

export interface IState {}


class Home extends React.Component<IProps, IState> {
  state = {

  };
  componentDidMount() {
    console.log('props: ', this.props)
  }
  render() {
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
            <Title>{$t('pages.Home.home')}</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        <Title>{$t('pages.Home.home')}</Title>
        </Content>
      </Container>
    );
  }
}
export default (connect(({ user }: ConnectState) => {
  return {
    user,
  }
}))(Home);
