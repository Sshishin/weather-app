'use strict';

const API_KEY = '6c19a7621696a924de1a6c588331987a';




let weatherStorage = {
    temp: 0,
    city: 'Moscow',
    weather: 'Sunny',
    wind: 0,
    lat: 0,
    lon: 0
};

navigator.geolocation.getCurrentPosition(position => {
    console.log(position);
    const {latitude, longitude} = position.coords;
    console.log(latitude,longitude);

    weatherStorage = {
        lat: latitude,
        lon: longitude
    }
})

function searchCity() {
    const inputCity = document.querySelector('.city__input');
    const submitCity = document.querySelector('.get-weather');
    const myPosition = document.querySelector('.geo');

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
 
    myPosition.addEventListener('click', () => {
        getGeo()
    })
    
}

const getGeo = async() => {
    const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${weatherStorage.lat}&lon=${weatherStorage.lon}&appid=${API_KEY}}`);
    const currentWeather = await currentWeatherResponse.json();
    console.log(currentWeather)

}

const getCurrentWeather = async (input, geo) => {
    const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${weatherStorage.city}&appid=${API_KEY}&units=metric`);
    const currentWeather = await currentWeatherResponse.json();
    console.log(currentWeather)
    try {
        weatherStorage = {
            temp: currentWeather.main.temp,
            weather: currentWeather.weather[0].main,
            wind: currentWeather.wind.speed
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
        <div class="current__temp-weather">${weatherStorage.weather}</div>
        <div class="current__temp-index">${Math.round(weatherStorage.temp) + ' °C'}</div>
        <div class="current__temp-item">${Math.round(weatherStorage.wind)+' м/с'}</div>
    `;
    parentBlock.append(currentTemp);
    addImg();
}

function addImg() {
    const currentTemp = document.querySelector('.current__temp-weather');
    if(currentTemp.textContent == 'Clouds') {
        currentTemp.innerHTML = `
        <img class="cloud__img" src="./img/cloud.png" alt="cloud">
        `;
    }
}

searchCity();



// const ggg = async () => {
//     const reqUrl = 'https://api.weather.yandex.ru/v2/forecast?lat=55.75396&lon=37.620393'
//     const currentWeatherResponse = await fetch(reqUrl, {
//         method: 'GET',
//         mode: 'no-cors',
//         headers: {
//           'X-Yandex-API-Key':'be1e8be3-1489-44ff-89ee-c09e9ab22f94'
//         },
//     });
//     const currentWeather = await currentWeatherResponse.json();
//     console.log(currentWeather)
// }

// ggg()




