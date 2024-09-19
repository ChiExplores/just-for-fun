class Bird {
  constructor(x, y) {
    this.x = random(width * 0.25, width * 0.75);
    this.y = random(height * 0.25, height * 0.75);
  }

  fly() {
    this.x = this.x + 5;
    this.y = this.y + -2;
  }

  display() {
    {
      fill(254, 32, 32);
      stroke(254, 32, 32);
      triangle(
        this.x,
        this.y,
        this.x + 5,
        this.y + 11,
        this.x + 5,
        this.y - 10,
      );
      ellipse(this.x, this.y, 12, 3);
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
