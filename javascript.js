

const url = 'https://pokeapi.co/api/v2/pokemon'

async function fetchPokemon(id) {
    try {
        const response = await fetch(`${url}/${id}`);

        if(!response.ok) {
            throw new Error('Error fetching pokemon');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

let pokemon = await fetchPokemon(1024);

console.log(pokemon);

function PokemonData(pokemon) {
    document.getElementById("pokemonName").textContent = pokemon.name;
    document.getElementById("pokemonId").textContent = pokemon.id;
    document.getElementById("pokemonImage").src = pokemon.sprites.front_default;
    document.getElementById("pokemonTypes").textContent = pokemon.types.map(t => t.type.name).join(', ');
}

PokemonData(pokemon);

document.getElementById("prevButton").addEventListener("click", async () => {
    if (pokemon.id > 1) {
        pokemon = await fetchPokemon(pokemon.id - 1);
        PokemonData(pokemon);
    }
});

document.getElementById("nextButton").addEventListener("click", async () => {
    if (pokemon.id < 1025) {
    pokemon = await fetchPokemon(pokemon.id + 1);
    PokemonData(pokemon);
    }
});