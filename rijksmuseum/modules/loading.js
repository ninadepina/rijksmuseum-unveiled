const loadingMessage = document.querySelector('main > section:first-of-type > section:nth-of-type(2) div');

export const startLoading = () => {
    loadingMessage.classList.add('show');
}

export const stopLoading = () => {
    loadingMessage.classList.remove('show');
}