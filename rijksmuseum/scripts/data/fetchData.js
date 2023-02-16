import { startLoading, stopLoading } from '../loading.js';
import { getData } from './getData.js';
import { searchResultsContainer } from '../../app.js';

export const fetchData = async () => {
	const userInput = document.querySelector('input[name="search"]').value;
	if (userInput.length === 0) return;
	startLoading();
	const allArtObjects = document.querySelectorAll('section ul');
	allArtObjects.forEach((artObject) => artObject.remove());
	const searchErrorText = document.querySelector('.mainContent > section:nth-of-type(2) > div:first-of-type > p');
	searchErrorText.textContent = '';

	const radioButtons = document.querySelectorAll('input[type="radio"]');

	let radioValue;

	radioButtons.forEach((radioButton) => {
		if (radioButton.checked) radioValue = radioButton.value;
		return radioValue;
	});

	let data;
	const url = `https://www.rijksmuseum.nl/api/en/collection?key=RdKQCPfy&q=${userInput}&ps=${radioValue}&imgonly=true`;

	try {
		data = await (await fetch(url)).json();
		stopLoading();
		if (data.artObjects.length === 0) throw new Error();
		data.artObjects.length < radioValue ? searchErrorText.textContent = `[${data.artObjects.length} pieces of art are being shown]` : searchErrorText.textContent = `[${radioValue} pieces of art are being shown]`
	} catch {
		userInput.length > 11
			? (searchErrorText.textContent =
					`Unfortunately we couldn't find any results for "${userInput}"`.slice(0, 58).trim() + '..."')
			: (searchErrorText.textContent = `Unfortunately we couldn't find any results for "${userInput}"`);

		searchResultsContainer.classList.add('hidden');
		console.log('error');
	}
	getData(data.artObjects);
};
