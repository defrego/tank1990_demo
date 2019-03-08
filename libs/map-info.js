import {isUndefined} from "./utils.js"
import GameMap from './game-map.js'
import {MapCords, ReliefMap} from '../maps/map1.js'

export let MapInfo = {
  reliefMap: undefined,
  uuid: undefined,
  mapCords: undefined,
  init: function () {
    // load map
    this.mapCords = [].concat(MapCords);
    this.uuid = new Date().getTime().toString() + Math.random().toString();
    this.reliefMap = [].concat(ReliefMap);
  },
  update: function () {
    GameMap.update(this.uuid, [0, 0], this.mapCords, true);
  },
  del: function (arr) {
    if (arr.length === 0) {
      return false;
    }
    let reliefMap = this.reliefMap;
    arr.forEach((item, index) => {
      item.forEach((label, key) => {
        if (label) {
          reliefMap[index][key] = undefined;
        }
      })
    })
  },
  add: function (arr) {
    if (arr.length === 0) {
      return false;
    }
    let reliefMap = this.reliefMap;
    arr.forEach((item, index) => {
      if (isUndefined(reliefMap[index])) {
        reliefMap[index] = [];
      }
      Object.assign(reliefMap[index], item);
    })
  }
}