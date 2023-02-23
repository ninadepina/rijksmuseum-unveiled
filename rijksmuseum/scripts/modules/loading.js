////////////////////////////////////////////////////////////
// loading fetched data message
const startLoading = () => {
	const loadingMessage = document.querySelector('.mainContent .searchArea > div:last-of-type');
	loadingMessage.classList.add('show');
};
const stopLoading = () => {
	const loadingMessage = document.querySelector('.mainContent .searchArea > div:last-of-type');
	loadingMessage.classList.remove('show');
};

////////////////////////////////////////////////////////////
// skeleton loader
const skeletonLoader = document.querySelectorAll('.skeletonLoader');

const removeSkeletonLoader = () => {
	for (const loader of skeletonLoader) loader.classList.remove('skeletonLoader');
};
const addSkeletonLoader = () => {
	for (const loader of skeletonLoader) loader.classList.add('skeletonLoader');
};

////////////////////////////////////////////////////////////
// first load loader
const welcomeLoader = () => {
	const welcomeLoader = document.querySelector('.loadingBanner');
	welcomeLoader.classList.add('visible');
	setTimeout(() => {
		welcomeLoader.classList.remove('visible');
	}, 3000);
};

const firstLoad = () => {
	if (!sessionStorage.getItem('notFirstLoad')) {
		welcomeLoader();
		sessionStorage.setItem('notFirstLoad', 'true');
	}
};

export { startLoading, stopLoading, removeSkeletonLoader, addSkeletonLoader, firstLoad };
