/*!
 *
 * Util模块 React Native module
 * 主要提供工具方法
 *
 */
import {
  Dimensions,
  } from 'react-native';
import _ from 'lodash';
import SwipeRow from '@/theme/Theme_Default/components/native-base-theme/components/SwipeRow';


export default {
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  handleContent: function(content: string) {
    const length = content.length
    var array = []
    let x = 0,y,m = 0
    while (x < length) {
      let _array = []
      for (let i = 0; i <= 16; i++) {
        let str_spa = content.substring(x, x + 1)
        let str_sto = content.substring(x, x + 18)
        const re = /^\s+$/
        if (str_sto.indexOf('”') != -1) {
          y = x + str_sto.indexOf('”') + 1
          _array[i] = content.substring(x, y)
          x = y
          continue
        }
        else if (str_sto.indexOf('。') != -1 ) {
          y = x + str_sto.indexOf('。') + 1
          if (re.exec(content.substring(y, y + 1))) {
            y = x + str_sto.indexOf('。') + 1
            _array[i] = content.substring(x, y)
            x = y
            continue
          }
          else {
            if (str_sto.indexOf('！') != -1) {
              y = x + str_sto.indexOf('！') + 1
              _array[i] = content.substring(x, y)
              x = y
              continue
            }
            else {
              y = x + 18
              _array[i] = content.substring(x, y)
              x = y
              continue
            }
          }
        }
        else if (str_sto.indexOf('！') != -1) {
          y = x + str_sto.indexOf('！') + 1
          if (re.exec(content.substring(y, y + 1))) {
            y = x + str_sto.indexOf('！') + 1
            _array[i] = content.substring(x, y)
            x = y
            continue
          }
          else {
            y = x + 18
            _array[i] = content.substring(x, y)
            x = y
            continue
          }
        }
        else if (str_sto.indexOf('？') != -1){
          y = x + str_sto.indexOf('？') + 1
          if (re.exec(content.substring(y, y + 1))) {
            y = x + str_sto.indexOf('？') + 1
            _array[i] = content.substring(x, y)
            x = y
            continue
          }
          else {
            y = x + 18
            _array[i] = content.substring(x, y)
            x = y
            continue
          }
        }
        else if (re.exec(str_spa)) {
          y = x + 24
          if (content.substring(x,y).indexOf('。') != -1) {
            y = x + content.substring(x,y).indexOf('。') + 1
            _array[i] = content.substring(x, y)
            x = y
            continue
          }
          _array[i] = content.substring(x, y)
          x = y
          continue
        }
        else {
          y = x + 18
          _array[i] = content.substring(x, y)
          x = y
        }
      }
      array[m] = _array
      m++
    }
    // console.log((m - 1) * 375);
    return array
  },
  
  
};

export function rule2cssSelectors(rule: string) {
  let type = 'dom'; // textNodes || dom || attr
  const _rule = rule;
  const ruleList = _rule.split('@');
  // console.log('ruleList', ruleList)
  const cssSelectors = ruleList.map((item) => {
    const d = item.split('.');
    console.log('ruleList 2', d)
    const tmp = d.map((cItem, index, arr) => {
      if (cItem === 'id') {
        return '#'
      } else if (cItem === 'class') {
        return '.'
      } else if (cItem === 'tag') {
        return ' '
      } else if (_.isNumber(parseInt(cItem)) && !_.isNaN(parseInt(cItem)) ) {
        console.log('ruleList 3', parseInt(cItem))
        return `[${cItem}]`
      }
      return cItem.replace(' ', '.')
    })
    return tmp.join('');
  })
  
  if (cssSelectors[cssSelectors.length - 1]) {
    const endSelect = cssSelectors[cssSelectors.length - 1];
    type = 'dom';
    if (endSelect === 'textNodes') {
      cssSelectors.pop()
      type = 'text';
    }
    if (endSelect === 'href') {
      cssSelectors.pop()
      type = 'href';
    }
    if (endSelect.indexOf('data-') > -1) {
      cssSelectors.pop()
      type = endSelect;
    }
  }
  const returnRule = {
    type,
    cssSelector: cssSelectors.join(' '),
  }
  console.log('ruleList', returnRule);
  return returnRule
}

export function getNodeContent(node: any, rule: string, root?: boolean) {
  let content = '';
  const _rule = rule2cssSelectors(rule);
  switch (_rule.type) {
    case 'dom': {
      if (root) {
        content = node(_rule.cssSelector);
      } else {
        content = node.find(_rule.cssSelector);
      }
      break;
    }
    case 'text': {
      content = node.find(_rule.cssSelector).text();
      break;
    }
    case 'href': {
      content = node.find(_rule.cssSelector).attr('href');
      break;
    }
    default: {
      content = node.find(_rule.cssSelector).attr(_rule.type);
    }
  }
  console.log('content, content', content, rule)
  return content;
}