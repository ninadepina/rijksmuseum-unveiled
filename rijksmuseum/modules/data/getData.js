import { displayData } from './displayData.js';

export const getData = (artObjects) => {
	if (artObjects.length == 0) return;
	let artInfo = artObjects.map((art) => {
		const artImg = art.webImage;
		const artLongtitle = art.longTitle;
		const artTitle = art.title;
		const artArtist = art.principalOrFirstMaker;
		// const artDate = art.longTitle.match(/(\d+)/)[0];
		// const artId = art.id;
		return {
			artImg,
			artLongtitle,
			artTitle,
			artArtist
		};
	});
	displayData(artInfo);
};
