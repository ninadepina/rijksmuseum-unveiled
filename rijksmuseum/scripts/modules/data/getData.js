// import a function from another module
import { displayData } from './displayData.js';

// rewriting the fetched data
export const getData = (artObjects) => {
	// if the artObjects array is empty, return
	if (artObjects.length === 0) return;

	// create a new array that maps each art object to an object containing its web image URL, long title, title, artist name, and ID
	const artInfo = artObjects.map(({ webImage, longTitle, title, principalOrFirstMaker, id }) => ({
		artImg: webImage.url.slice(0, -3) + '=s1000',
		artLongtitle: longTitle,
		artTitle: title,
		artArtist: principalOrFirstMaker,
		artId: id
	}));
	// filtering is not necessary if the url contains '&imgonly=true'
	// .filter((art) => art.artImg !== null);

	// call the displayData function and pass data through
	displayData(artInfo);
};
