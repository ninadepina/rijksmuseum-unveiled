import { fetchRandomArt } from './modules/randomArtData/fetchRandomArt.js';
import { defaultArt } from './modules/randomArtData/defaultArt.js';
import { removeSkeletonLoader, firstLoad } from './modules/loading.js';
import { router } from './modules/routing/routing.js';

////////////////////////////////////////////////////////////
// DOM elements
const searchResultsContainer = document.querySelector('.mainContent .loadingData');
const randomArtImg = document.querySelector('.generateRandomArt > section:first-of-type img');
const randomArtTitle = document.querySelector('.generateRandomArt > section:first-of-type h2');
const randomArtArtist = document.querySelector('.generateRandomArt > section:first-of-type > div:last-of-type > p');
const generateRandomArtButton = document.querySelector('.generateRandomArt button');

////////////////////////////////////////////////////////////
// events
generateRandomArtButton.addEventListener('click', fetchRandomArt);

firstLoad();
defaultArt();
removeSkeletonLoader();
router();

window.onhashchange = () => {
	router();
};

////////////////////////////////////////////////////////////
export { searchResultsContainer, randomArtImg, randomArtTitle, randomArtArtist };
