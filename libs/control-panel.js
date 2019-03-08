import GameMap from './game-map.js'
import {BulletStore} from './bullet.js'
import {TankStore} from './tank-store.js'
import {MapInfo} from "./map-info.js"
import {isUndefined} from "./utils.js"

let gameState = false;
let handle;

export let ControlPanel = {
  init() {
    document.querySelector("#start").addEventListener("click", () => {
      if (gameState) {
        stop();
        this.destroyKeyboardEvent();
      } else {
        start();
        this.initKeyboardEvent();
      }
      gameState = !gameState;
    });
  },
  initKeyboardEvent() {
    document.addEventListener("keydown", keydownEvent);
    document.addEventListener("keyup", keyupEvent);
  },
  destroyKeyboardEvent() {
    document.removeEventListener("keydown", keydownEvent);
    document.removeEventListener("keyup", keyupEvent);
  }
};

function start() {
  handle = requestAnimationFrame(renderFrame);
}

function renderFrame() {
  MapInfo.update();
  BulletStore.update();
  TankStore.update();
  GameMap.render();
  handle = requestAnimationFrame(renderFrame);
}

function stop() {
  cancelAnimationFrame(handle);
}

function keydownEvent(event) {
  event.preventDefault();
  keyboardEvent("positive", event.keyCode);
}

function keyupEvent(event) {
  event.preventDefault();
  keyboardEvent("negetive", event.keyCode);
}

function keyboardEvent(stage, keycode) {
  let player0 = window.CONFIG.controlPanel.player0;
  let player1 = window.CONFIG.controlPanel.player1;
  let direction, playerIndex, eventType;
  switch(keycode) {
    case player0.up: eventType = "move"; direction = 0; playerIndex = 0; break;
    case player0.down: eventType = "move"; direction = 2; playerIndex = 0; break;
    case player0.left: eventType = "move"; direction = 3; playerIndex = 0; break;
    case player0.right: eventType = "move"; direction = 1; playerIndex = 0; break;
    case player0.fire: eventType = "fire"; playerIndex = 0; break;
    case player1.up: eventType = "move"; direction = 0; playerIndex = 1; break;
    case player1.down: eventType = "move"; direction = 2; playerIndex = 1; break;
    case player1.left: eventType = "move"; direction = 3; playerIndex = 1; break;
    case player1.right: eventType = "move"; direction = 1; playerIndex = 1; break;
    case player1.fire: eventType = "fire"; playerIndex = 1; break;
    default: break;
  }

  let playerHandle = null;
  if (isUndefined(playerIndex) || isUndefined(TankStore["player" + playerIndex])) {
    return false;
  } else {
    playerHandle = TankStore["player" + playerIndex];
  }

  // fire
  if (eventType === "fire") {
    fire(playerHandle, stage);
  } else if (eventType === "move") {
    // movement
    move(playerHandle, direction, stage);
  }
}

function fire(handle, stage) {
  if (stage === "positive") {
    handle.fire();
  }
}

function move(handle, direction, stage) {
  if (isUndefined(direction)) {
    return false;
  }
  if (stage === "positive") {
    handle.changeDirection(direction);
    handle.move(true);
  } else {
    handle.move(false);
  }
}