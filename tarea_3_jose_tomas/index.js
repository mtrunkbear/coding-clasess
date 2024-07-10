const readline = require("readline");
const ps = require("prompt-sync");
const { type } = require("os");
const { isUint8ClampedArray } = require("util/types");
const prompt = ps();
var actual;
var actualWave = 1;
var killed = 0;
//Primero se crea una clase con las propiedades para cada entidad
class entity {
  constructor({ X, Y, name }) {
    this.X = X;
    this.Y = Y;
    this.name = name;
  }
}
//Esta es la lista de items posibles
const itemlist = [
  { name: "Espada", damage: 5, range: 1, useTime: 2 },
  { name: "Pistola", damage: 3, range: 3, useTime: 2 },
  { name: "Escopeta", damage: 5, range: 2, useTime: 4 },
  { name: "Francotirador", damage: 10, range: 5, useTime: 4 },
];
//Esta es la lista de mobs posibles
const mobList = [
  { name: "Zombi", damage: 2, range: 1, atackTime: 3, moveTime: 3, health: 5 },
  {
    name: "Acelerón",
    damage: 1,
    range: 1,
    atackTime: 2,
    moveTime: 1,
    health: 2,
  },
  {
    name: "Esqueleto",
    damage: 3,
    range: 3,
    atackTime: 5,
    moveTime: 5,
    health: 3,
  },
  {
    name: "Gran zombi",
    damage: 10,
    range: 1,
    atackTime: 7,
    moveTime: 6,
    health: 20,
  },
];

//Despues se crea otra que extiende a la anterior para hacer a los mobs (entidad movil)
class Mob extends entity {
  constructor({ X, Y, name, value, health }) {
    super({ X, Y, name });
    this.name = name;
    this.X = X;
    this.Y = Y;
    this.value = mobList[value];
    this.type = "mob";
    this.intervalID = null;
    this.health = health;
    this.atackCooldown = 0;
  }
  receiveDamage(damageReceived) {
    this.health -= damageReceived;
    if (this.health <= 0) {
      if (this.type == "mob") {
        mapManager.destroyMob(this.name);
      } else if (this.name == "Papo") {
        clearInterval(spawningItems);
        clearInterval(spawningMobs);
        clearInterval(printing);
        console.log("Tienes que cuidar bien de tu papo! Papo ha fallecido :(");
      }
    }
  }
  move(moveX, moveY) {
    const nextPosY = this.Y + moveY;
    const nextPosX = this.X + moveX;
    if (mapManager.mapInfo[nextPosY][nextPosX] == "") {
      this.X = nextPosX;
      this.Y = nextPosY;
      mapManager.changePos(this.X, this.Y, this.type, this.name);
    } else if (
      mapManager.map[nextPosY][nextPosX] == "✪ " &&
      this.name == "Papo"
    ) {
      this.X = nextPosX;
      this.Y = nextPosY;
      const position = mapManager.mapInfo[nextPosY][nextPosX];
      const getItem = mapManager.Items.find((item) => item.name == position);
      if (getItem) {
        getItem.pickup();
      }
      mapManager.changePos(this.X, this.Y, this.type, this.name);
    } else if (
      mapManager.mapInfo[nextPosY][nextPosX] == "Papo" &&
      this.type == "mob"
    ) {
      if (this.atackCooldown <= 0) {
        this.atackCooldown = this.value.atackTime * 60;
        Player.hitPlayer(this.value.damage);
      }
    }
  }
  shoot(range) {
    rangeX = this.X - player.X;
  }
}
//Esta entidad son los objetos que se encuentran en el suelo, ya que no se mueven se extiende directamente de entity
class item extends entity {
  constructor({ X, Y, name, value }) {
    super({ X, Y, name });
    this.X = X;
    this.Y = Y;
    this.value = itemlist[value];
    this.type = "item";
    this.name = name;
  }
  pickup() {
    const emptySlotIndex = Player.inventory.findIndex(
      (element) => element.name == "Nada"
    );
    if (emptySlotIndex !== -1) {
      Player.inventory[emptySlotIndex] = this.value;
      actual = `Has recogido el objeto ${this.value.name}.`;
      mapManager.destroyItem(this.name);
    } else {
      actual = "El inventario está lleno. No se puede recoger el objeto.";
    }
    mapManager.destroyItem(this.name); // Elimina el objeto del mapa después de recogerlo
  }
}
//Aca se crea la clase player, extendiendose de mob, la cual seria el jugador
class player extends Mob {
  constructor({ X, Y, name, health }) {
    super({ X, Y, name, health });
    this.X = X;
    this.Y = Y;
    this.name = name;
    this.health = health;
    this.inventory = [
      { name: "Puño", damage: 2, range: 1, useTime: 1 },
      { name: "Nada", damage: 0 },
      { name: "Nada", damage: 0 },
      { name: "Nada", damage: 0 },
      { name: "Nada", damage: 0 },
      { name: "Nada", damage: 0 },
    ];
    this.inHand = this.inventory[0];
    this.type = "player";
    this.damage = this.inHand.damage;
    this.weaponcooldown = 0;
  }
  atack(where) {
    if (this.weaponcooldown <= 0) {
      this.weaponcooldown = this.inHand.useTime * 70;
      let atackRange = this.inHand.range;
      if (this.inHand.name == "Espada" || this.inHand.name == "Escopeta") {
        for (let y = this.Y - atackRange; y < this.Y + atackRange + 1; y++) {
          for (let x = this.X - atackRange; x < this.X + atackRange + 1; x++) {
            if (y >= 0 && y <= 9 && x >= 0 && x <= 9) {
              let currentPlace = mapManager.mapInfo[y][x];
              let hasMob = mapManager.mobs.findIndex(
                (item) => item.name == currentPlace
              );
              mapManager.map[y][x] = "◚◚";
              console.clear();
              console.log("\n");
              for (let i = 0; i < 10; i++) {
                console.log(mapManager.map[i].join("."));
              }
              if (hasMob != -1) {
                let actualMob = mapManager.mobs[hasMob];
                actualMob.receiveDamage(this.inHand.damage);
              }
            }
          }
        }
      } else {
        switch (where) {
          case "up":
            for (let y = this.Y - atackRange; y < this.Y; y++) {
              if (y >= 0 && y <= 9) {
                let currentPlace = mapManager.mapInfo[y][this.X];
                let hasMob = mapManager.mobs.findIndex(
                  (item) => item.name == currentPlace
                );
                mapManager.map[y][this.X] = "◚◚";
                console.clear();
                console.log("\n");
                for (let i = 0; i < 10; i++) {
                  console.log(mapManager.map[i].join("."));
                }
                if (hasMob != -1) {
                  let actualMob = mapManager.mobs[hasMob];
                  actualMob.receiveDamage(this.inHand.damage);
                }
              }
            }
            break;
          case "down":
            for (let y = this.Y + atackRange; y > this.Y; y -= 1) {
              if (y >= 0 && y <= 9) {
                let currentPlace = mapManager.mapInfo[y][this.X];
                let hasMob = mapManager.mobs.findIndex(
                  (item) => item.name == currentPlace
                );
                mapManager.map[y][this.X] = "◚◚";
                console.clear();
                console.log("\n");
                for (let i = 0; i < 10; i++) {
                  console.log(mapManager.map[i].join("."));
                }
                if (hasMob != -1) {
                  let actualMob = mapManager.mobs[hasMob];
                  actualMob.receiveDamage(this.inHand.damage);
                }
              }
            }
            break;
          case "right":
            for (let x = this.X + atackRange; x > this.X; x -= 1) {
              if (x >= 0 && x <= 9) {
                let currentPlace = mapManager.mapInfo[this.Y][x];
                let hasMob = mapManager.mobs.findIndex(
                  (item) => item.name == currentPlace
                );
                mapManager.map[this.Y][x] = "◚◚";
                console.clear();
                console.log("\n");
                for (let i = 0; i < 10; i++) {
                  console.log(mapManager.map[i].join("."));
                }
                if (hasMob != -1) {
                  let actualMob = mapManager.mobs[hasMob];
                  actualMob.receiveDamage(this.inHand.damage);
                }
              }
            }
            break;
          case "left":
            for (let x = this.X - atackRange; x < this.X; x++) {
              if (x >= 0 && x <= 9) {
                let currentPlace = mapManager.mapInfo[this.Y][x];
                let hasMob = mapManager.mobs.findIndex(
                  (item) => item.name == currentPlace
                );
                mapManager.map[this.Y][x] = "◚◚";
                console.clear();
                console.log("\n");
                for (let i = 0; i < 10; i++) {
                  console.log(mapManager.map[i].join("."));
                }
                if (hasMob != -1) {
                  let actualMob = mapManager.mobs[hasMob];
                  actualMob.receiveDamage(this.inHand.damage);
                }
              }
            }
            break;
          case "k":
            Player.receiveDamage(10);
            console.clear();
            console.log("hola");
            break;
        }
      }
    }
  }
  hitPlayer(damagedealt) {
    this.health -= damagedealt;
    actual = "Papo ha recibido:";
    actual += damagedealt;
    actual += " daño!";
    if (this.health <= 0) {
      clearInterval(spawningItems);
      clearInterval(spawningMobs);
      clearInterval(printing);
      console.clear();
      console.log("Tienes que cuidar bien de tu papo! Papo ha fallecido :(");
    }
  }
}
const Player = new player({
  X: 5,
  Y: 5,
  name: "Papo",
  health: 20,
});
//Aca usamos la libreria ReadLine para obtener las teclas usadas por el jugador y configurar los controles
function initReadline() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  readline.emitKeypressEvents(process.stdin);
  process.stdin.setRawMode(true);

  rl.input.on("keypress", (str, key) => {
    console.log(key.name);
    switch (key.name) {
      case "w":
        Player.move(0, -1);
        break;
      case "a":
        Player.move(-1, 0);
        break;
      case "s":
        Player.move(0, 1);
        break;
      case "d":
        Player.move(1, 0);
        break;
      case "1":
        Player.inHand = Player.inventory[0];
        break;
      case "2":
        Player.inHand = Player.inventory[1];
        break;
      case "3":
        Player.inHand = Player.inventory[2];
        break;
      case "4":
        Player.inHand = Player.inventory[3];
        break;
      case "5":
        Player.inHand = Player.inventory[4];
        break;
      case "6":
        Player.inHand = Player.inventory[5];
        break;
      case "up":
        Player.atack("up");
        break;
      case "down":
        Player.atack("down");
        break;
      case "left":
        Player.atack("left");
        break;
      case "right":
        Player.atack("right");
        break;
      case "h":
        Player.hitPlayer(1);
        break;
    }
    if (key.ctrl && key.name === "c") process.exit(); // Cerrar el proceso
  });
}
initReadline();
//Despues de definir las clases y ReadLine, se trabaja en un objeto que maneja el mapa con funciones para modificar los mobs y el mapa.
const mapManager = {
  map: [
    ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ],
  mapInfo: [
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
  ],
  xtraOnPrint: [
    "Controles:",
    "W: moverse arriba",
    "A: moverse a la izquierda",
    "S: moverse abajo",
    "D: moverse a la derecha",
    "Flechitas: atacar",
    "Numeros del 1 al 6: acceder al inventario",
    " ",
    " ",
    "Recuerda: SIEMPRE cuida a tu papo",
  ],
  mobs: [],
  Items: [],
  //Se crean funciones para modificar el mapa
  //Esta funcion cambia el array mapInfo
  changePos: function (X, Y, type, name) {
    //itemIndex revisa si en la casilla actual hay algun item, esto sirve para recoger los objetos, mapInfo[Y][X] es la posicion actual en mapInfo
    const itemIndex = this.Items.findIndex(
      (item) => item.name == this.mapInfo[Y][X]
    );
    //Se hace lo mismo para los mobs
    const mobIndex = this.mobs.findIndex(
      (item) => item.name == this.mapInfo[Y][X]
    );
    //Se revisa todo mapInfo para borrar la ubicacion anterior del objeto que se cambia de posicion
    if (X >= 0 && X <= 9 && Y >= 0 && Y <= 9) {
      for (let y = 0; y < this.map.length; y++) {
        for (let x = 0; x < this.map[y].length; x++) {
          if (this.mapInfo[y][x] == name) {
            this.mapInfo[y][x] = "";
          }
        }
      }

      if (type == "player") {
        if (this.mapInfo[Y][X] == "" || itemIndex != -1) {
          this.mapInfo[Y][X] = "Papo";
          if (itemIndex != -1) {
            const itemPickup = this.Items[itemIndex];
            itemPickup.pickup();
          }
        }
      } else if (type == "mob") {
        if (this.mapInfo[Y][X] == "") {
          this.mapInfo[Y][X] = name;
        }
      } else if (type == "item") {
        if (this.mapInfo[Y][X] == "") {
          this.mapInfo[Y][X] = name;
        }
      }
    }
  },
  //Estas funciones calculan y imprimen el mapa
  renderMap() {
    for (let y = 0; y < this.map.length; y++) {
      for (let x = 0; x < this.map[y].length; x++) {
        var currentPlace = this.mapInfo[y][x];
        var mobIndex = this.mobs.findIndex((item) => item.name == currentPlace);
        var itemIndex = this.Items.findIndex(
          (item) => item.name == currentPlace
        );
        this.map[y][x] = "  "; // Espacio vacío si no hay entidad reconocida
        if (currentPlace == "Papo") {
          this.map[y][x] = "⚉ ";
        } else if (mobIndex != -1) {
          this.map[y][x] = "○ ";
        } else if (itemIndex != -1) {
          this.map[y][x] = "✪ ";
        }
      }
    }
  },
  printMap: function () {
    if (Player.weaponcooldown <= 0) {
      var c = "Puedes atacar!";
    } else {
      var c = "";
    }
    console.clear();
    var lifeVar = [, , , ,];
    for (let i = 0; i < Player.health; i++) {
      lifeVar.push("|");
    }
    this.renderMap();
    console.log(
      "Items: ✪  Mobs: ○  Player: ⚉.   Vida de papo:",
      lifeVar.join("")
    );
    console.log(
      "Inventario: ",
      Player.inventory.map((item) => item.name).join(", "),
      "."
    );
    for (let i = 0; i < this.map.length; i++) {
      console.log(this.map[i].join("."), this.xtraOnPrint[i]);
    }
    console.log(
      "En la mano: ",
      Player.inHand.name,
      ",  Daño:",
      Player.inHand.damage
    );
    if (actual) {
      console.log(actual);
    }
    console.log(
      "Enemigos exterminados por papo: ",
      killed,
      ".  Oleada actual:",
      actualWave,
      "       ",
      c
    );
    console.log("No salgas del mapa porfavor!");
  },
  //Despues se crean funciones para manejar los mobs
  //Esta funcion crea un mob
  mobCreate: function (X, Y, name, value, health) {
    this.mapInfo[Y][X] = name;
    const newMob = new Mob({ X, Y, name, value, health });
    newMob.health = mobList[value].health;
    this.mobs.push(newMob);
    this.mobAI(this.mobs.length);
  },

  //Esta lo mueve
  mobAI(mobIndex) {
    const thisMob = this.mobs[mobIndex - 1];
    thisMob.intervalID = setInterval(() => {
      if (Player.X > thisMob.X) {
        thisMob.move(1, 0);
      } else if (Player.X < thisMob.X) {
        thisMob.move(-1, 0);
      }
      if (Player.Y > thisMob.Y) {
        thisMob.move(0, 1);
      } else if (Player.Y < thisMob.Y) {
        thisMob.move(0, -1);
      }
    }, 250 * thisMob.value.moveTime);
  },
  //Esta lo MATA D:
  destroyMob: function (nameOf) {
    const thisMob = this.mobs.find((element) => element.name == nameOf);
    if (thisMob) {
      const mobY = thisMob.Y;
      const mobX = thisMob.X;
      clearInterval(thisMob.intervalID);
      this.mapInfo[mobY][mobX] = "";
      const itemIndex = this.mobs.indexOf(thisMob);
      this.mobs.splice(itemIndex, 1);
      killed++;
      switch (killed) {
        case 5:
          actualWave = 2;
          break;
        case 12:
          actualWave = 3;
          break;
        case 22:
          actualWave = 4;
          break;
        case 36:
          actualWave = 5;
          break;
        case 54:
          actualWave = 6;
          break;
        case 76:
          actualWave = 7;
          break;
        case 100:
          actualWave = 8;
          break;
        case 128:
          actualWave = 9;
          break;
        case 160:
          actualWave = 10;
          break;
        case 200:
          endgame();
          break;
      }
    }
  },

  //Despues de hacer las funciones de los mobs, hacemos lo mismo pero con los items
  itemCreate: function (X, Y, name, value) {
    this.mapInfo[Y][X] = name;
    const newItem = new item({ X, Y, name, value });
    this.Items.push(newItem);
  },
  destroyItem: function (nameOf) {
    const thisItem = this.Items.find((element) => element.name == nameOf);
    if (thisItem) {
      const itemY = thisItem.Y;
      const itemX = thisItem.X;
      this.mapInfo[itemY][itemX] = "";
      const itemIndex = this.Items.indexOf(thisItem);
      this.Items.splice(itemIndex, 1);
    }
  },
};
//Se usa un setInterval para imprimir el mapa constantemente
Player.move(-1, -1);
const printing = setInterval(() => {
  mapManager.printMap();
}, 1);
//Se usa un setInterval para generar objetos al azar cada 25 segundos
const spawningItems = setInterval(() => {
  var randomV = Math.floor(Math.random() * 20);
  var randomX = Math.floor(Math.random() * 10);
  var randomY = Math.floor(Math.random() * 10);
  if (randomV < 8) {
    randomV = 0;
  } else if (randomV < 14) {
    randomV = 1;
  } else if (randomV < 17) {
    randomV = 2;
  } else {
    randomV = 3;
  }
  var name = itemlist[randomV].name + mapManager.Items.length;
  Player.inventory.map((item) => item.name);
  if (mapManager.mapInfo[randomY][randomX] == "") {
    mapManager.itemCreate(randomX, randomY, name, randomV);
  }
}, 25000);
//Se usa otro setInterval para manejar el spawn de mobs por oleada
const spawningMobs = setInterval(() => {
  if (Math.floor(Math.random() * 10) / actualWave <= 1) {
    var randomV = Math.floor(Math.random() * 4);
    if (mapManager.mapInfo[0][0] == "") {
      mapManager.mobCreate(
        0,
        0,
        mobList[randomV].name + mapManager.mobs.length,
        randomV,
        mobList[randomV].health
      );
    }
  }
}, 500);
setInterval(() => {
  Player.weaponcooldown -= 1;
  for (let q = 0; q < mapManager.mobs.length; q++) {
    mapManager.mobs[q].atackCooldown -= 1;
  }
}, 2);
setInterval(() => {
  if (Player.health < 20) {
    Player.health++;
  }
}, 1500);
function endgame() {
  clearInterval(spawningItems);
  clearInterval(spawningMobs);
  clearInterval(printing);
  console.log(
    "Has cuidado de papo y lo has ayudado en su mision! Muchas gracias!"
  );
}
