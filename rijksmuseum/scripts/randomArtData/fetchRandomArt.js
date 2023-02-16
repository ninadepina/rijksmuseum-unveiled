import { getRandomArt } from './getRandomArt.js';
import { defaultArt } from './defaultArt.js';

export const fetchRandomArt = async () => {
	const randomNumber = Math.floor(Math.random() * (100 - 0)) + 0;

	let data;
	let randomArt;
	const url = 'https://www.rijksmuseum.nl/api/en/collection?key=RdKQCPfy&imgonly&ps=100';
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
