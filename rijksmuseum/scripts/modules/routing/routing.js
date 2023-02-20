import { routes } from './routes.js';

export const router = () => {
	const path = window.location.hash.substring(1) || '/';
	console.log(path);
	const route = routes.find((_route) => {
		const urlPathSegments = path.split('/').slice(1);
		const routeSegments = _route.path.split('/').slice(1);
		console.log(urlPathSegments, routeSegments);
		if (urlPathSegments.length !== routeSegments.length) return false;

		const params = [];
		for (let i = 0; i < routeSegments.length; i++) {
			if (routeSegments[i].startsWith(':')) {
				params.push(urlPathSegments[i]);
			} else if (routeSegments[i] !== urlPathSegments[i]) {
				return false;
			}
		}
		if (params.length > 0) {
			_route.view(params[0]);
		} else {
			_route.view();
		}
		return true;
	});
	if (!route) {
		console.log('No route found for path: ', path);
	}
};
