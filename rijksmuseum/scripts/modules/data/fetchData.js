import { startLoading, stopLoading } from '../loading.js';
import { getData } from './getData.js';
import { searchResultsContainer } from '../../app.js';

export const fetchData = async () => {
	const userInput = document.querySelector('input[name="search"]').value;
	const searchErrorText = document.querySelector('.mainContent .searchArea > div:first-of-type > p');
	const allArtObjects = document.querySelectorAll('section ul');
	const radioButtons = document.querySelectorAll('input[type="radio"]');
	let data;
	let radioValue;

	if (userInput.length === 0) return;

	startLoading();

	for (const artObject of allArtObjects) artObject.remove();

	searchErrorText.textContent = '';

	for (const radioButton of radioButtons) {
		if (radioButton.checked) {
			radioValue = radioButton.value;
			break;
		}
	}
	
	const url = `https://www.rijksmuseum.nl/api/en/collection?key=RdKQCPfy&q=${userInput}&ps=${radioValue}&imgonly=true`;

	try {
		data = await (await fetch(url)).json();

		stopLoading();

		if (data.artObjects.length === 0) throw new Error();
		data.artObjects.length < radioValue
			? (searchErrorText.textContent = `[${data.artObjects.length} pieces of art are being shown]`)
			: (searchErrorText.textContent = `[${radioValue} pieces of art are being shown]`);
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
