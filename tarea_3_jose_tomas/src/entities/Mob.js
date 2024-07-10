const Entity = require('./Entity')

class Mob extends Entity {
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

  module.exports = Mob;