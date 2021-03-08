let spoonToken = key.recipeKey;

document.addEventListener("DOMContentLoaded", () => {
    let form = document.getElementById("search-form");
    form.addEventListener("submit", callBack);

    let moreResults = document.getElementById("more-results");
    moreResults.addEventListener("click", similarRecipes, {once:true});

   
    randomRecipes()

    let backToRecipe = document.getElementById("back-to-recipe");
    backToRecipe.addEventListener("click", backRecipe, {once:true})
    
    let backToSearch = document.getElementById("back-to-search");
    backToSearch.addEventListener('click', backSearch)
})



// fetches the random recipes on the main page
function randomRecipes (){
    fetch(`https://api.spoonacular.com/recipes/random?apiKey=${spoonToken}&number=20`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        displayRandomRecipe(data)
    })
}

// Displays the random recipes on the main page
function displayRandomRecipe(data){

    data.recipes.forEach(recipe =>{
        let randomRecipe  = document.getElementById("random-recipes");
        let randomImg = document.createElement('a');
        randomImg.target="_blank"
        randomImg.href = recipe.sourceUrl;
        randomImg.innerHTML = `<img id="randomRecipeImg" src = ${recipe.image}> <br> <p id = "random">${recipe.title}</p></img>`;
        
        // let randomTitle = document.createElement("h6");
        // randomTitle.innerText = recipe.title;
        

        randomRecipe.append(randomImg);
    })
}

// fetches the recipe that user puts in the input box
function callBack(e){
    e.preventDefault();
    let container = document.getElementById("container");
    let diet = document.getElementById("diet-options").value;
    let recipes = document.getElementById("recipes").value;
    container.style.display = "none";
    let options = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${recipes}&diet=${diet}&addRecipeNutrition=true&apiKey=${spoonToken}&addRecipeInformation=true&instructionsRequired=true&number=10`, options)
    .then(res => res.json())
    .then(data => {
        
        displayRecipe(data);
    })
}

// displays the name of the recipes in a list 
function displayRecipe(data){
    let recipes = document.getElementById("recipes").value;
    let recipeList = document.getElementById("recipe-list");
    let recipeTitle = document.getElementById("recipe-title");
    let ul = document.getElementById("list");
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
            let img = document.getElementById("img");
            img.src = recipe.image;
            
            extraInformation(recipe);
            displayNutrientsFacts(recipe);
            displayIngredients(recipe);
            displaySteps(recipe);
    
        });   
    });
    let backToSearch = document.getElementById("back-to-search");
    backToSearch.style.display = "block";
}

// extra information
function extraInformation (recipe){
    let cusine = document. getElementById("cusine");
    let sourceName = document. getElementById("sourceName");
    let  prepTime= document. getElementById("prep-time");
    let servingSize = document. getElementById("serving-size");
    let weightPerServing = document. getElementById("weightPerServing");
    
    cusine.innerText = `Cusine: ${recipe.cuisines[0]}`;
    prepTime.innerText = `Prep-Time: ${recipe.readyInMinutes}`;
    servingSize.innerText = `Serving size: ${recipe.servings}`;
    sourceName.innerText = `Source: ${recipe.sourceName}`;
    weightPerServing.innerText = `Weight per serving: ${recipe.nutrition.weightPerServing.amount} ${recipe.nutrition.weightPerServing.unit} `;

}

// nutritions facts for recipe
function displayNutrientsFacts(recipe){
    let nutritionSection = document.getElementById("all-things-of-single-recipe");
    let carbs = document.getElementById("carbs");
    let fat = document.getElementById("fat");
    let protein = document.getElementById("protein");
    
    carbs.innerText = `Carbs: ${recipe.nutrition.caloricBreakdown.percentCarbs}`;
    fat.innerText = `Fat: ${recipe.nutrition.caloricBreakdown.percentFat}`;
    protein.innerText = `Protein: ${recipe.nutrition.caloricBreakdown.percentProtein}`;
    nutritionSection.style.display = "block";
}

//Ingredients of the recipe
function displayIngredients(recipe){
    let ingredients = document.getElementById("all-things-of-single-recipe");
    let ulOfIngredients = document.getElementById("list-of-ingredients");
    ingredients.style.display = "block";
    
    recipe.nutrition.ingredients.forEach(ingredient => {
        let li = document.createElement("li");
        li.innerText = `${ingredient["name"]} ${ingredient["amount"]} ${ingredient["unit"]}`;
        ulOfIngredients.append(li);
        
    });
}
let id;
// Steps of recipe
function displaySteps(recipe){
    let steps = document.getElementById("all-things-of-single-recipe"); // div of steps
    let ulOfSteps = document.getElementById("list-of-steps");
    let secondInstructions = recipe.analyzedInstructions[1];
    steps.style.display = "block";
    id = recipe.id

    recipe.analyzedInstructions[0].steps.forEach(step => {
        let li = document.createElement("li");
        li.innerText = step["step"];
        ulOfSteps.append(li);
        
    });
    
    if (secondInstructions !== undefined) {
        recipe.analyzedInstructions[1].steps.forEach(step => {
            let li = document.createElement("li");
            li.innerText = step["step"];
            ulOfSteps.append(li);
        });
        
    }
    
    
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
        return response.json()
        
    })
    .then(data =>{
        displaySimilarRecipe(data)
    })
}

function displaySimilarRecipe(data){
    
    let recipeList = document.getElementById("similar-recipes");
    let recipeTitle = document.getElementById("recipe-title");
    let singleRecipe = document.getElementById("all-things-of-single-recipe");
    let ul = document.getElementById("similar-list");
    let backToRecipe = document.getElementById("back-to-recipe");
    recipeList.style.display = "block";
    singleRecipe.style.display = "none";
    backToRecipe.style.display = "block";
    // let head = document.getElementById("head-of-similar-recipes");
    // head.innerText = `Here are similaer recipes to ${recipe.title}`
    
    data.forEach(recipe => {
      
        let li = document.createElement("li");
        li.innerHTML = `<a target="_blank" href = ${recipe.sourceUrl}>${recipe.title}</a>`;
        ul.append(li);
        
    });
    let backToSearch = document.getElementById("back-to-search");
    backToSearch.style.display = "block";
}
function backRecipe (data){
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