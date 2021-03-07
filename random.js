document.addEventListener("DOMContentLoaded", () => {
    // let container = document.getElementById("random-facts-container");

    displayRandomFact()

})

function displayRandomFact() {

    fetch(`http://localhost:3000/facts`)
    .then(response => {
        return response.json()
    })
    .then(data => {
        displayFacts(data)
    })
    
}

function displayFacts(data){
    let pTag = document.getElementById("random-facts");
        setInterval(function(){
        let number = Math.floor(Math.random() * 20) 
        for(let i = 0; i < number; i++){
           

                pTag.innerText = data[number].fact;
            

        }
    }, 5000);
    
    
}