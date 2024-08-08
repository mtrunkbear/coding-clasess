import { useState, useEffect } from "react";

export function fetchMoves(pokename){
  const [moveslist, setMoves] = useState();
  const [loadedMoves, setLoaded] = useState(false);
  const getMoves = async () => {
    const pokemonURL = "https://pokeapi.co/api/v2/pokemon/"+pokename
    //GET obteniendo urls de pokemons
    const response = await fetch(pokemonURL);
    const pokemonResponse = await response.json();
    const { moves } = pokemonResponse;
    console.log(moves)
    //GET obteniendo data de cada pokemon
    const listmoves = [];
    let a = 0;
    const movesBase = moves.map(element => element.move)
    movesBase.forEach(async ({ url }) => {
      a++;
      const response = await fetch(url);
      const moveFromApi = await response.json();
      const move = {
        name: moveFromApi.name,
        acc: moveFromApi.accuracy,
        power: moveFromApi.power,
        pp: moveFromApi.pp,
        prior: moveFromApi.priority,
        class: moveFromApi.damage_class.name,
        effect: moveFromApi?.meta?.ailment?.name || "none",
        cChange: moveFromApi.meta?.crit_rate || 0,
        drain: moveFromApi.meta?.drain || 0,
        flinch: moveFromApi.meta?.flinch_chance || 0,
        heal: moveFromApi.meta?.healing || 0,
        mHits: moveFromApi.meta?.max_hits || null,
        mTurns: moveFromApi.meta?.max_turns || null,
        minHits: moveFromApi.meta?.min_hits || null,
        minTurns: moveFromApi.meta?.min_hits || null,
        type: moveFromApi.type.name,
        desc: moveFromApi?.effect_entries[0]?.effect || moveFromApi?.effect_entries?.effect || "",
        aditionalFX: [],
        target: moveFromApi.target?.name || "selected-pokemon",
        effectChance: moveFromApi.meta?.stat_chance || 0,
        ID: a
      };
      for(let i = 0; i < 5; i++){
        let order = ["attack", "defense", "special-attack", "special-defense", "speed"];
        let getStatChanges = moveFromApi.stat_changes?.find((movestatchanges) => movestatchanges.stat.name == order[i]);
        if(getStatChanges == undefined)
        {
          getStatChanges = 0;
        } else {
          getStatChanges = getStatChanges.change
        }
        move.aditionalFX.push(getStatChanges)
      }
      listmoves.push(move)
      console.log(pokemonResponse.moves.length)
      if(listmoves.length >= pokemonResponse.moves.length)
      {
        setLoaded(true);
        console.log(pokemonResponse.moves.length)
      }
    });
    return listmoves;
  };
  useEffect(() => {
    (async () => {
      const response = await getMoves();
      console.log(response)
      setMoves(response);
    })();
  }, []);
  return {moveslist, loadedMoves};
};