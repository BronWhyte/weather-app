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

function showTemp(response) {
  let tempDisplay = document.querySelector("#degNumber");
  let temperature = Math.round(response.data.main.temp);
  tempDisplay.innerHTML = temperature;
  let weatherCondition = document.querySelector("#weatherDescription");
  weatherCondition.innerHTML = response.data.weather[0].description;
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