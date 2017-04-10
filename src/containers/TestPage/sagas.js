import { takeLatest } from 'redux-saga';
import { fork, put, call } from 'redux-saga/effects';
import TYPE from './constants';
import { login } from '../../api';

const {
	TEST_REQUESTED_TEMPLSTE,
	TEST_SUCCEEDED_TEMPLSTE,
	TEST_FAILED_TEMPLSTE,
} = TYPE;

function* callTestTemplste({ query }) {
	try {
		const result = yield call(login, query);
		if (result.status !== 200 ) throw result;
		yield put({ type: TEST_SUCCEEDED_TEMPLSTE, result });
	} catch (err) {
		yield put({ type: TEST_FAILED_TEMPLSTE, err });
	}
}

export function* takeTestTemplste() {
	yield* takeLatest(TEST_REQUESTED_TEMPLSTE, callTestTemplste);
}

export default [
	fork(takeTestTemplste),
];
