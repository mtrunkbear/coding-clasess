import { fetchMoves } from '../utils/fetchMoves'
import { useState } from "react"
function MoveList({pokemon}){
    const [moves, changeMoves] = useState([null,null,null,null]);
    const {moveslist:Moves, loadedMoves} = fetchMoves(pokemon.name);
    const moveSelects = moves?.map((selectedMove, index) => (
        <select
          key={index}
          value={selectedMove || ''}
          onChange={(e) => handleSelectChange(index, e.target.value)}
        >
          <option value="" disabled>Select a move</option>
          {getAvailableMoves(index).map(move => 
        
        <option key={move.id} className="moveSelect" value={move}>
            <p>{move.name}  Power: {move.power}  ACC: {move.acc}</p>
            <p>Type: {move.type}</p>
            <p>{move.desc}</p>
        </option>
    
    )}
        </select>
    ))
    const moveOptions = Moves?.map(move => 
        
        <option key={move.id} className="moveSelect" value={move}>
            <p>{move.name}  Power: {move.power}  ACC: {move.acc}</p>
            <p>Type: {move.type}</p>
            <p>{move.desc}</p>
        </option>
    
    )
    const getAvailableMoves = (currentIndex) => {
        return Moves.filter(move => !moves.includes(move));
    };
    const handleSelectChange = (index, value) => {
        const newSelectedOptions = [...moves];
        newSelectedOptions[index] = value;
        changeMoves(newSelectedOptions);
    };
    return(
        <>
            {loadedMoves &&
                {moveSelects}}
        </>
    )
}
export default MoveList
