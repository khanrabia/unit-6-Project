document.addEventListener("DOMContentLoaded", fetchThis)




function fetchThis() {
    let options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    }
    fetch("https://api.spoonacular.com/recipes/716429/information?apiKey=536b11be4f9943aeb2d776558441cf0e", options)
.then(res => res.json())
.then(data => {
    console.log(data) 
})
}