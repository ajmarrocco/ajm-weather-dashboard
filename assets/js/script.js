var searchButtonEl = document.querySelector("#search-btn");
var cityEl = document.querySelector("#city-input");
var dashboardEl = document.querySelector("#dashboard");

var getCityName = function(){
    var cityName = cityEl.value.trim();
    if(cityName){
        getCurrent(cityName)
    } else{
        window.alert("Please enter a city name");
        document.location.replace("./index.html");
    }
}

// var getCurrent = function(city){
//     //variable for api for city, uses imperial units for Fahrenheit
//     var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=2c279aedc4b3d33df9584a1e023c4e2e`;
//     console.log(apiUrl);
//     debugger;
//     // make a get request to url
//     fetch(apiUrl).then(function(response) {
//         // request was successful
//         if (response.ok) {
//             response.json().then(function(data) {
//             getFuture(data.coord.lon,data.coord.lat);
//             displayCurrent(data);
//             })
//         } else {
//         // if not successful, redirect to homepage
//             window.alert("Please enter a city name");
//             document.location.replace("./index.html");
//         }
//     })
// }

var getCurrent = function(city){
    //variable for api for city, uses imperial units for Fahrenheit
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=2c279aedc4b3d33df9584a1e023c4e2e`;
    console.log(apiUrl);
    //debugger;
    // make a get request to url
    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
            // getFuture(data.coord.lon,data.coord.lat);
            // displayCurrent(data);
            var apiSecondUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly&appid=2c279aedc4b3d33df9584a1e023c4e2e`;
            console.log(apiSecondUrl);
            //debugger;
            // make a get request to url
            fetch(apiSecondUrl).then(function(response) {
                // request was successful
                if (response.ok) {
                    response.json().then(function(information) {
                    displayCurrent(data, information);
                    //debugger;
                    // displayUVI(data);
                    // displayFuture(data);
                    // getFuture(data.coord.lon,data.coord.lat)
                    })
                } 
            })

            })
        } else {
        // if not successful, redirect to homepage
            window.alert("Please enter a city name");
            document.location.replace("./index.html");
        }
    })
}

// var getFuture = function(longitiude, latitude){
//     console.log("longitude " + longitiude);
//     console.log("latitude " + latitude);

//     var apiSecondUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitiude}&exclude=minutely,hourly&appid=2c279aedc4b3d33df9584a1e023c4e2e`;
//     console.log(apiSecondUrl);
//     debugger;
//     // make a get request to url
//     fetch(apiSecondUrl).then(function(response) {
//         // request was successful
//         if (response.ok) {
//             response.json().then(function(data) {
//             // displayCurrent(data);
//             debugger;
//             displayUVI(data);
//             // displayFuture(data);
//             // getFuture(data.coord.lon,data.coord.lat)
//             })
//         } 
//     })
// }

// var displayUVI = function(index){
//     console.log("uvi " + index.current.uvi);
//     uviEl = index.current.uvi;
//     console.log(uviEl);
//     return uviEl;
// }

var displayCurrent = function(info, information){
    //creates div for border of card
    var currentBorderEl = document.createElement("div");
    currentBorderEl.classList = "card border-secondary mb-3";
    var currentBodyEl = document.createElement("div");
    //creates div for body of card
    currentBodyEl.classList = "card-body";
    dashboardEl.appendChild(currentBorderEl);
    currentBorderEl.appendChild(currentBodyEl);
    //creates title for body of card
    var currentTitleEl = document.createElement("h5");
    // currentTitleEl.classList = "50n";
    currentTitleEl.textContent = `${info.name} (${info.dt}) ${info.weather[0].icon}`
    currentBodyEl.appendChild(currentTitleEl);
    //creates temperature p element
    var tempEl = document.createElement("p");
    //adds degree symbol
    tempEl.textContent = `Temp: ${info.main.temp} \u00B0F`;
    currentBodyEl.appendChild(tempEl);
    //creates speed p element
    var speedEl = document.createElement("p");
    //rounds to the nearest hundredth and converts to MPH
    speedEl.textContent = `Wind: ${Math.round(100* info.wind.speed * 2.23694)/100} MPH`;
    currentBodyEl.appendChild(speedEl);
    var humidityEl = document.createElement("p");
    humidityEl.textContent = `Humidity: ${info.main.humidity} %`;
    currentBodyEl.appendChild(humidityEl);
    var uviEl = document.createElement("p");
    uviEl.textContent = `UV Index: ${information.current.uvi}`;
    currentBodyEl.appendChild(uviEl);
    // debugger;
    // console.log(displayUVI.uviEl);
    // console.log("uvi " + information.current.uvi);
}

searchButtonEl.addEventListener("click", getCityName);