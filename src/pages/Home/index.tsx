import React from 'react';
import { SafeAreaView, View ,Text } from 'react-native';
import { connect } from 'react-redux';
import {Container, Header, Left, Body, Right, Title, Icon, Button, List, ListItem, Content} from 'native-base';
import styles from './styles';
import {NavigationActions} from "react-navigation";


export interface IProps {}

export interface IState {
}

@(connect() as any)
class Home extends React.Component<IProps, IState> {

  state = {
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left/>
          <Body>
              <Title>首页</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          
        </Content>
      </Container>
    );
  }
}
export default Home;
