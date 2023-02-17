const randomArtImg = document.querySelector('.generateRandomArt > section:first-of-type img');
const randomArtTitle = document.querySelector('.generateRandomArt > section:first-of-type h2');
const randomArtArtist = document.querySelector('.generateRandomArt > section:first-of-type > div:last-of-type > p');

export const displayRandomArt = (randomArtInfo) => {
	randomArtImg.src = randomArtInfo.artImg;
	randomArtImg.alt = randomArtInfo.artLongtitle;
	randomArtTitle.textContent = randomArtInfo.artTitle;
	randomArtArtist.textContent = randomArtInfo.artArtist;
};
