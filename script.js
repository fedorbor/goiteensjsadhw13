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

fetch('https://api.weatherstack.com/current?access_key=dc560742019ba3764cc3d50d2871c607&query=NewYork')
.then(response=>response.json)

fetch('https://newsapi.org/v2/everything?q=flowers&apiKey=7fa7f39ba916462da4c74931272f395d') 
.then(response=>response.json())
.then(console.log)

fetch('https://pixabay.com/api/?key=39207240-5c487a84c917432aa28d0bb48&q=yellow+flowers&image_type=photo') 
.then(response=>response.json())
.then(console.log)
let url = 'https://pixabay.com/api/?key=39207240-5c487a84c917432aa28d0bb48&q=yellow+flowers&image_type=photo';
function getImage(key){
  return fetch(key)
  .then(resp=>resp.json) 

}
console.log(getImage(url)); 
const options = {
  headers:{
      'X-Api-Key': '3ce63eea477043d7a470d2b21dc5ab4b'
  }
}