import { useState } from 'react'
import papo from './assets/Papo.svg'
import papont from './assets/Papont.svg'
import Boton from './assets/BotonMuerte.svg'
import './App.css'
import useSound from 'use-sound'
import ExplosionSonido from './assets/Explosion.mp3'
import ExplosionSonido2 from './assets/Explosion2.mp3'

function App() {
  const [vivo,cambiarvida] =  useState(true)
  const [playSound] = useSound(ExplosionSonido);
  const [playSound2] = useSound(ExplosionSonido2);
  function Explode() {
    playSound
    cambiarvida(false)
    cambiarTexto("*Plop*")
  }
  const [texto, cambiarTexto] = useState("No me mates!")
  return (
    <>
      <p>{texto}</p>
      <div>
        {vivo ? <img src={papo} id='papo'/> : <img src={papont} id='papo'/>}
      </div>
      <h1>Click en el boton para explotar a papo</h1>
      <button onClick={() => Explode()}>
        <img src={Boton}/>
      </button>
    </>
  )
}

export default App
