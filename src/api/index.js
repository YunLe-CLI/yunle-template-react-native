/* global someFunction fetch:true */
import 'whatwg-fetch';
import apiConfig from './api.config';
/*
 * [test test]
 * @param  {[Object]} data [用户名&&密码]
 * @return {[promise]}      [promise]
 */
export function test(data = {}) {
	const query = JSON.stringify(data);
  return fetch(apiConfig.test, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: query,
  }).then(response => response.json()).then(body => body);
}


export default {
	test,
};
