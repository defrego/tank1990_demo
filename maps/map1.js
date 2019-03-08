import {isUndefined} from '../libs/utils.js'

export let MapCords = [
  [[0, 0], [100, 0], [100, 100], [0, 100]],
  [[100, 100], [200, 100], [200, 200], [100, 200]],
  [[300, 200], [350, 200], [350, 250], [300, 250]],
  [[450, 50], [600, 50], [600, 125], [450, 125]]
]

export let ReliefMap = [];

MapCords.forEach(cords => {
  let x, y, tmp;
  let width = 0, height = 0;
  for (let i = 0; i < 3; i++) {
    tmp = cords[i];
    x = isUndefined(x) ? tmp[0] : x;
    y = isUndefined(y) ? tmp[1] : y;
    width = Math.max(width, Math.abs(tmp[0] - x));
    height = Math.max(height, Math.abs(tmp[1] - y));
    x = Math.min(x, tmp[0]);
    y = Math.min(y, tmp[1]);
  }

  let xmax = x + width;
  let ymax = y + height;
  for (let i = x; i <= xmax; i++) {
    if (isUndefined(ReliefMap[i])) {
      ReliefMap[i] = [];
    }
    for (let j = y; j <= ymax; j++) {
      ReliefMap[i][j] = {
        exit: true,
        belongTo: {destroy: function () {
          alert("hit brick i=" + i + " , j=" + j);
        }}
      };
    }
  }
})
