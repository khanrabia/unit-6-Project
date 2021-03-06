const key = {
    weatherKey : "0dd243115fab4570a4d3a1bc1685cbb0"
}
const api_KEY = key.weatherKey
alert("This app requires access to your location to provide local weather data. Please enable your location to continue.")
// document.querySelector(".degree-section").addEventListener("click", checkToggle);
document.addEventListener("DOMContentLoaded", () => {
    checkIfUserProvidesLocation()
    document.querySelector(".degree-section").addEventListener("click", checkToggle);
   
})

function checkIfUserProvidesLocation() {
    const h1 = document.getElementById("h1")
	const h2 = document.getElementById("h2")
	const img = document.getElementById("img")
	const span = document.getElementById("span")
	const div = document.getElementById("div")
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			console.log('My General Position:', position);
			const long = position.coords.longitude;
			const lat = position.coords.latitude;
			
			
			fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${long}&key=${api_KEY}`)
			.then(response => {
				if(response.ok){
					return response.json()
				}
			}) 
			.then(data => {
			 console.log(data)
             currentCityTemp(data)
             setWeatherIcon(data)
             
			
			})
		});
	} 
}



function displaySearch(city) {
    
	currentCityTemp(city)
	setWeatherIcon(city)
}


function currentCityTemp(data) {
    const h1 = document.getElementById("h1")
	h1.innerText = data.data[0].city_name
	h2.innerText = data.data[0].temp.toFixed()
	span.innerText = "\u00B0 C"
}
function setWeatherIcon(data) {
    const img = document.getElementById("img")
    const div = document.getElementById("div")
	const icon = data.data[0].weather.icon
	div.innerText = data.data[0].weather.description
	img.src = `https://www.weatherbit.io/static/img/icons/${icon}.png`
}
function checkToggle() {
    const span = document.getElementById("span")
	if(span.innerText === "\u00B0 C") {
        const h2 = document.getElementById("h2")
		let f = convertTofahrenheit(h2.innerText)
		h2.innerText = f.toFixed()
		span.innerText = "\u00B0 F"
	} else {
		let celc = convertToCelsius(h2.innerText)
		h2.innerText = celc.toFixed()
		span.innerText = "\u00B0 C"
	}
}

function convertToCelsius (temperature) {
	let celsius = (temperature - 32) * (5/9)
	return celsius;
}

function convertTofahrenheit (celsius) {
	let fahrenheit = ( celsius * 9/5 ) + 32
	return fahrenheit;
  }