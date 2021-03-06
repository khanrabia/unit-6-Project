const key = {
    weatherKey : "13517a41ef6a4b6e8d6de306f19caa92",
    recipeKey : "8ceb1418dad148a7b63bb42a43833b3a"
}

let spoonToken = key.recipeKey;

document.addEventListener("DOMContentLoaded", () => {
    let form = document.getElementById("search-form");
    form.addEventListener("submit", callBack);
    
    let moreResults = document.getElementById("more-results");
    moreResults.addEventListener("click", similarRecipes, {once:true});
    
    randomRecipes();
    
    let backToRecipe = document.getElementById("back-to-recipe");
    backToRecipe.addEventListener("click", backRecipe, {once:true});
    
    let backToSearch = document.getElementById("back-to-search");
    backToSearch.addEventListener('click', backSearch);

    displayRecipeListRandomFact();
    
})

// fetches the random recipes on the main page
function randomRecipes (){
    fetch(`https://api.spoonacular.com/recipes/random?apiKey=${spoonToken}&number=20`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        displayRandomRecipe(data);
    })
}

// Displays the random recipes on the main page
function displayRandomRecipe(data){
    data.recipes.forEach(recipe =>{
        let randomRecipe  = document.getElementById("random-recipes");
        let randomImg = document.createElement('a');
        
        randomImg.target="_blank";
        randomImg.href = recipe.sourceUrl;
        randomImg.innerHTML = `<img id="randomRecipeImg" src = ${recipe.image}> <br> <p id = "random">${recipe.title}</p></img>`;
        
        randomRecipe.append(randomImg);
    });
}

// fetches the recipe that user puts in the input box
function callBack(e){
    e.preventDefault();
    let container = document.getElementById("container");
    let diet = document.getElementById("diet-options").value;
    let recipes = document.getElementById("recipes").value;

    let form = document.getElementById("search-form");
    form.reset();
    
    container.style.display = "none";
    
    let options = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${recipes}&diet=${diet}&addRecipeNutrition=true&apiKey=${spoonToken}&addRecipeInformation=true&instructionsRequired=true&number=10`, options)
    .then(res => res.json())
    .then(data => {
        // let ul = document.getElementById("list");
        // if(ul.length === 0) {
        //     console.log("empty")
        // }
        displayRecipe(data);
    })
}

// displays the name of the recipes in a list 
function displayRecipe(data){
    let recipes = document.getElementById("recipes").value;
    let recipeList = document.getElementById("recipe-list");
    let recipeTitle = document.getElementById("recipe-title");
    let ul = document.getElementById("list");
    
    let secondPageLogo = document.getElementById('logo2');
    recipeList.append(secondPageLogo, recipeTitle, ul)

    recipeList.style.display = "block";
    recipeTitle.innerText = `Here are a few ${recipes} recipes`;

    
    
    data.results.forEach(recipe => {
        let li = document.createElement("li");
        li.innerText = `${recipe.title}`;
        ul.append(li);
        
        //hides the recipe list & displays the recipe instructions, picture & info
        li.addEventListener('click', () =>{
            
           
            let recipeList = document.getElementById("recipe-list");
            recipeList.style.display = "none";
            
            let singleRecipeTitle = document.getElementById("single-recipe-title");
            singleRecipeTitle.innerText = li.innerText.toUpperCase();
            
            let singleRecipe = document.getElementById("all-things-of-single-recipe");
            singleRecipe.style.display = "block";
            
            let img = document.getElementById("img1");
            img.src = recipe.image;
            
            extraInformation(recipe);
            displayNutrientsFacts(recipe);
            displayIngredients(recipe);
            displaySteps(recipe);
            displaySingleRecipeRandomFacts();
            
        });
        
    });
    
    let backToSearch = document.getElementById("back-to-search");
    backToSearch.style.display = "block";
    recipeList.append(backToSearch);



    
   
}
function displaySingleRecipeRandomFacts() {
    fetch(`http://localhost:3000/facts`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        displaySingleRecipeFacts(data);
    })
}
function displaySingleRecipeFacts(data){
    let pTag = document.getElementById("single-recipe-list-random-facts");
    
    setInterval(function(){
        let number = Math.floor(Math.random() * 20);
        for(let i = 0; i < number; i++){
            pTag.innerText = data[number].fact;
        }
    }, 5000);
}

function displayRecipeListRandomFact() {
    fetch(`http://localhost:3000/facts`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        displayRecipeListFacts(data);
    })
}
function displayRecipeListFacts(data){
    let pTag = document.getElementById("recipe-list-random-facts");
    
    setInterval(function(){
        let number = Math.floor(Math.random() * 20);
        for(let i = 0; i < number; i++){
            pTag.innerText = data[number].fact;
        }
    }, 5000);
}
// extra information
function extraInformation (recipe){
    let cusine = document. getElementById("cusine");
    let sourceName = document. getElementById("sourceName");
    let  prepTime= document. getElementById("prep-time");
    let servingSize = document. getElementById("serving-size");
    let weightPerServing = document. getElementById("weightPerServing");
    
    cusine.innerHTML = `<b>Cusine:</b> ${recipe.cuisines[0]}`;
    prepTime.innerHTML = `<b>Prep-Time: </b>${recipe.readyInMinutes}`;
    servingSize.innerHTML = `<b>Serving size: </b>${recipe.servings}`;
    sourceName.innerHTML = `<b>Source:</b> ${recipe.sourceName}`;
    weightPerServing.innerHTML = `<b>Weight per serving:</b> ${recipe.nutrition.weightPerServing.amount} ${recipe.nutrition.weightPerServing.unit} `;
}

// nutritions facts for recipe
function displayNutrientsFacts(recipe){
    let nutritionSection = document.getElementById("all-things-of-single-recipe");
    let carbs = document.getElementById("carbs");
    let fat = document.getElementById("fat");
    let protein = document.getElementById("protein");
    
    carbs.innerHTML = `<b>Carbs:</b> ${recipe.nutrition.caloricBreakdown.percentCarbs}`;
    fat.innerHTML = `<b>Fat: </b>${recipe.nutrition.caloricBreakdown.percentFat}`;
    protein.innerHTML = `<b>Protein:</b> ${recipe.nutrition.caloricBreakdown.percentProtein}`;
    nutritionSection.style.display = "block";
}

//Ingredients of the recipe
function displayIngredients(recipe){
    let ingredients = document.getElementById("all-things-of-single-recipe");
    let ulOfIngredients = document.getElementById("list-of-ingredients");
    
    ingredients.style.display = "block";
    
    recipe.nutrition.ingredients.forEach(ingredient => {
        let li = document.createElement("li");
        
        li.innerText = `- ${ingredient["name"]} ${ingredient["amount"]} ${ingredient["unit"]}`;
        ulOfIngredients.append(li);
    });
}

let id;

// Steps of recipe
function displaySteps(recipe){
    let steps = document.getElementById("all-things-of-single-recipe"); // div of step
    let ulOfSteps = document.getElementById("list-of-steps");
    let secondInstructions = recipe.analyzedInstructions[1];
    
    steps.style.display = "block";
    id = recipe.id;
    
    recipe.analyzedInstructions[0].steps.forEach(step => {
        let li = document.createElement("li");
        
        li.innerText = `- ${step["step"]}`;
        ulOfSteps.append(li);
    });
    
    if (secondInstructions !== undefined) {
        recipe.analyzedInstructions[1].steps.forEach(step => {
            let li = document.createElement("li");
            li.innerText = step["step"];
            ulOfSteps.append(li);
        });
    }
    let moreResults = document.getElementById("more-results");
    moreResults.style.display = "block";
    
    let backToSearch = document.getElementById("back-to-search");
    backToSearch.style.display = "block";
    steps.append(backToSearch, moreResults);
}

//Get Similar Recipes
function similarRecipes(){
    let options = {
        headers: {
            'Content-Type': 'application/json'
        },
    }
    
    fetch(`https://api.spoonacular.com/recipes/${id}/similar?apiKey=${spoonToken}&addRecipeInformation=true&number=20`, options)
    .then(response => {
        return response.json();
    })
    .then(data =>{
        displaySimilarRecipe(data);
    })
}

function displaySimilarRecipe(data){
    let recipeList = document.getElementById("similar-recipes");
    let singleRecipe = document.getElementById("all-things-of-single-recipe");
    let ul = document.getElementById("similar-list");
    let backToRecipe = document.getElementById("back-to-recipe");
    
    recipeList.style.display = "block";
    singleRecipe.style.display = "none";
    backToRecipe.style.display = "block";
    
    data.forEach(recipe => {
        let li = document.createElement("li");
        
        li.innerHTML = `- <a target="_blank" href = ${recipe.sourceUrl}>${recipe.title}</a>`;
        ul.append(li);
    });
    
    let backToSearch = document.getElementById("back-to-search");
    backToSearch.style.display = "block";
    displaySimiliarRecipeRandomFacts();
    recipeList.append(backToSearch, backToRecipe);
}
function displaySimiliarRecipeRandomFacts() {
    fetch(`http://localhost:3000/facts`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        displaySimiliarRecipeFacts(data);
    })
}
function displaySimiliarRecipeFacts(data){
    let pTag = document.getElementById("similar-recipe-list-random-facts");
    
    setInterval(function(){
        let number = Math.floor(Math.random() * 20);
        for(let i = 0; i < number; i++){
            pTag.innerText = data[number].fact;
        }
    }, 5000);
}

function backRecipe (){
    let backToRecipe = document.getElementById("back-to-recipe");
    let displayRecipeAgain = document.getElementById("recipe-list");
    displayRecipeAgain.style.display = "block";
    
    let recipeList = document.getElementById("similar-recipes");
    recipeList.style.display = "none";
    backToRecipe.style.display = "none";
    
    let backToSearch = document.getElementById("back-to-search");
    backToSearch.style.display = "block";
}

function backSearch(){
    let backToSearch = document.getElementById("back-to-search");
    let container = document.getElementById("container");
    container.style.display = "block";
    
    let displayRecipeAgain = document.getElementById("recipe-list");
    displayRecipeAgain.style.display = "none";
    
    backToSearch.style.display = "none";
    
    let allThings = document.getElementById("all-things-of-single-recipe");
    allThings.style.display = "none";
    
    let recipeList = document.getElementById("similar-recipes");
    recipeList.style.display = "none";
    
    let backToRecipe = document.getElementById("back-to-recipe");
    backToRecipe.style.display = "none";
}