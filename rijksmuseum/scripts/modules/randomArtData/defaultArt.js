// import a function from another module
import { displayRandomArt } from './displayRandomArt.js';

// set default art info
export const defaultArt = () => {
	const randomArtInfo = {
		artImg: 'https://lh3.googleusercontent.com/SsEIJWka3_cYRXXSE8VD3XNOgtOxoZhqW1uB6UFj78eg8gq3G4jAqL4Z_5KwA12aD7Leqp27F653aBkYkRBkEQyeKxfaZPyDx0O8CzWg=s1000',
		artLongtitle: 'The Night Watch, Rembrandt van Rijn, 1642',
		artTitle: 'The Night Watch',
		artArtist: 'Rembrandt van Rijn'
	};

	// call the displayRandomArt function and pass data through
	displayRandomArt(randomArtInfo);
};
