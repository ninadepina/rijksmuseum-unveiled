import { routes } from './routes.js';

const router = () => {
	const path = window.location.hash.substring(1) || '/';
	const route = routes.find((_route) => {
		// split the current path and route path into segments
		const urlPathSegments = path.split('/').slice(1);
		const routeSegments = _route.path.split('/').slice(1);
		// if the number of segments is different, the paths do not match
		if (urlPathSegments.length !== routeSegments.length) return false;

		const params = [];
		// check each segment of the route
		for (let i = 0; i < routeSegments.length; i++) {
			// if the segment starts with a colon(:), it is a parameter
			if (routeSegments[i].startsWith(':')) {
				// store the parameter value
				params.push(urlPathSegments[i]);
			} else if (routeSegments[i] !== urlPathSegments[i]) {
				return false;
			}
		}
		// call the view function of the matched route with the parameter
		params.length > 0 ? _route.view(params[0]) : _route.view();
		return true;
	});
	if (!route) console.log('No route found for path: ', path);
};

export { router };
