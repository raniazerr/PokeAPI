const url = 'https://pokeapi.co/api/v2/pokemon';


async function fetchPokemon(id) {
    try {
        const response = await fetch(`${url}/${id}`);

        if (!response.ok) {
            throw new Error('Error fetching pokemon');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

let pokemon = await fetchPokemon(16);

console.log(pokemon);

function maj(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function PokemonData(pokemon) {
    document.getElementById("pokemonName").textContent = maj(pokemon.name);
    document.getElementById("pokemonId").textContent = pokemon.id;
    document.getElementById("pokemonImage").src = pokemon.sprites.front_default;
    document.getElementById("pokemonTypes").textContent = pokemon.types.map(t => t.type.name).join(', ');
}

PokemonData(pokemon);

// Loading
function showLoading() {
    const gameMessage = document.getElementById('game-message');
    const healthFill = document.querySelector('.health-fill');
    
    
    if (!gameMessage.textContent.includes("LOADING...")) {
        gameMessage.textContent += " LOADING...";
    }

    // Barre de vie
    healthFill.style.width = '0%';
    let health = 0;
    const healthInterval = setInterval(() => {
        health += 10;
        healthFill.style.width = `${health}%`;
        if (health >= 100) {
            clearInterval(healthInterval);
        }
    }, 100);
}


function hideLoading() {
    const gameMessage = document.getElementById('game-message');
    
    if (gameMessage.textContent.includes("LOADING...")) {
        gameMessage.textContent = gameMessage.textContent.replace(" LOADING...", "");
    }
}

// Bouton "Précédent"
document.getElementById("prevButton").addEventListener("click", async () => {
    if (pokemon.id > 1) {
        showLoading();  
        pokemon = await fetchPokemon(pokemon.id - 1);
        PokemonData(pokemon);
        hideLoading();  
        console.log(pokemon.id);
    }
});

// Bouton "Suivant"
document.getElementById("nextButton").addEventListener("click", async () => {
    if (pokemon.id < 1025) {
        showLoading(); 
        pokemon = await fetchPokemon(pokemon.id + 1);
        PokemonData(pokemon);
        hideLoading();  
    }
});

