import {TankStore} from './tank-store.js'
import {Tank} from "./tank.js"
import {merge} from "./utils.js"

class Player {
  constructor(position = [0, 0], type = "common", index = 0) {
    let opt = {};
    merge(opt, window.CONFIG.robotType[type]);
    merge(opt, {
      position: position,
      direction: 0
    });
    this.type = type;
    this.index = index;
    this.tank = new Tank(
      opt.shapes[0],
      opt.position,
      opt.speed,
      opt.direction,
      opt.armor,
      opt.firePower,
      opt.gunPositions[0],
      opt.detectRanges[0],
      this
    );
    this.uuid = this.tank.uuid;
    this.chance = window.CONFIG.playChance[index];
    this.bDestroy = false;
    console.log(this);
  }

  update() {
    if (!this.bDestroy) {
      this.tank.update();
    } else {
      this.tank.showDestroy();
    }
  }

  changeDirection(direction) {
    this.tank.switch("direction", direction);
    this.tank.switch("shape", window.CONFIG.robotType[this.type].shapes[direction]);
    this.tank.switch("detectRange", window.CONFIG.robotType[this.type].detectRanges[direction]);
    this.tank.switch("gunPosition", window.CONFIG.robotType[this.type].gunPositions[direction]);
  }

  move(bol) {
    this.tank.switch("move", bol);
  }

  fire() {
    this.tank.fire();
  }

  destroy() {
    this.bDestroy = true;
    let self = this;
    setTimeout(function () {
      self.bDestroy = false;
      if (self.chance > 0) {
        self.chance--;
        self.reborn();
      } else {
        self.tank.destroy();
        TankStore.delete(this.uuid, this.index);
        self.tank.showDestroy("clear");
      }
    }, window.CONFIG.rebornTime);
    return false;
  }

  reborn() {
    this.tank.update("reborn");
  }
}

export {Player}