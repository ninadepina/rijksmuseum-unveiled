// displaying the fetched data
const displayData = (artInfo) => {
	const currentExpoInfo = document.querySelector('.mainContent .staticInfo > section');
	if (currentExpoInfo) currentExpoInfo.classList.add('hidden');
	const searchResultsContainer = document.querySelector('.mainContent .loadingData');
	searchResultsContainer.classList.remove('hidden');

	const ul = document.createElement('ul');
	searchResultsContainer.appendChild(ul);

	const fragment = document.createDocumentFragment();

	artInfo.forEach((art) => {
		const liArt = `
			<a href="#/art/${art.artId}">
				<figure>
					<img src=${art.artImg} alt="${art.artLongtitle}" />
				</figure>
				<div>
					<h2>${art.artTitle}</h2>
					<p>${art.artArtist}</p>
				</div>
			</a>
		`;
		const li = document.createElement('li');
		li.insertAdjacentHTML('beforeend', liArt);
		fragment.appendChild(li);
	});
	ul.appendChild(fragment);

	if (sessionStorage.getItem('back')) {
		const visitedArtHash = sessionStorage.getItem('visitedArt');
		const visitedArt = document.querySelector(`li:has(a[href="${visitedArtHash}"])`);
		visitedArt.scrollIntoView();
		sessionStorage.removeItem('back');
	}
};

export { displayData };
