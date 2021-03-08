const key = {
    weatherKey : "13517a41ef6a4b6e8d6de306f19caa92",
    recipeKey : "3e9ad682114240ea8d99079e32ee524e"
}

document.addEventListener("DOMContentLoaded", () => {
    displayRandomFact();
})

function displayRandomFact() {
    fetch(`http://localhost:3000/facts`)
    .then(response => {
        return response.json();
    })
    .then(data => {
        displayFacts(data);
    })
}

function displayFacts(data){
    let pTag = document.getElementById("random-facts");
    
    setInterval(function(){
        let number = Math.floor(Math.random() * 20);
        for(let i = 0; i < number; i++){
            pTag.innerText = data[number].fact;
        }
    }, 5000);
}