![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) 

# 👋🏼Welcome to my repository from [Web App From Scratch](https://github.com/cmda-minor-web/web-app-from-scratch-2223)

---

## Week 1: 'Hellooo'🤸🏽‍♀️
As for the kick-off from the minor Web Design & Development and the Web App from Scratch course, we got the assignment to create a digital business card in HTML, CSS & Javascript.
<details>
<summary>✍🏼HTML/CSS/JS breakdown sketch:</summary>

![breakdown sketch business card](https://user-images.githubusercontent.com/89778503/218146127-58fb2185-d056-45e6-9231-09de02ccf353.png)
</details>

<details>
<summary>👩🏼‍💻Fetching data from the Tribe API:</summary>

- [Link to the Tribe API](http://whois.fdnd.nl/)

I started with fetching my own data from the API:
```javascript
const url = 'https://whois.fdnd.nl/api/v1/squad?id=cldex67a348bw0auohxefw4ce'
const data = fetch(url).then(response => response.json())
    .then(data => console.log(data));
```

I changed this shortly after to also make it possible to use the fetched data:
```javascript
// all fields that should contain fetched info
const dataFields = document.querySelectorAll('.dataField');

// function to add fetched data to HTML
const updateUser = (user) => {
    document.querySelector('#avatar').src = user.avatar
	user.bio = user.bio.html;
	user.name = user.name + ' ' + user.surname;
	document.querySelector('#website').href = user.website;
	document.querySelector('#gitHubHandle').href = 'https://github.com/' + user.gitHubHandle;
	user.gitHubHandle = '@' + user.gitHubHandle;

	dataFields.forEach((dataField) => {
		dataField.textContent = user[dataField.id];
	});
};

// function for fetching data
const fetchUser = async () => {
	let user;
	const url = 'https://whois.fdnd.nl/api/v1/squad?id=cldex67a348bw0auohxefw4ce';
	try {
		user = await (await fetch(url)).json();
	} catch {
		console.log('Error');
	}
	updateUser(user.member);
};

// running function
fetchUser();
```

To make things a little more interesting, I added a feature that you can search and get your own data via the searchbar:
```javascript
// default slug (my own personal slug) to start with and fall back on
const defaultMemberSlug = 'ninadepina';

// get slug/id from searchbar input
const slug = new URLSearchParams(window.location.search).get('slug');
const id = new URLSearchParams(window.location.search).get('id');

// when there's no slug/id, the default slug will be used
if (!slug && !id) {
	window.history.replaceState('slug', 'slug', `?slug=${defaultMemberSlug}`);
}

// changed the function to be able to use the changed slug/id
const fetchUser = async () => {
	let user;
	let url = `https://whois.fdnd.nl/api/v1/member/${slug || defaultMemberSlug}`;
	if (id) url = `https://whois.fdnd.nl/api/v1/member?id=${id}`;
	try {
		user = await (await fetch(url)).json();
	} catch {
		console.log('Error');
	}
	updateUser(user.member);
};
```


Above code works perfectly fine, but there were some visual aspects I wanted to improve so I added more code to my function:
```javascript
const updateUser = (user) => {
    // I added a placeholder image for users that don't have an avatar
	document.querySelector('#avatar').src =
		user.avatar || 'https://openseauserdata.com/files/7ebafc8b0f146e86d96fb0d541fe7169.png';

    // added alt text to the avatar
	document.querySelector('#avatar').alt = `avatar of ${user.name + ' ' + user.surname}`;

	user.bio = user.bio.html;
	user.name = user.name + ' ' + user.surname;
	document.querySelector('#website').href = user.website;

    // remove https:// from the website url (for visual purposes)
	user.website = user.website.split('://')[1] || user.website.split('://')[0];

    // added www. in front of the website url if the url doesn't already containt that (for visual purposes)
	if (!user.website.startsWith('www.')) user.website = 'www.' + user.website;

	document.querySelector('#gitHubHandle').href = 'https://github.com/' + user.gitHubHandle;
	user.gitHubHandle = '@' + user.gitHubHandle;

	dataFields.forEach((dataField) => {
        // added a dataset with a value (I'll use it as the max. length) in the HTML
		const maxLength = Number(dataField.dataset.maxlength);

        // if a dataField exceeds the dataset, the content will be cut off and ellipsis will be placed
		user[dataField.id].length > maxLength
			? (dataField.textContent = user[dataField.id].slice(0, maxLength - 3).trim() + '...')
			: (dataField.textContent = user[dataField.id]);
	});
};
```

</details>

---

## Week 2: 'Hello API'🐒
**User story:** As an art lover, I want to be able to search and view art from the Rijksmuseum at home, so that I can still enjoy art from home. [Rijksmuseum - RijksData API](https://github.com/cmda-minor-web/web-app-from-scratch-2223/blob/main/course/rijksmuseum.md)

<details>
<summary>✍🏼Lo-Fi wireflow sketch:</summary>

![wireflowRijks](https://user-images.githubusercontent.com/89778503/218432660-d8a4ab2f-897a-468f-96ee-e478a831a7a8.png)
</details>

<details>
<summary>✍🏼HTML/CSS/JS breakdown sketch:</summary>

![breakdownRijks](https://user-images.githubusercontent.com/89778503/218432705-98d193de-718b-4ef7-b286-bbbbc2cd93b9.png)
</details>

<details>
<summary>🎨Hi-Fi sketches:</summary>

<a href="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2FNo4HkDDtzDw2uV6XBUG9jg%2FScorro%3Fnode-id%3D20%253A3%26t%3DVzXyuiRkjEDXHaRG-1
" target="_blank"><img src="https://user-images.githubusercontent.com/89778503/218435876-a2cef44f-77b6-49c9-84ad-9ac49e71a518.png" 
alt="Figma link to Hi-Fi sketches"/></a>
</details>
