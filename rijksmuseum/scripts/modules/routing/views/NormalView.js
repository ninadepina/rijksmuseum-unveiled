import { fetchData } from '../../data/fetchData.js';
import { autocomplete } from '../../autocomplete/autocomplete.js';
import { suggestions } from '../../autocomplete/suggestions.js';

const NormalView = () => {
	const mainContent = document.querySelector('.mainContent');
	mainContent.classList.remove('spacing');
	mainContent.innerHTML = `
		<section class="staticInfo">
			<header>
				<a href=""><img draggable="false" src="./assets/images/logoRijksmuseum.svg" alt="Rijksmuseum logo" /></a>
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
				<img draggable="false"
					src="./assets/images/collageVermeer.jpeg"
					alt="Image displaying multiple artworks by Johannes Vermeer" />
				<div>
					<h2>Johannes Vermeer exposition</h2>
					<p>At the moment there are no more tickets available..</p>
				</div>
			</section>
		</section>

		<section class="searchArea">
			<div>
				<p></p>
				<div>
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
			</div>
			<form autocomplete="off">
				<div>
					<input
						type="text"
						placeholder="Search for artists, art pieces and more..."
						name="search"
						autocomplete="off" />
				</div>
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

		<section class="loadingData"></section>
	`;
	const expoImg = document.querySelector('.staticInfo section img');
	const expoHeading = document.querySelector('.staticInfo section h2');
	const expoText = document.querySelector('.staticInfo section h2 + p');
	const radioButtonsText = document.querySelector('.searchArea div form p');
	const searchPlaceholder = document.querySelector('.searchArea > form input');
	const loadingText = document.querySelector('.searchArea > div:last-of-type p');

	if (localStorage.getItem('language') === 'nl') {
		if (window.matchMedia('screen and (min-width: 1000px)').matches)
			radioButtonsText.textContent = 'Hoeveelheid resultaten:';

		expoImg.alt = 'Afbeelding die meerdere werken van Johannes Vermeer toont';
		expoHeading.textContent = 'Johannes Vermeer expositie';
		expoText.textContent = 'Op dit moment zijn er geen tickets meer beschikbaar..';
		searchPlaceholder.placeholder = 'Zoek op kunstenaars, kunstwerken en meer...';
		loadingText.textContent = 'Afbeeldingen worden geladen.. dit kan een aantal seconden duren';
	}

	const loadingData = document.querySelector('.mainContent .loadingData');
	if (loadingData.childNodes.length === 0) loadingData.classList.add('hidden');

	const searchForm = document.querySelector('.mainContent .searchArea > form');
	searchForm.addEventListener('submit', (e) => {
		e.preventDefault();
		fetchData();
	});

	if (sessionStorage.getItem('back')) {
		fetchData();
	}

	autocomplete(searchForm.querySelector('input'), suggestions);
};

export { NormalView };