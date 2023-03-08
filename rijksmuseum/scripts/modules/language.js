const generateRandomArtText = document.querySelector('.generateRandomArt button p');
const generateRandomArtArrow = document.querySelector('.generateRandomArt button img');
const openinghoursText = document.querySelector('.info p:first-of-type');

let language;

const currentLanguage = () => {
	if (localStorage.getItem('language')) {
		language = localStorage.getItem('language');
	} else {
		language = 'en';
		localStorage.setItem('language', language);
	}

	language === 'nl'
		? (document.querySelector('.language input[value="nl"]').checked = true)
		: (document.querySelector('.language input[value="en"]').checked = true);
};

const staticInfo = () => {
	window.onload = () => {
		if (localStorage.getItem('language') === 'nl') {
			if (window.matchMedia('screen and (min-width: 1000px)').matches) {
				generateRandomArtText.textContent = 'Genereer een willekeurig kunstwerk';
				generateRandomArtArrow.alt =
					'Icoon van een pijltje naar rechts voor het genereren van een willekeurig kunstwerk, klik op de knop om een willekeurig kunstwerk van de collectie te ontdekken.';
				openinghoursText.textContent = 'Dagelijks 9 tot 17u';
			} else {
				changeInsertedHTML();
			}
		}
	};
};

const changeInsertedHTML = () => {
	const openinghoursTextMobile = document.querySelector('.staticInfo header div p:first-of-type');
	openinghoursTextMobile.textContent = 'Dagelijks 9 tot 17u';
};

export { currentLanguage, staticInfo };
