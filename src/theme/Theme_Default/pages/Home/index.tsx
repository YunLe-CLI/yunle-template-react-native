import React from 'react';
import { connect } from 'react-redux';
import {
  Body,
  Button,
  Content,
  Text,
  Container, Header, Icon, Left, Right, Title,
} from 'native-base';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';
import moment from 'moment';
import styles from './styles';
import {NavigationActions, NavigationEvents} from 'react-navigation';

export interface IProps {}

export interface IState {}

@(connect(({ user = {} }) => {
  return {
    user: user.info || {},
  }
}) as any)
class Home extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  state = {

  };

  render() {
    const { active } = this.state;
    const { user = {} } = this.props;
    return (
      <Container style={styles.container}>
        <NavigationEvents
            onWillFocus={async payload => {
              try {
                const { navigation, exams } = this.props;
                const { params = {} } = navigation.state;
                if (_.isNumber(params.active)) {
                  this.setState({
                    active: params.active
                  })
                }
              } catch (e) {

              }
              await this.componentDidMount();
            }}
            onDidFocus={async payload => {

            }}
            onWillBlur={payload => {
              this.componentWillUnmount()
            }}
            onDidBlur={payload => {

            }}
        />
        <Header>
          <Left />
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
