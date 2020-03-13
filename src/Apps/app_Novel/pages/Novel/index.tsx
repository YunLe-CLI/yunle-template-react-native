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
import { search, SEARCH_ITEM, getBookContent, GET_CHAPTER_LIST_RES } from '@/Apps/app_Novel/services/api'
import { RULE_TYPE } from '@/Apps/app_Novel/utils/DOMParser/rule';
import CustomFlatList from '@/Apps/app_Novel/components/CustomFlatList'
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
    console.log(1111, props)

  }

  state = {
    bookInfo: {},
    chapterList: [],
    bookContent: '',
    chapterName: '',
    contentUrlNext: ''
  };

  async componentDidMount() {
    const { state } = this.props.navigation;
    const { params } = state;
    const { bookInfo } = params;
    const currentRule = global.CURRENT_RULE;
    await this.init(bookInfo, currentRule);
  }

  async init(bookInfo: SEARCH_ITEM, rule: RULE_TYPE) {
    console.log(bookInfo)
    console.log(rule)
    const book = await this.getBookContent(bookInfo.ruleContentUrl, rule);
  }

  async getBookContent(ruleContentUrl: string, rule?: RULE_TYPE) {
    const res = await getBookContent({ ruleContentUrl });
    console.log('getBookInfo: ', res)
    const { ruleBookContent, ruleContentUrlNext } = res;
    this.setState({
      bookContent: ruleBookContent,
      contentUrlNext: ruleContentUrlNext,
    }, () => {
      console.log('_flatRef', this._flatRef)
      if (this._flatRef && this._flatRef._flatRef) {
        console.log('_flatRef', this._flatRef)
        this._flatRef._flatRef.scrollToOffset({animated: true, viewPosition: 0, index: 0});
      }
    })
    return res;
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
    this.getBookContent(this.state.contentUrlNext)
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

  renderItem = ({ item }) => {
    return <ListItem>
      <Left>
        <Text>{item.ruleChapterName}</Text>
      </Left>
      <Right>
        <Icon name="arrow-forward" />
      </Right>
    </ListItem>
  }

  render() {
    const { bookInfo, chapterList } = this.state;
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
          <CustomFlatList
            ref={(ref) => {
                this._flatRef = ref
            }}
            articles={[
              {
                bookName: 'bookName',
                bookUrl: 'bookUrl', 
                chapterName: this.state.chapterName, 
                currentChapterNum: 10, 
                pageNum: 1, 
                totalPage: 1, 
                chapterContent: this.state.bookContent
              },
            ]}
            bookContent={this.state.bookContent}
            turnToNextPage={this.turnToNextPage}
            isFetching={this.isFetching}
            setCurrentArticle={this.setCurrentArticle}
            prevArticle={this.prevArticle}
            scrollIndexByBookmark={this._scrollIndexByBookmark}
            fetchArticles={this.fetchArticles}
            reFetchArticle={this._reFetchArticle}
            catalogDataLength={this._getBookCatalogLength()}
          />
      </Container>
    );
  }
}
export default Home;
