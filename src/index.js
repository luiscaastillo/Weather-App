const searchBar = document.querySelector(".search-bar")
const mainView = document.querySelector(".main-view")
const apiKey = "e808aee719c7b15265fb9a8fca781e8c";
const input = document.querySelector(".input");

searchBar.addEventListener("submit", async evt => {
    evt.preventDefault();

    const city = input.value;

    if(city){
        try{
            let data = await getWeatherData(city);
            displayData(data);

        } catch (e) {
            console.error(e);
            displayError(e);
        }
    }
    else
        displayError("Please enter a city");
});

function displayData(data) {

    document.querySelector(".details").innerHTML = "";
    document.querySelectorAll(".tags .value").forEach(el => el.remove());

    let {
        name,
        main: {temp, temp_min, temp_max, humidity, feels_like, pressure},
        visibility,
        wind,
        weather:[{description: conditions}]} = data;
    mainView.style.display = "block";

    let errorDisplay = document.querySelector(".errorDisplay");
    if (errorDisplay)
        errorDisplay.textContent = ""

    let cityDisplay = document.createElement("p");
    let tempDisplay = document.createElement("p");
    let temp_minDisplay = document.createElement("p");
    let temp_maxDisplay = document.createElement("p");
    let humidityDisplay = document.createElement("p");
    let feels_likeDisplay = document.createElement("p");
    let pressureDisplay = document.createElement("p");
    let visibilityDisplay = document.createElement("p");
    let speedDisplay = document.createElement("p");
    let gustDisplay = document.createElement("p");
    let directionDisplay = document.createElement("p");
    let conditionsDisplay = document.createElement("p");

    cityDisplay.textContent = name;

    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°`;
    temp_minDisplay.textContent = `H:${(temp_min - 273.15).toFixed(1)}°`;
    temp_maxDisplay.textContent = `L:${(temp_max - 273.15).toFixed(1)}°`;

    humidityDisplay.textContent = `${humidity}%`;
    feels_likeDisplay.textContent = `${(feels_like - 273.15).toFixed(1)}°`;
    pressureDisplay.textContent = `${(pressure * 0.75006375541921).toFixed(1)} mmHg`;
    if (visibility / 1000 >= 10)
        visibilityDisplay.textContent = `+${(visibility / 1000).toFixed(1)} Km`;
    else
        visibilityDisplay.textContent = `${(visibility / 1000).toFixed(1)} Km`;

    conditionsDisplay.textContent = conditions;

    speedDisplay.textContent = `${wind.speed * 3.6} Km/h`
    gustDisplay.textContent = `${wind.gust * 3.6} Km/h`;
    directionDisplay.textContent = `${wind.deg}°`;

    console.log(data);

    cityDisplay.classList.add("second-info");
    tempDisplay.classList.add("first-info");

    let div = document.createElement("div");

    div.classList.add("min-max");

    humidityDisplay.classList.add("second-info", "value");
    feels_likeDisplay.classList.add("second-info", "value");
    pressureDisplay.classList.add("second-info", "value");
    visibilityDisplay.classList.add("second-info", "value");
    speedDisplay.classList.add("value");
    gustDisplay.classList.add("value");
    directionDisplay.classList.add("value");

    let details = document.querySelector(".details");

    details.appendChild(cityDisplay);
    details.appendChild(tempDisplay);
    details.appendChild(conditionsDisplay);

    details.appendChild(div);

    let minMax_div = document.querySelector(".min-max")

    minMax_div.appendChild(temp_minDisplay);
    minMax_div.appendChild(temp_maxDisplay);

    let speed_div = document.getElementById("speed")
    let gust_div = document.getElementById("gust")
    let direction_div = document.getElementById("direction")

    speed_div.appendChild(speedDisplay);
    gust_div.appendChild(gustDisplay);
    direction_div.appendChild(directionDisplay);

    let humidity_div = document.getElementById("humidity")
    let flike_div = document.getElementById("feels-like")
    let pressure_div = document.getElementById("pressure")
    let visbility_div = document.getElementById("visibility")

    humidity_div.appendChild(humidityDisplay);
    flike_div.appendChild(feels_likeDisplay);
    pressure_div.appendChild(pressureDisplay);
    visbility_div.appendChild(visibilityDisplay);

}

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    let response = await fetch(apiUrl)

    if (!response.ok)
        throw new Error("Could not fetch weather data");

    return await response.json();
}

function displayError(message) {
    let errorDisplay = document.querySelector(".errorDisplay");
    let body= document.querySelector("body")

    if (!errorDisplay) {
        errorDisplay = document.createElement("p");
        errorDisplay.classList.add("errorDisplay");
        body.appendChild(errorDisplay);
    }
    mainView.style.display = "none"
    errorDisplay.textContent = message;
}