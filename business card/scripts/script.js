import { defaultUser } from './defaultUser.js';

const defaultMemberSlug = 'ninadepina';
const defaultMemberId = 'cldex67a348bw0auohxefw4ce';
const slug = new URLSearchParams(window.location.search).get('slug');
const id = new URLSearchParams(window.location.search).get('id');

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// DOM elements

const card = document.querySelector('.card');
const cardBack = document.querySelector('.cardBack');
const avatar = document.querySelector('#avatar');

const openBio = document.querySelectorAll('.click');
const cardBio = document.querySelector('.bio');
const textFunction = document.querySelector('.function');
const links = document.querySelectorAll('a');

const dataFields = document.querySelectorAll('.dataField');

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// Rotating card

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
card.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		flipCard();
	}
});

avatar.addEventListener('click', (e) => {
	if (window.matchMedia('screen and (max-width: 520px)').matches) {
		avatar.classList.toggle('clickMobile');
		e.stopPropagation();
	}
});

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// Bio section card

links.forEach((link) => {
	link.addEventListener('click', (e) => {
		e.stopPropagation();
	});
});

textFunction.textContent = 'openBio';

openBio.forEach((openBioButton) => {
	openBioButton.addEventListener('click', (e) => {
		cardBio.classList.toggle('display');

		cardBio.classList.contains('display')
			? (textFunction.textContent = 'closeBio')
			: (textFunction.textContent = 'openBio');

		e.stopPropagation();
	});
	openBioButton.addEventListener('keydown', (e) => {
		cardBio.classList.contains('display') ? (avatar.tabIndex = -1) : (avatar.tabIndex = 0);

		cardBio.classList.contains('display')
			? links.forEach((link) => {
					link.tabIndex = -1;
			  })
			: links.forEach((link) => {
					link.tabIndex = 0;
			  });

		e.stopPropagation();
	});
});

////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// API

if (!slug && !id) {
	window.history.replaceState('slug', 'slug', `?slug=${defaultMemberSlug}`);
}

const updateUser = (user) => {
	document.querySelector('#avatar').src =
		user.avatar || 'https://openseauserdata.com/files/7ebafc8b0f146e86d96fb0d541fe7169.png';
	document.querySelector('#avatar').alt = `avatar of ${user.name + ' ' + user.surname}`;

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
		if (!user.member) throw new Error();
	} catch {
		user = defaultUser;
		id
			? window.history.replaceState('id', 'id', `?id=${defaultMemberId}`)
			: window.history.replaceState('slug', 'slug', `?slug=${defaultMemberSlug}`);
		console.log('This user does not exist, default user is being loaded');
	}
	updateUser(user.member);
};

fetchUser();
