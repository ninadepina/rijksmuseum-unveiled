import { searchResultsContainer } from '../../app.js';

export const displayData = (artInfo) => {
	searchResultsContainer.classList.remove('hidden');
	const ul = document.createElement('ul');
	searchResultsContainer.appendChild(ul);

	artInfo.map((art) => {
		const liArt = `
			<a href="">
				<img src=${art.artImg.url + 1500} alt="${art.artLongtitle}" />
				<div>
					<h2>${art.artTitle}</h2>
					<p>${art.artArtist}</p>
				</div>
			</a>
		`;
		const li = document.createElement('li');
		li.innerHTML = liArt;
		ul.appendChild(li);
	});
};
