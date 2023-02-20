import { artInfo } from './data/getData.js';

const artItemContainer = document.querySelector('.artItemContainer');
const notArtItemContainers = document.querySelectorAll('.view');

export const routing = (hash) => {
	if (hash.startsWith('#art/')) {
		const artId = hash.slice(5);

		const art = artInfo.find((art) => art.artId === artId);

		const article = document.createElement('article');
		article.classList.add('artItem');
		artItemContainer.appendChild(article);

		artItemContainer.classList.toggle('visible');
		for (const notArtItemContainer of notArtItemContainers) {
			notArtItemContainer.classList.toggle('hidden');
		}

		const singleArtDetails = `
			<a href="#">< back to all results</a>	
			<div>
				<img src="${art.artImg}" alt="${art.artLongtitle}" />
				<div>
					<h2>${art.artTitle}</h2>
					<p>${art.artArtist}</p>
				</div>
			</div>
		`;
		article.insertAdjacentHTML('beforeend', singleArtDetails);

		const backToAllResults = artItemContainer.querySelector('.artItem a');

		backToAllResults.addEventListener('click', () => {
			artItemContainer.classList.toggle('visible');
			notArtItemContainers.forEach((notArtItemContainer) => {
				notArtItemContainer.classList.toggle('hidden');
			});

			article.remove();

			window.location.hash = '';
		});
	}
};
