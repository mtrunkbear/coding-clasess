import { useState, useEffect } from "react";
import {useSound} from 'use-sound'
function ChoosenPokemons({Pokemon1, Pokemon2}){
    useEffect(() => {
        if(Pokemon1){
            const [pokemon1Sound] = useSound(Pokemon1.battleCry);
            pokemon1Sound()
        }
    }, [Pokemon1])
    useEffect(() => {
        if(Pokemon2){
            const [pokemon2Sound] = useSound(Pokemon2.battleCry);
            pokemon2Sound()
        }
    }, [Pokemon2])
    return(
        <>
            {Pokemon1 && 
            <div className="pokemon1">
                <img src={Pokemon1.image} />
                <p>Choosen pokemon: {Pokemon1.name}</p>
            </div>
            }
            {Pokemon2 && 
            <div className="pokemon2">
                <img src={Pokemon2.image} />
                <p>Choosen pokemon: {Pokemon2.name}</p>
            </div>
            }
        </>
    );
}
export default ChoosenPokemons