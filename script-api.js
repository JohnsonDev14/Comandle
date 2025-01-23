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

const singles = document.querySelector('.single-card')
const nome = document.querySelector('#nome')

const getPosts = async (nome) => {
    const response = await fetch(
        `https://api.scryfall.com/cards/search?as=grid&order=name&q=%28type%3Acreature+type%3Alegendary%29+%28game%3Apaper%29+legal%3Acommander+%28set%3Adsk+OR+set%3Ablb+OR+set%3Abig+OR+set%3Aotj+OR+set%3Amkm+OR+set%3Alci+OR+set%3Awoe+OR+set%3Amat+OR+set%3Amom+OR+set%3Aone+OR+set%3Abro+OR+set%3Admu+OR+set%3Asnc+OR+set%3Aneo+OR+set%3Avow+OR+set%3Amid+OR+set%3Astx+OR+set%3Akhm+OR+set%3Aznr+OR+set%3Aiko+OR+set%3Athb+OR+set%3Aeld+OR+set%3Awar+OR+set%3Arna+OR+set%3Agrn+OR+set%3Adom+OR+set%3Arix+OR+set%3Axln%29+name%3A${nome}`
    );
    return response.json();
}

const cardsFromSearch = (carta) => {
    return carta.map(item => `
        <img src="${item.image_uris.normal}" alt="">
        <h3>${item.name}</h3>   
        <h3>${item.type_line}</h3>   
        <h3>${item.mana_cost}</h3>
        <h3>Poder: ${item.power} Resistencia: ${item.toughness}</h3> 
    `).join('');
}

const searchPersonIntoDOM = async (nome) => {
    const carta = await getPosts(nome);
    const postsTemplate = cardsFromSearch(carta.data);
    singles.insertAdjacentHTML('beforeend', postsTemplate);
}

const modifyInputValue = event => {
    if (event.key === 'Enter') { // Verifica se a tecla pressionada é o Enter
        const inputValue = event.target.value.trim().toLowerCase();
        if (inputValue !== '') {
            searchPersonIntoDOM(inputValue); // Realiza a busca
        }
    }
};

nome.addEventListener('keydown', modifyInputValue);


