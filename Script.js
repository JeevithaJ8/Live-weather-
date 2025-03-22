// Replace 'YOUR_API_KEY' with your OpenWeather API key
const apiKey = 'YOUR_API_KEY';

async function getWeather() {
    const city = document.getElementById('city-input').value;
    const weatherResult = document.getElementById('weather-result');
    const errorMessage = document.getElementById('error-message');

    weatherResult.classList.add('hidden');
    errorMessage.classList.add('hidden');

    if (!city) {
        showErrorMessage("Please enter a city name.");
        return;
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const data = await response.json();

        if (data.cod === 200) {
            updateWeatherUI(data);
        } else {
            showErrorMessage(data.message);
        }
    } catch (error) {
        showErrorMessage("Error fetching weather data. Please try again.");
    }
}

function updateWeatherUI(data) {
    document.getElementById('city-name').innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').innerText = Math.round(data.main.temp);
    document.getElementById('weather-condition').innerText = capitalizeFirstLetter(data.weather[0].description);
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;

    document.getElementById('weather-result').classList.remove('hidden');
}

function showErrorMessage(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.innerText = message;
    errorMessage.classList.remove('hidden');
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
          }
