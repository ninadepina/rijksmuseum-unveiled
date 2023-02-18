// import functions and DOM elements from other modules
import { removeSkeletonLoader } from '../loading.js';
import { randomArtImg, randomArtTitle, randomArtArtist } from '../../app.js';

// displaying the fetched data
export const displayRandomArt = (randomArtInfo) => {
	// remove skeleton loader
	removeSkeletonLoader();

	// adding fetched data to the DOM
	randomArtImg.src = randomArtInfo.artImg;
	randomArtImg.alt = randomArtInfo.artLongtitle;
	randomArtInfo.artTitle.length > 60
		? (randomArtTitle.textContent = randomArtInfo.artTitle.slice(0, 58).trim() + '...')
		: (randomArtTitle.textContent = randomArtInfo.artTitle);
	randomArtArtist.textContent = randomArtInfo.artArtist;
};
