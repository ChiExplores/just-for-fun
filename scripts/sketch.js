let fontStyle;
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const TIME_BUFFER = 50;
const HAWAIIAN_WORDS = setCoordinates([
  {
    hawaiian: "wai",
    english: "water",
  },
  {
    hawaiian: "ahi",
    english: "fire",
  },
  {
    hawaiian: "iʻa",
    english: "fish",
  },
  {
    hawaiian: "manu",
    english: "bird",
  },
  {
    hawaiian: "pua",
    english: "flower",
  },
  {
    hawaiian: "moana",
    english: "flower",
  },
]);
const WORD_WIDTH_BUFFER = 30;
const WORD_HEIGHT_BUFFER = 30;

function preload() {
  fontStyle = loadFont("assets/PlaypenSans-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  frameRate(30);
  textFont(fontStyle, 20);
}

function draw() {
  background(500);

  HAWAIIAN_WORDS.forEach((word) => {
    push();
    if (!word.clicked) {
      text(word.hawaiian, word.wordX, word.wordY);
    } else {
      if (word.timer <= 0) {
        word.clicked = false;
      } else {
        word.timer -= 1;
      }
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
    word.wordX - WORD_WIDTH_BUFFER <= mouseX &&
    word.wordX + WORD_WIDTH_BUFFER >= mouseX &&
    mouseY >= word.wordY - WORD_HEIGHT_BUFFER &&
    mouseY <= word.wordY + WORD_HEIGHT_BUFFER
  );
}
