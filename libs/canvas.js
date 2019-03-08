export var Canvas = {
  handle: null,
  borad: {},
  init: function() {
    let canvas = document.createElement("Canvas");
    canvas.setAttribute("id", "gamePanel");
    canvas.width = window.CONFIG.gameMapWidth;
    canvas.height = window.CONFIG.gameMapHeight;
    document.querySelector("#gameTable").appendChild(canvas);
    this.handle = canvas.getContext("2d");
  },
  update: function(uuid, position, shape, isMap) {
    var c;
    if (isMap) {
      c = shape.map(item => {return item});
      Object.defineProperty(c, "bMap", {
        value: isMap,
        enumerable: false
      })
    } else {
      c = shape.map(item => {
        return [item[0] + position[0], item[1] + position[1]]
      });
    }

    this.borad[uuid] = c;
  },
  render: function() {
    // 供requestAnimationFrame回调，将this.borad中的内容渲染到handle上
    this.clear();
    for (let key in this.borad) {
      let cords = this.borad[key];
      if (cords.bMap) {
        drawMap(this.handle, cords);
      } else {
        draw(this.handle, cords);
      }
    }
  },
  clear: function () {
    this.handle.clearRect(0, 0, window.CONFIG.gameMapWidth, window.CONFIG.gameMapHeight);
  },
  destroy: function (uuid) {
    delete this.borad[uuid];
  }
}

function draw(handle, cords) {
  handle.beginPath();
  handle.lineWidth = 1;
  handle.strokeStyle = "green";
  cords.forEach((_cord, index) => {
    if (index === 0) {
      // 第一个点
      handle.moveTo(_cord[0], window.CONFIG.gameMapHeight - _cord[1]);
    }
    handle.lineTo(_cord[0], window.CONFIG.gameMapHeight - _cord[1]);
  })
  handle.stroke();
}

function drawMap(handle, cords) {
  handle.fillStyle = "#f0f0f0";
  let _height, _width;
  cords.forEach((_cord, index) => {
    _width = _cord[1][0] - _cord[0][0];
    _height = _cord[3][1] - _cord[0][1];
    handle.fillRect(_cord[3][0], window.CONFIG.gameMapHeight - _cord[3][1], _width, _height);
  })
}