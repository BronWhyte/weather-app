let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let date = now.getDate();
let year = now.getFullYear();

let heading = document.querySelector("h2");
heading.innerHTML = `${day}, ${date} ${month} ${year}`;

let hour = now.getHours();
let minute = now.getMinutes();
let minuteString = minute.toString();

if (minute < 10) {
  minuteString = `0${minuteString}`;
}

let time = document.querySelector("h3");
time.innerHTML = `${hour}:${minuteString}`;

function getForecast(coordinates) {
  let apiKey = "515c9ddbeb3cda9061acfab71031839e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  celsiusTemperature = response.data.main.temp;

  let tempDisplay = document.querySelector("#degNumber");
  tempDisplay.innerHTML = Math.round(celsiusTemperature);
  let weatherCondition = document.querySelector("#weatherDescription");
  weatherCondition.innerHTML = response.data.weather[0].description;
  let humidity = (document.querySelector("#humidity").innerHTML =
    response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  let windSpeed = (document.querySelector("#windSpeed").innerHTML = wind);
  let icon = document.querySelector("#icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function searchCity(event) {
  event.preventDefault();
  let search = document.querySelector("#searchInput");
  let cityHeading = document.querySelector("h1");
  cityHeading.innerHTML = `${search.value}`;
  let city = `${search.value}`;
  let apiKey = "515c9ddbeb3cda9061acfab71031839e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

let form = document.querySelector("#citySearchWrapper");
form.addEventListener("submit", searchCity);

function showCurrentLocation(response) {
  let locationName = document.querySelector("h1");
  locationName.innerHTML = response.data.list[0].name;
  let currentLocationTemp = document.querySelector("#degNumber");
  let temperature = Math.round(response.data.list[0].main.temp);
  currentLocationTemp.innerHTML = temperature;
  let currentWeather = document.querySelector("#weatherDescription");
  currentWeather.innerHTML = response.data.list[0].weather[0].description;
}

function getLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let apiKey = "515c9ddbeb3cda9061acfab71031839e";
  let apiUrlLocation = `https://api.openweathermap.org/data/2.5/find?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrlLocation).then(showCurrentLocation);
}

function allowAccess() {
  navigator.geolocation.getCurrentPosition(getLocation);
}

let currentLocation = document.querySelector("#currentButton");
currentLocation.addEventListener("click", allowAccess);

function showFahrenheitTemp(event) {
  event.preventDefault();

  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  let temperature = document.querySelector("#degNumber");
  temperature.innerHTML = Math.round(fahrenheitTemp);

  celsiusLink.classList.remove("active");
  fahrenheit.classList.add("active");
}

function showCelsiusTemp(event) {
  event.preventDefault();

  let temperature = document.querySelector("#degNumber");
  temperature.innerHTML = Math.round(celsiusTemperature);

  celsiusLink.classList.add("active");
  fahrenheit.classList.remove("active");
}

let celsiusTemperature = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemp);
let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsiusTemp);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          <span id="forecastDay">${formatDay(forecastDay.dt)}</span> <br />
        </h5>
        <p class="card-text">
          <img
            src="https://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png"
            alt=""
            width="60"
          />
        </p>
        <p class="fiveDayTemp"><span id="maxTemp">${Math.round(
          forecastDay.temp.max
        )}</span>&deg;C / <span id="minTemp">${Math.round(
          forecastDay.temp.min
        )}</span>&deg;C</p>
      </div>
    </div>
  </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
