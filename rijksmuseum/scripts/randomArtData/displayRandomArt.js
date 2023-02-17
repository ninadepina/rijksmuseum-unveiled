import { removeSkeletonLoader } from '../loading.js';
import { randomArtImg, randomArtTitle, randomArtArtist } from '../../app.js';

export const displayRandomArt = (randomArtInfo) => {
	removeSkeletonLoader();
	randomArtImg.src = randomArtInfo.artImg;
	randomArtImg.alt = randomArtInfo.artLongtitle;
	randomArtTitle.textContent = randomArtInfo.artTitle;
	randomArtArtist.textContent = randomArtInfo.artArtist;
};
