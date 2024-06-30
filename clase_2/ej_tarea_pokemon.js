const ps = require("prompt-sync");

const prompt = ps();

// Definición de los Pokémon y sus atributos
const pokemons = {
    charmander: {
        nombre: "Charmander",
        tipo: "fuego",
        vida: 100,
        poderes: [
            { nombre: "Llamarada", minDaño: 15, maxDaño: 25 },
            { nombre: "Ascuas", minDaño: 10, maxDaño: 20 },
            { nombre: "Giro Fuego", minDaño: 20, maxDaño: 30 }
        ]
    },
    squirtle: {
        nombre: "Squirtle",
        tipo: "agua",
        vida: 100,
        poderes: [
            { nombre: "Pistola Agua", minDaño: 15, maxDaño: 25 },
            { nombre: "Burbuja", minDaño: 10, maxDaño: 20 },
            { nombre: "Hidrobomba", minDaño: 20, maxDaño: 30 }
        ]
    },
    bulbasaur: {
        nombre: "Bulbasaur",
        tipo: "tierra",
        vida: 100,
        poderes: [
            { nombre: "Hoja Afilada", minDaño: 15, maxDaño: 25 },
            { nombre: "Latigazo", minDaño: 10, maxDaño: 20 },
            { nombre: "Bomba Germen", minDaño: 20, maxDaño: 30 }
        ]
    }
};

// Factores de daño según el tipo de Pokémon
const tipoVentaja = {
    fuego: { agua: 0.5, tierra: 2 },
    agua: { fuego: 2, tierra: 0.5 },
    tierra: { fuego: 0.5, agua: 2 }
};

// Función para obtener un número aleatorio dentro de un rango
function obtenerDaño(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Función para realizar el ataque
function realizarAtaque(atacante, defensor, poder) {
    let daño = obtenerDaño(poder.minDaño, poder.maxDaño);
    const ventaja = tipoVentaja[atacante.tipo][defensor.tipo] || 1;
    daño *= ventaja;
    defensor.vida -= daño;
    console.log(`${atacante.nombre} usa ${poder.nombre} y causa ${daño.toFixed(2)} puntos de daño a ${defensor.nombre}`);
    console.log(`${defensor.nombre} tiene ahora ${defensor.vida.toFixed(2)} puntos de vida.`);
}

// Función para elegir poder
function elegirPoder(poderes) {
    console.log("Elige un poder:");
    for (let i = 0; i < poderes.length; i++) {
        console.log(`${i + 1}. ${poderes[i].nombre} (Daño: ${poderes[i].minDaño}-${poderes[i].maxDaño})`);
    }
    let eleccion = parseInt(prompt("Introduce el número del poder que quieres usar: "));
    while (isNaN(eleccion) || eleccion < 1 || eleccion > poderes.length) {
        eleccion = parseInt(prompt("Elección inválida. Introduce un número válido: "));
    }
    return poderes[eleccion - 1];
}

// Elección de los Pokémon por los jugadores
const pokemonJugador1 = pokemons[prompt("Jugador 1, elige tu Pokémon (charmander, squirtle, bulbasaur): ").toLowerCase()];
const pokemonJugador2 = pokemons[prompt("Jugador 2, elige tu Pokémon (charmander, squirtle, bulbasaur): ").toLowerCase()];

console.log(`\nJugador 1 ha elegido a ${pokemonJugador1.nombre}`);
console.log(`Jugador 2 ha elegido a ${pokemonJugador2.nombre}\n`);

// Turnos del juego
let turno = 0;
while (pokemonJugador1.vida > 0 && pokemonJugador2.vida > 0) {
    console.log(`\n--- Turno ${turno + 1} ---`);

    if (turno % 2 === 0) {
        // Turno del Jugador 1
        const poder = elegirPoder(pokemonJugador1.poderes);
        realizarAtaque(pokemonJugador1, pokemonJugador2, poder);
    } else {
        // Turno del Jugador 2
        const poder = elegirPoder(pokemonJugador2.poderes);
        realizarAtaque(pokemonJugador2, pokemonJugador1, poder);
    }

    turno++;
}

// Determinar el ganador
if (pokemonJugador1.vida <= 0) {
    console.log(`\n${pokemonJugador1.nombre} ha sido derrotado. ¡Jugador 2 gana!`);
} else if (pokemonJugador2.vida <= 0) {
    console.log(`\n${pokemonJugador2.nombre} ha sido derrotado. ¡Jugador 1 gana!`);
}
