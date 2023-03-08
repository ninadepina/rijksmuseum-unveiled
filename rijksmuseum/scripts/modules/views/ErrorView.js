import { loadTemplate } from './loadTemplate.js';

const ErrorView = async () => {
    const mainContent = document.querySelector('.mainContent');
	mainContent.classList.add('spacing');

    const template = await loadTemplate('error');
	mainContent.innerHTML = template;

    const errorMessageOne = document.querySelector('.error p:first-of-type');
    const errorMessageTwo = document.querySelector('.error p:last-of-type');
    const backButton = document.querySelector('.error a');
    const radioValueLanguage = localStorage.getItem('language');
    if (radioValueLanguage === 'nl') {
        backButton.textContent = '< terug naar de homepagina';
        errorMessageOne.textContent = 'We hebben helaas de pagina waar je naar zocht niet gevonden..';
        errorMessageTwo.textContent = 'Je kan het opnieuw proberen, of terug naar de homepagina navigeren!';
    }
};

export { ErrorView };