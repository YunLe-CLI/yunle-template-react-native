import { Reducer } from 'redux';
import { Model, Effect, EffectWithType } from 'dva';
import Toast from 'react-native-root-toast';
import _ from "lodash";
import { activeCourse, getRadaChat, uploadLessonProcess, postComment, postCommentsUp, getComments, getMyGxamInfo, examSubmit, getExam, getPlayInfo, getLesson, getRecommend, getCourseMeList, getCourseInfo } from '@/services/api';

export interface IModelState {
  info: {};
  history: [] | undefined;
  courses: [] | undefined;
  recommend: {} | undefined;
  lessons: {} | undefined;
  plays: {} | undefined;
  exams: {} | undefined;
};

export interface IModelType extends Model{
  namespace: string;
  state: IModelState;
  effects: {
    clearCache: Effect | EffectWithType;
    getCourseMeList: Effect | EffectWithType;
    getItem: Effect | EffectWithType;
    getRecommend: Effect | EffectWithType;
    getLessonInfo: Effect | EffectWithType;
    getPlayInfo: Effect | EffectWithType;
    getExams: Effect | EffectWithType;
    examSubmit: Effect | EffectWithType;
    getMyGxamInfo: Effect | EffectWithType;
    getComments: Effect | EffectWithType;
    postComment: Effect | EffectWithType;
    postCommentsUp: Effect | EffectWithType;
    uploadLessonProcess: Effect | EffectWithType;
    getRadaChat: Effect | EffectWithType;
    activeCourse: Effect | EffectWithType;
  };
  reducers: {
    clearCacheHandle: Reducer<IModelState>;
    setCourses: Reducer<IModelState>;
    setInfo: Reducer<IModelState>;
    setLessons: Reducer<IModelState>;
    setPlays: Reducer<IModelState>;
    setRecommend: Reducer<IModelState>;
    setExams: Reducer<IModelState>;
  };
}

const initState: IModelState = {
  info: {},
  lessons: {},
  plays: {},
  exams: {},
  history: [],
  courses: [],
  recommend: {},
}

const coursesModel: IModelType = {
    namespace: 'courses',
    state: {...initState},
    reducers: {
      clearCacheHandle() {
        return { ...initState }
      },
      setCourses(state, { payload }) {
          return { ...state,
            courses: payload.courses,
            history: payload.history,
          }
      },
      setInfo(state, { payload }) {
        return { ...state,
          info: {
            ...state.info,
            ...payload,
          },
        }
      },
      setLessons(state, { payload }) {
        return { ...state,
          lessons: {
            ...state.lessons,
            ...payload,
          },
        }
      },
      setPlays(state, { payload }) {
        return { ...state,
          plays: {
            ...state.plays,
            ...payload,
          },
        }
      },
      setRecommend(state, { payload }) {
        return { ...state,
          recommend: payload.recommend,
        }
      },
      setExams(state, { payload }) {
        return { ...state,
          exams: {
            ...state.exams,
            ...payload,
          },
        }
      },
    },
    effects: {
      *clearCache({ payload = {} }, { put }) {
        yield put({ type: 'clearCacheHandle' });
      },
      *getCourseMeList({ payload = {} }, { put }) {
        let res = undefined;
        try {
          res = yield getCourseMeList({
            page: 1,
            perpage: 100,
          });
          const code = _.get(res, 'code', undefined);
          const msg = _.get(res, 'msg', undefined);
          const data = _.get(res, 'data', undefined);
          const myCourses = _.get(data, 'myCourses', undefined);
          const lastLessonProcess = _.get(data, 'lastLessonProcess', undefined);
          const lastCourse = _.get(data, 'lastCourse', undefined);
          const lastLesson = _.get(data, 'lastLesson', undefined);
          if (code === 0) {
            yield put({
              type: 'setCourses',
              payload: {
                courses: myCourses || [],
                history: _.isObject(lastLessonProcess) ? [{
                  lastLessonProcess,
                  lastCourse,
                  lastLesson,
                }] : [],
              }
            })
          } else {
            throw msg || data;
          }
        } catch (e) {
          let msg = '获取商业画布失败';
          if (_.isString(e)) {
            msg = e;
          }
          if (_.isObject(e)) {
            msg = e.toString();
          }
          Toast.show(msg, {
            duration: 1000,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
        }
        return res;
      },
      *getItem({ payload = {} }, { put }) {
        let res = undefined;
        try {
          res = yield getCourseInfo({
            courseId: payload.id,
          });
          const code = _.get(res, 'code', undefined);
          const msg = _.get(res, 'msg', undefined);
          const data = _.get(res, 'data', undefined);
          if (code === 0 && _.get(data, 'id', undefined)) {
            yield put({
              type: 'setInfo',
              payload: {
                [data.id]: data,
              }
            })
          } else {
            throw msg || data;
          }
        } catch (e) {
          let msg = '获取课程详情失败';
          if (_.isString(e)) {
            msg = e;
          }
          if (_.isObject(e)) {
            msg = e.toString();
          }
          Toast.show(msg, {
            duration: 1000,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
        }
        return res;
      },
      *getRecommend({ payload = {} }, { put }) {
        let res = undefined;
        try {
          res = yield getRecommend({});
          const code = _.get(res, 'code', undefined);
          const msg = _.get(res, 'msg', undefined);
          const data = _.get(res, 'data', undefined);
          if (code === 0) {
            yield put({
              type: 'setRecommend',
              payload: {
                recommend: data,
              }
            })
          } else {
            throw msg || data;
          }
        } catch (e) {
          // let msg = '获取课程详情失败';
          // if (_.isString(e)) {
          //   msg = e;
          // }
          // if (_.isObject(e)) {
          //   msg = e.toString();
          // }
        }
        return res;
      },
      *getLessonInfo({ payload = {} }, { put }) {
        let res = undefined;
        try {
          res = yield getLesson({
            lessonId: payload.lessonId,
            courseId: payload.courseId,
          });
          const code = _.get(res, 'code', undefined);
          const msg = _.get(res, 'msg', undefined);
          const data = _.get(res, 'data', undefined);
          if (code === 0 && data.id) {
            yield put({
              type: 'setLessons',
              payload: {
                [data.id]: data,
              }
            })
            const audioVodId = _.get(data, 'audioVodId', undefined);
            const audioPlayAuth = _.get(data, 'audioPlayAuth', undefined);
            const videoVodId = _.get(data, 'videoVodId', undefined);
            const videoPlayAuth = _.get(data, 'videoPlayAuth', undefined);
            if (audioVodId) {
              yield put({
                type: 'app/setPlayInfo',
                payload: {
                  type: 'audio',
                  audioPlayer: {
                    vid: audioVodId,
                    time: 0,
                    playAuth: audioPlayAuth,
                    learnInfo: {},
                  },
                }
              });
            } else if (videoVodId) {
              yield put({
                type: 'app/setPlayInfo',
                payload: {
                  type: 'video',
                  audioPlayer: {
                    vid: videoVodId,
                    time: 0,
                    playAuth: videoPlayAuth,
                    learnInfo: {},
                  },
                }
              });
            }
          } else {
            throw msg || data;
          }
        } catch (e) {
          let msg = '获取课程详情失败';
          if (_.isString(e)) {
            msg = e;
          }
          if (_.isObject(e)) {
            msg = e.toString();
          }
          Toast.show(msg, {
            duration: 1000,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
        }
        return res;
      },
      *getPlayInfo({ payload = {} }, { put }) {
        let res = undefined;
        try {
          res = yield getPlayInfo({
            lessonId: payload.lessonId,
            courseId: payload.courseId,
          });
          const code = _.get(res, 'code', undefined);
          const msg = _.get(res, 'msg', undefined);
          const data = _.get(res, 'data', undefined);
          if (code === 0) {
            yield put({
              type: 'setPlays',
              payload: {
                [payload.lessonId]: data,
              }
            })
          } else {
            throw msg || data;
          }
        } catch (e) {
          let msg = '获取课程详情失败';
          if (_.isString(e)) {
            msg = e;
          }
          if (_.isObject(e)) {
            msg = e.toString();
          }
          Toast.show(msg, {
            duration: 1000,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
        }
        return res;
      },
      *getExams({ payload = {} }, { put }) {
        let res = undefined;
        try {
          res = yield getExam({
            examId: payload.examId,
          });
          const code = _.get(res, 'code', undefined);
          const msg = _.get(res, 'msg', undefined);
          const data = _.get(res, 'data', undefined);
          if (code === 0) {
            yield put({
              type: 'setExams',
              payload: {
                [payload.examId]: data,
              }
            })
          } else {
            throw msg || data;
          }
        } catch (e) {
          let msg = '获取考试信息失败';
          if (_.isString(e)) {
            msg = e;
          }
          if (_.isObject(e)) {
            msg = e.toString();
          }
          Toast.show(msg, {
            duration: 1000,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
        }
        return res;
      },
      *examSubmit({ payload = {} }, { put }) {
        let res = undefined;
        try {
          res = yield examSubmit({
            examId: payload.examId,
            courseId: payload.courseId,
            userAnswers: payload.userAnswers,
          });
          const code = _.get(res, 'code', undefined);
          const msg = _.get(res, 'msg', undefined);
          const data = _.get(res, 'data', undefined);
          if (code === 0) {

          } else {
            throw msg || data;
          }
        } catch (e) {
          let msg = '提交考试失败';
          if (_.isString(e)) {
            msg = e;
          }
          if (_.isObject(e)) {
            msg = e.toString();
          }
          Toast.show(msg, {
            duration: 1000,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
        }
        return res;
      },
      *getMyGxamInfo({ payload = {} }, { put }) {
        let res = undefined;
        try {
          res = yield getMyGxamInfo({
            courseId: payload.courseId,
            examId: payload.examId,
          });
          const code = _.get(res, 'code', undefined);
          const msg = _.get(res, 'msg', undefined);
          const data = _.get(res, 'data', undefined);
          if (code === 0) {

          } else {
            throw msg || data;
          }
        } catch (e) {
          let msg = '获取考试结果失败';
          if (_.isString(e)) {
            msg = e;
          }
          if (_.isObject(e)) {
            msg = e.toString();
          }
          Toast.show(msg, {
            duration: 1000,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
        }
        return res;
      },
      *getComments({ payload = {} }, { put }) {
        let res = undefined;
        try {
          res = yield getComments({
            page: payload.page || 1,
            perpage: payload.perpage || 1,
            lessonId: payload.lessonId,
            sortMethod: payload.sortMethod,
            onTop: payload.onTop || undefined,
          });
          const code = _.get(res, 'code', undefined);
          const msg = _.get(res, 'msg', undefined);
          const data = _.get(res, 'data', undefined);
          if (code === 0) {

          } else {
            throw msg || data;
          }
        } catch (e) {
          let msg = '获取留言失败';
          if (_.isString(e)) {
            msg = e;
          }
          if (_.isObject(e)) {
            msg = e.toString();
          }
          Toast.show(msg, {
            duration: 1000,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
        }
        return res;
      },
      *postComment({ payload = {} }, { put }) {
        let res = undefined;
        try {
          res = yield postComment({
            lessonId: payload.lessonId,
            content: payload.content,
          });
          const code = _.get(res, 'code', undefined);
          const msg = _.get(res, 'msg', undefined);
          const data = _.get(res, 'data', undefined);
          if (code === 0) {

          } else {
            throw msg || data;
          }
        } catch (e) {
          let msg = '留言失败';
          if (_.isString(e)) {
            msg = e;
          }
          if (_.isObject(e)) {
            msg = e.toString();
          }
          Toast.show(msg, {
            duration: 1000,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
        }
        return res;
      },
      *postCommentsUp({ payload = {} }, { put }) {
        let res = undefined;
        try {
          res = yield postCommentsUp({
            discussId: payload.discussId,
          });
          const code = _.get(res, 'code', undefined);
          const msg = _.get(res, 'msg', undefined);
          const data = _.get(res, 'data', undefined);
          if (code === 0) {

          } else {
            throw msg || data;
          }
        } catch (e) {
          let msg = '点赞留言失败';
          if (_.isString(e)) {
            msg = e;
          }
          if (_.isObject(e)) {
            msg = e.toString();
          }
          Toast.show(msg, {
            containerStyle: {
              zIndex: 999999,
            },
            duration: 1000,
            position: Toast.positions.CENTER,
            shadow: true,
            animation: true,
            hideOnPress: true,
            delay: 0,
          });
        }
        return res;
      },
      *uploadLessonProcess({ payload = {} }, { put }) {
        let res = undefined;
        try {
          res = yield uploadLessonProcess({
            courseId: payload.courseId,
            lessonId: payload.lessonId,
            multimediaProcess: payload.percent,
            percent: payload.percent,
            videoProcess: payload.videoProcess,
            audioProcess: payload.audioProcess,
          });
          const code = _.get(res, 'code', undefined);
          const msg = _.get(res, 'msg', undefined);
          const data = _.get(res, 'data', undefined);
          if (code === 0) {

          } else {
            throw msg || data;
          }
        } catch (e) {
          let msg = '上传进度失败';
          if (_.isString(e)) {
            msg = e;
          }
          if (_.isObject(e)) {
            msg = e.toString();
          }
        }
        return res;
      },
      *getRadaChat({ payload = {} }, { put }) {
        let res = undefined;
        try {
          res = yield getRadaChat({
            courseId: payload.courseId,
            examId: payload.examId,
          });
          const code = _.get(res, 'code', undefined);
          const msg = _.get(res, 'msg', undefined);
          const data = _.get(res, 'data', undefined);
          if (code === 0) {

          } else {
            throw msg || data;
          }
        } catch (e) {
          let msg = '获取考试雷达图数据失败';
          if (_.isString(e)) {
            msg = e;
          }
          if (_.isObject(e)) {
            msg = e.toString();
          }
        }
        return res;
      },
      *activeCourse({ payload = {} }, { put }) {
        let res = undefined;
        try {
          res = yield activeCourse({
            courseId: payload.courseId,
          });
          const code = _.get(res, 'code', undefined);
          const msg = _.get(res, 'msg', undefined);
          const data = _.get(res, 'data', undefined);
          if (code === 0) {

          } else {
            throw msg || data;
          }
        } catch (e) {
          let msg = '激活课程失败';
          if (_.isString(e)) {
            msg = e;
          }
          if (_.isObject(e)) {
            msg = e.toString();
          }
        }
        return res;
      },
    },
}

export default coursesModel;
