////////////////////////////////////////////////////////////
// Rotating card
const card = document.querySelector('.card');
const cardFront = document.querySelector('.cardFront');
const cardBack = document.querySelector('.cardBack');

const flipCard = () => {
	card.classList.toggle('rotate');

	if (!card.classList.contains('rotate')) {
		cardBack.addEventListener(
			'transitionend',
			() => {
				cardBack.classList.toggle('show');
			},
			{ once: true }
		);
	} else {
		cardBack.classList.toggle('show');
	}
};

card.addEventListener('click', flipCard);
card.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		flipCard();
	}
});

////////////////////////////////////////////////////////////
// Bio section card
const openBio = document.querySelectorAll('.click');
const cardBio = document.querySelector('.bio');
const textFunction = document.querySelector('.function');

textFunction.textContent = 'openBio';

openBio.forEach((openBioButton) => {
	openBioButton.addEventListener('click', (event) => {
		cardBio.classList.toggle('display');

		cardBio.classList.contains('display')
			? (textFunction.textContent = 'closeBio')
			: (textFunction.textContent = 'openBio');

		event.stopPropagation();
	});
});

const links = document.querySelectorAll('a');

links.forEach((link) => {
	link.addEventListener('click', (event) => {
		event.stopPropagation();
	});
});

////////////////////////////////////////////////////////////
// API
const dataFields = document.querySelectorAll('.dataField');

const defaultMemberSlug = 'ninadepina';
// const defaultMemberId = 'cldex67a348bw0auohxefw4ce';
const slug = new URLSearchParams(window.location.search).get('slug');
const id = new URLSearchParams(window.location.search).get('id');

if (!slug && !id) {
	window.history.replaceState('slug', 'slug', `?slug=${defaultMemberSlug}`);
}

const updateUser = (user) => {
	document.querySelector('#avatar').src = user.avatar;
	user.bio = user.bio.html;
	user.name = user.name + ' ' + user.surname;
	document.querySelector('#website').href = user.website;
	user.website = user.website.split('://')[1] || user.website.split('://')[0];
	if (!user.website.startsWith('www.')) user.website = 'www.' + user.website;
	document.querySelector('#gitHubHandle').href = 'https://github.com/' + user.gitHubHandle;
	user.gitHubHandle = '@' + user.gitHubHandle;

	dataFields.forEach((dataField) => {
		const maxLength = Number(dataField.dataset.maxlength);

		user[dataField.id].length > maxLength
			? (dataField.textContent = user[dataField.id].slice(0, maxLength - 3).trim() + '...')
			: (dataField.textContent = user[dataField.id]);
	});
};

const fetchUser = async () => {
	let user;
	let url = `https://whois.fdnd.nl/api/v1/member/${slug || defaultMemberSlug}`;
	if (id) url = `https://whois.fdnd.nl/api/v1/member?id=${id}`;
	try {
		user = await (await fetch(url)).json();
	} catch {
		console.log('Error, losertje!');
	}
	updateUser(user.member);
};

fetchUser();
