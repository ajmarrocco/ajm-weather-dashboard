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
                var apiSecondUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&units=imperial&exclude=minutely,hourly&appid=2c279aedc4b3d33df9584a1e023c4e2e`;
                console.log(apiSecondUrl);
                //debugger;
                // make a get request to url
                fetch(apiSecondUrl).then(function(response) {
                    // request was successful
                    if (response.ok) {
                        response.json().then(function(information) {
                        displayCurrent(data, information);
                        displayFuture(data, information);
                        //debugger;
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

var formattedDay = function(seconds){
    //converst seconds to milliseconds
    var millisecondsDT = seconds * 1000;
    //gets date for milliseconds
    var dateObject = new Date(millisecondsDT);
    //formats date into string
    var stringFormat = dateObject.toLocaleString();
    //splits date format keeping what is in front of the comma
    var formattedDate = stringFormat.split(",")[0];
    // returns formattedDate variable
    return formattedDate;
}


//checks UVI value for favorable, moderate, severe
var checkUVI = function(index, element){
    if(index > 6){
        //if it is a severe index, make bg color red
        return element.classList = "bg-danger pt-1 pb-1 pl-3 pr-3 text-light rounded"
    } else if (index <= 6 && index >= 3){
        //if it is a moderate index, make bg color yellow
        return element.classList = "bg-warning pt-1 pb-1 pl-3 pr-3 text-light rounded"
    } else {
        //if it is a favorable index, make bg color green
        return element.classList = "bg-success pt-1 pb-1 pl-3 pr-3 text-light rounded"
    }
}


var displayCurrent = function(data, information){
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
    //sets text of title and calls on formattedDay function
    currentTitleEl.textContent = `${data.name} (${formattedDay(data.dt)})`;
    currentTitleEl.classList = "pb-3";
    //creates img for iconEl
    var iconEl = document.createElement("img");
    iconEl.classList = "current-icon"
    //sets img source equal to the icon received
    iconEl.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    //adds alt to the description of the weather
    iconEl.alt = `${data.weather[0].description}`;
    //appends children to parent
    currentBodyEl.appendChild(currentTitleEl);
    currentTitleEl.appendChild(iconEl);
    //creates temperature p element
    var tempEl = document.createElement("p");
    //adds degree symbol
    tempEl.textContent = `Temp: ${data.main.temp} \u00B0F`;
    currentBodyEl.appendChild(tempEl);
    //creates speed p element
    var speedEl = document.createElement("p");
    //rounds to the nearest hundredth and converts to MPH
    speedEl.textContent = `Wind: ${Math.round(100* data.wind.speed * 2.23694)/100} MPH`;
    currentBodyEl.appendChild(speedEl);
    var humidityEl = document.createElement("p");
    humidityEl.textContent = `Humidity: ${data.main.humidity} %`;
    currentBodyEl.appendChild(humidityEl);
    //gets uv  index from second apiUrl
    var uviEl = document.createElement("p");
    var uviSpanEl = document.createElement("span");
    uviSpanEl.textContent = `${information.current.uvi}`;
    // Checks UVI with UVI value and span element as parameters
    checkUVI(information.current.uvi, uviSpanEl);
    //sets text for UV element
    uviEl.textContent = `UV Index: `;
    //appends UVI element and span
    currentBodyEl.appendChild(uviEl);
    uviEl.appendChild(uviSpanEl);
}

var displayFuture = function(data, information){
    // creates body for five day forecast
    var futureContainerEl = document.createElement("div");
    //creates class
    futureContainerEl.classList = "five-day d-flex flex-column";
    //creates title for five day forecast and text content
    var futureTitleEl = document.createElement("h6");
    futureTitleEl.textContent = "5-Day Forecast:"
    futureTitleEl.classList = "five-day-title";
    //appends to title
    dashboardEl.appendChild(futureContainerEl);
    futureContainerEl.appendChild(futureTitleEl);
    //creates future Body element as well as class and text
    var futureBodyEl = document.createElement("div");
    futureBodyEl.classList = "row justify-content-around";
    //appends to container
    futureContainerEl.appendChild(futureBodyEl);
    //creates future card element as well as class
    var futureCardEl = document.createElement("div");
    futureCardEl.classList = "pt-1 pl-2 pr-5 border-0 bg-dark text-light ";
    //appends to body element
    futureBodyEl.appendChild(futureCardEl);
    //creates h6 element and texts and class lists

    // TO DO: For loop
    var futureDateEl = document.createElement("h6");
    futureDateEl.textContent = `${formattedDay(information.daily[1].dt)}`;
    futureDateEl.classList = "d-flex align-items-center";
    futureCardEl.appendChild(futureDateEl);
    //icon element
    futureIconEl = document.createElement("img");
    futureIconEl.classList = "future-icon";
    //sets img source equal to the icon received
    futureIconEl.src = `http://openweathermap.org/img/wn/${information.daily[1].weather[0].icon}@2x.png`;
    //adds alt to the description of the weather
    futureIconEl.alt = `${information.daily[1].weather[0].description}`;
    //appends to card
    futureCardEl.appendChild(futureIconEl);
    //creates future temperature p element and text
    var futureTempEl = document.createElement("p");
    futureTempEl.textContent = `Temp: ${information.daily[1].temp.day} \u00B0F`
    //appends to card
    futureCardEl.appendChild(futureTempEl);
    //creates future wind speed and text
    var futureSpeedEl = document.createElement("p");
    futureSpeedEl.textContent = `Wind: ${Math.round(100* information.daily[1].wind_speed * 2.23694)/100} MPH`;
    //appends to card
    futureCardEl.appendChild(futureSpeedEl);
    //creates future humidity and text
    var futureHumidityEl = document.createElement("p");
    futureHumidityEl.textContent = `Humidity: ${information.daily[1].humidity} %`;
    //appends to card
    futureCardEl.appendChild(futureHumidityEl);
}

searchButtonEl.addEventListener("click", getCityName);