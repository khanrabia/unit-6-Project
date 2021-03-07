const api_KEY = key.weatherKey
const spoonToken = key.recipeKey;
// alert("This app requires access to your location to provide local weather data. Please enable your location to continue.")
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
             showRecipeByWeather(data)
			 hotWeatherFood(data)
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

  function showRecipeByWeather(data){
	 
	  let weather = data.data[0].temp;

	  let weatherfahrenheit = convertTofahrenheit(weather)
	  console.log(weatherfahrenheit)
	  // Cold Temperatures fetch for hot drinks, deserts or soup
	  if(weatherfahrenheit <= 50 || weather <= 10){
	
		const baseUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonToken}addRecipeInformation=true&query=`;

const getSoup = () => fetch(baseUrl + "soup");
const getCake = () => fetch(baseUrl + "cake");
const getPie = () => fetch(baseUrl + "pie");


  return Promise.all([getSoup(), getCake(), getPie()])
    .then(responses => {
      return Promise.all(
        responses.map(response => {
          return response.json();
        })
      );
    })
    .then(data => {
		displayColdRecommendation(data)});
		
		  
	  } 

  }

  function hotWeatherFood(data) {
	  //Hot Temperatures fetch for cold drinks, salads, or fruit
		// let weatherfahrenheit = 60; // remove after testing
	// 	let weather = data.data[0].temp;

	// 	let weatherfahrenheit = convertTofahrenheit(weather)
	//   if (weatherfahrenheit > 50 || weather > 10) {
	// 	const baseUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${spoonToken}&addRecipeInformation=true&query=`;

	// 	const getSalad = () => fetch(baseUrl + "salad");
	// 	const getRoll = () => fetch(baseUrl + "summerroll");
	// 	const getCherry = () => fetch(baseUrl + "cherry");
	// 	const getSlushie = () => fetch(baseUrl + "slushie");
	// 	const getLemonade = () => fetch(baseUrl + "lemonade");
	// 	const getCocktail = () => fetch(baseUrl + "cocktail");
		
	// 	  return Promise.all([getSalad(), getRoll(), getCherry(),getSlushie(), getLemonade(), getCocktail()])
	// 		.then(responses => {
	// 		  return Promise.all(
	// 			responses.map(response => {
	// 			  return response.json();
	// 			})
	// 		  );
	// 		})
	// 		.then(data => {
	// 			displayHotRecomendadtion(data)
	// 		});
				
	//   }
}


// display hot weather food on screen
function displayHotRecomendadtion(data){

	// data.forEach(item => {
	// 	item.results.forEach(recipe =>{
	// 		let displayHotFood = document.getElementById("food-by-weather");
	// 		let hotFoodImg = document.createElement('a');
	// 		hotFoodImg.target="_blank";
	// 		hotFoodImg.href = recipe.sourceUrl;
	// 		hotFoodImg.innerHTML = `<img  src = ${recipe.image}></img>`;
	// 		let hotFoodTitle = document.createElement("h7");
	// 		hotFoodTitle.innerText = recipe.title;
	// 		displayHotFood.append(hotFoodTitle,hotFoodImg);
	// 	});
	// });
}

// display cold weather food on screen
function displayColdRecommendation(data) {
	console.log(data)
	// data.recipes.forEach(recipe =>{
	// 	let displayColdFood = document.getElementById("food-by-weather");
	// 	let coldFoodImg = document.createElement('a');
	// 	coldFoodImg.target="_blank"
	// 	coldFoodImg.href = recipe.sourceUrl;
	// 	coldFoodImg.innerHTML = `<img  src = ${recipe.image}></img>`;
	// 	let coldFoodTitle = document.createElement("h8");
	// 	coldFoodTitle.innerText = recipe.title;
	// 	displayColdFood.append(coldFoodTitle,coldFoodImg);
	// });
  }