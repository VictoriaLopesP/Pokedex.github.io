let pokeContainer = document.querySelector("#pokeContainer");
let pokemonCount = 251;
let pokemons = [];
let colors = {
    fire: '#f78127c4',
    grass: '#CFFFCA',
    electric: '#766FC2',
    water: '#5090D6',
    ground: '#d97945bb',
    rock: '#C5B78C',
    fairy: '#EC8FE6',
    poison: '#F0C4FF',
    bug: '#90c12fa9',
    dragon: '#0B6DC3',
    psychic: '#fa717ac7',
    flying: '#89AAE3',
    fighting: '#CE416B',
    normal: '#919AA2',
    dark: '#5a5465d8',
    ghost: '#5269AD',
    ice: '#73CEC0',
    steel: '#5A8EA2'
}

window.addEventListener('load', () => {
  const loadingContainer = document.querySelector('#loading-container');
  loadingContainer.style.display = 'flex';

  
  setTimeout(() => {
    loadingContainer.style.display = 'none';
    
    document.body.style.visibility = 'visible';
  }, 3000); 
});



let mainTypes = Object.keys(colors);

let displayPokemons = (filteredPokemons) => {
    pokeContainer.innerHTML = '';
  
    filteredPokemons.forEach((pokemon) => {
      createPokemonCard(pokemon);
    });
};

let fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
      let pokemonData = await getPokemons(i);
      pokemons.push(pokemonData);
    }
    displayPokemons(pokemons);
}

let getPokemons = async (id) => {
    let url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    let resp = await fetch(url);
    let data = await resp.json();
    return data;
}

let createPokemonCard = (poke) => {
    let card = document.createElement('div');
    card.classList.add("pokemon");
  
    let name = poke.name[0].toUpperCase() + poke.name.slice(1);
    let id = poke.id.toString().padStart(3, '0');
  
    let pokeTypes = poke.types.map(type => type.type.name);
    let typeHTML = pokeTypes.map(type => `<span>${type}</span>`).join(", ");
    
    let typeColors = pokeTypes.map(type => colors[type]);
    let backgroundStyle = typeColors.length === 1 ? `background-color: ${typeColors[0]};` : `background-image: linear-gradient(to right, ${typeColors[0]}, ${typeColors[1]});`;
  
    card.style.cssText = backgroundStyle;
  
    let pokemonInnerHTML = `
      <div class="imgContainer">
          <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png" alt="${name}">
      </div>
      <div class="info">
          <span class="number">${id}</span>
          <h3 class="name">${name}</h3>
          <small class="type" id="type">Type: ${typeHTML}</small>
      </div>
    `;
  
    card.innerHTML = pokemonInnerHTML;
    pokeContainer.appendChild(card);
  }
  

// filtro
let filterInput = document.querySelector("#filter");

let filterPokemonsByType = () => {
  let filterValue = filterInput.value.toLowerCase();
  let filteredPokemons = [];

  if (filterValue === '') {
    filteredPokemons = pokemons;
  } else {
    filteredPokemons = pokemons.filter(pokemon =>
      pokemon.types.some(type => type.type.name.toLowerCase().includes(filterValue))
    );
  }

  displayPokemons(filteredPokemons);
};

filterInput.addEventListener('input', filterPokemonsByType);

fetchPokemons();

