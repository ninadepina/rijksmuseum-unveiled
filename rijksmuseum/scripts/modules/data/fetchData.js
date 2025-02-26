import { startLoading, stopLoading } from '../loading.js';
import { getData } from './getData.js';

// fetching data from the Rijkmuseum API based on user input
const fetchData = async () => {
	const input = document.querySelector('input[name="search"]');
	let userInput = document.querySelector('input[name="search"]').value;
	const searchErrorText = document.querySelector('.mainContent .searchArea > div:first-of-type > p');
	const allArtObjects = document.querySelector('section ul');
	const radioSearchAmount = document.querySelector('.searchArea > div form:last-of-type input[type="radio"]:checked');
	let radioValueSearchAmount = radioSearchAmount.value;
	const radioValueLanguage = localStorage.getItem('language');

	let data;

	if (sessionStorage.getItem('back')) {
		userInput = sessionStorage.getItem('userInput');
		radioValueSearchAmount = sessionStorage.getItem('radioValueSearchAmount');
		if (document.querySelector(`input[value="${radioValueSearchAmount}"]`))
			document.querySelector(`input[value="${radioValueSearchAmount}"]`).checked = true;
		input.value = userInput;
	}

	sessionStorage.setItem('userInput', userInput);
	sessionStorage.setItem('radioValueSearchAmount', radioValueSearchAmount);

	if (!sessionStorage.colorFilter) {
		if (userInput.length === 0) return;
	}

	startLoading();

	if (allArtObjects) allArtObjects.remove();

	searchErrorText.textContent = '';

	let url = `https://www.rijksmuseum.nl/api/${radioValueLanguage}/collection?key=RdKQCPfy&q=${userInput}&ps=${radioValueSearchAmount}&imgonly=true`;

	if (sessionStorage.back && sessionStorage.colorFilter) {
		const color = sessionStorage.colorFilter;
		url = `https://www.rijksmuseum.nl/api/${radioValueLanguage}/collection?key=RdKQCPfy&ps=100&imgonly=true&f.normalized32Colors.hex=%20%23${color}`;
	}

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
						`We konden helaas geen resultaten vinden voor "${userInput}"`.slice(0, 60).trim() + '..."')
				: (searchErrorText.textContent =
						`Unfortunately we couldn't find any results for "${userInput}"`.slice(0, 58).trim() + '..."');
		} else {
			localStorage.getItem('language') === 'nl'
				? (searchErrorText.textContent = `We konden helaas geen resultaten vinden voor "${userInput}"`)
				: (searchErrorText.textContent = `Unfortunately we couldn't find any results for "${userInput}"`);
		}

		console.log('error');
	}

	getData(data.artObjects);
};

export { fetchData };
