import {Tank} from "./tank.js"
import {merge} from "./utils.js"

class Robot {
  constructor(robotType) {
    let opt = window.CONFIG.robotType[robotType];
    merge(opt, {
      position: [1, 1],
      direction: 1
    })
    this.tank = new Tank(
      opt.shapes[0],
      opt.position,
      opt.speed,
      opt.direction,
      opt.armor,
      opt.firePower,
    );
  }

  update() {
    this.tank.update();
  }
}

export {Robot}