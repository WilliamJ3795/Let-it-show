
var APIKey = "adf46be5146fd6c70576939f90013837";
var searchForm = document.querySelector("#user-form");
var searchBtn = document.querySelector("#search-btn");
var goBackBtn = document.querySelector("#go-back");
var currWeather = document.querySelector(".current-weather");



//get user search save to local and inset to ul




function handleSubmit(event) {

    event.preventDefault();

    window.localStorage.setItem('searchedZip', JSON.stringify(document.querySelector("#search-zip").value));

    //click search button to second page
    location.href = "index.html";
    getWeather();

    //clear input after search
    form.reset();
}
if (searchForm) {
    searchForm.addEventListener("submit", handleSubmit);
}

//get weather function

function getWeather() {

    var searchedZip = JSON.parse(window.localStorage.getItem('searchedZip'));
    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${searchedZip}&appid=${APIKey}`)

        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(JSON.stringify(data));


            var currentDay = moment().format('L');
            console.log(currentDay);

            //display current date weather
            var nameEl = document.createElement("div");
            nameEl.innerHTML = data.name + " (" + currentDay + ")";
            currWeather.appendChild(nameEl);

            var currPic = document.createElement("div");
            let weatherIcon = data.weather[0].icon;
            currPic.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png")
            currPic.setAttribute("alt", data.weather[0].description);
            currWeather.appendChild(currPic);

            var currTempEl = document.createElement("div");
            currTempEl.innerHTML = "Temperature: " + kToF(data.main.temp) + "°F";
            currWeather.appendChild(currTempEl);

            var currHumEl = document.createElement("div");
            currHumEl.innerHTML = "Humidity: " + data.main.humidity + "%";
            currWeather.appendChild(currHumEl);

            var currWindEl = document.createElement("div");
            currWindEl.innerHTML = "Wind Speed: " + data.wind.speed + " MPH";
            currWeather.appendChild(currWindEl);

        })
}

console.log(getWeather());
//temp from Default: Kelvin to Fahrenheit.
function kToF(K) {
    return Math.floor((K - 273.15) * 1.8 + 32);
}
// Added function to call for the movie theater address


