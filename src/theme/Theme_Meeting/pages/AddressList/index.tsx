import React from 'react';
import { View } from 'react-native';
import {Container, Header, Content, List, ListItem, Text, Left, Body, Title, Right, Icon, Button} from 'native-base';
import { connect } from 'react-redux';
import styles from './styles';
import {NavigationActions} from "react-navigation";
import {withCheckAppUpdate} from "@/components/CheckAppUpdate";
import {StatusBar} from 'react-native';

export interface IProps {

}
export interface IState {

}

@(connect() as any)
class Me extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  componentDidMount(): void {
    console.log('me componentDidMount')
  }

  render() {
    return (
      <Container style={styles.container}>
        <Header noShadow style={{ borderBottomWidth: 0, backgroundColor: '#fff' }}>
          <Left>
            <Button
              transparent
              onPress={() => {
                const { dispatch } = this.props;
                dispatch(NavigationActions.back());
              }}
            >
              <Icon style={{ paddingHorizontal: 12, color: '#333333', fontSize: 26 }} name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title style={{ color: '#333333' }}>一级部门</Title>
          </Body>
          <Right />
        </Header>
        <StatusBar barStyle="dark-content" />
        <View style={styles.headerWrap}>
          <Text style={styles.headerText}>
            王者荣耀公司>坦克部>张三
          </Text>
        </View>
        <Content>
          <List style={styles.listWrap}>
            <ListItem onPress={() => {
              this.props.dispatch(NavigationActions.navigate({
                routeName: 'Setting',
                params: {},
              }));
            }}>
              <Content>
                <Text>部门</Text>
              </Content>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

export default withCheckAppUpdate(Me);

