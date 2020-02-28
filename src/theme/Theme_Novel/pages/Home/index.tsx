import React from 'react';
import { connect } from 'react-redux';
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
import { NavigationEvents } from 'react-navigation';
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

  /**
     * 获取目录长度
     * @returns {number}
     * @private
     */
  _getBookCatalogLength = () => {
      
    return 0
  };

   /**
     * 通过点击目录获取文章数据
     * @param num
     */
  fetchArticleByCatalog = (num) => {
      
  };
  /**
     * 获取文章数据
     */
  fetchArticles = () => {

  };

  /**
     * 重新获取文章
     * @param url 文章url
     * @private
     */
  _reFetchArticle = (url = this.lastRequestUrl) => {
      
  };

  /**
     * 翻到下一页
     */
  turnToNextPage = () => {
    if (this.currentIndex < this.articles.length - 1) {
        this.currentIndex++;
        // this._scrollToIndex();
    } else {
        // ToastUtil.showShort('正在加载下一页数据')
    }
  };

  /**
   * 翻到上一页
   */
  turnToPrePage = () => {
      if (this.currentIndex < this.articles.length && this.currentIndex > 0) {
          this.currentIndex--;
          // this._scrollToIndex();
      } else {
          // ToastUtil.showShort(I18n.t('onTop'))
      }
  };

  setCurrentArticle = (article) => {
    this.currentArticle = article;
  };

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
              this.componentWillUnmount()
            }}
            onDidBlur={payload => {

            }}
        />
        <Header>
            <Left>
                
            </Left>
            <Body>
                <Title>首页</Title>
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
        <Content>
          <List>
            {(this.state.list || []).map((item: SEARCH_ITEM) => {
              return (
                <Card key={JSON.stringify(item)} style={{flex: 0}}>
                  <CardItem>
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
              )
              return (
                <ListItem 
                style={{
                  marginBottom: 10,
                }}>
                  <Left>
                    {/* <Thumbnail style={{
                      borderRadius: 3,
                      backgroundColor: '#eee'
                    }} square source={{ uri: item.ruleSearchCoverUrl }} /> */}
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
                  </Left>
                  <Body style={{
                  }}>
                    <Text numberOfLines={1}>{item.ruleSearchName}</Text>
                    <Text numberOfLines={1} note>{item.ruleSearchAuthor}</Text>
                    <Text numberOfLines={1} note>{item.ruleSearchIntroduce}</Text>
                  </Body>
                </ListItem>
              )
            })}
          </List>
        </Content>
      </Container>
    );
  }
}
export default Home;
