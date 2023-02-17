import { fetchData } from './scripts/data/fetchData.js';
import { fetchRandomArt } from './scripts/randomArtData/fetchRandomArt.js';
import { defaultArt } from './scripts/randomArtData/defaultArt.js';

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// DOM elements
const searchForm = document.querySelector('.mainContent .searchArea > form');
export const searchResultsContainer = document.querySelector('.mainContent .loadingData');
const generateRandomArtButton = document.querySelector('.generateRandomArt button');

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
