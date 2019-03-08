import {isUndefined} from "./utils.js"
import {Bullet, BulletStore} from "./bullet.js"
import GameMap from './game-map.js'
import {MapInfo} from "./map-info.js"

class Tank {
  constructor(
    shape = [],
    position = [0, 0],
    speed = 0,
    direction = 0,
    armor = 0,
    firePower = 0,
    gunPosition = [0, 0],
    detectRange = [],
    belongTo
  ) {
    this.shape = shape;
    this.position = position;
    this.speed = speed;         // 0.5、1
    this.direction = direction; // 0-up, 1-right, 2-down, 3-left
    this.armor = armor;         // 0-normal, 1-strong, 2-stronger
    this.firePower = firePower; // 0-normal, 1-strong, 2-stronger
    this.gunPosition = gunPosition; // gun positions
    this.detectRange = detectRange; // detect range
    this.belongTo = belongTo;

    this.move = false;           // is moving
    this.fired = false;
    this.reliefMap = [];
    this.updateReliefMap();     // update reliefMap in mapInfo
    this.uuid = new Date().getTime().toString() + Math.random().toString();
    GameMap.update(this.uuid, this.position, this.shape);
  }

  update(reborn) {
    if (!reborn && (!this.move || this.judgeCrash())) {
      return false;
    }

    let _x = this.position[0];
    let _y = this.position[1];
    if (this.direction % 2) {
      // x axis
      _x += (2 - this.direction) * this.speed;
    } else {
      // y axis
      _y += (1 - this.direction) * this.speed;
    }
    this.position = [_x, _y];
    this.updateReliefMap();     // update reliefMap in mapInfo
    GameMap.update(this.uuid, this.position, this.shape);
  }

  showDestroy(label) {
    let shape = label !== "clear" ? window.CONFIG.destroyCrash : [];
    GameMap.update(this.uuid, this.position, shape);
  }

  switch(prop, value) {
    this[prop] = value;
    if (prop === "direction" && value !== this.direction) {
      if (value === 0) {
        this.position[1] += 2;
      } else if (value === 1) {
        this.position[0] += 2;
      } else if (value === 2) {
        this.position[1] -= 2;
      } else {
        this.position[0] -= 2;
      }
    }
  }

  fire() {
    if (this.fired) {
      return false;
    }

    let bulletPos = [this.position[0] + this.gunPosition[0], this.position[1] + this.gunPosition[1]];
    let _bullet = new Bullet(this.direction, this.firePower, bulletPos, this);
    BulletStore.add(_bullet.uuid, _bullet);
    // console.log(BulletStore.barn);

    this.fired = true;
    window.setTimeout(() => { this.fired = false }, window.CONFIG.fireInterval);
  }

  judgeCrash() {
    // position和speed都是小数，导致x、y坐标都是小数
    let xStart, yStart, xEnd, yEnd;
    if (this.direction === 0) {
      xStart = Math.floor(this.position[0]);
      xEnd = Math.ceil(this.position[0] + this.detectRange[0]);
      yStart = Math.ceil(this.position[1] + this.detectRange[1] + 1);
      yEnd = Math.ceil(yStart + this.speed);
    } else if (this.direction === 1) {
      yStart = Math.floor(this.position[1]);
      yEnd = Math.ceil(this.position[1] + this.detectRange[1]);
      xStart = Math.ceil(this.position[0] + this.detectRange[0] + 1);
      xEnd = Math.ceil(xStart + this.speed);
    } else if (this.direction === 2) {
      xStart = Math.floor(this.position[0]);
      xEnd = Math.ceil(this.position[0] + this.detectRange[0]);
      yEnd = Math.floor(this.position[1] - 1);
      yStart = Math.floor(yEnd - this.speed);
    } else if (this.direction === 3) {
      yStart = Math.floor(this.position[1]);
      yEnd = Math.ceil(this.position[1] + this.detectRange[1]);
      xEnd = Math.floor(this.position[0] - 1);
      xStart = Math.floor(xEnd - this.speed);
    }

    for (let i = xStart; i <= xEnd; i++) {
      for (let j = yStart; j <= yEnd; j++) {
        if ((MapInfo.reliefMap[i] && MapInfo.reliefMap[i][j] && MapInfo.reliefMap[i][j].exit)
          || (i > window.CONFIG.gameMapWidth || i < 0)
          || (j > window.CONFIG.gameMapHeight || j < 0)) {
          return true
        }
      }
    }

    return false;
  }

  updateReliefMap() {
    let res = [];
    let imin = Math.ceil(this.position[0]);
    let jmin = Math.ceil(this.position[1]);
    let imax = Math.floor(this.position[0] + this.detectRange[0]);
    let jmax = Math.floor(this.position[1] + this.detectRange[1]);
    for (let i = imin; i < imax; i++) {
      if (isUndefined(res[i])) {
        res[i] = [];
      }
      for (let j = jmin; j < jmax; j++) {
        res[i][j] = {
          exit: true,
          belongTo: this.belongTo
        };
      }
    }

    MapInfo.del(this.reliefMap);  // delete the old info in mapInfo
    MapInfo.add(res);             // add new info
    this.reliefMap = res;         // upodate this.reliefMap
    // console.log(res);
  }

  destroy() {
    MapInfo.del(this.reliefMap);
  }
}

export {Tank}