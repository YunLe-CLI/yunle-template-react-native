const config = [
	{
		root: 'TestPage',
		page: require('./TestPage').default,
		actions: require('./TestPage/actions'),
		constants: require('./TestPage/constants').default,
		sagas: require('./TestPage/sagas').default,
		route: require('./TestPage/route').default,
		reducer: require('./TestPage/reducer').default,
	},

];

export default config;
