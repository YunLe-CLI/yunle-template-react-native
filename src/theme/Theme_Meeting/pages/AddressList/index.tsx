import React from 'react';
import {SectionList, View} from 'react-native';
import {Container, Header, Content, List, ListItem, Text, Left, Body, Title, Right, Icon, Button} from 'native-base';
import { connect } from 'react-redux';
import styles from './styles';
import {NavigationActions, NavigationEvents} from 'react-navigation';
import {withCheckAppUpdate} from "@/components/CheckAppUpdate";
import {StatusBar} from 'react-native';
import {DEPARTMENTS, DEPARTMENTS_ITEM, MEETING_TODAY} from '../../services/api';
import _ from 'lodash';
export interface IProps {

}
export interface IState {

}

@(connect() as any)
class Me extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.componentDidMount = _.debounce(this.componentDidMount, 800);
    this._onRefresh = _.debounce(this._onRefresh, 800);
    this._onRefresh = this._onRefresh.bind(this);
  }

  state = {
    list: [],
    index: [],
  }

  async componentDidMount(): void {
    console.log('me componentDidMount')
    await this._onRefresh()
  }
  async _onRefresh() {
    this.setState({
      refreshing: true,
    });
    try {
      await this.getList();
    } catch (e) {

    } finally {
      this.setState({
        refreshing: false,
      });
    }
  }
  async getList() {
    try {
      const res = await DEPARTMENTS({});
      if (res.code === 0) {
        const { data = {} } = res;
        this.setState({
          list: data,
          // registrations: data.registrations,
        })
      }

    } catch (e) {
      alert(e)
    }
  }

  render() {
    const { p, index, list } = this.state;
    let name = '';
    let current = [...list];
    console.log(index, 99999999)
    if (index && index.length) {
      index.forEach((item, index) => {
        if (current[item] && current[item].name) {
          const _name =  current[item].name;
          if (index + 1 >= index.length) {
            name += `${_name}`
          } else {
            name += `${_name} > `
          }
        }
        current = current[item].children;
      })
    }

    return (
      <Container style={styles.container}>
        {
          this.props.type ? undefined : (
            <NavigationEvents
              onWillFocus={async payload => {
                await this.componentDidMount();
              }}
              onDidFocus={async payload => {

              }}
              onWillBlur={payload => {

              }}
              onDidBlur={payload => {

              }}
            />
          )
        }
        <Header noShadow style={{ borderBottomWidth: 0, backgroundColor: '#fff' }}>
          <Left>
            {this.props.onClose || index && index.length ? (
              <Button
                transparent
                onPress={() => {
                  if ((!index || !index.length) && this.props.onClose && typeof this.props.onClose === 'function') {
                    this.props.onClose()
                  } else {
                    index.pop()
                    console.log(index, 99999999, 333)
                    this.setState({
                      index: [...index],
                    })
                  }
                }}
              >
                <Icon style={{ paddingHorizontal: 12, color: '#333333', fontSize: 26 }} name='arrow-back' />
              </Button>
            ) : undefined}
          </Left>
          <Body>
            <Title style={{ color: '#333333' }}>{'通讯录'}</Title>
          </Body>
          <Right />
        </Header>
        <StatusBar barStyle="dark-content" />
        {
          name ? (
            <View style={styles.headerWrap}>
              <Text style={styles.headerText}>
                {name}
              </Text>
            </View>
          ) : undefined
        }
        <Content
          refreshing={this.state.refreshing}
          onRefresh={this._onRefresh}
        >
          <List style={styles.listWrap}>
            {
              current.map((item: DEPARTMENTS_ITEM, i: number) => {
                return <ListItem
                  key={item.id}
                  onPress={() => {
                  if (!item.children || !item.children.length) {
                    return;
                  }
                  const index = [...this.state.index, i]
                  this.setState({
                    index,
                    p: item,
                    current: item.children || [],
                  })
                }}>
                  <Content>
                    <Text>{item.name}</Text>
                  </Content>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              })
            }
          </List>
        </Content>
      </Container>
    );
  }
}

export default withCheckAppUpdate(Me);

