import { fetchRandomArt } from './modules/randomArtData/fetchRandomArt.js';
import { defaultArt } from './modules/randomArtData/defaultArt.js';
import { removeSkeletonLoader, firstLoad } from './modules/loading.js';
import { router } from './modules/routing/routing.js';
import { currentLanguage, staticInfo } from './modules/language.js';

////////////////////////////////////////////////////////////
const searchResultsContainer = document.querySelector('.mainContent .loadingData');
const randomArtImg = document.querySelector('.generateRandomArt > section:first-of-type img');
const randomArtTitle = document.querySelector('.generateRandomArt > section:first-of-type h2');
const randomArtArtist = document.querySelector('.generateRandomArt > section:first-of-type > div:last-of-type > p');
const generateRandomArtButton = document.querySelector('.generateRandomArt button');
const radioLanguages = document.querySelectorAll('.language input[type="radio"]');

////////////////////////////////////////////////////////////
for (let i = 0; i < radioLanguages.length; i++) {
	radioLanguages[i].addEventListener('click', () => {
		localStorage.setItem('language', radioLanguages[i].value);
		radioLanguages[i].checked = true;
		window.location.reload(false);
	});
}

firstLoad();
defaultArt();
removeSkeletonLoader();
router();
currentLanguage();
staticInfo();

window.onhashchange = () => {
	router();
};

generateRandomArtButton.addEventListener('click', fetchRandomArt);

////////////////////////////////////////////////////////////
export { searchResultsContainer, randomArtImg, randomArtTitle, randomArtArtist };
