class Bird {
  constructor(x, y, vx, vy) {
    this.x = random(0, width);
    this.y = random(0, height);
    this.vx = random(2, 5);
    this.vy = random(-2, 2);
  }

  fly() {
    this.x += this.vx;
    this.y += this.vy;
  }

  display() {
    {
      fill(255);
      noStroke();
      triangle(
        this.x,
        this.y,
        this.x + 10,
        this.y + 22,
        this.x + 10,
        this.y - 20,
      );
      ellipse(this.x, this.y, 24, 6);
    }
  }
}

let birds = [];

function drawBird() {
  for (let i = 0; i < birds.length; i++) {
    birds[i].fly();
    birds[i].display();
  }
}

function setupBird() {
  // Setup bird counts
  for (var i = 0; i < NUM_BIRD; i++) {
    birds[i] = new Bird(random(-10, 0), random(0, height));
  }
}
