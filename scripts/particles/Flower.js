/**
 * Adapted from https://editor.p5js.org/xp2022/sketches/RbL7IANMk
 */

var yoff = 0;
let angle = 0;//put angle here!
let flowers = []; //array of flowers

function drawFlower() {

  angle += 0.021

  for (var h = 0; h < flowers.length; h++) {
    flowers[h].move();
    flowers[h].display();  //diaplay and animate the flowers
  }
}


class Flower {

  constructor(tempr) {
    this.x = random(width);
    this.y = random(height);
    this.R = tempr;
    this.vx = random(0.1);
    this.vy = random(0.1);
    this.r = random(220, 255);
    this.g = random(50, 180);
    this.b = random(120, 180);
  }

  display() {
    push();
    translate(this.x, this.y); //use tanslate to let the flower rotate aorund itself
    rotate(angle);

    beginShape(); //connect the vertexes
    var xoff = 1000;
    for (var i = 0; i < 4 * PI; i += 0.05) {

      var r = map(noise(xoff, yoff), 0, 1, this.R * 0.6, this.R * 1.4) * sin(2.4 * i);

      var x = r * cos(i);
      var y = r * sin(i);

      stroke('white');
      strokeWeight(.5);

      xoff += 0.3;

      fill(this.r, this.g, this.b, 150); //fill the color randomly

      vertex(x, y);

    }
    endShape();
    yoff += 0.005;

    pop();

  }

  move() {
    this.x += this.vx;//let the flowers move and bounce back 
    this.y += this.vy;
    if (this.x < 0 || this.x > width) {
      this.vx = this.vx * -1;
    }
    if (this.y < 0 || this.y > height) {
      this.vy = this.vy * -1;
    }
  }


}