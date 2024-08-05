function ChoosenPokemons({Pokemon1, Pokemon2, isPlaying}){
    return(
        <>
            {Pokemon1 && 
            <div className="pokemon1">
                <img src={Pokemon1.backImage} />
                {!isPlaying && <p>Choosen pokemon: {Pokemon1.name}</p> }
            </div>
            }
            {Pokemon2 && 
            <div className="pokemon2">
                <img src={Pokemon2.image} />
                {!isPlaying && <p>Choosen pokemon: {Pokemon2.name}</p>}
            </div>
            }
        </>
    );
}
export default ChoosenPokemons