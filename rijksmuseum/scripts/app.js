import { fetchRandomArt } from './modules/randomArtData/fetchRandomArt.js';
import { defaultArt } from './modules/randomArtData/defaultArt.js';
import { removeSkeletonLoader, firstLoad } from './modules/loading.js';
import { router } from './modules/routing/routing.js';
import { currentLanguage, staticInfo } from './modules/language.js';

////////////////////////////////////////////////////////////
const searchResultsContainer = document.querySelector('.mainContent .loadingData');
const randomArtImg = document.querySelector('.generateRandomArt > section:first-of-type img');
const randomArtTitle = document.querySelector('.generateRandomArt > section:first-of-type h2');
const randomArtArtist = document.querySelector('.generateRandomArt > section:first-of-type > div:last-of-type > p');
const generateRandomArtButton = document.querySelector('.generateRandomArt button');
const radioLanguages = document.querySelectorAll('.language input[type="radio"]');

////////////////////////////////////////////////////////////
for (let i = 0; i < radioLanguages.length; i++) {
	radioLanguages[i].addEventListener('click', () => {
		localStorage.setItem('language', radioLanguages[i].value);
		radioLanguages[i].checked = true;
		window.location.reload(false);
	});
}

firstLoad();
defaultArt();
removeSkeletonLoader();
router();
currentLanguage();
staticInfo();

window.onhashchange = () => {
	router();
};

generateRandomArtButton.addEventListener('click', fetchRandomArt);

// Get all select elements
const selectElements = document.querySelectorAll('select');

// Iterate over each select element
selectElements.forEach((selectElement) => {
	// Cache the number of options
	const numberOfOptions = selectElement.children.length;

	// Hides the select element
	selectElement.classList.add('s-hidden');

	// Wrap the select element in a div
	const wrapper = document.createElement('div');
	wrapper.classList.add('select');
	selectElement.parentNode.insertBefore(wrapper, selectElement);
	wrapper.appendChild(selectElement);

	// Insert a styled div to sit over the top of the hidden select element
	const styledSelect = document.createElement('div');
	styledSelect.classList.add('styledSelect');
	selectElement.parentNode.insertBefore(styledSelect, selectElement.nextSibling);

	// Show the first select option in the styled div
	styledSelect.textContent = selectElement.children[0].textContent;

	// Insert an unordered list after the styled div and also cache the list
	const list = document.createElement('ul');
	list.classList.add('options');
	styledSelect.parentNode.insertBefore(list, styledSelect.nextSibling);

	// Insert a list item into the unordered list for each select option
	for (let i = 0; i < numberOfOptions; i++) {
		const listItem = document.createElement('li');
		listItem.textContent = selectElement.children[i].textContent;
		listItem.setAttribute('rel', selectElement.children[i].value);
		list.appendChild(listItem);
	}

	// Cache the list items
	const listItems = list.children;

	// Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
	styledSelect.addEventListener('click', (e) => {
		e.stopPropagation();
		document.querySelectorAll('div.styledSelect.active').forEach((activeSelect) => {
			activeSelect.classList.remove('active');
			activeSelect.nextSibling.style.display = 'none';
		});
		styledSelect.classList.toggle('active');
		list.style.display = list.style.display === 'none' ? 'block' : 'none';
	});

	// Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
	// Updates the select element to have the value of the equivalent option
	for (let i = 0; i < listItems.length; i++) {
		listItems[i].addEventListener('click', (e) => {
			e.stopPropagation();
			styledSelect.textContent = listItems[i].textContent;
			styledSelect.classList.remove('active');
			selectElement.value = listItems[i].getAttribute('rel');
			list.style.display = 'none';
		});
	}

	// Hides the unordered list when clicking outside of it
	document.addEventListener('click', () => {
		styledSelect.classList.remove('active');
		list.style.display = 'none';
	});
});

////////////////////////////////////////////////////////////
export { searchResultsContainer, randomArtImg, randomArtTitle, randomArtArtist };
