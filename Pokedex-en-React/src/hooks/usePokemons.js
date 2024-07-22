import { useState, useEffect } from "react";

export const usePokemons = () => {
  const [pokemons, setPokemons] = useState();

  const getPokemons = async () => {
    //GET obteniendo urls de pokemons
    const response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
    );
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    const { results } = jsonResponse;
    //GET obteniendo data de cada pokemon
    const pokemons = [];
    results.forEach(async ({ url }) => {
      const response = await fetch(url);
      const pokemonFromApi = await response.json();
      console.log(pokemonFromApi);
      const pokemon = {
        name: pokemonFromApi.name,
        type1: pokemonFromApi.types[0].type.name || "",
        type2: pokemonFromApi.types?.[1]?.type?.name || "",
        hasEvolution:  false,
        image: pokemonFromApi.sprites.front_default
      };
      pokemons.push(pokemon);
    });

    return pokemons;
  };

  useEffect(() => {
    (async () => {
      const response = await getPokemons();
      // console.log(response);
      setPokemons(response);
    })();
  }, []);

  return pokemons;
};
