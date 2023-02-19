// import a function from another module
import { artInfo } from './data/getData.js';

const artItemContainer = document.querySelector('.artItemContainer');
const notArtItemContainers = document.querySelectorAll('.view');

export const routing = (hash) => {
	// if the hash starts with '#art/', show the corresponding art info
	if (hash.startsWith('#art/')) {
		// extract the art ID from the hash
		const artId = hash.slice(5);

		// find the corresponding art object in the artInfo array
		const art = artInfo.find((art) => art.artId === artId);

		// create a new HTML article element and add it to the artItemContainer
		const article = document.createElement('article');
		article.classList.add('artItem');
		artItemContainer.appendChild(article);

		// toggle the visibility of the artItemContainer and notArtItemContainers
		artItemContainer.classList.toggle('visible');
		for (const notArtItemContainer of notArtItemContainers) {
			notArtItemContainer.classList.toggle('hidden');
		}

		// generate the HTML for the single art item and add it to the article
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
			// toggle the visibility of the artItemContainer and notArtItemContainers
			artItemContainer.classList.toggle('visible');
			notArtItemContainers.forEach((notArtItemContainer) => {
				notArtItemContainer.classList.toggle('hidden');
			});
			// remove the article element from the DOM
			article.remove();
			// clear the hash from the URL
			window.location.hash = '';
		});
	}
};
