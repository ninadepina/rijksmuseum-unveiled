import { NormalView } from '../views/NormalView.js';
import { DetailView } from '../views/DetailView.js';
import { ColorFilterView } from '../views/ColorFilterView.js';
import { ErrorView } from '../views/ErrorView.js';

const routes = [
	{ path: '/', view: NormalView },
	{ path: '/art/:id', view: DetailView },
	{ path: '/colorfilter', view: ColorFilterView },
	{ path: '/error', view: ErrorView }
];

export { routes };
