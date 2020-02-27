import {Platform, Alert} from "react-native";
import request from '../utils/request'
// @ts-ignore
import cheerio from 'cheerio';
import getHtml from '../utils/DOMParser'
import {ENVIRONMENT} from "@Global/utils/env";
import _ from 'lodash';
import moment from "moment";
import rule from '@Theme/Theme_Novel/utils/DOMParser/rule';

export interface SEARCH_REQ {
  searchKey: string;
  searchPage: number;
}
export interface SEARCH_ITEM {
  ruleSearchAuthor: string;
  ruleSearchCoverUrl: string;
  ruleSearchIntroduce: string;
  ruleSearchName: string;
  ruleSearchNoteUrl: string;
}
/**
 * 获取小说列表
 * api doc url:
 * @param params
 */
export async function search(query: SEARCH_REQ): Promise<Array<SEARCH_ITEM>> {
  const url = rule.ruleSearchUrl.replace('searchKey', query.searchKey).replace('searchPage', query.searchPage);
  return getHtml({
    url: url,
    method: 'GET'
  }).then((html) => {
    const bookList = []
    try {
      let $ = cheerio.load(html)
      // const ruleSearchList = rule.ruleSearchList.split('@');
      console.log('ruleSearchUrl', $)
      const list = $('.hot_sale1');
      console.log(1111, list.length)
      if (list && list.length) {
        list.each(function(index, element) {
          const el = $(element);
          const ruleSearchAuthor = el.find(".author").text();
          const ruleSearchCoverUrl = el.find(".lazy").attr('data-original');
          const ruleSearchIntroduce = el.find(".review").text();
          const ruleSearchName = el.find(".title").text();
          const ruleSearchNoteUrl = el.find("a").attr('href');
          bookList.push({
            ruleSearchAuthor,
            ruleSearchCoverUrl,
            ruleSearchIntroduce,
            ruleSearchName,
            ruleSearchNoteUrl,
          })
      });
      }
    } catch (e) {
      alert(e)
    }
    
    return bookList
  });
}
