class Perro {
  constructor({ raza, nombre }) {
    this.raza = raza;
    this.nombre = nombre;
  }
  ladrar() {
    console.log("Guau!!");
  }
}

const javier = new Perro({ raza: "Schnoodle", nombre: "Javier" });

javier.ladrar();

const neit = new Perro({ raza: "Kiltro", nombre: "Neit" });

neit.ladrar();
//console.log()

class EspeciePokemon {
  constructor({ nombre, vida }) {
    this.nombre = nombre;
    this.vida = vida;
  }
}

const charmander = new EspeciePokemon({ nombre: "Charmander", vida: 100 });

/* class Pokemons {



  constructor({ especie, nombre }) {
    this.nombre = nombre;

    this.vida = this.getVidaPorEspecie(especie);
  }
}
 */


// Herencia y Polimorfismo
class Entidad {
  constructor({ nombre }) {
    this.nombre = nombre;
  }
  caminar() {
    console.log("camina mucho");
  }
}
class Pokemon extends Entidad {
  constructor({ especie, nombre }) {
    super({ nombre });
    this.nombre = nombre;

    this.vida = especie.vida;
    this.nombreEspecie = especie.nombre;
  }

  tirarPoder() {
    console.log("HAAAAAAAAAAA KAMEHAAAAAAAAA");
  }

  hacerAlgo() {
    this.tirarPoder();
  }
}

const myCharmander = new Pokemon({
  especie: charmander,
  nombre: "MyCharmander",
});
myCharmander.caminar();
console.log();
