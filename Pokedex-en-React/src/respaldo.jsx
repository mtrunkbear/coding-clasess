import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [name, actualName] = useState()
  const [first, actualType] = useState()
  const [second, actualSecond] = useState()
  const [canEvolve, actualCanEvo] = useState()
  const [number, changeNumber] = useState()
  const [evolution, actualEvolution] = useState()
  const Pokedex = [
      {name: "Bulbasaur", type1: "Plant", type2: "Poison", hasEvolution: true},
      {name: "Ivysaur", type1: "Plant", type2: "Poison", hasEvolution: true},
      {name: "Venusaur", type1: "Plant", type2: "Poison", hasEvolution: false},
      {name: "Charmander", type1: "Fire", type2: false, hasEvolution: true},
      {name: "Charmeleon", type1: "Fire", type2: false, hasEvolution: true},
      {name: "Charizard", type1: "Fire", type2: "Flying", hasEvolution: false},
      {name: "Squirtle", type1: "Water", type2: false, hasEvolution: true},
      {name: "Wartortle", type1: "Water", type2: false, hasEvolution: true},
      {name: "Blastoise", type1: "Water", type2: false, hasEvolution: false},
      {name: "Caterpie", type1: "Bug", type2: false, hasEvolution: true},
      {name: "Metapod", type1: "Bug", type2: false, hasEvolution: true},
      {name: "Butterfree", type1: "Bug", type2: "Flying", hasEvolution: false},
      {name: "Weedle", type1: "Bug", type2: "Poison", hasEvolution: true},
      {name: "Kakuna", type1: "Bug", type2: "Poison", hasEvolution: true},
      {name: "Beedrill", type1: "Bug", type2: "Poison", hasEvolution: false},
      {name: "Pidgey", type1: "Normal", type2: "Flying", hasEvolution: true},
      {name: "Pidgeotto", type1: "Normal", type2: "Flying", hasEvolution: true},
      {name: "Pidgeot", type1: "Normal", type2: "Flying", hasEvolution: false},
      {name: "Rattata", type1: "Normal", type2: false, hasEvolution: true},
      {name: "Raticate", type1: "Normal", type2: false, hasEvolution: false},
      {name: "Spearrow", type1: "Normal", type2: "Flying", hasEvolution: true},
      {name: "Fearow", type1: "Normal", type2: "Flying", hasEvolution: false},
      {name: "Ekans", type1: "Poison", type2: false, hasEvolution: true},
      {name: "Arbok", type1: "Poison", type2: false, hasEvolution: false},
      {name: "Pikachu", type1: "Electric", type2: false, hasEvolution: true},
      {name: "Raichu", type1: "Electric", type2: false, hasEvolution: false},
      {name: "Sandshrew", type1: "Ground", type2: false, hasEvolution: true},
      {name: "Sandslash", type1: "Ground", type2: false, hasEvolution: false},
      {name: "Nidoran ♀", type1: "Poison", type2: false, hasEvolution: true},
      {name: "Nidorina", type1: "Poison", type2: false, hasEvolution: true},
      {name: "Nidoqueen", type1: "Poison", type2: "Ground", hasEvolution: false},
      {name: "Nidoran ♂", type1: "Poison", type2: false, hasEvolution: true},
      {name: "Nidorino", type1: "Poison", type2: false, hasEvolution: true},
      {name: "Nidoking", type1: "Poison", type2: "Ground", hasEvolution: false},
    ]
    function getFromPKDX(number){
      console.log(number,Pokedex[number-1])
      if (Pokedex[number-1]){
        actualName(Pokedex[number-1].name)
        actualType(Pokedex[number-1].type1)
        actualSecond(Pokedex[number-1].type2)
        actualCanEvo(Pokedex[number-1].hasEvolution)
        if(canEvolve)  {
          actualEvolution(Pokedex[number].name)
        }
        console.log(Pokedex[number], number)
      }
    } 
  return (
    <>
      <h1 className='title'>Pokedex chamuyenta</h1>
      <button onClick={() => getFromPKDX(number)}>Buscar por numero de la pokedex</button>
      <input value={number ?? "Introduzca su numero aca"}onChange={e => changeNumber(e.target.value)}/>
      <span className='imageName'><img src={"./src/assets/"+name+".png"}></img>
      <h2 className='pkName'>Nombre: {name}</h2></span>
      <div className='tContainer'><p>Tipos: <img className='type'src={"./src/assets/"+first+".webp"}/>{second?<img className='type' src={"./src/assets/"+second+".webp"}/>:""}</p></div>
      <div className='evolutionDiv'>{canEvolve ? <p>Este pokemon evoluciona en: {evolution}</p>: <p>Este pokemon no evoluciona</p>}
      {canEvolve && <img className='evolution' src={"./src/assets/"+evolution+".png"}/>}</div>
    </>
  )
}

export default App
