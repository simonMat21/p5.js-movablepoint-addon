const sketch = function (p) {
  class DraggableBox {
    constructor(p, centerX, centerY, w, h, color) {
      this.p = p;
      this.point = new p5.MovablePoint(centerX, centerY, 12);
      this.w = w;
      this.h = h;
      this.color = color;
    }

    getPosition() {
      return this.point.getPosition();
    }

    setPosition(x, y) {
      this.point.changePosition(x, y);
    }

    display() {
      const [x, y] = this.getPosition();
      this.p.push();
      this.p.rectMode(this.p.CENTER);
      this.p.fill(this.color);
      this.p.stroke(0);
      this.p.strokeWeight(2);
      this.p.rect(x, y, this.w, this.h);
      this.p.fill(0);
      this.p.circle(x, y, 8);
      this.p.pop();
    }

    getBounds() {
      const [x, y] = this.getPosition();
      return {
        left: x - this.w / 2,
        right: x + this.w / 2,
        top: y - this.h / 2,
        bottom: y + this.h / 2,
        centerX: x,
        centerY: y,
      };
    }
  }

  function checkCollision(box1, box2) {
    const b1 = box1.getBounds();
    const b2 = box2.getBounds();

    const overlapX = b1.right > b2.left && b1.left < b2.right;
    const overlapY = b1.bottom > b2.top && b1.top < b2.bottom;

    return overlapX && overlapY;
  }

  function resolveCollision(box1, box2) {
    const b1 = box1.getBounds();
    const b2 = box2.getBounds();

    // Calculate overlap distances
    const overlapLeft = b1.right - b2.left;
    const overlapRight = b2.right - b1.left;
    const overlapTop = b1.bottom - b2.top;
    const overlapBottom = b2.bottom - b1.top;

    // Find minimum overlap
    const minOverlap = Math.min(
      overlapLeft,
      overlapRight,
      overlapTop,
      overlapBottom,
    );

    // Push boxes apart based on minimum overlap direction
    const pushDistance = minOverlap / 2 + 1;

    if (minOverlap === overlapLeft) {
      // box1 is to the left, push left
      box1.setPosition(b1.centerX - pushDistance, b1.centerY);
      box2.setPosition(b2.centerX + pushDistance, b2.centerY);
    } else if (minOverlap === overlapRight) {
      // box1 is to the right, push right
      box1.setPosition(b1.centerX + pushDistance, b1.centerY);
      box2.setPosition(b2.centerX - pushDistance, b2.centerY);
    } else if (minOverlap === overlapTop) {
      // box1 is on top, push up
      box1.setPosition(b1.centerX, b1.centerY - pushDistance);
      box2.setPosition(b2.centerX, b2.centerY + pushDistance);
    } else {
      // box1 is on bottom, push down
      box1.setPosition(b1.centerX, b1.centerY + pushDistance);
      box2.setPosition(b2.centerX, b2.centerY - pushDistance);
    }
  }

  let box1, box2;

  p.setup = function () {
    p.createCanvas(600, 500);

    // Create two draggable boxes
    box1 = new DraggableBox(p, 150, 250, 80, 80, [100, 150, 255]); // Blue
    box2 = new DraggableBox(p, 450, 250, 80, 80, [255, 150, 100]); // Orange
  };

  p.draw = function () {
    p.background(220);

    // Display instructions
    p.fill(0);
    p.textSize(14);
    p.text(
      "Drag the boxes by their centers to move them. They will push each other!",
      20,
      30,
    );

    // Check for drag interactions
    p.checkClicked([box1.point, box2.point]);

    // Check and resolve collisions
    if (checkCollision(box1, box2)) {
      resolveCollision(box1, box2);
    }

    // Display boxes
    box1.display();
    box2.display();

    // Draw info
    p.fill(0);
    p.textSize(12);
    const [x1, y1] = box1.getPosition();
    const [x2, y2] = box2.getPosition();
    p.text(`Box 1: (${Math.round(x1)}, ${Math.round(y1)})`, 20, p.height - 40);
    p.text(`Box 2: (${Math.round(x2)}, ${Math.round(y2)})`, 20, p.height - 20);
  };
};

new p5(sketch);
