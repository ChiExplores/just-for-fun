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

let fontRegular;
function preload() {
  fontRegular = loadFont('/../assets/PlaypenSans-Regular.ttf');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(30);
}

function draw() {
  background(500);

  textFont(fontRegular);
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
