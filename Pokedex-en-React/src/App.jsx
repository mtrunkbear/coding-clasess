import { useState,useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Content from "./components/Content";
import { usePokemons } from "./hooks/usePokemons";
function App() {
  const [name, actualName] = useState("");
  const [first, actualType] = useState("");
  const [second, actualSecond] = useState("");
  const [canEvolve, actualCanEvo] = useState("");
  const [number, changeNumber] = useState("");
  const [evolution, actualEvolution] = useState("");
  const [image, setImage] = useState("");
/*   const Pokedex = [
    { name: "Bulbasaur", type1: "Plant", type2: "Poison", hasEvolution: true },
    { name: "Ivysaur", type1: "Plant", type2: "Poison", hasEvolution: true },
    { name: "Venusaur", type1: "Plant", type2: "Poison", hasEvolution: false },
    { name: "Charmander", type1: "Fire", type2: false, hasEvolution: true },
    { name: "Charmeleon", type1: "Fire", type2: false, hasEvolution: true },
    { name: "Charizard", type1: "Fire", type2: "Flying", hasEvolution: false },
    { name: "Squirtle", type1: "Water", type2: false, hasEvolution: true },
    { name: "Wartortle", type1: "Water", type2: false, hasEvolution: true },
    { name: "Blastoise", type1: "Water", type2: false, hasEvolution: false },
    { name: "Caterpie", type1: "Bug", type2: false, hasEvolution: true },
    { name: "Metapod", type1: "Bug", type2: false, hasEvolution: true },
    { name: "Butterfree", type1: "Bug", type2: "Flying", hasEvolution: false },
    { name: "Weedle", type1: "Bug", type2: "Poison", hasEvolution: true },
    { name: "Kakuna", type1: "Bug", type2: "Poison", hasEvolution: true },
    { name: "Beedrill", type1: "Bug", type2: "Poison", hasEvolution: false },
    { name: "Pidgey", type1: "Normal", type2: "Flying", hasEvolution: true },
    { name: "Pidgeotto", type1: "Normal", type2: "Flying", hasEvolution: true },
    { name: "Pidgeot", type1: "Normal", type2: "Flying", hasEvolution: false },
    { name: "Rattata", type1: "Normal", type2: false, hasEvolution: true },
    { name: "Raticate", type1: "Normal", type2: false, hasEvolution: false },
    { name: "Spearow", type1: "Normal", type2: "Flying", hasEvolution: true },
    { name: "Fearow", type1: "Normal", type2: "Flying", hasEvolution: false },
    { name: "Ekans", type1: "Poison", type2: false, hasEvolution: true },
    { name: "Arbok", type1: "Poison", type2: false, hasEvolution: false },
    { name: "Pikachu", type1: "Electric", type2: false, hasEvolution: true },
    { name: "Raichu", type1: "Electric", type2: false, hasEvolution: false },
    { name: "Sandshrew", type1: "Ground", type2: false, hasEvolution: true },
    { name: "Sandslash", type1: "Ground", type2: false, hasEvolution: false },
    { name: "Nidoran ♀", type1: "Poison", type2: false, hasEvolution: true },
    { name: "Nidorina", type1: "Poison", type2: false, hasEvolution: true },
    {
      name: "Nidoqueen",
      type1: "Poison",
      type2: "Ground",
      hasEvolution: false,
    },
    { name: "Nidoran ♂", type1: "Poison", type2: false, hasEvolution: true },
    { name: "Nidorino", type1: "Poison", type2: false, hasEvolution: true },
    { name: "Nidoking", type1: "Poison", type2: "Ground", hasEvolution: false },
    { name: "Clefairy", type1: "Fairy", type2: false, hasEvolution: true },
    { name: "Clefable", type1: "Fairy", type2: false, hasEvolution: false },
    { name: "Vulpix", type1: "Fire", type2: false, hasEvolution: true },
    { name: "Ninetales", type1: "Fire", type2: false, hasEvolution: false },
    { name: "Jigglypuff", type1: "Normal", type2: "Fairy", hasEvolution: true },
    {
      name: "Wigglytuff",
      type1: "Normal",
      type2: "Fairy",
      hasEvolution: false,
    },
    { name: "Zubat", type1: "Poison", type2: "Flying", hasEvolution: true },
    { name: "Golbat", type1: "Poison", type2: "Flying", hasEvolution: false },
    { name: "Oddish", type1: "Plant", type2: "Poison", hasEvolution: true },
    { name: "Gloom", type1: "Plant", type2: "Poison", hasEvolution: true },
    { name: "Vileplume", type1: "Plant", type2: "Poison", hasEvolution: false },
    { name: "Paras", type1: "Bug", type2: "Plant", hasEvolution: true },
    { name: "Parasect", type1: "Bug", type2: "Plant", hasEvolution: false },
    { name: "Venonat", type1: "Bug", type2: "Poison", hasEvolution: true },
    { name: "Venomoth", type1: "Bug", type2: "Poison", hasEvolution: false },
    { name: "Diglett", type1: "Ground", type2: false, hasEvolution: true },
    { name: "Dugtrio", type1: "Ground", type2: false, hasEvolution: false },
    { name: "Meowth", type1: "Normal", type2: false, hasEvolution: true },
    { name: "Persian", type1: "Normal", type2: false, hasEvolution: false },
    { name: "Psyduck", type1: "Water", type2: false, hasEvolution: true },
    { name: "Golduck", type1: "Water", type2: false, hasEvolution: false },
    { name: "Mankey", type1: "Fighting", type2: false, hasEvolution: true },
    { name: "Primeape", type1: "Fighting", type2: false, hasEvolution: false },
  ]; */
  const pokemons = usePokemons();
  function getFromPKDX(number) {
    console.log(number);
    if (pokemons && pokemons.length >0  && pokemons[number - 1]) {
      actualCanEvo(pokemons[number - 1].hasEvolution);
      actualName(pokemons[number - 1].name);
      actualType(pokemons[number - 1].type1);
      actualSecond(pokemons[number - 1].type2);
      actualEvolution(pokemons[number].name);
      setImage(pokemons[number - 1].image)
    }
  }
  function inputchange(number, value) {
    changeNumber(value);
  }

  useEffect(() => {
    console.log(pokemons);
  }, [pokemons]);

  return (
    <>
      <h1 className="title">Pokedex chamuyenta</h1>
      <button onClick={() => getFromPKDX(number)}>
        Buscar por numero de la pokedex
      </button>
      <input
        value={number ?? "Introduzca su numero aca"}
        onChange={(e) => changeNumber(e.target.value)}
      />
      {pokemons&& pokemons?.length>0&& pokemons[number - 1] && (
        <Content
          second={second}
          first={first}
          evolution={evolution}
          canEvolve={canEvolve}
          name={name}
          image={image}
        />
      )}
    </>
  );
}

export default App;
