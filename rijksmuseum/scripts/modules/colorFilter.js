import { getData } from './data/getData.js';
import { addColorFilterLoader, removeColorFilterLoader } from './loading.js';

const fetchColorData = async (radioColorFilter) => {
	const radioValueColorFilter = document.querySelector(`#${radioColorFilter.htmlFor}`).value.toUpperCase();
	const allArtObjects = document.querySelector('section ul');
	const radioValueLanguage = localStorage.getItem('language');

	let data;

	const colorFilterLoaderSquares = document.querySelectorAll('.colorFilter > div > div');
	colorFilterLoaderSquares.forEach((colorFilterLoaderSquare) => {
		colorFilterLoaderSquare.style.backgroundColor = `#${radioValueColorFilter}`;
	});

	addColorFilterLoader();

	if (allArtObjects) allArtObjects.remove();

	const url = `https://www.rijksmuseum.nl/api/${radioValueLanguage}/collection?key=RdKQCPfy&ps=100&imgonly=true&f.normalized32Colors.hex=%20%23${radioValueColorFilter}`;

	try {
		data = await (await fetch(url)).json();
		removeColorFilterLoader();
		if (data.artObjects.length === 0) throw new Error();
	} catch {
		console.log('error');
	}
	getData(data.artObjects);
};

export { fetchColorData };
