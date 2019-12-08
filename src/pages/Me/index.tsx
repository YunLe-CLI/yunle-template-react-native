import React from 'react';
import {Container, Header, Content, List, ListItem, Text, Left, Body, Title, Right} from 'native-base';
import { connect } from 'react-redux';
import styles from './styles';
import {NavigationActions} from "react-navigation";

export interface IProps {

}
export interface IState {

}

@(connect() as any)
class Me extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Left />
          <Body>
            <Title>个人中心</Title>
          </Body>
          <Right />
        </Header>
        <Content style={{ paddingHorizontal: 24 }}>
          <List>
            <ListItem onPress={() => {
              this.props.dispatch(NavigationActions.navigate({
                routeName: 'Setting',
                params: {},
              }));
            }}>
              <Text>设置</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

export default Me;

