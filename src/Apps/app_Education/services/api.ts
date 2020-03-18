import request from './request'

/**
 * 登录
 * api doc url:
 * @param params
 */
export async function login(query: { loginName: string; password: string }): Promise<any> {
  return request( {
    url: '/users/login',
    method: 'POST',
    data: query
  });
}

/**
 * 今日课程
 * api doc url: http://eolinker.class100.com/#/home/project/inside/api/detail?groupID=-1&apiID=1016&projectName=%E4%BA%91%E8%A7%86%E8%AE%AF%E7%9B%B4%E6%92%ADdemo&projectID=74
 * @param params
 */
export async function today_courses({}, token): Promise<any> {
  return request( {
    url: '/today_courses',
    method: 'GET',
  });
}

/**
 * 我的课程
 * api doc url: http://eolinker.class100.com/#/home/project/inside/api/detail?groupID=-1&apiID=1016&projectName=%E4%BA%91%E8%A7%86%E8%AE%AF%E7%9B%B4%E6%92%ADdemo&projectID=74
 * @param params
 */
export async function mine_courses({}, token): Promise<any> {
  return request({
    url: '/courses/mine',
    method: 'GET',
  });
}

/**
 * 考勤签到
 * api doc url: http://eolinker.class100.com/#/home/project/inside/api/detail?groupID=-1&apiID=1004&projectName=%E4%BA%91%E8%A7%86%E8%AE%AF%E7%9B%B4%E6%92%ADdemo&projectID=74
 * @param params
 */
export async function signins(query: { courseId: string }, token): Promise<any> {
  return request({
    url: '/signins',
    method: 'POST',
    data: {
      courseId: query.courseId,
    }
  });
}
