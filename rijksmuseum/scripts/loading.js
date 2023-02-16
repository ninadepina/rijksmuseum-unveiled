const loadingMessage = document.querySelector('.mainContent > section:nth-of-type(2) div:last-of-type');

export const startLoading = () => {
    loadingMessage.classList.add('show');
}

export const stopLoading = () => {
    loadingMessage.classList.remove('show');
}