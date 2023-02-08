'use strict';

const API_KEY = '6c19a7621696a924de1a6c588331987a';

let weatherStorage = {
    temp: 0,
    city: 'Moscow'
};

function searchCity() {
    const inputCity = document.querySelector('.city__input');
    const submitCity = document.querySelector('.get-weather');

    submitCity.addEventListener('click', () => {
    const currentTemp = document.querySelector('.current__temp');
        if(currentTemp) {
            currentTemp.remove();
        }
        weatherStorage.city = inputCity.value;
        getCurrentWeather();
        inputCity.value = '';
    });

    inputCity.onkeydown = (e) => {
        const currentTemp = document.querySelector('.current__temp');
        if(currentTemp) {
            currentTemp.remove();
        }
        if(e.keyCode === 13) {
            e.preventDefault();
            weatherStorage.city = inputCity.value;
            getCurrentWeather();
            inputCity.value = '';
        }
    };
}

const getCurrentWeather = async () => {
    const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${weatherStorage.city}&appid=${API_KEY}&units=metric`);
    const currentWeather = await currentWeatherResponse.json();
    
    try {
        weatherStorage = {
            temp: currentWeather.main.temp
        };
        pushElems();
    } catch {
        console.log('Что-то пошло не так');
    }
};

function pushElems() {
    const parentBlock = document.querySelector('.data');
    const currentTemp = document.createElement('div');
    currentTemp.classList.add('current__temp');
    currentTemp.innerHTML = `
        <h3>Температура сейчас</h3>
    <div class="current__temp-index">${weatherStorage.temp}</div>;
    `;
    parentBlock.append(currentTemp);
}

searchCity();


