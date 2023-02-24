import { getRandomArt } from './getRandomArt.js';
import { defaultArt } from './defaultArt.js';
import { addSkeletonLoader } from '../loading.js';
import { randomArtImg, randomArtTitle, randomArtArtist } from '../../app.js';

// fetching data from the Rijkmuseum API and getting a random art object
const fetchRandomArt = async () => {
	const radioValueLanguage = localStorage.getItem('language');
	const url = `https://www.rijksmuseum.nl/api/${radioValueLanguage}/collection?key=RdKQCPfy&imgonly&ps=100`;

	let data;
	let randomArt;
	let randomNumber

	randomArtImg.classList.add('hidden');
	randomArtImg.src = '';
	randomArtImg.alt = '';
	randomArtTitle.textContent = '';
	randomArtArtist.textContent = '';

	addSkeletonLoader();

	try {
		data = await (await fetch(url)).json();
		randomNumber = Math.floor(Math.random() * data.artObjects.length);

		randomArt = data.artObjects[randomNumber];

		if (!data.artObjects) throw new Error();

		getRandomArt(randomArt);
	} catch {
		defaultArt();
		console.log('error');
	}
};

export { fetchRandomArt };
