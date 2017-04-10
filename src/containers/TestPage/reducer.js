import { fromJS } from 'immutable';
import TYPE from './constants';

const {
	TEST_TEMPLSTE,
	TEST_REQUESTED_TEMPLSTE,
	TEST_SUCCEEDED_TEMPLSTE,
	TEST_FAILED_TEMPLSTE,
} = TYPE;

const initialState = fromJS({
  text: '点点同步redux actions看看。。',
	async: '点点异步redux actions看看。。',
	isFetching: false,
	globalModal: {
		type: '',
		title: '',
		content: '',
		onOk: null,
		onCancel: null,
	},
});

export default (state = initialState, action) => {
  switch (action.type) {
    case TEST_TEMPLSTE: {
      return state.setIn(['text'], action.text);
    }
	  case TEST_REQUESTED_TEMPLSTE: {
		  return state.setIn(['async'], '等等看看。。');
	  }
	  case TEST_SUCCEEDED_TEMPLSTE: {
		  return state.setIn(['async'], '谢谢等待，我是你想看到的数据！');
	  }
	  case TEST_FAILED_TEMPLSTE: {
		  return state.setIn(['async'], '啊，错误，我是不是你想看到的数据！');
	  }
    default: {
      return state;
    }
  }
};
