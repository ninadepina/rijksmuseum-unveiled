import { displayRandomArt } from './displayRandomArt.js';

// rewriting the fetched data
export const getRandomArt = (randomArt) => {

	const randomArtInfo = {
		artImg: randomArt.webImage.url.slice(0, -3) + '=s1000',
		artLongtitle: randomArt.longTitle,
		artTitle: randomArt.title,
		artArtist: randomArt.principalOrFirstMaker
	};

	displayRandomArt(randomArtInfo);
};
