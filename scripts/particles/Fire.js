/**
 * Adapted from https://editor.p5js.org/TheSketchyGuy/sketches/t0TbA9KDA
 */

let fire = [];
let bugs = [];

class Fire {
  constructor(x, y) {
    this.x = random(width * 0.25, width * 0.75);
    this.y = random(height * 0.25, height * 0.75);
  }

  move() {
    this.x += random(-5, 5);
    this.y -= random(1, 3);
  }
}

class Bug {
  constructor(tempX, tempY, tempR) {
    this.x = tempX;
    this.y = tempY;
    this.radius = tempR;

    // pick a random color
    this.color = color(255);
    let r = random(3);
    if (r < 1) {
      this.color = color(255, 100, 20, 50); // orange
    } else if (r >= 1 && r < 2) {
      this.color = color(255, 200, 10, 50); // yellow
    } else if (r >= 2) {
      this.color = color(255, 80, 5, 50); // reddish
    }
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.radius);
  }

  move() {
    this.x += random(-5, 5);
    this.y += random(-5, 5);
  }

  shrink() {
    // shrink size over time
    this.radius -= 0.4;
  }
}

function drawFire() {
  // loop through all the bugs (fire particles)
  for (let i = 0; i < fire.length; i++) {
    for (let j = bugs.length - 1; j >= 0; j--) {
      bugs[j].move();
      bugs[j].show();
      bugs[j].shrink();

      if (bugs[j].radius <= 0) {
        bugs.splice(j, 1); // Remove dead ones
      }
    }

    // Generate fire particles based on roast level
    let x = fire[i].x;
    let y = fire[i].y;
    fire[i].move();

    let b = new Bug(x, y, random(40, 80));
    let c = new Bug(x, y, random(30, 90));
    bugs.push(b);
    bugs.push(c);
  }
}

function setupFire() {
  // Setup fire counts
  for (var i = 0; i < NUM_FIRE; i++) {
    fire[i] = new Fire(random(0, width), random(0, height));
  }
}
