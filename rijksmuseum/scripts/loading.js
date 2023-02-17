const loadingMessage = document.querySelector('.mainContent .searchArea > div:last-of-type');

export const startLoading = () => {
	loadingMessage.classList.add('show');
};

export const stopLoading = () => {
	loadingMessage.classList.remove('show');
};
