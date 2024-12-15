const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                    alt="${pokemon.name}">
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

// PokemonDetail //
const pokemonModal = document.getElementById('pokemonModal');
const pokemonDetails = document.getElementById('pokemonDetails');
const closeModal = document.getElementById('closeModal');

// Função para exibir os detalhes do Pokémon no modal
function showPokemonDetails(pokemon) {
    pokemonDetails.innerHTML = `
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <img class="pokemon ${pokemon.type}" src="${pokemon.photo}" alt="${pokemon.name}">
        <ul>
            <li class="pokemon">${pokemon.types.map((type) => `<li class="type pokemon ${type}">${type}</li>`).join('')}</li>
            <li class="pokemon"><strong>Attack:</strong> ${pokemon.stats.attack}</li>
            <li class="pokemon"><strong>Defense:</strong> ${pokemon.stats.defense}</li>
            <li class="pokemon"><strong>HP:</strong> ${pokemon.stats.hp}</li>
            <li class="pokemon"><strong>Speed:</strong> ${pokemon.stats.speed}</li>
        </ul>
    `;
    pokemonModal.classList.remove('hidden');
}

// Adiciona evento de clique para cada Pokémon da lista
function addPokemonClickEvents() {
    const pokemonItems = document.querySelectorAll('.pokemon');
    pokemonItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            const pokemon = pokeApi.pokemonCache[index];
            showPokemonDetails(pokemon);
        });
    });
}

// Fecha o modal
closeModal.addEventListener('click', () => {
    pokemonModal.classList.add('hidden');
});

// Atualize a função loadPokemonItens para adicionar eventos
function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('');
        pokemonList.innerHTML += newHtml;
        addPokemonClickEvents(); // Adiciona os eventos de clique
    });
}
