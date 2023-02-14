import { getData } from './getData.js';

export const fetchData = async () => {
	const allArtObjects = document.querySelectorAll('section ul');
	allArtObjects.forEach((artObject) => artObject.remove());
	const searchErrorText = document.querySelector('main > section:first-of-type > section:nth-of-type(2) > p');
	searchErrorText.textContent = '';

	let data;
	const userInput = document.querySelector('input[name="search"]').value;
	if (userInput.length == 0) return;
	let url = `https://www.rijksmuseum.nl/api/nl/collection?key=RdKQCPfy&q=${userInput}`;

	// if (search.length !== 0) url = `https://www.rijksmuseum.nl/api/nl/collection?key=RdKQCPfy&q=${search || defaultSearch}`;

	try {
		data = await (await fetch(url)).json();
		if (data.artObjects.length == 0) throw new Error();
		// console.log(data.artObjects[0].longTitle.match(/(\d+)/)[0])
	} catch {
		// window.history.replaceState('search', 'search', `?search=${defaultSearch}`);
		searchErrorText.textContent = `Unfortunately we couldn't find any results for "${userInput}"`;
		searchResultsContainer.classList.add('hidden');
		console.log('error');
	}
	getData(data.artObjects);
};
