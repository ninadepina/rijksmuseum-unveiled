import { fetchData } from '../data/fetchData.js';
import { fetchColorData } from '../colorFilter.js';
import { autocomplete } from '../autocomplete/autocomplete.js';
import { suggestions } from '../autocomplete/suggestions.js';

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

const DetailView = async (artId) => {
	const mainContent = document.querySelector('.mainContent');
	const radioValueLanguage = localStorage.getItem('language');
	const url = `https://www.rijksmuseum.nl/api/${radioValueLanguage}/collection/${artId}?key=RdKQCPfy`;
	const data = await (await fetch(url)).json();

	let backButtonText;

	radioValueLanguage === 'nl'
		? (backButtonText = '< terug naar alle resultaten')
		: (backButtonText = '< back to all results');

	window.location.hash = `#/art/${artId}`;

	if (radioValueLanguage === 'en') data.artObject.description = data.artObject.titles[0];
	if (
		data.artObject.description === null ||
		data.artObject.description === undefined ||
		data.artObject.description === data.artObject.title
	)
		data.artObject.description = '';

	try {
		mainContent.innerHTML = `
			<article class="artItemContainer">
				<a href="">${backButtonText}</a>  
				<div>
					<img src="${data.artObject.webImage.url.slice(0, -3) + '=s1000'}" alt="${data.artObject.longtitle}" />
					<div>
						<h2>${data.artObject.title}</h2>
						<p>${data.artObject.principalOrFirstMaker}</p>
						<p>${data.artObject.subTitle}</p>
						<p>${data.artObject.description}</p>
					</div>
				</div>
			</article>
		`;

		const a = document.querySelector('.artItemContainer a');
		a.addEventListener('click', () => {
			sessionStorage.setItem('back', true);
			sessionStorage.setItem('visitedArt', window.location.hash);
		});

		if (data.artObject.length === 0) throw new Error();
	} catch {
		console.log('error');
	}
};

const ColorFilterView = () => {
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
		</section>

		<section class="colorFilter">
			<p>Clear color/search selection</p>
			<form>
				<input type="radio" name="color" id="color-1" value="000000" />
				<input type="radio" name="color" id="color-2" value="737c84" />
				<input type="radio" name="color" id="color-3" value="b5bfcc" />
				<input type="radio" name="color" id="color-4" value="f6ecf3" />
				<input type="radio" name="color" id="color-5" value="dda5aa" />
				<input type="radio" name="color" id="color-6" value="f49b7a" />
				<input type="radio" name="color" id="color-7" value="df4c93" />
				<input type="radio" name="color" id="color-8" value="de4153" />
				<input type="radio" name="color" id="color-9" value="981313" />
				<input type="radio" name="color" id="color-10" value="b35a1f" />
				<input type="radio" name="color" id="color-11" value="e09714" />
				<input type="radio" name="color" id="color-12" value="ffeb00" />
				<input type="radio" name="color" id="color-13" value="fbf6e1" />
				<input type="radio" name="color" id="color-14" value="e0cc91" />
				<input type="radio" name="color" id="color-15" value="62ad77" />
				<input type="radio" name="color" id="color-16" value="2f4f4f" />
				<input type="radio" name="color" id="color-17" value="4279db" />
				<input type="radio" name="color" id="color-18" value="8268dc" />
				<input type="radio" name="color" id="color-19" value="4019b1" />
				<input type="radio" name="color" id="color-20" value="850085" />

				<label for="color-1"><div></div></label>
				<label for="color-2"><div></div></label>
				<label for="color-3"><div></div></label>
				<label for="color-4"><div></div></label>
				<label for="color-5"><div></div></label>
				<label for="color-6"><div></div></label>
				<label for="color-7"><div></div></label>
				<label for="color-8"><div></div></label>
				<label for="color-9"><div></div></label>
				<label for="color-10"><div></div></label>
				<label for="color-11"><div></div></label>
				<label for="color-12"><div></div></label>
				<label for="color-13"><div></div></label>
				<label for="color-14"><div></div></label>
				<label for="color-15"><div></div></label>
				<label for="color-16"><div></div></label>
				<label for="color-17"><div></div></label>
				<label for="color-18"><div></div></label>
				<label for="color-19"><div></div></label>
				<label for="color-20"><div></div></label>
			</form>
			<div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</section>

		<section class="loadingData"></section>
	`;
	const colorFilterButton = document.querySelector('.language a');
	if (window.location.hash === '#/colorfilter')
		colorFilterButton.setAttribute('data-before', "Back to 'normal' search");

	colorFilterButton.addEventListener('click', () => {
		window.location = '';
	});

	const loadingData = document.querySelector('.mainContent .loadingData');
	if (loadingData.childNodes.length === 0) loadingData.classList.add('hidden');

	const radioColorFilters = document.querySelectorAll('.colorFilter label');
	radioColorFilters.forEach((radioColorFilter) => {
		radioColorFilter.addEventListener('click', () => {
			console.log('click');
			fetchColorData(radioColorFilter);
		});
	});

	const randomRadioColorFilter = radioColorFilters[Math.floor(Math.random() * radioColorFilters.length)];
	window.addEventListener('load', () => {
		randomRadioColorFilter.click();
	});

	const clearColorSelection = document.querySelector('.colorFilter p');
	clearColorSelection.addEventListener('click', () => {
		const checkedRadio = document.querySelector('.colorFilter input[type="radio"]:checked');
		const allArtObjects = document.querySelector('section ul');

		if (checkedRadio) checkedRadio.checked = false;
		if (allArtObjects) allArtObjects.remove();
	});
};

const routes = [
	{ path: '/', view: NormalView },
	{ path: '/art/:id', view: DetailView },
	{ path: '/colorfilter', view: ColorFilterView }
];

export { routes };
