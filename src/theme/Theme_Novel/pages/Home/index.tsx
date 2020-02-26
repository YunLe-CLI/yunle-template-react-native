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

import CustomFlatList from '@Theme/Theme_Novel/components/CustomFlatList'

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
        <CustomFlatList
          ref={(ref) => {
              this._flatRef = ref
          }}
          articles={[
            {
              bookName: 'bookName',
              bookUrl: 'bookUrl', 
              chapterName: 'chapterName', 
              currentChapterNum: 10, 
              pageNum: 1, 
              totalPage: 1, 
              chapterContent: `随着前端工程化的日益成熟，代码规范化对于开发效率的提升起着很大的作用，包括后期的维护，统一的规范能节省交接的时间成本，而规范包括目录结构、代码质量（命名、注释、JS规范、CSS规范、缩进等）`
            },
          ]}
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
