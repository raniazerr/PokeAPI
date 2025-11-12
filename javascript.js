const url = 'https://pokeapi.co/api/v2/pokemon';

async function fetchPokemon(id) {
    try {
        const response = await fetch(`${url}/${id}`);

        if (!response.ok) {
            throw new Error('Erreur lors du chargement du Pokémon');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

let pokemon = await fetchPokemon(470);

// Fonction pour mettre la première lettre en maj
function maj(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Affichage des données du pokémon
function renderPokemon(pokemon, isShiny = false) {
    document.getElementById("pokemonName").textContent = maj(pokemon.name);
    document.getElementById("pokemonId").textContent = pokemon.id;

// Affichage pokémon shiny
   let sprite;
if (isShiny) {
    sprite = pokemon.sprites.front_shiny; 
} else {
    sprite = pokemon.sprites.front_default; 
}


    document.getElementById("pokemonImage").src = sprite;

    document.getElementById("pokemonTypes").textContent =
        pokemon.types.map(t => t.type.name).join(', ');
}

// Afficher le premier Pokémon
renderPokemon(pokemon);

// Chargement 
function showLoading() {
    const gameMessage = document.getElementById('game-message');
    const healthFill = document.querySelector('.health-fill');
    
    if (!gameMessage.textContent.includes("LOADING...")) {
        gameMessage.textContent += " LOADING...";
    }

    // Animation de la barre de vie
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

// Bouton Précédent
document.getElementById("prevButton").addEventListener("click", async () => {
    if (pokemon.id > 1) {
        showLoading();
        pokemon = await fetchPokemon(pokemon.id - 1);
        renderPokemon(pokemon);
        hideLoading();
    }
});

// Bouton Suivant
document.getElementById("nextButton").addEventListener("click", async () => {
    if (pokemon.id < 1025) {
        showLoading();
        pokemon = await fetchPokemon(pokemon.id + 1);
        renderPokemon(pokemon);
        hideLoading();
    }
});

// Bouton Shiny ON
document.getElementById("shinyOn").addEventListener("click", () => {
    if (!pokemon) return;
    renderPokemon(pokemon, true);
});

// Bouton Shiny OFF
document.getElementById("shinyOff").addEventListener("click", () => {
    if (!pokemon) return;
    renderPokemon(pokemon, false);
});

// Control button interactions
const controlButtons = document.querySelectorAll('.control-btn');
controlButtons.forEach(btn => {
    btn.addEventListener('click', () => {
    btn.classList.add('pressed');

                    
    setTimeout(() => {
    btn.classList.remove('pressed');
    }, 200);
});
});
            