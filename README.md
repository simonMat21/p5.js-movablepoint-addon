# p5.js movablePoints Addon

A p5.js addon that provides interactive, draggable points that can be used to control geometric shapes and objects. Perfect for interactive geometry visualizations, constraint-based drawing, and interactive design tools.

![Example 1](images/example-1.gif)
![Example 2](images/example-2.gif)

## Features

- **MovablePoint Class** - Create draggable points with a simple, intuitive API
- **checkClicked() Function** - Easily handle mouse interactions for multiple points
- **Collision Detection** - Built-in support for detecting overlaps between objects
- **Per-sketch Drag State** - Proper state management for multiple sketches on the same page
- **Lightweight** - Minimal footprint, works seamlessly with p5.js

## Quick Start

### Create a Draggable Point

```javascript
const sketch = (p) => {
  let point;

  p.setup = function () {
    p.createCanvas(400, 400);
    point = new p5.MovablePoint(200, 200, 15);
  };

  p.draw = function () {
    p.background(220);

    // Handle drag interactions
    p.checkClicked([point]);

    // Draw the point
    const [x, y] = point.getPosition();
    p.circle(x, y, 30);
  };
};

new p5(sketch);
```

## API Reference

### MovablePoint

Creates an interactive point that can be dragged with the mouse.

```javascript
const point = new p5.MovablePoint(startX, StartY, clickableRadius);
```

**Parameters:**

- `x` (number) - Initial x position default is 0
- `y` (number) - Initial y position default is 0
- `clickableRadius` (number) - Click radius for interaction (default: 10)

**Methods:**

#### getPosition()

Returns the current position of the point as `[x, y]`.

```javascript
const [x, y] = point.getPosition();
```

#### changePosition(x, y)

Programmatically move the point to a new position.

```javascript
point.changePosition(100, 200);
```

**Properties:**

- `x` (number) - Current x coordinate
- `y` (number) - Current y coordinate
- `clicked` (boolean) - Whether the point is currently being dragged
- `clickableR` (number) - The radius within which the point can be clicked

### checkClicked()

Handles mouse interaction for an array of points.

```javascript
p.checkClicked(pointsArray);
```

**Parameters:**

- `pointsArray` (Array) - Array of MovablePoint objects to check

This function:

- Detects when the mouse is pressed within a point's clickable radius
- Updates each point's `clicked` property and position while dragging
- Handles multiple points intelligently (only one can be dragged at a time)

## Examples

### Example 1: Interactive Triangle

Drag the three corner points to reshape the triangle.

```javascript
const sketch = (p) => {
  let points = [];

  p.setup = function () {
    p.createCanvas(400, 400);
    points = [
      new p5.MovablePoint(100, 100, 12),
      new p5.MovablePoint(300, 100, 12),
      new p5.MovablePoint(200, 300, 12),
    ];
  };

  p.draw = function () {
    p.background(220);
    p.checkClicked(points);

    const [x1, y1] = points[0].getPosition();
    const [x2, y2] = points[1].getPosition();
    const [x3, y3] = points[2].getPosition();

    p.stroke(0);
    p.line(x1, y1, x2, y2);
    p.line(x2, y2, x3, y3);
    p.line(x3, y3, x1, y1);

    p.fill(255);
    for (let pt of points) {
      const [x, y] = pt.getPosition();
      p.circle(x, y, 24);
    }
  };
};

new p5(sketch);
```

### Example 2: Colliding Boxes

Two boxes that can be dragged and push each other apart on collision.

See `examples/example-3/` for a complete implementation with collision detection and resolution.

## Building from Source

```bash
# Install dependencies
npm install

# Build the addon
npm run build

# Output files
# - dist/movablePoints.min.js (IIFE format for browser)
# - dist/movablePoints.esm.js (ESM format for imports)
```

## Browser Support

Works with all modern browsers that support:

- ES6 Classes
- WeakMap
- Arrow Functions

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit pull requests or issues.

## See Also

- [p5.js Documentation](https://p5js.org/)
- [p5.js Addon Development Guide](https://beta.p5js.org/contribute/creating_libraries/)
