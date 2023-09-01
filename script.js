const debounce = require('lodash.debounce');
const input = document.querySelector('input');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
const notification = document.querySelector('.notification');


function showNotification(message) {
  notification.textContent = message;
}


function showCountries(countries) {
  const countryNames = countries.map((country) => country.name);
  countryList.innerHTML = countryNames.map((name) => `<li>${name}</li>`).join('');
}


function showCountryInfo(country) {
  const { name, capital, population, languages, flag } = country[0];
  const languagesList = languages.map((language) => language.name).join(', ');

  countryInfo.innerHTML = `
    <h2>${name}</h2>
    <p><strong>Capital:</strong> ${capital}</p>
    <p><strong>Population:</strong> ${population}</p>
    <p><strong>Languages:</strong> ${languagesList}</p>
    <img src="${flag}" alt="${name} Flag" />
  `;
}


async function searchCountries(query) {
  try {
    const response = await fetch(`https://restcountries.com/v2/name/${query}`);
    const data = await response.json();

    if (data.length > 10) {
      showNotification('Зробіть запит більш специфічним.');
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
    } else if (data.length >= 2 && data.length <= 10) {
      showCountries(data);
      countryInfo.innerHTML = '';
      showNotification('');
    } else if (data.length === 1) {
      showCountryInfo(data);
      showNotification('');
    } else {
      showNotification('Країну не знайдено');
      countryList.innerHTML = '';
      countryInfo.innerHTML = '';
    }
  } catch (error) {
    console.error('Помилка:', error);
  }
}


const debouncedSearch = debounce((event) => {
  const query = event.target.value.trim();
  if (query) {
    searchCountries(query);
  }
}, 500);


input.addEventListener('input', debouncedSearch);
