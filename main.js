navigator.geolocation.getCurrentPosition(Coords);
function Coords(position) {
    GetInfo(position.coords.latitude, position.coords.longitude);
}
function GetInfo(x, y) {
    fetch(`https://api.weather.gov/points/${x},${y}`).then(function(response) { return response.json(); }).then(function(data) 
    {
        fetch(data.properties["forecast"]).then(function(response) { return response.json(); }).then(function(data) 
        {
            var d = JSON.parse(JSON.stringify(data)).properties["periods"][0];
            document.getElementById("forecast").innerHTML = d["shortForecast"];
            document.getElementById("temp").innerHTML = `Temperature Outside: ${d["temperature"]}&#176;${d["temperatureUnit"]}`;
            document.getElementById("wind-speed").innerHTML = `Wind Speed: ${d["windSpeed"]}`;
            document.getElementById("wind-dir").innerHTML = `Wind Direction: ${d["windDirection"]}`;
        });
    }).catch(function() { alert('Looks like something went wrong. (Try again?)'); });
}