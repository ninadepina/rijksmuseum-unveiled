// import a function from another module
import { displayRandomArt } from './displayRandomArt.js';

// rewriting the fetched data
export const getRandomArt = (randomArt) => {
	// modifying the fetched data
	const randomArtInfo = {
		artImg: randomArt.webImage.url.slice(0, -3) + '=s1000',
		artLongtitle: randomArt.longTitle,
		artTitle: randomArt.title,
		artArtist: randomArt.principalOrFirstMaker
	};

	// call the displayRandomArt function and pass data through
	displayRandomArt(randomArtInfo);
};
