//Se usa la libreria prompt-sync para convertir prompt a texto
const ps = require("prompt-sync");
const prompt = ps();

//Se crean objetos para cada pokemon, sus estadisticas y funciones
const charmander = {
    maxHP: 8,
    currentHP: 8,
    spAtk: 4,
    Atk: 5,
    Def: 6,
    spDef: 4,
    name: "Charmander",
    moves: ["1. Gru�ido", "2. Ascuas", "3. Ara�azo"],
    moveType: ["Normal", "Fuego", "Normal"],
    moveCAT: ["S", "SP", "M"],
    getMove: function(move){
        return [this.moves[move],this.moveType[move],this.moveCAT[move]];
    },
    getDefStats: function(){
        return [this.currentHP, this.Def, this.spDef, this.type]
    },
    getAtkStats: function(){
        return [this.Atk, this.spAtk, this.type]
    },
    reduceDef: function(){
        return this.Def -= Math.round(this.Def/4)
    },
    reduceHealth: function(damage){
        console.log("Se ha hecho ",damage," da�o.")
        console.log("La vida de",this.name,"es",this.currentHP - damage)
        if (this.currentHP-damage <1){
            console.log(this.name,"se ha desmayado!")
            return this.currentHP = 0
        }
        return this.currentHP -= damage
    },
    type: "Fuego"
}
const Squirtle = {
    maxHP: 10,
    currentHP: 10,
    spAtk: 4,
    Atk: 3,
    Def: 7,
    spDef: 6,
    name: "Squirtle",
    moves: ["1. Placaje", "2. Latigo", "3. PistolaAgua"],
    moveType: ["Normal", "Normal", "Agua"],
    moveCAT: ["M", "S", "SP"],
    getMove: function(move){
        return [this.moves[move],this.moveType[move],this.moveCAT[move]];
    },
    getDefStats: function(){
        return [this.currentHP, this.Def, this.spDef, this.type]
    },
    getAtkStats: function(){
        return [this.Atk, this.spAtk, this.type]
    },
    reduceDef: function(){
        return this.Def -= Math.round(this.Def/4)
    },
    reduceHealth: function(damage){
        console.log("Se ha hecho ",damage," da�o.")
        console.log("La vida de",this.name,"es",this.currentHP - damage)
        if (this.currentHP-damage <1){
            console.log(this.name,"se ha desmayado!")
            return this.currentHP = 0
        }
        return this.currentHP -= damage
    },
    type: "Agua"
}
const Bulbasaur = {
    maxHP: 9,
    currentHP: 9,
    spAtk: 4,
    Atk: 2,
    Def: 6,
    spDef: 6,
    name: "Bulbasaur",
    moves: ["1. Placaje", "2. Latigo", "3. LatigoCepa"],
    moveType: ["Normal", "Normal", "Planta"],
    moveCAT: ["M", "S", "SP"],
    getMove: function(move){
        return [this.moves[move],this.moveType[move],this.moveCAT[move]];
    },
    getDefStats: function(){
        return [this.currentHP, this.Def, this.spDef, this.type]
    },
    getAtkStats: function(){
        return [this.Atk, this.spAtk, this.type]
    },
    reduceDef: function(){
        return this.Def -= Math.round(this.Def/4)
    },
    reduceHealth: function(damage){
        console.log("Se ha hecho ",damage," da�o.")
        console.log("La vida de",this.name,"es",this.currentHP - damage)
        if (this.currentHP-damage <1){
            console.log(this.name,"se ha desmayado!")
            return this.currentHP = 0
        }
        return this.currentHP -= damage
    },
    type: "Planta"
}

//Se crean variables para la funcion Usemove()
var rnd
var dmg


const getDamageByTypes = ({MoveStats,EnemyStats,dmg=10}) =>{

    if(MoveStats[1] == EnemyStats[3]){
        dmg /= 2
        console.log("No es muy efectivo...")
    } else if (MoveStats[1] == "Planta" && EnemyStats[3] == "Agua"){
        dmg *= 2
        console.log("Es super efectivo!")
    } else if(MoveStats[1] == "Planta" && EnemyStats[3] == "Fuego"){
        dmg /= 2
        console.log("No es muy efectivo...")
    } else if (MoveStats[1] == "Agua" && EnemyStats[3] == "Fuego"){
        dmg *= 2
        console.log("Es super efectivo!")
    } else if (MoveStats[1] == "Agua" && EnemyStats[3] == "Planta"){
        dmg /= 2
        console.log("No es muy efectivo...")
    } else if (MoveStats[1] == "Fuego" && EnemyStats[3] == "Planta"){
        dmg *= 2
        console.log("Es super efectivo!")
    } else if (MoveStats[1] == "Fuego" && EnemyStats[3] == "Agua"){
        dmg /= 2
        console.log("No es muy efectivo...")
    }
    return dmg
}
const Usemove = function(move, pokemon, enemy){
    //Usamos las funciones en los objetos para obtener las estadisticas que necesitamos
    MoveStats = pokemon.getMove(move-1)
    EnemyStats = enemy.getDefStats()
    PokemonStats = pokemon.getAtkStats()

    //Creamos un numero al azar del 85 al 100 para que el da�o hecho varie
    rnd = (100 - Math.floor(Math.random() * 16))/100

    //Si el movimiento es de soporte baja la defensa
    if (MoveStats[2] == "S")
    {
        enemy.reduceDef()
        console.log("El movimiento ha bajado la defensa al enemigo")
    }
    //Dependiendo del CAT. (categoria) usa el ataque cuerpo a cuerpo o especial para calcular el da�o
    else if (MoveStats[2] == "M") {
        dmg = (4 * PokemonStats[0] * 40 / EnemyStats[1])/50 + 2 * rnd / 2
    } else if (MoveStats[2] == "SP"){
        dmg = (4 * PokemonStats[1] * 40 / EnemyStats[2])/50 + 2 * rnd / 2
    }
    
    //Si el movimiento usado es del mismo tipo que el pokemon se a�ade un 50% mas de da�o
    if (MoveStats[1] == PokemonStats[2]){
        dmg *= 1.5
    }
    //Aca se calcula la tabla de tipos
   dmg = getDamageByTypes({MoveStats,EnemyStats,dmg});
    //Se baja un poco el da�o para que no llegue a niveles tan altos
    dmg /= 2
    //Si no es un movimiento de soporte se usa el valor de da�o (dmg)
    if (MoveStats[2] != "S") {
        //Se reduce la vida y se menciona en la consola
        console.log(pokemon.name,"Ha usado", MoveStats[0],"!")
        dmg = Math.floor(dmg) + 1
        enemy.reduceHealth(dmg)
    }
}


// Se elige el primer pokemon
var electedpokemon1 = prompt("Cual pokemon elegira el primer jugador? \n1.) Charmander\n2.) Squirtle\n3.) Bulbasaur\n")
while (electedpokemon1 != 1 && electedpokemon1 != 2 && electedpokemon1 != 3)
{
    electedpokemon1 = prompt("Responde bien (con el numero)! \nCual pokemon elegira el primer jugador? \n1.) Charmander\n2.) Squirtle\n3.) Bulbasaur\n")
}


if (electedpokemon1 == 1)
{
    electedpokemon1 = charmander
}
else if (electedpokemon1 == 2)
{
    electedpokemon1 = Squirtle
}
else
{
    electedpokemon1 = Bulbasaur
}

var electedpokemon2 = prompt("Cual pokemon elegira el segundo jugador? \n1.) Charmander\n2.) Squirtle\n3.) Bulbasaur\n")
while (electedpokemon2 != 1 && electedpokemon2 != 2 && electedpokemon2 != 3){
    electedpokemon2 = prompt("Responde bien (con el numero)! \nCual pokemon elegira el primer jugador? \n1.) Charmander\n2.) Squirtle\n3.) Bulbasaur\n")
}
if (electedpokemon2 == 1)
{
    electedpokemon2 = charmander
}
else if (electedpokemon2 == 2)
{
    electedpokemon2 = Squirtle
}
else
{
    electedpokemon2 = Bulbasaur
}
console.log(electedpokemon1.name," es el primer pokemon y ", electedpokemon2.name, " el segundo.")

//Se inicia la batalla por turno
var atacante = electedpokemon1
var defensor = electedpokemon2
var ataqueelegido
while (electedpokemon1.currentHP > 0 && electedpokemon2.currentHP > 0){
    console.log("Cual ataque usara",atacante.name,"",atacante.moves)
    ataqueelegido = prompt("\n")
    if (ataqueelegido != 1 && ataqueelegido != 2 && ataqueelegido != 3){
        ataqueelegido = prompt("Pon uno de los numeros!\n")
    }   
    Usemove(ataqueelegido, atacante, defensor)
    if (defensor.currentHP > 0 && defensor == electedpokemon1) 
    {
        atacante = electedpokemon1
        defensor = electedpokemon2
    } 
    else if (defensor.currentHP > 0 && defensor == electedpokemon2)
    {
        atacante = electedpokemon2
        defensor = electedpokemon1 
    }
}
console.log("La batalla ha terminado!")
console.log(atacante.name,"ha ganado la partida!")