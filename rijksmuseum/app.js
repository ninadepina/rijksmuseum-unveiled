// const defaultSearch = '';
// const search = new URLSearchParams(window.location.search).get('search');
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// DOM elements

const searchForm = document.querySelector('form');
const searchResultsContainer = document.querySelector('main > section:first-of-type > section:last-of-type');

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// Visual things

if (searchResultsContainer.children.length == 0) searchResultsContainer.classList.add('hidden');

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// Fetching data

// if (!search) {
//     window.history.replaceState('search', 'search', `?search=${defaultSearch}`);
// }

const fetchData = async () => {
	const allArtObjects = document.querySelectorAll('section ul');
	allArtObjects.forEach((artObject) => artObject.remove());

	let data;
	const userInput = document.querySelector('input[name="search"]').value;
	if (userInput.length == 0) return;
	let url = `https://www.rijksmuseum.nl/api/nl/collection?key=RdKQCPfy&q=${userInput}`;

	// if (search.length !== 0) url = `https://www.rijksmuseum.nl/api/nl/collection?key=RdKQCPfy&q=${search || defaultSearch}`;

	try {
		data = await (await fetch(url)).json();
		if (data.artObjects.length == 0) throw new Error();
		// console.log(data.artObjects[0].longTitle.match(/(\d+)/)[0])
	} catch {
		// window.history.replaceState('search', 'search', `?search=${defaultSearch}`);
		console.log('error');
	}
	getData(data.artObjects);
};

const getData = (artObjects) => {
	console.log(artObjects);

	let artInfo = artObjects.map((art) => {
		const artImg = art.webImage;
		const artLongtitle = art.longTitle;
		const artTitle = art.title;
		const artArtist = art.principalOrFirstMaker;
		// const artDate = art.longTitle.match(/(\d+)/)[0];
		// const artId = art.id;

		return {
			artImg,
			artLongtitle,
			artTitle,
			artArtist
		};
	});
	displayData(artInfo);
};

const displayData = (artInfo) => {
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
		console.log(li);
	});
};

searchForm.addEventListener('submit', (e) => {
	e.preventDefault();
	fetchData();
});

// fetchData();
