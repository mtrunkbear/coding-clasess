import { fetchMoves } from '../utils/fetchMoves'
import { useState, useEffect } from "react"
function MoveList({pokemon, sendToParent}){
    const [moves, changeMoves] = useState([null,null,null,null]);
    const {moveslist:Moves, loadedMoves} = fetchMoves(pokemon.name);
    const getAvailableMoves = () => {
        return Moves?.filter(move => !moves.includes(move));
    };
    const moveSelects = moves?.map((selectedMove, index) => (
        <select
          key={index}
          value={''}
          onChange={(e) => handleSelectChange(index, e.target.value)}
        >
          {getAvailableMoves()?.map(move => 
            <option key={move.id} className="moveSelect" value={move}>
                <p>{move.name}  Power: {move.power}  ACC: {move.acc}</p>
                <p>Type: {move.type}</p>
                <p>{move.desc}</p>
            </option>
    
    )}
        </select>
    ))
    const handleSelectChange = (index, value) => {
        const newSelectedOptions = [...moves];
        newSelectedOptions[index] = value;
        changeMoves(newSelectedOptions);
    };
    useEffect(() => {
        sendToParent(loadedMoves, moves) 
        console.log(loadedMoves,moves)}
    , [loadedMoves,moves])
    return(
        <>
            {loadedMoves &&
                {moveSelects}}
        </>
    )
}
export default MoveList
