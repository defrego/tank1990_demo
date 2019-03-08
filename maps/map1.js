import {isUndefined} from '../libs/utils.js'

// let MapCords = [
//   [[100, 100], [200, 100], [200, 200], [100, 200]],
//   [[300, 200], [350, 200], [350, 250], [300, 250]],
//   [[450, 50], [600, 50], [600, 125], [450, 125]]
// ]
let arr = [
  {x: [100, 200], y: [100, 200]},
  {x: [300, 350], y: [200, 250]},
  {x: [450, 600], y: [50, 120]},
]

export let MapCords = [];
export let ReliefMap = [];

arr.forEach(cords => {
  let x = cords.x[0];
  let xmax = cords.x[1];
  let y = cords.y[0];
  let ymax = cords.y[1];
  let intervelx = 0;
  for (let i = x; i <= xmax; i++) {
    if (isUndefined(ReliefMap[i])) {
      ReliefMap[i] = [];
    }
    let intervely = 0;
    for (let j = y; j <= ymax; j++) {
      ReliefMap[i][j] = {
        exit: true,
        belongTo: {destroy: function () {
          alert("hit brick i=" + i + " , j=" + j);
        }}
      };

      if (intervelx === 0 && intervely === 0) {
        MapCords.push([[i, j], [i+15, j], [i+15, j+15], [i,j+15]]);
      }
      intervely = intervely > 13 ? 0 : (intervely+1);
    }
    intervelx = intervelx > 13 ? 0 : (intervelx+1);
  }
})
console.log(MapCords)