import { displayRandomArt } from './displayRandomArt.js';

// set default art info
const defaultArt = () => {
	let randomArtInfo = {
		artImg: 'https://lh3.googleusercontent.com/SsEIJWka3_cYRXXSE8VD3XNOgtOxoZhqW1uB6UFj78eg8gq3G4jAqL4Z_5KwA12aD7Leqp27F653aBkYkRBkEQyeKxfaZPyDx0O8CzWg=s1000',
		artLongtitle: 'The Night Watch, Rembrandt van Rijn, 1642',
		artTitle: 'The Night Watch',
		artArtist: 'Rembrandt van Rijn'
	};

	if (localStorage.getItem('language') === 'nl') {
		randomArtInfo.artLongtitle = 'De Nachtwacht, Rembrandt van Rijn, 1642';
		randomArtInfo.artTitle = 'De Nachtwacht';
	}

	displayRandomArt(randomArtInfo);
};

export { defaultArt };
