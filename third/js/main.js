document.addEventListener("DOMContentLoaded", () => {
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const errorText = document.getElementById("error-text");
    const locationText = document.getElementById("location-text");
    const weatherInfo = document.getElementById("weather-info");
    const temp = document.getElementById("temp");
    const feelsLike = document.getElementById("feels-like");
    const maxTemp = document.getElementById("max-temp");
    const minTemp = document.getElementById("min-temp");

    cityInput.addEventListener("input", () => {
        getWeatherBtn.style.display = cityInput.value.trim() !== "" ? "inline-block" : "none";
        locationText.textContent = cityInput.value ? `Find weather in "${cityInput.value}"` : "Find weather in your city";
    });

    getWeatherBtn.addEventListener("click", () => {
        const city = cityInput.value.trim();
        if (city.length < 2) {
            errorText.textContent = "You should write more than two letters";
            return;
        }

        errorText.textContent = "";
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=42e8a8bbd9bf6de733e91151c982f192`)
        .then(response => response.json())
        .then(data => {
            if (data.main) {
                weatherInfo.style.display = "block";
                temp.textContent = `Temp: ${data.main.temp}`;
                feelsLike.textContent = `Feels: ${data.main.feels_like}`;
                maxTemp.textContent = `MaxTemp: ${data.main.temp_max}`;
                minTemp.textContent = `MinTemp: ${data.main.temp_min}`;
            } else {
                errorText.textContent = "City not found.";
                weatherInfo.style.display = "none";
            }
        })
        .catch(() => {
            errorText.textContent = "An error occurred. Please try again.";
        });
    });
});
    