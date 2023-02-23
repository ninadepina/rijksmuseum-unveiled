const mainContent = document.querySelector('.mainContent');

const autocomplete = (input, array) => {
	let currentFocus;

	input.addEventListener('input', function (e) {
		input.value.length > 0 ? mainContent.classList.add('spacing') : mainContent.classList.remove('spacing');

		let autocompleteList,
			autocompleteItem,
			i,
			value = this.value;

		closeAllLists();
		if (!value) return false;
		currentFocus = -1;

		autocompleteList = document.createElement('ul');
		autocompleteList.setAttribute('id', this.id + 'autocompleteList');
		autocompleteList.setAttribute('class', 'autocompleteItems');

		this.parentNode.appendChild(autocompleteList);

		for (i = 0; i < array.length; i++) {
			if (array[i].toUpperCase().indexOf(value.toUpperCase()) > -1) {
				autocompleteItem = document.createElement('li');

				// checks if the input value is in the array item (if yes, highlights it)
				let suggestion = array[i].replace(new RegExp(value, 'gi'), '<strong>$&</strong>');
				autocompleteItem.innerHTML = suggestion;
				autocompleteItem.innerHTML += "<input type='hidden' value='" + array[i] + "'>";

				autocompleteItem.addEventListener('click', function (e) {
					input.value = this.getElementsByTagName('input')[0].value;
					closeAllLists();
				});

				// sorts items in the list based on if they start with the input value
				if (array[i].toUpperCase().startsWith(value.toUpperCase())) {
					autocompleteList.insertBefore(autocompleteItem, autocompleteList.childNodes[0]);
				} else {
					autocompleteList.appendChild(autocompleteItem);
				}
			}
		}
	});

	input.addEventListener('keydown', function (e) {
		// autocomplete container (for readability: 'x')
		let x = document.querySelector('#autocompleteList');
		if (x) x = x.getElementsByTagName('li');

		if (e.key === 'ArrowDown') {
			currentFocus++;
			addActive(x);
		} else if (e.key === 'ArrowUp') {
			currentFocus--;
			addActive(x);
		} else if (e.key === 'Enter') {
			if (currentFocus > -1) {
				if (x) x[currentFocus].click();
			}
			closeAllLists();
		}
	});

	const addActive = (x) => {
		if (!x) return false;
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = x.length - 1;
		if (currentFocus < 0) currentFocus = 0;
		x[currentFocus].classList.add('autocompleteActive');
		// makes sure the active suggestion is always visible
		if (
			x[currentFocus].offsetTop + x[currentFocus].offsetHeight >
			x[0].parentNode.scrollTop + x[0].parentNode.offsetHeight
		) {
			x[0].parentNode.scrollTop =
				x[currentFocus].offsetTop + x[currentFocus].offsetHeight - x[0].parentNode.offsetHeight;
		} else if (x[currentFocus].offsetTop < x[0].parentNode.scrollTop) {
			x[0].parentNode.scrollTop = x[currentFocus].offsetTop;
		}
	};

	const removeActive = (x) => {
		for (let i = 0; i < x.length; i++) {
			x[i].classList.remove('autocompleteActive');
		}
	};

	const closeAllLists = (elmnt) => {
		const x = document.getElementsByClassName('autocompleteItems');
		for (let i = 0; i < x.length; i++) {
			if (elmnt != x[i] && elmnt != input) {
				x[i].parentNode.removeChild(x[i]);
			}
		}
	};
};

export { autocomplete };
