import { fetchData } from './scripts/data/fetchData.js';
import { fetchRandomArt } from './scripts/randomArtData/fetchRandomArt.js';
import { defaultArt } from './scripts/randomArtData/defaultArt.js';
import { removeSkeletonLoader } from './scripts/loading.js';

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// DOM elements
const searchForm = document.querySelector('.mainContent .searchArea > form');
export const searchResultsContainer = document.querySelector('.mainContent .loadingData');
const generateRandomArtButton = document.querySelector('.generateRandomArt button');
export const randomArtImg = document.querySelector('.generateRandomArt > section:first-of-type img');
export const randomArtTitle = document.querySelector('.generateRandomArt > section:first-of-type h2');
export const randomArtArtist = document.querySelector('.generateRandomArt > section:first-of-type > div:last-of-type > p');
const skeletonLoader = document.querySelectorAll('.skeletonLoader');

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// Visual things

if (searchResultsContainer.children.length == 0) searchResultsContainer.classList.add('hidden');

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// Events

searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	fetchData();
});

generateRandomArtButton.addEventListener('click', () => {
	fetchRandomArt();
});

defaultArt();
removeSkeletonLoader();
