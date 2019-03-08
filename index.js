import {BulletStore} from './libs/bullet.js'
import {TankStore} from './libs/tank-store.js'
import {ControlPanel} from './libs/control-panel.js'
import {MapInfo} from "./libs/map-info.js"
import GameMap from './libs/game-map.js'

document.addEventListener("DOMContentLoaded", () => {
  init();
})

function init() {
  fetch("./config.json").then(response => {
    return response.json();
  }).then(data => {
    window.CONFIG = data;
    MapInfo.init();
    BulletStore.init();
    TankStore.init();
    GameMap.init();
    ControlPanel.init();
  })
}


