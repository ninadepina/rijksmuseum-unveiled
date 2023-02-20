import { searchResultsContainer } from '../../app.js';

// displaying the fetched data
export const displayData = (artInfo) => {
	const currentExpoInfo = document.querySelector('.mainContent > section:first-of-type > section');
	currentExpoInfo.classList.add('hidden');
	searchResultsContainer.classList.remove('hidden');

	const ul = document.createElement('ul');
	searchResultsContainer.appendChild(ul);

	const fragment = document.createDocumentFragment();

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
