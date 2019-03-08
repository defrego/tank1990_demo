import {Player} from './Player.js'
import GameMap from './game-map.js'
export let TankStore = {
  barn: {},
  player0: undefined,
  player1: undefined,
  init: function () {
    this.barn = {};
    this.initPlayers(window.CONFIG.playerNum);  // init player's data
  },
  initPlayers: function (playerNum) {
    let _pos = [[1, 1], [100, 1], [200, 1]]   // debug data
    // 根据CONFIG初始化tank数据，放到tank-store和bullet中
    for (let i = 0; i < playerNum; i++) {
      let item
      if (i === 0) {
        item = new Player(_pos[i], "common", i);
      } else if (i === 1) {
        item = new Player(_pos[i], "faster", i);
      } else if (i === 2) {
        item = new Player(_pos[i], "stronger", i);
      }
      this.add(item);
      this["player" + i] = item;
    }
    console.log(this.barn);
  },
  add: function (item) {
    this.barn[item.uuid] = item;
  },
  delete: function (uuid, index) {
    this["player" + index] = undefined;
    delete this.barn[uuid];
    GameMap.destroy(uuid);
  },
  update: function () {
    for (let key in this.barn) {
      this.barn[key].update();
    }
  }
};