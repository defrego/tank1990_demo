import {Canvas} from './canvas.js'

function init() {
  Canvas.init();
}

function render() {
  Canvas.render();
}

function update(uuid, position, shape, isMap) {
  Canvas.update(uuid, position, shape, isMap);
}

function destroy(uuid) {
  Canvas.destroy(uuid);
}

export default {
  init: init,
  render: render,
  update: update,
  destroy: destroy
}