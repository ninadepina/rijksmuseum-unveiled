import { artInfo } from '../data/getData.js';
import { fetchData } from '../data/fetchData.js';

const NormalView = () => {
	const div = document.querySelector('.mainContent > div');
	div.innerHTML = `
		<section class="staticInfo">
			<header>
				<img src="./assets/images/logoRijks.svg" alt="'Rijks', part of the Rijksmuseum logo" />
				<img src="./assets/images/logoMuseum.svg" alt="'Museum', part of the Rijksmuseum logo" />
				<div>
					<p>Open daily 9 to 17h</p>
					<p>|</p>
					<p>Museumstraat 1, Amsterdam</p>
				</div>
			</header>

			<section>
				<div>
					<p>10 / 1632</p>
					<span></span>
					<p>12 / 1675</p>
				</div>
				<img
					src="./assets/images/collageVermeer.jpeg"
					alt="Image displaying multiple artworks by Johannes Vermeer" />
				<div>
					<h2>Johannes Vermeer exposition</h2>
					<p>At the moment there are no more tickets available..</p>
				</div>
			</section>
		</section>

		<section class="searchArea view">
			<div>
				<p></p>
				<form>
					<p>Amount of results:</p>
					<fieldset>
						<input type="radio" name="select" id="option-1" value="10" checked />
						<input type="radio" name="select" id="option-2" value="20" />
						<input type="radio" name="select" id="option-3" value="30" />

						<label for="option-1">
							<div></div>
							<span>10</span>
						</label>
						<label for="option-2">
							<div></div>
							<span>20</span>
						</label>
						<label for="option-3">
							<div></div>
							<span>30</span>
						</label>
					</fieldset>
				</form>
			</div>
			<form>
				<input
					type="text"
					placeholder="Search for artists, art pieces and more..."
					name="search"
					autocomplete="off" />
				<button type="submit">
					<svg fill="none" viewBox="0 0 41 41" xmlns="http://www.w3.org/2000/svg">
						<path
							d="m18.333 35.667c9.573 0 17.333-7.7604 17.333-17.333 0-9.5729-7.7604-17.333-17.333-17.333-9.5729 0-17.333 7.7604-17.333 17.333 0 9.573 7.7604 17.333 17.333 17.333z" />
						<path d="m40 40-9.425-9.425" />
					</svg>
				</button>
			</form>
			<div><p>Images are being loaded.. this could take a few seconds</p></div>
		</section>

		<section class="loadingData view"></section>
	`;

	const searchForm = document.querySelector('.mainContent .searchArea > form');
	searchForm.addEventListener('submit', (e) => {
		e.preventDefault();
		fetchData();
	});
};

const detailView = async (artId) => {
	const div = document.querySelector('.mainContent > div');

	window.location.hash = `#/art/${artId}`;
	const art = artInfo.find((art) => art.artId === artId);

	if (!art) {
		const modifiedArtId = artId.slice(3);
		const url = `https://www.rijksmuseum.nl/api/en/collection/${modifiedArtId}?key=RdKQCPfy`;
		const data = await (await fetch(url)).json();
		div.innerHTML = `
			<article class="artItemContainer">
				<a href="#">< back to all results</a>  
				<div>
					<img src="${data.artObject.webImage.url.slice(0, -3) + '=s1000'}" alt="${data.artObject.longTitle}" />
					<div>
						<h2>${data.artObject.title}</h2>
						<p>${data.artObject.principalOrFirstMaker}</p>
					</div>
				</div>
			</article>
		`;
	}

	if (art) {
		div.innerHTML = `
			<article class="artItemContainer">
				<a href="#">< back to all results</a>  
				<div>
					<img src="${art.artImg}" alt="${art.artLongtitle}" />
					<div>
						<h2>${art.artTitle}</h2>
						<p>${art.artArtist}</p>
					</div>
				</div>
			</article>
		`;
	}
};

export const routes = [
	{ path: '/', view: NormalView },
	{ path: '/art/:id', view: detailView }
];