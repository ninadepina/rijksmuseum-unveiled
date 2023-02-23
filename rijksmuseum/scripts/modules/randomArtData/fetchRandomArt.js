import { getRandomArt } from './getRandomArt.js';
import { defaultArt } from './defaultArt.js';
import { addSkeletonLoader } from '../loading.js';
import { randomArtImg, randomArtTitle, randomArtArtist } from '../../app.js';

// fetching data from the Rijkmuseum API and getting a random art object
const fetchRandomArt = async () => {
	const randomNumber = Math.floor(Math.random() * (100 - 0)) + 0;
	const url = 'https://www.rijksmuseum.nl/api/en/collection?key=RdKQCPfy&imgonly&ps=100';

	let data;
	let randomArt;

	randomArtImg.classList.add('hidden');
	randomArtImg.src = '';
	randomArtImg.alt = '';
	randomArtTitle.textContent = '';
	randomArtArtist.textContent = '';

	addSkeletonLoader();

	try {
		data = await (await fetch(url)).json();

		randomArt = data.artObjects[randomNumber];

		if (!data.artObjects) throw new Error();

		getRandomArt(randomArt);
	} catch {
		defaultArt();
		console.log('error');
	}
};

export { fetchRandomArt };
