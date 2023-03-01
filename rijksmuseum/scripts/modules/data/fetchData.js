import { startLoading, stopLoading } from '../loading.js';
import { getData } from './getData.js';
import { searchResultsContainer } from '../../app.js';

// fetching data from the Rijkmuseum API based on user input
const fetchData = async () => {
	const userInput = document.querySelector('input[name="search"]').value;
	const searchErrorText = document.querySelector('.mainContent .searchArea > div:first-of-type > p');
	const allArtObjects = document.querySelector('section ul');
	const radioSearchAmount = document.querySelector('.searchArea input[type="radio"]:checked');
	const radioValueSearchAmount = radioSearchAmount.value;
	const radioValueLanguage = localStorage.getItem('language');

	let data;

	if (userInput.length === 0) return;

	startLoading();

	if (allArtObjects) allArtObjects.remove();

	searchErrorText.textContent = '';

	const url = `https://www.rijksmuseum.nl/api/${radioValueLanguage}/collection?key=RdKQCPfy&q=${userInput}&ps=${radioValueSearchAmount}&imgonly=true`;

	try {
		data = await (await fetch(url)).json();

		stopLoading();

		if (data.artObjects.length === 0) throw new Error();

		if (data.artObjects.length < radioValueSearchAmount) {
			localStorage.getItem('language') === 'nl'
				? (searchErrorText.textContent = `[${data.artObjects.length} kunstwerken worden getoond]`)
				: (searchErrorText.textContent = `[${data.artObjects.length} pieces of art are being shown]`);
		} else {
			localStorage.getItem('language') === 'nl'
				? (searchErrorText.textContent = `[${radioValueSearchAmount} kunstwerken worden getoond]`)
				: (searchErrorText.textContent = `[${radioValueSearchAmount} pieces of art are being shown]`);
		}
	} catch {
		if (userInput.length > 11) {
			localStorage.getItem('language') === 'nl'
				? (searchErrorText.textContent =
						`We konden helaas geen resultaten vinden voor "${userInput}"`.slice(0, 58).trim() + '..."')
				: (searchErrorText.textContent =
						`Unfortunately we couldn't find any results for "${userInput}"`.slice(0, 58).trim() + '..."');
		} else {
			localStorage.getItem('language') === 'nl'
				? (searchErrorText.textContent = `We konden helaas geen resultaten vinden voor "${userInput}"`)
				: (searchErrorText.textContent = `Unfortunately we couldn't find any results for "${userInput}"`);
		}

		searchResultsContainer.classList.add('hidden');

		console.log('error');
	}

	getData(data.artObjects);
};

export { fetchData };
