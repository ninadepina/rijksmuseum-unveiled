import { fetchData } from '../data/fetchData.js';
import { autocomplete } from '../autocomplete/autocomplete.js';
import { suggestions } from '../autocomplete/suggestions.js';
import { loadTemplate } from './loadTemplate.js';

const NormalView = async () => {
	const mainContent = document.querySelector('.mainContent');
	mainContent.classList.remove('spacing');

	const template = await loadTemplate('normal');
	mainContent.innerHTML = template;

	const expoImg = document.querySelector('.staticInfo section img');
	const expoHeading = document.querySelector('.staticInfo section h2');
	const expoText = document.querySelector('.staticInfo section h2 + p');
	const radioButtonsText = document.querySelector('.searchArea div form p');
	const searchPlaceholder = document.querySelector('.searchArea > form input');
	const loadingText = document.querySelector('.searchArea > div:last-of-type p');

	if (localStorage.getItem('language') === 'nl') {
		if (window.matchMedia('screen and (min-width: 1000px)').matches)
			radioButtonsText.textContent = 'Hoeveelheid resultaten:';

		expoImg.alt = 'Afbeelding die meerdere werken van Johannes Vermeer toont';
		expoHeading.textContent = 'Johannes Vermeer expositie';
		expoText.textContent = 'Op dit moment zijn er geen tickets meer beschikbaar..';
		searchPlaceholder.placeholder = 'Zoek op kunstenaars, kunstwerken en meer...';
		loadingText.textContent = 'Afbeeldingen worden geladen.. dit kan een aantal seconden duren';
	}

	const loadingData = document.querySelector('.mainContent .loadingData');
	if (loadingData.childNodes.length === 0) loadingData.classList.add('hidden');

	const searchForm = document.querySelector('.mainContent .searchArea > form');
	searchForm.addEventListener('submit', (e) => {
		e.preventDefault();
		fetchData();
	});

	if (sessionStorage.getItem('back')) {
		fetchData();
	}
	if (sessionStorage.colorFilter) sessionStorage.removeItem('colorFilter');

	autocomplete(searchForm.querySelector('input'), suggestions);
};

export { NormalView };
