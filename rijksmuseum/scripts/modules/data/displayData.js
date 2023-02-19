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

	// create a new document fragment to hold the new <li> elements
	const fragment = document.createDocumentFragment();

	// iterate over each art object and create <li> elements with their information
	artInfo.forEach((art) => {
		const liArt = `
			<li>
				<a href="#art/${art.artId}">
					<img src=${art.artImg} alt="${art.artLongtitle}" />
					<div>
						<h2>${art.artTitle}</h2>
						<p>${art.artArtist}</p>
					</div>
				</a>
			</li>
		`;
		const li = document.createElement('li');
		li.insertAdjacentHTML('beforeend', liArt);
		fragment.appendChild(li);
	});
	ul.appendChild(fragment);
};
