import { searchResultsContainer } from '../../app.js';

export const displayData = (artInfo) => {
	const currentExpoInfo = document.querySelector('.mainContent > section:first-of-type > section');
	currentExpoInfo.classList.add('hidden');
	searchResultsContainer.classList.remove('hidden');
	const ul = document.createElement('ul');
	searchResultsContainer.appendChild(ul);

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
