"use strict";

const card = document.querySelector('.weather-rn')
const form = document.querySelector('form')
const city = document.querySelector('input')
const cityName = document.querySelector('.name')
const temperature = document.querySelector('.temperature')
const feels = document.querySelector('.feels-like')
const humidity = document.querySelector('.humidity')
const wind = document.querySelector('.wind')
const errorMsg = document.querySelector('.error')

form.addEventListener('submit', submitHandler)

function fillCard(nameJson, temperatureJson, feelsJson, humidityJson, windJson){
    cityName.textContent = nameJson;
    temperature.textContent = `${temperatureJson} °C`;
    feels.textContent = `Feels like: ${feelsJson} °C`;
    humidity.textContent = `Humidity: ${humidityJson}%`;
    wind.textContent = `Wind: ${windJson} km/h`;
    card.style.opacity = '1';
}

function submitHandler(event) {
    event.preventDefault()
    const cityInput = city.value.trim();
    if (cityInput.length === 0) {
        errorMsg.textContent = '*Please enter city name'
        return;
    } else errorMsg.textContent = '';
    getWeather(cityInput.toLowerCase())
}

function getWeather(city) {
    return new Promise(function (resolve, reject) {
        fetch(`https://api.weatherapi.com/v1/current.json?key=7d735418b7924349b68113618243103&q=${city}`, {mode: 'cors'})
            .then(response => {
                console.log(response)
                if (response.status === 400) {
                    errorMsg.textContent = `Please enter valid name`
                    throw new Error(`Please enter valid name`)
                }
                return response.json();
            })
            .then(data => {
                fillCard(data.location.name, data.current.temp_c, data.current.feelslike_c, data.current.humidity, data.current.wind_kph)
            })
            .catch(err => {
                errorMsg.textContent = `Error: ${err.message}`
            })

    })
}
