'use strict';

const API_KEY = '6c19a7621696a924de1a6c588331987a';

const getWeather = async () => {
   const y = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=${API_KEY}`);
  const getJ = await y.json();
  console.log(getJ.main.temp);

  const main = document.querySelector('main')
  const body = document.querySelector('body')
  main.innerHTML = `
    <div>${getJ.main.temp}</div>
  `
  body.append(main)
}

// getWeather()

function a() {
  const take = document.querySelector('.get-weather');
  take.addEventListener('click', () => {
    getWeather()
  })
}
a()