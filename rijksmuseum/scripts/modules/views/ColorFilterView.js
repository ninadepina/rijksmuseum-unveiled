import { fetchColorData } from '../colorFilter.js';
import { loadTemplate } from './loadTemplate.js';

const ColorFilterView = async () => {
	const mainContent = document.querySelector('.mainContent');
	mainContent.classList.remove('spacing');

	const template = await loadTemplate('colorFilter');
	mainContent.innerHTML = template;

	const colorFilterButton = document.querySelector('.language a');
	if (window.location.hash === '#/colorfilter')
		colorFilterButton.setAttribute('data-before', "Back to 'normal' search");

	colorFilterButton.addEventListener('click', () => {
		window.location = '';
	});

	const loadingData = document.querySelector('.mainContent .loadingData');
	if (loadingData.childNodes.length === 0) loadingData.classList.add('hidden');

	const radioColorFilters = document.querySelectorAll('.colorFilter label');
	radioColorFilters.forEach((radioColorFilter) => {
		radioColorFilter.addEventListener('click', () => {
			fetchColorData(radioColorFilter);
		});
	});

	const clearColorSelection = document.querySelector('.colorFilter p');
	clearColorSelection.addEventListener('click', () => {
		const checkedRadio = document.querySelector('.colorFilter input[type="radio"]:checked');
		const allArtObjects = document.querySelector('section ul');

		if (checkedRadio) checkedRadio.checked = false;
		if (allArtObjects) allArtObjects.remove();
		if (sessionStorage.colorFilter) sessionStorage.removeItem('colorFilter');
	});

	const randomRadioColorFilter = radioColorFilters[Math.floor(Math.random() * radioColorFilters.length)];
	if (sessionStorage.colorFilter) {
		const colorFilterInput = document
			.querySelector(`.colorFilter input[value="${sessionStorage.colorFilter.toLowerCase()}"]`)
			.labels.item(0);
		colorFilterInput.click();
		sessionStorage.removeItem('colorFilter');
	} else {
		randomRadioColorFilter.click();
	}

	const checkedRadio = document.querySelector('.colorFilter input[type="radio"]:checked');
	sessionStorage.setItem('colorFilter', checkedRadio.value.toUpperCase());
};

export { ColorFilterView };
