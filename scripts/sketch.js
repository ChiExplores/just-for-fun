let fontStyle;

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const TIME_BUFFER = 100;
const HAWAIIAN_WORDS = setCoordinates([
  {
    hawaiian: "wai",
    english: "water",
    playAnimation: () => {},
  },
  {
    hawaiian: "ahi",
    english: "fire",
    playAnimation: () => {},
  },
  {
    hawaiian: "iʻa",
    english: "fish",
    playAnimation: drawFish,
  },
  {
    hawaiian: "manu",
    english: "bird",
    playAnimation: () => {},
  },
  {
    hawaiian: "pua",
    english: "flower",
    playAnimation: () => {},
  },
  {
    hawaiian: "moana",
    english: "flower",
    playAnimation: () => {},
  },
]);
const WORD_WIDTH_BUFFER = 50;
const WORD_HEIGHT_BUFFER = 50;
const NUM_FISH = 11;

function preload() {
  fontStyle = loadFont("assets/PlaypenSans-Regular.ttf");
}

function setup() {
  let canvas = createCanvas(WIDTH, HEIGHT);
  canvas.position(0, 45);
  frameRate(30);
  textFont(fontStyle, 20);

  // Setup fish counts
  setupFish()
}

let faceX = 0;
let faceY = 0;

function draw() {
  background(500);
  circle(faceX, faceY, 10);

  // Display hawaiian words on canvas
  HAWAIIAN_WORDS.forEach((word) => {
    push();
    rect(word.wordX, word.wordY - WORD_HEIGHT_BUFFER, WORD_WIDTH_BUFFER, 2* WORD_HEIGHT_BUFFER);
    if (!word.clicked) {
      text(word.hawaiian, word.wordX, word.wordY);
    } else {
      if (word.timer <= 0) {
        word.clicked = false;
      } else {
        word.timer -= 1;
      }
      word.playAnimation();
      console.log("SHOW PARTICLE EFFECT HERE FOR", word.hawaiian);
    }

    word.wordY += word.fallingRate;
    if (word.wordY >= HEIGHT) {
      word.wordY = 0;
      word.wordX = getRandomInt(0, WIDTH);
    }
    pop();
  });
}

function mouseClicked() {
  HAWAIIAN_WORDS.forEach((word) => {
    if (isWordInBounds(word)) {
      word.clicked = true;
      word.timer = TIME_BUFFER;
      word.descriptionX = word.wordX;
      word.descriptionY = word.wordY;
      word.wordY = -100;
      word.wordX = getRandomInt(0, window.innerWidth);
    }
  });
}

/** HELPER FUNCTIONS **/
function setCoordinates(data) {
  return data.map((datum) => ({
    ...datum,
    wordX: getRandomInt(0, WIDTH),
    wordY: getRandomInt(-200, 0),
    fallingRate: getRandomInt(1, 3),
    animX: 0,
    animY: 0,
    timer: TIME_BUFFER,
    clicked: false,
  }));
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function isWordInBounds(word) {
  return (
    word.wordX <= mouseX &&
    word.wordX + WORD_WIDTH_BUFFER >= mouseX &&
    mouseY >= word.wordY - WORD_HEIGHT_BUFFER &&
    mouseY <= word.wordY + WORD_HEIGHT_BUFFER
  );
}
