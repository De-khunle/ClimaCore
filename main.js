const apiKey = 'd1efcf0c3f4e9e01227bff3ba6667be0';
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    // error check
    if (geoData.length === 0) {
        const errorEl = document.querySelector('.error');

        errorEl.style.display = 'block';
        errorEl.style.color = 'red';
        document.querySelector('.weather').style.display = 'none';
        return;
    }

    // location
    const lat = geoData[0].lat;
    const lon = geoData[0].lon;

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();


    // extracting info from sourced data  
    document.querySelector('.city').innerHTML = weatherData.name;
    document.querySelector('.temp').innerHTML = weatherData.main.temp;
    document.querySelector('.humidity').innerHTML = weatherData.main.humidity;
    document.querySelector('.wind').innerHTML = weatherData.wind.speed;

    
    // condition 
    const condition = weatherData.weather[0].main;

    if (condition === 'Clouds') weatherIcon.src = 'images/Clouds.jpg';
    else if (condition === 'Clear') weatherIcon.src = 'images/Clear.png';
    else if (condition === 'Rain') weatherIcon.src = 'images/Rain.jpg';
    else if (condition === 'Drizzle') weatherIcon.src = 'images/Drizzle.jpg';
    else if (condition === 'Mist') weatherIcon.src = 'images/Mist.png';


    document.querySelector('.weather').style.display = 'block';
    document.querySelector('.error').style.display = 'none';
}

function getWeather() {
    const city = document.querySelector('#cityInput').value;
    checkWeather(city);
}