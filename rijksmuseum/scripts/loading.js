////////////////////////////////////////////////////////////
// Loading message
const loadingMessage = document.querySelector('.mainContent .searchArea > div:last-of-type');

export const startLoading = () => {
	loadingMessage.classList.add('show');
};
export const stopLoading = () => {
	loadingMessage.classList.remove('show');
};

////////////////////////////////////////////////////////////
// Skeleton loader
const skeletonLoader = document.querySelectorAll('.skeletonLoader');

export const removeSkeletonLoader = () => {
	for (const loader of skeletonLoader) loader.classList.remove('skeletonLoader');
};
export const addSkeletonLoader = () => {
	for (const loader of skeletonLoader) loader.classList.add('skeletonLoader');
};
