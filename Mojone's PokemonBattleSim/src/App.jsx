import { useState } from 'react'
import './App.css'
import LoadingScreen from './components/LoadingScreen.jsx'
import useSound from 'use-sound'
import TitleNButtons from './components/Title&Buttons.jsx';
import { fetchPokeAPI } from './utils/fetchPokeAPI.js';
import ChoosenPokemons from './components/ChoosenPokemons.jsx'
// formula de HP = floor(0.01 x (2 x Base + IV + floor(0.25 x EV)) x Level) + Level + 10
function App() {
  const {pokemons:Pokemons,loaded} = fetchPokeAPI();
  const [Pokemon1, setFirst] = useState();
  const [Pokemon2, setSecond] = useState();
  function selectPokemon(pokemon){
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
  }
  const pokeList = Pokemons?.map(pokemon => 
    <button className='pkSelBox'onClick={selectPokemon(pokemon)}>
      <img src={pokemon.image}/>
      <p>{pokemon.name}</p>
    </button>
    );
  return (
    <>
      <LoadingScreen loaded={loaded}/>
      {loaded && <TitleNButtons pokeList={pokeList} />}
      <ChoosenPokemons Pokemon1={Pokemon1} Pokemon2={Pokemon2} />
    </>
  )
}

export default App
