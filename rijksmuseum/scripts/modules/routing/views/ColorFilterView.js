import { fetchColorData } from '../../colorFilter.js';

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
			fetchColorData(radioColorFilter);
		});
	});

	const clearColorSelection = document.querySelector('.colorFilter p');
	clearColorSelection.addEventListener('click', () => {
		const checkedRadio = document.querySelector('.colorFilter input[type="radio"]:checked');
		const allArtObjects = document.querySelector('section ul');

		if (checkedRadio) checkedRadio.checked = false;
		if (allArtObjects) allArtObjects.remove();
	});

	const randomRadioColorFilter = radioColorFilters[Math.floor(Math.random() * radioColorFilters.length)];
	if (sessionStorage.colorFilter) {
		const colorFilterInput = document
		.querySelector(`.colorFilter input[value="${sessionStorage.colorFilter.toLowerCase()}"]`)
		.labels.item(0);
		colorFilterInput.click();
		sessionStorage.removeItem('colorFilter');
	} else {
		randomRadioColorFilter.click();
	}

	const checkedRadio = document.querySelector('.colorFilter input[type="radio"]:checked');
	sessionStorage.setItem('colorFilter', checkedRadio.value.toUpperCase());
};

export { ColorFilterView };
