var searchButtonEl = document.querySelector("#search-btn");
var cityEl = document.querySelector("#city-input");

var getCurrent = function(){
    var city = cityEl.value.trim();
    // var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+ city + "&appid=2c279aedc4b3d33df9584a1e023c4e2e";
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=2c279aedc4b3d33df9584a1e023c4e2e`;
    console.log(apiUrl);
    console.log("https://api.openweathermap.org/data/2.5/onecall?lat=41.85&lon=-87.65&exclude=minutely,hourly,alerts&appid=2c279aedc4b3d33df9584a1e023c4e2e")
}

searchButtonEl.addEventListener("click", getCurrent);