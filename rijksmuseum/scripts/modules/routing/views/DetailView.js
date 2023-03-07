const DetailView = async (artId) => {
	const mainContent = document.querySelector('.mainContent');
	const radioValueLanguage = localStorage.getItem('language');
	const url = `https://www.rijksmuseum.nl/api/${radioValueLanguage}/collection/${artId}?key=RdKQCPfy`;
	const data = await (await fetch(url)).json();

	let backButtonText;
	let img;

	radioValueLanguage === 'nl'
		? (backButtonText = '< terug naar alle resultaten')
		: (backButtonText = '< back to all results');

	window.location.hash = `#/art/${artId}`;

	if (radioValueLanguage === 'en') data.artObject.description = data.artObject.titles[0];
	if (
		data.artObject.description === null ||
		data.artObject.description === undefined ||
		data.artObject.description == data.artObject.title
	)
		data.artObject.description = '';

	try {
		if (data.artObject.webImage) {
			img = data.artObject.webImage.url.slice(0, -3) + '=s1000';
		} else {
			radioValueLanguage === 'nl'
				? (img = './assets/images/noImgPlaceholderNl.png')
				: (img = './assets/images/noImgPlaceholderEn.png');
		}
		mainContent.innerHTML = `
			<article class="artItemContainer">
				<a href="">${backButtonText}</a>  
				<div>
					<img src="${img}" alt="${data.artObject.longtitle}" />
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
			if (sessionStorage.colorFilter) a.href = '#/colorfilter';
		});

		if (data.artObject.length === 0) throw new Error();
	} catch {
		console.log('error');
	}
};

export { DetailView };
