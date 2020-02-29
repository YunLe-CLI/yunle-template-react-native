/*!
 *
 * Util模块 React Native module
 * 主要提供工具方法
 *
 */
import {
  Dimensions,
  } from 'react-native';


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