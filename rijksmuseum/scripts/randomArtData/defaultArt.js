import { displayRandomArt } from './displayRandomArt.js';

export const defaultArt = () => {
	const randomArtInfo = {
		artImg: 'https://lh3.googleusercontent.com/SsEIJWka3_cYRXXSE8VD3XNOgtOxoZhqW1uB6UFj78eg8gq3G4jAqL4Z_5KwA12aD7Leqp27F653aBkYkRBkEQyeKxfaZPyDx0O8CzWg=s0',
		artLongtitle: 'The Night Watch, Rembrandt van Rijn, 1642',
		artTitle: 'The Night Watch',
		artArtist: 'Rembrandt van Rijn'
	};
	displayRandomArt(randomArtInfo);
};
