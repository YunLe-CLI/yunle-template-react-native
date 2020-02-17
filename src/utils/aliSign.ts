import RSASign from 'jsrsasign';
import {
  NativeModules,
} from 'react-native';
const { MainViewController = {} } = NativeModules || {};
const { SDKSign } = MainViewController || {};

function  sign(object, privateKey) {

  // Add default sign_type
  if (!object.sign_type || object.sign_type.length === 0) {
    object.sign_type = 'RSA2';
  }

  // Remove sign field
  delete object.sign;

  // Remove empty field
  Object.keys(object).forEach((key) => {
    if (String(object[key]).length === 0) {
      delete object[key];
    }
  })

  // Sort query string
  var sortedQuery = '';
  let sortedKeys = Object.keys(object).sort((a, b) => a > b);
  for (var i = 0; i < sortedKeys.length; i++) {
    let key = sortedKeys[i];
    let value = object[key];
    sortedQuery += `${(i === 0) ? '' : '&'}${encodeURIComponent(key)}=${(value)}`;
  }

  // Create signature
  let alg = {RSA: 'SHA1withRSA', RSA2: 'SHA256withRSA'}[object.sign_type];
  let sig = new RSASign.KJUR.crypto.Signature({alg});
  sig.init(RSASign.KEYUTIL.getKey(privateKey));
  sig.updateString(sortedQuery);
  let sign = RSASign.hextob64(sig.sign());

  console.log('signDATA, 222',sortedQuery, sign)
  sortedQuery += `&sign=${encodeURIComponent(sign)}`;
  return sortedQuery;
}

export const nativeSign = async (object, key: string, key2: string = null) => {
  
  // Add default sign_type
  if (!object.sign_type || object.sign_type.length === 0) {
    object.sign_type = 'RSA2';
  }

  // Remove sign field
  delete object.sign;

  // Remove empty field
  Object.keys(object).forEach((key) => {
    if (String(object[key]).length === 0) {
      delete object[key];
    }
  })

  // Sort query string
  var sortedQuery = '';
  let sortedKeys = Object.keys(object).sort((a, b) => a > b);
  for (var i = 0; i < sortedKeys.length; i++) {
    let key = sortedKeys[i];
    let value = object[key];
    sortedQuery += `${(i === 0) ? '' : '&'}${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  }
  let sign = '';
  if (SDKSign) {
    sign = await SDKSign(sortedQuery)
  }
  sortedQuery += `&sign=${encodeURIComponent(sign)}`;
  return sign;
}

export default sign;