/** CONSTANTS **/
const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const TIME_BUFFER = 400;
const WORD_WIDTH_BUFFER = 50;
const WORD_HEIGHT_BUFFER = 50;
const NUM_FISH = 11;
const NUM_FLOWER = 25;
const NUM_BIRD = 10;
const HAWAIIAN_WORDS = setCoordinates([
  {
    hawaiian: "ahi",
    english: "fire",
    playAnimation: drawFire,
    setup: setupFire,
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
    setup: setupBird,
  },
  {
    hawaiian: "pua",
    english: "flower",
    playAnimation: drawFlower,
    setup: setupFlowers,
  },
  {
    hawaiian: "hōkū",
    english: "stars",
    playAnimation: drawStars,
    setup: setupStars,
  },
  {
    hawaiian: "ua",
    english: "rain",
    playAnimation: drawRain,
    setup: setupRain,
  },
]);

function setCoordinates(data) {
  return data.map((datum) => ({
    ...datum,
    wordX: getRandom(0, WIDTH),
    wordY: getRandom(-700, 0),
    fallingRate: getRandom(1, 2),
    animX: 0,
    animY: 0,
    timer: TIME_BUFFER,
    clicked: false,
  }));
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
