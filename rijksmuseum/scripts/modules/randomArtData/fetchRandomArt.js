// import functions and DOM elements from other modules
import { getRandomArt } from './getRandomArt.js';
import { defaultArt } from './defaultArt.js';
import { addSkeletonLoader } from '../loading.js';
import { randomArtImg, randomArtTitle, randomArtArtist } from '../../app.js';

// fetching data from the Rijkmuseum API and getting a random art object
export const fetchRandomArt = async () => {
	// generate a random number between 0 and 99, used to select a random art object 
	const randomNumber = Math.floor(Math.random() * (100 - 0)) + 0;
	// url that fetches 100 art objects (max. number API allows)
	const url = 'https://www.rijksmuseum.nl/api/en/collection?key=RdKQCPfy&imgonly&ps=100';
	// initialize variables for data and random art
	let data;
	let randomArt;

	// clearing the current information
	randomArtImg.src = '';
	randomArtImg.alt = '';
	randomArtTitle.textContent = '';
	randomArtArtist.textContent = '';

	// add skeleton loader while data is being fetched
	addSkeletonLoader();

	try {
		// fetch data from the API and convert to JSON
		data = await (await fetch(url)).json();
		// get the randomly selected art object
		randomArt = data.artObjects[randomNumber];
		// if there are no art objects in the response, throw an error
		if (!data.artObjects) throw new Error();
		// call the getRandomArt function and pass data through
		getRandomArt(randomArt);
	} catch {
		// display default art if there was an error fetching the data
		defaultArt();
		console.log('error');
	}
};
