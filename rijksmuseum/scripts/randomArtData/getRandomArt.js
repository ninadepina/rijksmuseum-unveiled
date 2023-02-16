import { displayRandomArt } from './displayRandomArt.js';

export const getRandomArt = (randomArt) => {
	const randomArtInfo = {
		artImg: randomArt.webImage.url,
		artLongtitle: randomArt.longTitle,
		artTitle: randomArt.title,
		artArtist: randomArt.principalOrFirstMaker
	};
	displayRandomArt(randomArtInfo);
};
