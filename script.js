const apiKey = '5ef0b6d8f664c62eb44ebb09c260d530'; 
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=DEINE_STADT&appid=' + apiKey;

async function getWeatherData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.weather[0];
    } catch (error) {
        console.error('Fehler beim Abrufen der Wetterdaten:', error);
    }
}

async function updateWeather() {
    const weatherConditionElement = document.getElementById('weather-condition');
    const weatherGifElement = document.getElementById('weather-gif');

    const weatherData = await getWeatherData();

    if (weatherData) {
        const condition = weatherData.main;
        const gifUrl = getGifUrlForCondition(condition);

        weatherConditionElement.textContent = condition;
        weatherGifElement.src = gifUrl;
    }
}

function getGifUrlForCondition(condition) {
    // Mapping von Wetterbedingungen zu entsprechenden GIF-URLs
    const gifMappings = {
        'Clear': 'clear.gif',
        'Clouds': 'clouds.gif',
        'Rain': 'rain.gif',
        'Drizzle': 'drizzle.gif',
        'Thunderstorm': 'thunderstorm.gif',
        'Snow': 'snow.gif',
        'Mist': 'mist.gif',
        'Smoke': 'smoke.gif',
        'Haze': 'haze.gif',
        'Dust': 'dust.gif',
        'Fog': 'fog.gif',
        'Sand': 'sand.gif',
        'Ash': 'ash.gif',
        'Squall': 'squall.gif',
        'Tornado': 'tornado.gif'
    };

    // Standard-GIF-URL, falls die Bedingung nicht gefunden wird
    const defaultGif = 'https://media.tenor.com/j2ESpKgKChUAAAAj/anime-cute.gif';

    // Überprüfe, ob die Wetterbedingung in den Mapping-Daten vorhanden ist
    if (condition in gifMappings) {
        return gifMappings[condition];
    } else {
        // Verwende das Standard-GIF, wenn die Bedingung nicht gefunden wird
        return defaultGif;
    }
}

// Aktualisiere das Wetter alle 10 Minuten (600000 Millisekunden)
setInterval(updateWeather, 600000);

// Initialisiere das Wetter beim Laden der Seite
window.onload = updateWeather;