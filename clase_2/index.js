const objeto = {
  propiedad1: "",
  propiedad2: "",
  propiedad3: "",
};

const getColorPelo = () => {
  return colorPelo;
};
/* const persona = {

    peso: "20kg",
    altura:"160cm",
    colorPelo: "Verde",
    getColorPelo: ()=>getColorPelo(this.colorPelo),
}

 */

const persona = {
  peso: "20kg",
  altura: "160cm",
  vida: 10000,
  dañoRecibido: 2000,
  colorPelo: "Verde",
  getColorPelo: function () {
    return this.colorPelo;
  },
  restarVida: function (daño) {
    return (this.vida -= daño);
  },
  esAntiPersona: function () {
    return this.vida < 0;
  },
};

console.log(persona);

persona.restarVida(1000000);

console.log(persona);
console.log(persona.esAntiPersona());

if (persona.esAntiPersona()) {
  console.log("Explosiooon !!!!");
}

const array = [1, 2, 5, 6, 6, 8, 9];

const arrayDeObjetos = [
  { nombre: "jose" },
  { nombre: "michael" },
  { nombre: "John Dutton" },
  { nombre: "Pepe triste" },
];

arrayDeObjetos.forEach((persona) => {
  console.log(persona);
});

console.log(arrayDeObjetos.splice(0,2))

const words = ["Palabra1","palabra2","Palabramuylarga"]
const result = words.filter((word) => word == words[0]);
console.log(result)