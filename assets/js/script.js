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

    // var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=2c279aedc4b3d33df9584a1e023c4e2e";
    
    // console.log(apiUrl);
    // console.log("https://api.openweathermap.org/data/2.5/onecall?lat=41.85&lon=-87.65&exclude=minutely,hourly,alerts&appid=2c279aedc4b3d33df9584a1e023c4e2e")

    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2c279aedc4b3d33df9584a1e023c4e2e`;
    console.log(apiUrl);

    // make a get request to url
    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
            displayCurrent(data);
        })
        } else {
        // if not successful, redirect to homepage
            document.location.replace("./index.html");
        }
    })
}

var displayCurrent = function(weather){
    console.log(weather);
}

searchButtonEl.addEventListener("click", getCityName);