/*
WEBCAM INPUT
Getting webcam input with p5.js is super easy! We create a variable for it, start the capture in setup(), and can display the result with the image() command! In upcoming examples, we'll also see how we can access the pixels from the webcam.

CHALLENGES
1. Can you make a grid from the video input, drawing the image a bunch of times?
*/

// Like an image, we need a variable to connect our webcam to our sketch
let video2;

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);

  // Create a video capture (aka webcam input)
  video2 = createCapture(VIDEO);

  // Specify the resolution of the webcam input (too high and you may notice performance issues, especially if you're extracting info from it or adding filters)
  video2.size(640, 480);

  // Position the canvas.
  canvas.position(500, 500);

  background(200);

  // Draw a diagonal line.
  line(0, 0, width, height);

  describe(
    "A diagonal line drawn from top-left to bottom-right on a gray background.",
  );
  // In some browsers, you may notice that a second video appears onscreen! That's because p5js actually creates a <video> html element, which then is piped into the canvas – the added command below ensures we don't see it :)
  video2.hide();
}

function draw() {
  // Display the video just like an image!
  image(video2, 0, 0);
}
