var div = document.getElementById("location");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        div.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    /*div.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;*/

    getWeather(position.coords.latitude,position.coords.longitude);
}

function showError(error) {
    if (error.PERMISSION_DENIED) {
        div.innerHTML = "The user denied the request for Geolocation.";
    }
}

function getWeather(lat,lon) {

    let API_key = "c120caba2b318767737a2bb80155f786";
    //let API_key = "f25110b0f83adb9f7c080ee182cd1d00"; //api reserva
    
    const promise = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`);
    getAPIData(promise)
}

function searchCity() {
    const city = document.querySelector("input");
    let API_key = "c120caba2b318767737a2bb80155f786";
    const promise = axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city.value.toLowerCase()}&appid=${API_key}&units=metric`);
    const weather = document.querySelector(".weather");
    weather.innerHTML = "";
    getAPIData(promise)
}

function getAPIData(promise) {

    const weather = document.querySelector(".weather");

    promise.then((data) => {
        console.log(data);
        console.log(data.data.weather);

        weather.innerHTML += `
            <div class="cityWeather">
                <h2>${data.data.name} - ${data.data.sys.country}</h2>
                <h3>${Math.round(data.data.main.temp)}°C</h3>
                <img class="icon" src="http://openweathermap.org/img/wn/${data.data.weather[0].icon}@2x.png">
                <h4>${data.data.weather[0].description}</h4>
            </div>
        `
        
    })
    promise.catch((error) => {
        console.log("Status code: " + error.response.status); 
	    console.log("Message: " + error.response.data);
    })
}



getLocation();