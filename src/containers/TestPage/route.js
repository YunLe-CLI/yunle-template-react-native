export default {
	path: '/TestPage',
	name: 'TestPage',
	breadcrumbName: 'test',
	_indexRoute: false,
	getComponents(nextState, callback) {
		require.ensure([], (require) => {
			callback(null, require('./index').default);
		});
	},
	childRoutes: [],
};