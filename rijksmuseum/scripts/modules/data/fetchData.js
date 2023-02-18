// import functions and DOM elements from other modules
import { startLoading, stopLoading } from '../loading.js';
import { getData } from './getData.js';
import { searchResultsContainer } from '../../app.js';

// fetching data from the Rijkmuseum API based on user input
export const fetchData = async () => {
	// retrieve user input and relevant DOM elements
	const userInput = document.querySelector('input[name="search"]').value;
	const searchErrorText = document.querySelector('.mainContent .searchArea > div:first-of-type > p');
	const allArtObjects = document.querySelectorAll('section ul');
	const radioButtons = document.querySelectorAll('input[type="radio"]');
	// define variables for later use
	let data;
	let radioValue;

	// if there is no user input, return early and do not proceed with the fetch
	if (userInput.length === 0) return;

	// display a loading text while data is being fetched
	startLoading();

	// remove any previously displayed search results from the DOM
	for (const artObject of allArtObjects) artObject.remove();

	// reset the search error text
	searchErrorText.textContent = '';

	// loop through all radio buttons and check which one is currently selected
	for (const radioButton of radioButtons) {
		if (radioButton.checked) {
			radioValue = radioButton.value;
			break;
		}
	}
	
	// construct the URL based on user input and radio button selection
	const url = `https://www.rijksmuseum.nl/api/en/collection?key=RdKQCPfy&q=${userInput}&ps=${radioValue}&imgonly=true`;

	try {
		// fetch the data from the API and parse it as JSON
		data = await (await fetch(url)).json();

		// stop displaying the loading text 
		stopLoading();

		// if no art objects were returned by the API, throw an error
		if (data.artObjects.length === 0) throw new Error();

		// depending on the number of art objects returned and the radio button selection, display a message in the search error text element
		data.artObjects.length < radioValue
			? (searchErrorText.textContent = `[${data.artObjects.length} pieces of art are being shown]`)
			: (searchErrorText.textContent = `[${radioValue} pieces of art are being shown]`);
	} catch {
		// if there was an error fetching the data or no results were found, display an error message in the search error text element
		userInput.length > 11
			? (searchErrorText.textContent =
					`Unfortunately we couldn't find any results for "${userInput}"`.slice(0, 58).trim() + '..."')
			: (searchErrorText.textContent = `Unfortunately we couldn't find any results for "${userInput}"`);

		// hide the search results container element
		searchResultsContainer.classList.add('hidden');
		// log the error to the console for debugging purposes
		console.log('error');
	}
	// call the getData function and pass data through
	getData(data.artObjects);
};
