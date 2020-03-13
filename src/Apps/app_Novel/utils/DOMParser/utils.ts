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

export const htmlAll = ["a","abbr","acronym","address","applet","area","article","aside","audio","b","base","basefont","bdi","bdo","big","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","command","datalist","dd","del","details","dfn","dialog","dir","div","dl","dt","em","embed","fieldset","figcaption","figure","font","footer","form","frame","frameset","h1"," to h6","head","header","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","meta","meter","nav","noframes","noscript","object","ol","optgroup","option","output","p","param","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strike","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","tt","u","ul","var","video","wbr"];


console.log(
  'rule2cssSelectors',
  // rule2cssSelectors(`tag.td.1@tag.a@text|tag.p.3@tag.a@text`),
  rule2cssSelectors(`class.lazy ddd@data-original`),
)

export function rule2cssSelectors(rule: string) {
  const _rule = rule;
  const ruleList = _rule.split('|');
  return ruleList.map((ruleItem) => {
    let ruleObj =  {
      type: '',
      cssSelector: '',
      endEnvet: '',
      replace: '',
    }
    let type = 'dom'; // text || dom || attr
    
    const ruleString = ruleItem.replace(/\@/g, '__SEPARATOR__')
    .replace(/\s+/g, 'class.')
    .replace(/#/, '__REPLACE__')
    // 替换id
    .replace(/id\./g, '#')
    // 替换class
    .replace(/class\./g, '.')
    // 替换tag
    .replace(/tag\./g, ' ')
    .replace(/\.\d/g, "[$&]")
    .replace(/\[\./g, "[")
    // 替换前后空格
    .replace(/(^\s*)/g, "")
    .replace(/(\s)$/g, "")
    // 分隔
    .replace(/__SEPARATOR__/g, " ");

    const cssSelectors = ruleString.split(' ') || [];
    if (cssSelectors[cssSelectors.length - 1]) {
      const endSelect = cssSelectors[cssSelectors.length - 1];
      type = 'dom';
      if (endSelect.indexOf('__REPLACE__') > -1) {
        cssSelectors.pop()
        ruleObj.replace = endSelect.replace('__REPLACE__', '');
      }
      if (endSelect === 'textNodes' || endSelect === 'text' || endSelect === 'html') {
        cssSelectors.pop()
        type = 'text';
      }
      if (endSelect === 'href') {
        cssSelectors.pop()
        type = 'href';
      }
      if (endSelect === 'src') {
        cssSelectors.pop()
        type = 'src';
      }
      if (endSelect.indexOf('data-') > -1) {
        cssSelectors.pop()
        type = endSelect;
      }
    }

    ruleObj.type = type;
    ruleObj.cssSelector = cssSelectors.join(' ');
    
    return ruleObj
  })
}

export function getNodeContent(node: any, rule: string, root?: boolean) {
  let contents = [];
  const _rule = rule2cssSelectors(rule) || [];
  contents = _rule.map((ruleItem) => {
    let content;
    switch (ruleItem.type) {
      case 'dom': {
        if (root) {
          content = node(ruleItem.cssSelector);
        } else {
          content = node.find(ruleItem.cssSelector);
        }
        break;
      }
      case 'text': {
        content = node.find(ruleItem.cssSelector).text();
        break;
      }
      case 'href': {
        content = node.find(ruleItem.cssSelector).attr('href');
        break;
      }
      default: {
        content = node.find(ruleItem.cssSelector).attr(ruleItem.type);
      }
    }
    return content;
  })
  console.log('getNodeContent', _rule);

  return contents[0]
  
}
