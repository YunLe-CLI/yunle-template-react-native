import React from 'react';
import {SectionList, View} from 'react-native';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Text,
  Left,
  Body,
  Title,
  Right,
  Icon,
  Button,
  FooterTab, Footer,
} from 'native-base';
import { connect } from 'react-redux';
import styles from './styles';
import {NavigationActions, NavigationEvents} from 'react-navigation';
import {withCheckAppUpdate} from "@/components/CheckAppUpdate";
import {StatusBar} from 'react-native';
import {DEPARTMENTS, DEPARTMENTS_ITEM, MEETING_TODAY} from '../../services/api';
import _ from 'lodash';

import check_in from './assets/check_in_slices/check_in.png';
import check_out from './assets/check_out_slices/check_out.png';
import userImg from '@/theme/Theme_Meeting/pages/Home/assets/user_slices/user.png';
import FastImage from 'react-native-fast-image';


export interface IProps {

}
export interface IState {

}

@(connect() as any)
class Me extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.componentDidMount = _.debounce(this.componentDidMount, 800);
    this._onRefresh = _.debounce(this._onRefresh, 800);
    this._onRefresh = this._onRefresh.bind(this);
  }

  state = {
    list: [],
    index: [],
    selectList: []
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
    const { p, index, list, selectList } = this.state;
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
                const isSelectIndex = selectList.findIndex((selectI: DEPARTMENTS_ITEM) => {
                  return selectI.id === item.id
                });
                console.log(isSelectIndex, 'isSelect')
                return <ListItem
                  key={item.id}
                  onPress={() => {
                  if (!item.children || !item.children.length) {
                    if (isSelectIndex >= 0) {
                      selectList.splice(0, isSelectIndex)
                    } else {
                      selectList.push(item)
                    }
                    this.setState({
                      selectList,
                    }, () => {
                      console.log(this.state.selectList)
                    })
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
                    <View style={styles.nameWrap}>
                      {
                        this.props.onOk ? (
                          <FastImage
                            style={{
                              marginRight: 8,
                              width: 20,
                              height: 20,
                              alignContent: 'center',
                              justifyContent: 'center',
                            }}
                            source={isSelectIndex >= 0 ? check_in : check_out}
                            resizeMode={FastImage.resizeMode.contain}
                          />
                        ) : undefined
                      }
                      <Text>{item.name}</Text>
                    </View>
                  </Content>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              })
            }
          </List>
        </Content>
        {
          this.props.onOk ? (
            <Footer style={styles.footerWrap}>
              <FooterTab style={{
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Button
                  full style={[styles.btnTab]}>
                  <Text style={[styles.btnTabText]}>
                    已选择
                    <Text style={{
                      color: '#118DF0',
                    }}>{selectList.length}</Text>
                    人
                  </Text>
                </Button>
                <View style={styles.line} />
                <Button
                  onPress={() => {
                    if (typeof this.props.onOk === 'function') {
                      this.props.onOk(this.state.selectList)
                    }
                  }}
                  full style={[styles.btnTab, {
                  backgroundColor:'#118DF0',
                }]}>
                  <Text style={[styles.btnTabText, {
                    color: '#fff'
                  }]}>选择完成</Text>
                </Button>
              </FooterTab>
            </Footer>
          ) : undefined
        }
      </Container>
    );
  }
}

export default withCheckAppUpdate(Me);

