async function cartas (){
    fetch(`https://api.scryfall.com/cards/random?q=is%3Acommander`)
    .then(response => response.json())
    .then(allCards =>{
        console.log(allCards)
        console.log(allCards.name) // nome
        console.log(allCards.type_line) // tipo de criatura
        if (allCards.keywords && allCards.keywords.length > 0) {
            console.log(`Palavras chave: ${allCards.keywords.join(", ")}`);
        } else {
            console.log("Palavras chave: Nenhuma");
        }
        console.log(allCards.mana_cost) // custo de mana
        console.log(allCards.set_name) // set
        console.log(`Poder: ${allCards.power} Resistencia: ${allCards.toughness}`) // poder e resistencia
    })
}

cartas()

async function aparecer() {
    document.getElementById('form').addEventListener('submit',function(event) {
        event.preventDefault();
        
        const nome = document.getElementById('nome').value;  
        
        const url = `https://api.scryfall.com/cards/named?fuzzy=${nome}`
    
        fetch(`${url}`)
        .then(response => response.json())
        .then(allCards =>{
    
            var singles = document.querySelector('.single-card')
            singles.innerHTML=`
            <img src="${allCards.image_uris.normal}" alt="">
            <h3>${allCards.name}</h3>   
             <h3>${allCards.type_line}</h3>   
              <h3>${allCards.mana_cost}</h3>
              <h3>Poder: ${allCards.power} Resistencia: ${allCards.toughness}</h3>    
              
            `
        })
    
    });
    
    
}

aparecer()





