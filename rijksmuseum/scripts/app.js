import { fetchRandomArt } from './modules/randomArtData/fetchRandomArt.js';
import { defaultArt } from './modules/randomArtData/defaultArt.js';
import { removeSkeletonLoader } from './modules/loading.js';
import { router } from './modules/routing.js';

////////////////////////////////////////////////////////////
// DOM elements
export const searchResultsContainer = document.querySelector('.mainContent .loadingData');
export const randomArtImg = document.querySelector('.generateRandomArt > section:first-of-type img');
export const randomArtTitle = document.querySelector('.generateRandomArt > section:first-of-type h2');
export const randomArtArtist = document.querySelector(
	'.generateRandomArt > section:first-of-type > div:last-of-type > p'
);
const generateRandomArtButton = document.querySelector('.generateRandomArt button');


////////////////////////////////////////////////////////////
// events

if (generateRandomArtButton) {
	generateRandomArtButton.addEventListener('click', fetchRandomArt);
}

defaultArt();
removeSkeletonLoader();

window.onhashchange = () => {
	router();
};

router();
