/*
WEBCAM INPUT
Getting webcam input with p5.js is super easy! We create a variable for it, start the capture in setup(), and can display the result with the image() command! In upcoming examples, we'll also see how we can access the pixels from the webcam.

CHALLENGES
1. Can you make a grid from the video input, drawing the image a bunch of times?
*/

// Like an image, we need a variable to connect our webcam to our sketch

function getRandomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min) + min);
}
let video;
let i = 0;
let endangeredSpecies = [
  {
    name: "O'hia",
    description: 'description of flower here',
    x: getRandomInt(window.outerWidth),
    y: 0,
    fallingRate: getRandomInt(3, 1),
  },
  {
    name: 'Akikiki',
    description: 'description of bird here',
    x: getRandomInt(window.outerWidth),
    y: 0,
    fallingRate: getRandomInt(3, 1),
  },
  {
    name: "O'hia",
    description: 'description of flower here',
    x: getRandomInt(window.outerWidth),
    y: 0,
    fallingRate: getRandomInt(3, 1),
  },
  {
    name: 'Akikiki',
    description: 'description of bird here',
    x: getRandomInt(window.outerWidth),
    y: 0,
    fallingRate: getRandomInt(3, 1),
  },
  {
    name: "O'hia",
    description: 'description of flower here',
    x: getRandomInt(window.outerWidth),
    y: -100,
    fallingRate: getRandomInt(3, 1),
  },
  {
    name: 'Akikiki',
    description: 'description of bird here',
    x: getRandomInt(window.outerWidth),
    y: -500,
    fallingRate: getRandomInt(3, 1),
  },
]


function setup() {
  createCanvas(windowWidth, windowHeight);

  frameRate(60);

  // Create a video capture (aka webcam input)
  // video = createCapture(VIDEO);

  // Specify the resolution of the webcam input (too high and you may notice performance issues, especially if you're extracting info from it or adding filters)
  // video.size(640, 480);

}

function draw() {
  // background(500);
  dotGrid();
  textFont('Courier New');
  for (let species of endangeredSpecies) {
    push();
    text(species.name, species.x, species.y);
    species.y += species.fallingRate;
    console.log(species.fallingRate);

    if (species.y >= window.innerHeight) {
      species.y = 0;
      species.x = getRandomInt(window.innerWidth);
    }

    pop();
  }

}


let xScale = 0.015;
let yScale = 0.02;
function dotGrid() {
  background(255);
  noStroke();
  fill(0);

  // Get the current gap and offset values from the sliders
  gap = 5;
  offset = 1;

  // Loop through x and y coordinates, at increments set by gap
  for (let x = gap / 2; x < width; x += gap) {
    for (let y = gap / 2; y < height; y += gap) {
      // Calculate noise value using scaled and offset coordinates
      let noiseValue = noise((x + offset) * xScale, (y + offset) * yScale);

      // Since noiseValue will be 0-1, multiply it by gap to set diameter to
      // between 0 and the size of the gap between circles
      let diameter = noiseValue * gap;
      circle(x, y, diameter);
    }
  }
}

