import {Platform, Alert} from "react-native";
import request from '../utils/request'
// @ts-ignore
import cheerio from 'cheerio';
import getHtml from '../utils/DOMParser'
import {ENVIRONMENT} from "@Global/utils/env";
import _ from 'lodash';
import moment from "moment";
import rule from '@Theme/Theme_Novel/utils/DOMParser/rule';

import { getNodeContent } from '@Theme/Theme_Novel/utils/DOMParser/utils';

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
      const $ = cheerio.load(html)
      const list = getNodeContent($, rule.ruleSearchList, true);
      if (list && list.length) {
        list.each(function(index, element) {
          const el = $(element);
          bookList.push({
            ruleSearchAuthor: getNodeContent(el, rule.ruleSearchAuthor),
            ruleSearchCoverUrl: getNodeContent(el, rule.ruleSearchCoverUrl),
            ruleSearchIntroduce: getNodeContent(el, rule.ruleSearchIntroduce),
            ruleSearchName: getNodeContent(el, rule.ruleSearchName),
            ruleSearchNoteUrl: getNodeContent(el, rule.ruleSearchNoteUrl),
          })
        });
      }
    } catch (e) {
      alert(e)
    }
    return bookList
  });
}

export interface GET_BOOK_INFO_REQ {
  ruleSearchNoteUrl: string;
}
export interface GET_BOOK_INFO_RES {
  ruleChapterUrl: string;
}
/**
 * 获取小说祥情
 * api doc url:
 * @param params
 */
export async function getBookInfo(query: GET_BOOK_INFO_REQ): Promise<GET_BOOK_INFO_RES> {
  const url = `${rule.bookSourceUrl}${query.ruleSearchNoteUrl}`;
  return getHtml({
    url,
    method: 'GET'
  }).then((html) => {
    let bookChapter = {
      ruleChapterUrl: '',
    }
    try {
      let $ = cheerio.load(html)
      const rule_chapter = rule.ruleChapterUrl.split('@');
      const content = $('.recommend1');
      if (content) {
        console.log('getChapterList: ', content)
        const el = $(content);
        const ruleChapterUrl = $(el.find("h2")[1]).find('a').attr('href');
        console.log('getChapterList: ', ruleChapterUrl)
        bookChapter = {
          ...bookChapter,
          ruleChapterUrl,
        }
      }
    } catch (e) {
      alert(e)
    }
    return bookChapter
  });
}



export interface GET_CHAPTER_LIST_REQ {
  ruleChapterUrl: string;
}
export interface GET_CHAPTER_LIST_RES {
  ruleChapterName: string;
  ruleContentUrl: string;
}
/**
 * 获取小说目录
 * api doc url:
 * @param params
 */
export async function getChapterList(query: GET_CHAPTER_LIST_REQ): Promise<Array<GET_CHAPTER_LIST_RES>> {
  const url = `${rule.bookSourceUrl}${query.ruleChapterUrl}`;
  return getHtml({
    url,
    method: 'GET'
  }).then((html) => {
    let list = []
    try {
      let $ = cheerio.load(html)
      const rule_chapter_list = rule.ruleChapterList.split('@');
      const content = $('#chapterlist');
      const htmlList = content.find('p')
      if (htmlList) {
        console.log('111111: ', Array.isArray(htmlList) )
        htmlList.each(function(index, element) {
          const el = $(element);
          const ruleChapterName = el.find('a').text();
          const ruleContentUrl = el.find('a').attr('href');
          if (ruleChapterName && ruleContentUrl) {
            list.push({
              ruleChapterName,
              ruleContentUrl,
            })
          }
        })
      }
    } catch (e) {
      alert(e)
    }
    return list
  });
}

export interface GET_BOOK_CONTENT_REQ {
  ruleContentUrl: string;
}
export interface GET_BOOK_CONTENT_RES {
  ruleBookContent: string;
  ruleContentUrlNext: string;
}
/**
 * 获取小说章节祥情
 * api doc url:
 * @param params
 */
export async function getBookContent(query: GET_BOOK_CONTENT_REQ): Promise<GET_BOOK_CONTENT_RES> {
  const url = `${rule.bookSourceUrl}${query.ruleContentUrl}`;
  return getHtml({
    url,
    method: 'GET'
  }).then((html) => {
    let data = ''
    let ruleContentUrlNext = '';
    try {
      let $ = cheerio.load(html)
      const rule_chapter_list = rule.ruleBookContent.split('@');
      const content = $('#chaptercontent').find('br').replaceWith('\n');
      data = $('#chaptercontent').text();
      // const ruleContentUrlNext = rule.ruleContentUrlNext.split('@')
      ruleContentUrlNext =  $('#pt_next').attr('href');
    } catch (e) {
      alert(e)
    }
    console.log('ruleContentUrlNext', ruleContentUrlNext)
    return { 
      ruleBookContent: data,
      ruleContentUrlNext,
    }
  });
}
