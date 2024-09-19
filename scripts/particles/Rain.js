//Week4 icm assignment by Jingyi
//Learn how to make rain drop from https://editor.p5js.org/amandamje/sketches/ByMkKkV0
//Thanks to the help of resident Seho

let rain = [];

function setupRain() {
  for (i = 0; i < 100; i++) {
    rain[i] = new Rain(random(0, WIDTH), random(0, -3000));
  }
}

function drawRain() {
  for (i = 0; i < rain.length; i++) {
    rain[i].dropRain();
    rain[i].splash();
  }
}

function Rain(x, y) {
  this.x = x;
  this.y = y;
  //this.gravity = 9.8;
  this.length = 15;
  this.r = 0;
  this.opacity = 200;

  this.dropRain = function () {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, 3, this.length);
    this.y = this.y + 6; //+ frameCount/60;
    if (this.y > HEIGHT - WORD_HEIGHT_BUFFER) {
      this.length = this.length - 5;
    }
    if (this.length < 0) {
      this.length = 0;
    }
  };

  this.splash = function () {
    strokeWeight(2);
    //stroke(245, 200/frameCount);
    stroke(245, this.opacity);
    noFill();
    if (this.y > HEIGHT - WORD_HEIGHT_BUFFER) {
      ellipse(this.x, HEIGHT - WORD_HEIGHT_BUFFER, this.r * 2, this.r / 2);
      this.r++;
      this.opacity = this.opacity - 10;

      //keep the rain dropping
      if (this.opacity < 0) {
        this.y = random(0, -100);
        this.length = 15;
        this.r = 0;
        this.opacity = 200;
      }
    }
  };
}
