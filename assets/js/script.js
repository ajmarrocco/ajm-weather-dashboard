var searchButtonEl = document.querySelector("#search-btn");
var cityEl = document.querySelector("#city-input");

var getCityName = function(){
    var cityName = cityEl.value.trim();
    if(cityName){
        getCurrent(cityName)
    } else{
        window.alert("Please enter a city name");
        document.location.replace("./index.html");
    }
}

var getCurrent = function(city){
    //variable for api for city, uses imperial units for Fahrenheit
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=2c279aedc4b3d33df9584a1e023c4e2e`;
    console.log(apiUrl);
    // make a get request to url
    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
            displayCurrent(data);
            getFuture(data.coord.lon,data.coord.lat)
        })
        } else {
        // if not successful, redirect to homepage
            window.alert("Please enter a city name");
            document.location.replace("./index.html");
        }
    })
}

var getFuture = function(longitiude, latitude){
    console.log("longitude " + longitiude);
    console.log("latitude " + latitude);

    var apiSecondUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitiude}&exclude=minutely,hourly&appid=2c279aedc4b3d33df9584a1e023c4e2e`;
    console.log(apiSecondUrl);

    // make a get request to url
    fetch(apiSecondUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
            displayUVI(data);
            // displayFuture(data);
            // getFuture(data.coord.lon,data.coord.lat)
            })
        } 
    })
}

var displayCurrent = function(info){
    console.log("city " + info.name);
    console.log("date " + info.dt);
    console.log("icon " + info.weather.icon);
    console.log("temp " + info.main.temp);
    console.log("speed " + info.wind.speed);
    console.log("humidity " + info.main.humidity);
}

var displayUVI = function(index){
    console.log("uvi " + index.current.uvi);
}

searchButtonEl.addEventListener("click", getCityName);