// import DOM element from other module
import { searchResultsContainer } from '../../app.js';

// displaying the fetched data
export const displayData = (artInfo) => {
	// hide the current exhibit section and display the search results section
	const currentExpoInfo = document.querySelector('.mainContent > section:first-of-type > section');
	currentExpoInfo.classList.add('hidden');
	searchResultsContainer.classList.remove('hidden');

	// create a <ul> element and add it to the search results section
	const ul = document.createElement('ul');
	searchResultsContainer.appendChild(ul);

	// loop through each art object and create <li> elements with their information
	artInfo.map((art) => {
		const liArt = `
			<a href="#art/${art.artId}">
				<img src=${art.artImg} alt="${art.artLongtitle}" />
				<div>
					<h2>${art.artTitle}</h2>
					<p>${art.artArtist}</p>
				</div>
			</a>
		`;
		const li = document.createElement('li');
		li.insertAdjacentHTML('beforeend', liArt);
		ul.insertAdjacentElement('beforeend', li);
	});
};
