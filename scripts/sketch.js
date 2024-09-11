/*
WEBCAM INPUT
Getting webcam input with p5.js is super easy! We create a variable for it, start the capture in setup(), and can display the result with the image() command! In upcoming examples, we'll also see how we can access the pixels from the webcam.

CHALLENGES
1. Can you make a grid from the video input, drawing the image a bunch of times?
*/

// Like an image, we need a variable to connect our webcam to our sketch
let video;
let i = 0;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);

  // Create a video capture (aka webcam input)
  // video = createCapture(VIDEO);

  // Specify the resolution of the webcam input (too high and you may notice performance issues, especially if you're extracting info from it or adding filters)
  // video.size(640, 480);

  // Draw a diagonal line.
  line(0, 0, width, height);

  describe(
    "A diagonal line drawn from top-left to bottom-right on a gray background.",
  );
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


  // Bottom line.
  // textAlign(LEFT);
  text('IJKL', 50, 70);
}

function draw() {
  background(200);
  push();


  i += 1;
  text('EFGH', 100, 100 + i);
  console.log(i);
  // Display the video just like an image! 
  // image(video, 0, 0);
  pop();
}


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
