async function fetchPokemonData(pokemonName) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );
  const pokemonData = await response.json();
  console.log(pokemonData);
  return pokemonData;
}

async function getPokemon(event) {
  event.preventDefault();
  const pokemon = document.getElementById('pokemon').value;
  const pokemonInfoElement = document.getElementById('pokemon-info');

  try {
    pokemonInfoElement.innerHTML = 'Loading...';
    const pokemonData = await fetchPokemonData(pokemon);
    pokemonInfoElement.innerHTML = '';

    pokemonInfoElement.innerHTML = `
      <div style="text-align: center;">
        <h2 style="text-transform: capitalize;">${pokemonData.name}</h2>
        <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
        <hr/>

        <h3>Abilities</h3>
        <div>
          ${pokemonData.abilities
            .map((a) => `<span>${a.ability.name}</span><br>`)
            .join('')}
        </div>
        <hr/>
        
        <h3>Base Experience</h3>
        <p>${pokemonData.base_experience}</p>
        <hr/>

        <h3>Sounds:</h3>
        <audio src="${pokemonData.cries.latest}" controls></audio><br>
        <audio src="${pokemonData.cries.legacy}" controls></audio>
      </div>
    `;
  } catch (error) {
    console.log('ERROR:', error.message);
    pokemonInfoElement.innerHTML = 'Catch attemp failed - Try again! 😖';
  }
}

document.querySelector('form').addEventListener('submit', getPokemon);
