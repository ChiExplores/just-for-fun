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
  frameRate(30);

  // Create a video capture (aka webcam input)
  // video = createCapture(VIDEO);

  // Specify the resolution of the webcam input (too high and you may notice performance issues, especially if you're extracting info from it or adding filters)
  // video.size(640, 480);

  // In some browsers, you may notice that a second video appears onscreen! That's because p5js actually creates a <video> html element, which then is piped into the canvas – the added command below ensures we don't see it :)
  // video.hide();


  // hawaiian texts




  //TODO create list of 6 items and loop through each word and randomly place them on screen 
  // create an array of maps of items
  // each item has random x,y to save 
  // once the item reached the bottom, reset word 

  // Draw a vertical line.
  strokeWeight(0.5);
  line(50, 0, 50, 100);


  // Top line.
  textSize(16);
  text('ABCD', 50, 30);

  circle(window.windowWidth, window.windowHeight, 50);

}

function draw() {
  background(200);

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




