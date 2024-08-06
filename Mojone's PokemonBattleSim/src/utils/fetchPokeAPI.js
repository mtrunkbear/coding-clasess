import { useState, useEffect } from "react";

export const fetchPokeAPI = () => {
  const [pokemons, setPokemons] = useState();
  const [loaded, setLoaded] = useState(false);
  const getPokemons = async () => {
    //GET obteniendo urls de pokemons
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");
    const jsonResponse = await response.json();
    const { results } = jsonResponse;
    console.log(results)
    //GET obteniendo data de cada pokemon
    const pokemons = [];
    results.forEach(async ({ url }) => {
      const response = await fetch(url);
      const pokemonFromApi = await response.json();
      const pokemon = {
        name: pokemonFromApi.species.name,
        type1: pokemonFromApi.types[0].type.name,
        type2: pokemonFromApi.types?.[1]?.type?.name || false,
        hasEvolution:  false,
        image: pokemonFromApi.sprites.front_default,
        backImage: pokemonFromApi.sprites.back_default,
        battleCry: pokemonFromApi.cries.legacy,
        stats: []
      };
      for(let i = 0; i < pokemonFromApi.stats.length; i++)
      {
        pokemon.stats.push(pokemonFromApi.stats[i].base_stat);
      } 
      pokemons[pokemonFromApi.id] = pokemon;
      if(pokemons.length >= 151)
      {
        setLoaded(true);
      }
    });
    return pokemons;
  };
  useEffect(() => {
    (async () => {
      const response = await getPokemons();
      console.log(response)
      setPokemons(response);
    })();
  }, []);
  return {pokemons, loaded};
};