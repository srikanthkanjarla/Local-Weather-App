// Local weather App - freecodecamp front end project
const tempCelsius = [];
let tempFahrenheit = [];
let tempConversion = true;

// DOM elements to update
const cityElement = document.getElementById('city');
const stateElement = document.getElementById('state');
const countryElement = document.getElementById('country');
const descriptionElement = document.getElementById('description');
const weatherIconElement = document.getElementById('icon');
const tempElement = document.getElementById('temp');
const tempHighElement = document.getElementById('temp-high');
const tempLowElement = document.getElementById('temp-low');
const humidityElement = document.getElementById('humidity');
const pressureElement = document.getElementById('pressure');
const loadingSpinner = document.getElementById('loading');
const dataContainer = document.getElementById('weather-data');

// temp celcius fahrenheit buttons
const celciusButton = document.getElementById('temp-unit-cel');
const fahrenheitButton = document.getElementById('temp-unit-fahren');

function updateTempInfo(data) {
  tempElement.textContent = Math.round(data[0]);
  tempHighElement.textContent = `${Math.round(data[1])} ° C`;
  tempLowElement.textContent = `${Math.round(data[2])} ° C`;
}

function updateCityInfo(city, region, country) {
  cityElement.textContent = `${city},`;
  stateElement.textContent = `${region},`;
  countryElement.textContent = country;
}
function updateWeatherInfo(data) {
  updateTempInfo(tempCelsius);
  descriptionElement.textContent = data.weather[0].description;
  weatherIconElement.setAttribute('src', data.weather[0].icon);
  pressureElement.textContent = `${data.main.pressure} hpa`;
  humidityElement.textContent = `${data.main.humidity}%`;
}
function onLocationSuccess(location) {
  const lat = location.coords.latitude;
  const lon = location.coords.longitude;
  fetch(`https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`)
    .then(weatherInfo => {
      // fetch('http://ip-api.com/json')
      fetch('https://ipapi.co/json')
        .then(ipInfo => ipInfo.json())
        .then(cityData => {
          console.log(cityData);
          updateCityInfo(cityData.city, cityData.region, cityData.country_name);
        });
      return weatherInfo.json();
    })
    .then(weatherData => {
      tempCelsius.push(weatherData.main.temp, weatherData.main.temp_max, weatherData.main.temp_min);
      updateWeatherInfo(weatherData);
      dataContainer.style.display = 'flex';
      loadingSpinner.style.display = 'none';
      celciusButton.style.color = '#494947';
    });
}

/* geolocation error callback */

function onLocationError() {
  loadingSpinner.style.display = 'flex';
}
// get user location using HTML5 geolocation API
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(onLocationSuccess, onLocationError);
} else {
  alert('sorry! Failed to get your location');
  loadingSpinner.style.display = 'flex';
}

// temperature units toggle buttons

celciusButton.addEventListener('click', e => {
  e.preventDefault();
  if (!tempConversion) {
    tempConversion = !tempConversion;
    updateTempInfo(tempCelsius);
    celciusButton.style.color = '#494947';
    fahrenheitButton.style.color = '#9699a6';
  }
});

fahrenheitButton.addEventListener('click', e => {
  e.preventDefault();
  tempFahrenheit = tempCelsius.map(item => item * (9 / 5) + 32);

  if (tempConversion) {
    tempConversion = !tempConversion;
    updateTempInfo(tempFahrenheit);
    fahrenheitButton.style.color = '#494947';
    celciusButton.style.color = '#9699a6';
  }
});
