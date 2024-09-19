let fontStyle;

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const TIME_BUFFER = 200;
const HAWAIIAN_WORDS = setCoordinates([
  {
    hawaiian: "ahi",
    english: "fire",
    playAnimation: drawFire,
    setup: () => {},
  },
  {
    hawaiian: "iʻa",
    english: "fish",
    playAnimation: drawFish,
    setup: setupFish,
  },
  {
    hawaiian: "manu",
    english: "bird",
  playAnimation: drawBird,
    setup: () => {},
  },
  {
    hawaiian: "pua",
    english: "flower",
    playAnimation: drawFlower,
    setup: setupFlowers,
  },
  {
    hawaiian: "moana",
    english: "ocean",
    playAnimation: () => {},
    setup: () => {},
  },
  {
    hawaiian: "mauka",
    english: "mountain",
    playAnimation: () => {},
    setup: () => {},
  },
  {
    hawaiian: "mahina",
    english: "moon",
    playAnimation: () => {},
    setup: () => {},
  },
  {
    hawaiian: "lā",
    english: "sun",
    playAnimation: () => {},
    setup: () => {},
  },
  {
    hawaiian: "waʻa",
    english: "canoe",
    playAnimation: () => {},
    setup: () => {},
  },
  {
    hawaiian: "hōkū",
    english: "stars",
    playAnimation: drawStars,
    setup: setupStars,
  },
  {
    hawaiian: "makani",
    english: "wind",
    playAnimation: () => {},
    setup: () => {},
  },
  {
    hawaiian: "ua",
    english: "rain",
    playAnimation: () => {},
    setup: () => {},
  }
]);
const WORD_WIDTH_BUFFER = 50;
const WORD_HEIGHT_BUFFER = 50;
const NUM_FISH = 11;
const NUM_FLOWER = 25;
const NUM_BIRD = 10;

function preload() {
  fontStyle = loadFont("assets/PlaypenSans-Regular.ttf");
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  frameRate(30);
  textFont(fontStyle, 20);
  HAWAIIAN_WORDS.forEach((word) => {
    word.setup();
  });

    //Setup bird counts
    for (var i = 0; i < NUM_BIRD; i++) {
        birds[i] = new Bird(random(-10, 0), random(0, height));
    }
}

function draw() {
  background(0);
  circle(predX, predY, 10);
  // Display hawaiian words on canvas
  HAWAIIAN_WORDS.forEach((word) => {
    push();
    if (!word.clicked) {
      fill("white");
      text(word.hawaiian, word.wordX, word.wordY);
    } else {
      if (word.timer <= 0) {
        word.clicked = false;
        word.fallingRate = getRandomInt(1, 2);
      } else {
        word.timer -= 1;
        word.fallingRate = 0;
        fill('red');
        text(word.english, word.descriptionX, word.descriptionY);
        word.playAnimation(predX, predY);
      }
      console.log("SHOW PARTICLE EFFECT HERE FOR", word.hawaiian);
      console.log(word.timer);
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
      clickWord(word);
    }
  });
}

function clickWord(word) {
  word.clicked = true;
  word.timer = TIME_BUFFER;
  word.descriptionX = word.wordX;
  word.descriptionY = word.wordY;
  word.wordY = -100;
  word.wordX = getRandomInt(0, window.innerWidth);
}

/** HELPER FUNCTIONS **/
function setCoordinates(data) {
  return data.map((datum) => ({
    ...datum,
    wordX: getRandomInt(0, WIDTH),
    wordY: getRandomInt(-700, 0),
    fallingRate: getRandomInt(1, 2),
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
