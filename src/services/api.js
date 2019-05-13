import request from '../utils/request';


/**
 * 测试
 * url: api 地址
 * @returns {Promise<void>}
 */
export async function findAppCommentList(params = {}) {
    return request(`/test`, {
        method: 'POST',
        body: {
            ...params,
        },
    });
}