class Player extends Mob {
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
              player.receiveDamage(10);
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

  module.exports = Player;