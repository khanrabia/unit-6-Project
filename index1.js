

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
    fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${recipes}&tags=${diet}&apiKey=${spoonToken}&addRecipeInformation=true`, options)
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
            
            let singleRecipe = document.getElementById("single-recipe");
            singleRecipe.style.display = "block";
            let img = document.getElementById("img")
            img.src = recipe.image;


            data.results.forEach(ingreident => {
                let ingredientsUl = document.getElementById("ingredients");
                let ingreidentList = document.createElement("li");
                // ingreidentList.innerText = recipe.ingredients;
                // console.log(ingreidentList)
                ingreidentList.innerText = ingreident.analyzedInstructions[0].steps[0].ingredients[0].localizedName
                ingredientsUl.append(ingreidentList);
           
                
            })
        });
    });
      
    
}

