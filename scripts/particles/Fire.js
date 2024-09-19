/**
 * Adapted from https://editor.p5js.org/TheSketchyGuy/sketches/t0TbA9KDA
 */

let bugs = [];


function drawFire(mouseX, mouseY) {

  // loop through all the bugs (fire particles)
  for (let i = bugs.length - 1; i >= 0; i--) {
    bugs[i].move();
    bugs[i].show();
    bugs[i].shrink();

    if (bugs[i].radius <= 0) {
      bugs.splice(i, 1); // Remove dead ones
    }
  }

  // Generate fire particles based on roast level
  let x = mouseX;
  let y = mouseY;
  let radius;

  let b = new Bug(x, y, random(20, 40));
  let c = new Bug(x, y, random(10, 30));
  bugs.push(b);
  bugs.push(c);
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
    this.y -= random(1, 3);
  }

  shrink() {
    // shrink size over time
    this.radius -= 0.4;
  }


}