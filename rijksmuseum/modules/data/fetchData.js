import { startLoading, stopLoading } from '../loading.js';
import { getData } from './getData.js';

export const fetchData = async () => {
	startLoading();
	const allArtObjects = document.querySelectorAll('section ul');
	allArtObjects.forEach((artObject) => artObject.remove());
	const searchErrorText = document.querySelector('main > section:first-of-type > section:nth-of-type(2) > p');
	searchErrorText.textContent = '';

	let data;
	const userInput = document.querySelector('input[name="search"]').value;
	if (userInput.length === 0) return;
	const url = `https://www.rijksmuseum.nl/api/nl/collection?key=RdKQCPfy&q=${userInput}`;

	try {
		data = await (await fetch(url)).json();
		stopLoading();
		if (data.artObjects.length === 0) throw new Error();
	} catch {
		searchErrorText.textContent = `Unfortunately we couldn't find any results for "${userInput}"`;
		searchResultsContainer.classList.add('hidden');
		console.log('error');
	}
	getData(data.artObjects);
};
