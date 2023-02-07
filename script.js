'use strict';

const API_KEY = '6c19a7621696a924de1a6c588331987a';

let weatherStorage = {
    temp: 0,
    city: 'Moscow'
};

function getCity() {
    const inputCity = document.querySelector('.city__input');
    const submitCity = document.querySelector('.get-weather');
    
    submitCity.addEventListener('click', () => {
        weatherStorage.city = inputCity.value;
        getCurrentWeather();
    });
}

const getCurrentWeather = async () => {
    const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${weatherStorage.name}&appid=${API_KEY}&units=metric`);
    const currentWeather = await currentWeatherResponse.json();
    
    weatherStorage = {
        temp: currentWeather.main.temp
    };

    pushElems();
};

function pushElems() {
    const parentBlock = document.querySelector('.data');
    const currentTemp = document.createElement('div');
    currentTemp.classList.add('current__temp');
    parentBlock.append(currentTemp);
}

getCity();

