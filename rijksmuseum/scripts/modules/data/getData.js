import { displayData } from './displayData.js';

let artInfo = [];

// rewriting the fetched data
export const getData = (artObjects) => {
	if (artObjects.length === 0) return;

	artInfo = artObjects.map(({ webImage, longTitle, title, principalOrFirstMaker, id }) => ({
		artImg: webImage.url.slice(0, -3) + '=s1000',
		artLongtitle: longTitle,
		artTitle: title,
		artArtist: principalOrFirstMaker,
		artId: id
	}));
	// filtering is not necessary if the url contains '&imgonly=true'
	// .filter((art) => art.artImg !== null);

	displayData(artInfo);
};

export { artInfo };
