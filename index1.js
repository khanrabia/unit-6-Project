let spoonToken = key.apiKey

document.addEventListener("DOMContentLoaded", fetchThis)




function fetchThis() {
    let options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch(`https://api.spoonacular.com/recipes/716429/information?apiKey=${spoonToken}`, options)
.then(res => res.json())
.then(data => {
    console.log(data) 
})
}