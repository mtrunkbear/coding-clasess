import { useState } from 'react'
import './App.css'
import LoadingScreen from './components/LoadingScreen.jsx'
import useSound from 'use-sound'
import { fetchMoves } from './utils/fetchMoves.js'
import TitleNButtons from './components/Title&Buttons.jsx';
import { fetchPokeAPI } from './utils/fetchPokeAPI.js';
import ChoosenPokemons from './components/ChoosenPokemons.jsx'
import MoveList from './components/MoveList.jsx'
// formula de HP = floor(0.01 x (2 x Base + IV + floor(0.25 x EV)) x Level) + Level + 10
function App() {
  const {pokemons:Pokemons,loaded} = fetchPokeAPI();
  const [Pokemon1, setFirst] = useState();
  const [Pokemon2, setSecond] = useState();
  const [PKSoundURL, setSound] = useState();
  const [pokemonSound] = useSound(PKSoundURL);
  const [gameOn, setGameState] = useState(false);
  const [Moves1, setFirstMoves] = useState();
  const [Moves2, setSecondMoves] = useState();
  const [LoadedMoves1, gotMoves1] = useState(false);
  const [LoadedMoves2, gotMoves2] = useState(false);

  function selectPokemon(pokemon)
  {
    setSound(pokemon.battleCry);
    console.log(PKSoundURL)
    if (Pokemon1 && !Pokemon2){
      setSecond(pokemon)
    } else if (Pokemon2 && !Pokemon1){
      setFirst(pokemon)
    } else if (Pokemon1 && Pokemon2){
      setFirst()
      setSecond()
    } else {
      setFirst(pokemon)
    }
    playcry()
  }
  function playcry(){
    pokemonSound()
  }
  const handleButtonPokemon = (pokemon) => () => {
    selectPokemon(pokemon);
  };
  const handleButtonStart = () => () => {
    setGameState(true);
  }
  const pokeList = Pokemons?.map(pokemon => 
    <button key={pokemon.name} className='pkSelBox' onClick={handleButtonPokemon(pokemon)}>
      <img src={pokemon.image}/>
      <p>{pokemon.name}</p>
    </button>
    );
  const getMoves1 = (loadedmoves, movesrecieved) => {
    setFirstMoves(movesrecieved)
    gotMoves1(loadedmoves)
  }
  const getMoves2 = (loadedmoves, movesrecieved) => {
    setSecondMoves(movesrecieved)
    gotMoves2(loadedmoves)
  }
  return (
    <>
      <LoadingScreen loaded={loaded}/>
      {loaded && !gameOn &&<TitleNButtons pokeList={pokeList} />}
      <ChoosenPokemons Pokemon1={Pokemon1} Pokemon2={Pokemon2} isPlaying={gameOn} />
      {Pokemon1 && Pokemon2 &&  <button className="StartGameButton" onClick={handleButtonStart()}>
        <p>Start game</p>
      </button>}
      {gameOn && <MoveList pokemon={Pokemon1} sendToParent={getMoves1}/>}
      {gameOn && <MoveList pokemon={Pokemon2} sendToParent={getMoves2}/>}
    </>
  )
}

export default App