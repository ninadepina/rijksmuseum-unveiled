import { NormalView } from '../views/NormalView.js';
import { DetailView } from '../views/DetailView.js';
import { ColorFilterView } from '../views/ColorFilterView.js';

const routes = [
	{ path: '/', view: NormalView },
	{ path: '/art/:id', view: DetailView },
	{ path: '/colorfilter', view: ColorFilterView }
];

export { routes };
