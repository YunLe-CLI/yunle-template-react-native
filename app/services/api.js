import { stringify } from 'qs';
import request from '../utils/request';

/**
 * 删除文章
 * url: xxx
 * @returns {Promise<void>}
 */
export async function test(params = {}) {
  return request(`/admin/app-article/deleteAppArticle`, {
    method: 'POST',
    body: {
      ...params,
    },
  });
}
