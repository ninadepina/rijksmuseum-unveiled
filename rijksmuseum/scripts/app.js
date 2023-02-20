import { fetchData } from './modules/data/fetchData.js';
import { fetchRandomArt } from './modules/randomArtData/fetchRandomArt.js';
import { defaultArt } from './modules/randomArtData/defaultArt.js';
import { removeSkeletonLoader } from './modules/loading.js';
import { routing } from './modules/routing.js';

////////////////////////////////////////////////////////////
// DOM elements
export const searchResultsContainer = document.querySelector('.mainContent .loadingData');
export const randomArtImg = document.querySelector('.generateRandomArt > section:first-of-type img');
export const randomArtTitle = document.querySelector('.generateRandomArt > section:first-of-type h2');
export const randomArtArtist = document.querySelector(
	'.generateRandomArt > section:first-of-type > div:last-of-type > p'
);
const searchForm = document.querySelector('.mainContent .searchArea > form');
const generateRandomArtButton = document.querySelector('.generateRandomArt button');

////////////////////////////////////////////////////////////
// visual things

if (searchResultsContainer.children.length == 0) searchResultsContainer.classList.add('hidden');

////////////////////////////////////////////////////////////
// events

window.location.hash = '';

searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	fetchData();
});

generateRandomArtButton.addEventListener('click', fetchRandomArt);

window.addEventListener('hashchange', () => {
	const hash = window.location.hash;
	routing(hash);
});

defaultArt();
removeSkeletonLoader();
