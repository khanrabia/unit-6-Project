let spoonToken = ""

document.addEventListener("DOMContentLoaded", () => {
    let form = document.getElementById("search-form");
    form.addEventListener("submit", callBack);
})

// fetches the recipe that user puts in the input box
function callBack(e){
    e.preventDefault();
    let container = document.getElementById("container")
    let diet = document.getElementById("diet-options").value
    let desert = document.getElementById("desert").value
    let recipes = document.getElementById("recipes").value
    container.style.display = "none"
    let options = {
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${recipes}&tags=${diet}&addRecipeNutrition=true&apiKey=${spoonToken}&addRecipeInformation=true`, options)
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
    recipeList.style.display = "block";
    recipeTitle.innerText = `Here are a few ${recipes} recipes`;
    
    let ul = document.getElementById("list");
    console.log(data)
    
    data.results.forEach(recipe => {
        let li = document.createElement("li");
        li.innerText = `${recipe.title}`;
        ul.append(li);
        
        //hides the recipe list & displays the recipe instructions, picture & info
        li.addEventListener('click', () =>{
            console.log("Clicked")
            // let singleRecipe = li.innerText;
            let recipeList = document.getElementById("recipe-list");
            recipeList.style.display = "none";
            let singleRecipeTitle = document.getElementById("single-recipe-title");
            singleRecipeTitle.innerText = li.innerText.toUpperCase()
            let singleRecipe = document.getElementById("single-recipe");
            singleRecipe.style.display = "block";
            let img = document.getElementById("img");
            img.src = recipe.image;

            // extra information
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


            // nutritions facts for reciepe
            let nutritionSection = document.getElementById("nutrition-section")
            let nutrition = document. getElementById("Nutrition");
            // nutrition.innerHTML = `nutrition: ${recipe.summary}`;
            nutritionSection.style.display = "block";

            let carbs = document.getElementById("carbs");
            let fat = document.getElementById("fat");
            let protein = document.getElementById("protein");

            carbs.innerText = `Carbs: ${recipe.nutrition.caloricBreakdown.percentCarbs}`
            fat.innerText = `Fat: ${recipe.nutrition.caloricBreakdown.percentFat}`;
            protein.innerText = `Protein: ${recipe.nutrition.caloricBreakdown.percentProtein}`;
            

            //Ingredients of the recipe

            let ingredients = document.getElementById("ingreidents")
            let ulOfIngredients = document.getElementById("list-of-ingredients")

            // Steps of recipe
            let steps = document.getElementById("steps")
            let ulOfSteps = document.getElementById("list-of-steps")


        });
    });
      
    
}

