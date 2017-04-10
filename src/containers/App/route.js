import App from './index';
import config from '../config';
let indexRoute = null;
let childRoutes = [];

for (let i = 0; i < config.length; i++) {
	const route = config[i].route || [];
	childRoutes = childRoutes.concat(route);
}

for (let i = 0; i < childRoutes.length; i++) {
	if (childRoutes[i]._indexRoute) {
		indexRoute = childRoutes[i].path;
	}
}

const routes = {
	name: 'app',
	path: '/',
	component: App,
	childRoutes,
};

if (indexRoute) {
	routes.indexRoute = { onEnter: (nextState, replace) => replace(indexRoute) };
}

export default routes;
