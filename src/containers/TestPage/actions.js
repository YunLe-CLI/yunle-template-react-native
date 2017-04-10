import TYPE from './constants';

const {
  TEST_TEMPLSTE,
	TEST_REQUESTED_TEMPLSTE,
} = TYPE;

export function testTemplate(data) {
  return {
    type: TEST_TEMPLSTE,
    text: data,
  };
}

export function testFetchTemplate(query) {
	return {
		type: TEST_REQUESTED_TEMPLSTE,
		query,
	};
}
