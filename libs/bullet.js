import GameMap from './game-map.js'
import {MapInfo} from "./map-info.js"

export let BulletStore = {
  barn: {},
  init: function () {
    this.barn = {};
  },
  update: function () {
    for (let key in this.barn) {
      this.barn[key].update();
    }
  },
  add: function (uuid, item) {
    this.barn[uuid] = item;
  },
  render: function () {
  },
  delete: function (uuid) {
    delete this.barn[uuid];
  }
};

export class Bullet {
  constructor(direction, power, position, owner) {
    this.speed = window.CONFIG.bulletSpeed;
    this.shape = [[0, 0], [2, 0], [2, 2], [0, 2]];
    this.direction = direction;
    this.power = power;
    this.owner = owner;

    this.position = position;
    this.uuid = new Date().getTime().toString() + Math.random().toString();
    GameMap.update(this.uuid, this.position, this.shape);
  }

  update() {
    let key = (this.direction + 1) % 2;
    let symbol = [2 - this.direction, 1 - this.direction];
    this.position[(this.direction + 1) % 2] += this.speed * symbol[key];
    if (this.position[0] > window.CONFIG.gameMapWidth || this.position[0] < 0
      || this.position[1] > window.CONFIG.gameMapHeight || this.position[1] < 0
      || this.judgeHit()) {
      this.destroy();
      return false;
    }
    GameMap.update(this.uuid, this.position, this.shape);
  }

  // judge if the bullet hit something
  judgeHit() {
    let x = Math.round(this.position[0]);
    let y = Math.round(this.position[1]);
    if (MapInfo.reliefMap[x] && MapInfo.reliefMap[x][y] && MapInfo.reliefMap[x][y].exit) {
      this.destroy();
      MapInfo.reliefMap[x][y].belongTo.destroy();
      return true;
    }
    return false;
  }

  destroy() {
    GameMap.destroy(this.uuid);
    BulletStore.delete(this.uuid);
  }
}