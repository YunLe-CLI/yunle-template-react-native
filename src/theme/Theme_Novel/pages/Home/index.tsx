import React from 'react';
import { connect } from 'react-redux';
import { FlatList, View } from 'react-native';
import {
  Content,
  Container,
  Header,
  Title,
  List,
  ListItem,
  Left,
  Right,
  Body,
  Text,
  Card,
  CardItem,
  Button,
  Icon,
} from 'native-base';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';
import styles from './styles';
import { NavigationEvents, NavigationActions } from 'react-navigation';
import { search, SEARCH_ITEM } from '@Theme/Theme_Novel/services/api'

import CustomFlatList from '@Theme/Theme_Novel/components/CustomFlatList'
import { cateItemHeight } from '../../utils/DimensionsUtil';

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
    list: [],
  };

  async componentDidMount() {
    const data = await search({
      searchKey: "a",
      searchPage: 1,
    });
    console.log(data, 333)
    this.setState({
      list: data || [],
    })
  }

  renderBook = ({ item }) => {
    return <Card style={{flex: 0}}>
    <CardItem button onPress={() => {
      this.props.dispatch(NavigationActions.navigate({
        routeName: 'BookContent',
        params: {
          bookInfo: item,
        },
      }));
    }}>
      <Left>
        <FastImage
          style={{
            width: 189 * .4,
            height: 272 * .4,
            alignContent: 'center',
            justifyContent: 'center',
            borderRadius: 10,
            backgroundColor: '#eee'
          }}
          source={{uri: item.ruleSearchCoverUrl }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Body style={{
          flexGrow: 1,
          alignItems: 'flex-start',
          justifyContent: 'flex-start'
        }}>
          <Text style={{
            marginBottom: 10
          }}  numberOfLines={1}>{item.ruleSearchName}</Text>
          <Text style={{
            marginBottom: 10
          }} numberOfLines={1} note>{item.ruleSearchAuthor}</Text>
          <Text numberOfLines={2} note>{item.ruleSearchIntroduce}</Text>
        </Body>
      </Left>
    </CardItem>
  </Card>
  }

  render() {
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
             
            }}
            onDidBlur={payload => {

            }}
        />
        <Header>
            <Left>
                
            </Left>
            <Body>
                <Title>狗吱阅读</Title>
            </Body>
            <Right>
              <Button
                transparent
                onPress={() => {
                    
                }}
              >
                <Icon style={{ paddingHorizontal: 12, color: '#fff', fontSize: 26 }} name='add' />
              </Button>
            </Right>
        </Header>
        <FlatList
          contentContainerStyle={{
              paddingHorizontal: 16,
              paddingVertical: 20,
          }}
          data={this.state.list || []}
          keyExtractor={(item, index) => JSON.stringify(item)}
          renderItem={this.renderBook}
          showsHorizontalScrollIndicator={false}
        />
      </Container>
    );
  }
}
export default Home;
