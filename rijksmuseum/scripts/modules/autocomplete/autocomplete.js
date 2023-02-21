const mainContent = document.querySelector('.mainContent');

export const autocomplete = (input, array) => {
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

		autocompleteList = document.createElement('div');
		autocompleteList.setAttribute('id', this.id + 'autocomplete-list');
		autocompleteList.setAttribute('class', 'autocomplete-items');

		this.parentNode.appendChild(autocompleteList);

		for (i = 0; i < array.length; i++) {
			if (array[i].toUpperCase().indexOf(value.toUpperCase()) > -1) {
				autocompleteItem = document.createElement('div');

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
		let x = document.querySelector('#autocomplete-list');
		if (x) x = x.getElementsByTagName('div');

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
		}
	});

	const addActive = (x) => {
		if (!x) return false;
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = x.length - 1;
		x[currentFocus].classList.add('autocomplete-active');
	};

	const removeActive = (x) => {
		for (let i = 0; i < x.length; i++) {
			x[i].classList.remove('autocomplete-active');
		}
	};

	const closeAllLists = (elmnt) => {
		const x = document.getElementsByClassName('autocomplete-items');
		for (let i = 0; i < x.length; i++) {
			if (elmnt != x[i] && elmnt != input) {
				x[i].parentNode.removeChild(x[i]);
			}
		}
	};
};
