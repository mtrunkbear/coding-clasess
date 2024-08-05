import { useState, useEffect } from "react";

export function fetchMoves(pokename){
  const [moveslist, setMoves] = useState();
  const [loadedMoves, setLoaded] = useState(false);
  const getMoves = async () => {
    //GET obteniendo urls de pokemons
    const response = await fetch("https://pokeapi.co/api/v2/pokemon/"+pokename);
    const jsonResponse = await response.json();
    const { moves } = jsonResponse;
    //GET obteniendo data de cada pokemon
    const listmoves = [];
    let a = 0;
    moves.forEach(async ({ url }) => {
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
        effect: moveFromApi.meta.ailment.name,
        cChange: moveFromApi.meta.crit_rate,
        drain: moveFromApi.meta.drain,
        flinch: moveFromApi.meta.flinch_chance,
        heal: moveFromApi.meta.healing,
        mHits: moveFromApi.meta.max_hits,
        mTurns: moveFromApi.meta.max_turns,
        minHits: moveFromApi.meta.min_hits,
        minTurns: moveFromApi.meta.min_hits,
        type: moveFromApi.type.name,
        desc: moveFromApi.effect_entries.effect,
        aditionalFX: [],
        effectChance: moveFromApi.meta.stat_chance,
        ID: a
      };
      for(let i = 0; i < 5; i++){
        let order = ["attack", "defense", "special-attack", "special-defense", "speed"];
        let getStatChanges = moveFromApi.stat_changes?.find((movestatchanges) => movestatchanges.stat.name == order[i]);
        if(getStatChanges == undefined)
        {
          getStatChanges = 0;
        }
        move.aditionalFX.push(getStatChanges)
      }
      listmoves.push(move)
      if(listmoves.length >= pokename.moves.length)
      {
        setLoaded(true);
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