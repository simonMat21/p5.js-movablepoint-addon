const dragStateByInstance = new WeakMap();

function getDragState(instance) {
  let state = dragStateByInstance.get(instance);

  if (state == null) {
    state = { taken: null };
    dragStateByInstance.set(instance, state);
  }

  return state;
}

export function movablePoint(p5, fn, lifecycles) {
  // This function will run **before** the `setup()` function of a sketch
  lifecycles.presetup = function () {};
  // This function will run **after** the `setup()` function of a sketch
  lifecycles.postsetup = function () {};
  // This function will run **before** each run of the `draw()` function of a sketch
  lifecycles.predraw = function () {};
  // This function will run **after** each run of the `draw()` function of a sketch
  lifecycles.postdraw = function () {};
  // This function will run when the sketch is removed
  lifecycles.remove = function () {};

  class MovablePoint {
    constructor(startX = 0, startY = 0, clickableRadious = 10) {
      this.x = startX;
      this.y = startY;
      this.clickableR = clickableRadious;
      this.clicked = false;
    }

    getPosition() {
      return [this.x, this.y];
    }

    changePosition(x = this.x, y = this.y) {
      this.x = x;
      this.y = y;
    }
  }

  // This class will be available in a sketch as `new p5.MovablePoint(p)`
  p5.MovablePoint = MovablePoint;

  // This variable will be available in a sketch as `myAddonVariable`
  fn.myAddonVariable = "some value";
  // This function will be available in the sketch as `drawSomething`
  fn.drawSomething = function () {};
  // This is an asynchronous function: for example, `await loadSomething()`
  fn.loadSomething = async function () {};

  // Drag any array of objects that expose x, y, clickableR, and clicked.
  fn.checkClicked = function (points) {
    const dragState = getDragState(this);

    for (const point of points) {
      if (dragState.taken === point || dragState.taken == null) {
        const distance = this.dist(this.mouseX, this.mouseY, point.x, point.y);

        if (this.mouseIsPressed) {
          if (distance < point.clickableR) {
            point.clicked = true;
            dragState.taken = point;
          }
        } else {
          point.clicked = false;
          dragState.taken = null;
        }

        if (point.clicked) {
          point.x = this.mouseX;
          point.y = this.mouseY;
        }
      }
    }
  };
}

if (typeof p5 !== "undefined") {
  p5.registerAddon(movablePoint);
}
