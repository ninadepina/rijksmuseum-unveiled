import { displayData } from './displayData.js';

export const getData = (artObjects) => {
	if (artObjects.length === 0) return;
	const artInfo = artObjects
		.map(({ webImage, longTitle, title, principalOrFirstMaker }) => ({
			artImg: webImage,
			artLongtitle: longTitle,
			artTitle: title,
			artArtist: principalOrFirstMaker
		}))
		.filter((art) => art.artImg !== null);
	displayData(artInfo);
};
