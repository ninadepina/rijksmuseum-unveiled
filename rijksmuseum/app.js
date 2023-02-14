// const defaultSearch = '';
// const search = new URLSearchParams(window.location.search).get('search');
////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// DOM elements

const searchForm = document.querySelector('form');


////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// Fetching data

// if (!search) {
//     window.history.replaceState('search', 'search', `?search=${defaultSearch}`);
// }

const fetchData = async () => {
    let data;
    const userInput = document.querySelector('input[name="search"]').value;
	let url = `https://www.rijksmuseum.nl/api/nl/collection?key=RdKQCPfy&q=${userInput}`;
    
    // if (search.length !== 0) url = `https://www.rijksmuseum.nl/api/nl/collection?key=RdKQCPfy&q=${search || defaultSearch}`;

	try {
		data = await (await fetch(url)).json();
		if (data.artObjects.length == 0) throw new Error();
	} catch {
        // window.history.replaceState('search', 'search', `?search=${defaultSearch}`);
		console.log('error');
	}
};

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    fetchData();
});

// fetchData();


const searchResultsContainer = document.querySelector('main > section:first-of-type > section:last-of-type');
console.log(searchResultsContainer);