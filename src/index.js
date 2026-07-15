'use strict';

const cityName = document.querySelector('#cityName');
const cityId = document.querySelector('#cityId');
const selectedRadioName = document.querySelector('input[value="name"]');
const selectedRadioId = document.querySelector('input[value="id"]');
const tempr = document.querySelector('#temperature');
const windS = document.querySelector('#windSpeed');
const humid = document.querySelector('#humidity');
const wBtn = document.querySelector('#weatherBtn');
const canBtn = document.querySelector('#cancelBtn');

const params = {
    url: 'https://api.openweathermap.org/data/2.5/',
    appid: '0e6d1d3bff8e0a32e113767624f5060e',
    cityName: cityName.value.trim(),
    cityId: cityId.value.trim(),
};

function controlRadioBtns(){
    if(selectedRadioName.checked){
        cityName.disabled = false;
        cityId.disabled = true;
        cityId.value = '';
    }
    if(selectedRadioId.checked){
        cityId.disabled = false;
        cityName.disabled = true;
        cityName.value = '';
    }
}

controlRadioBtns();

selectedRadioName.addEventListener('click', controlRadioBtns);
selectedRadioId.addEventListener('click', controlRadioBtns);

let urlAddress;

function getWeatherData(urlAddress){
    fetch(urlAddress)
        .then(response => {
            if(!response.ok) throw new Error('Response error')
            return response.json()})
        .then(data => {
            tempr.textContent = `${data.main.temp} °C`;
            windS.textContent = `${data.wind.speed} m/s`;
            humid.textContent = `${data.main.humidity} %`;
        })
        .catch(error => {
            tempr.textContent = 'Error fetching data';
            windS.textContent = 'Error fetching data';
            humid.textContent = 'Error fetching data';
            console.error('Error:', error);
        })
};

function checkInputFields() {setInterval(() => {
    if(cityName.value.trim() !== '' || cityId.value.trim() !== ''){
        wBtn.disabled = false;
    } else {
        wBtn.disabled = true;
    }
}, 100)}

checkInputFields();

wBtn.addEventListener('click', () => {
    if(selectedRadioName.checked){
        params.cityName = cityName.value.trim();
        urlAddress = `${params.url}weather?q=${params.cityName}&appid=${params.appid}&units=metric`;
    }
    if(selectedRadioId.checked){
        params.cityId = cityId.value.trim();
        urlAddress = `${params.url}weather?id=${params.cityId}&appid=${params.appid}&units=metric`;
    }
    getWeatherData(urlAddress);
});

canBtn.addEventListener('click', () => {
    tempr.textContent = '---';
    windS.textContent = '---';
    humid.textContent = '---';
    cityName.value = '';
    cityId.value = '';
});
