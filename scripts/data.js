const HAWAIIAN_WORDS = setupData([
  {
    hawaiian: "ahi",
    english: "fire",
    playAnimation: drawFire,
    setup: setupFire,
    soundFile: "assets/fire.mp3",
  },
  {
    hawaiian: "iʻa",
    english: "fish",
    playAnimation: drawFish,
    setup: setupFish,
    soundFile: "assets/fish.mp3",
  },
  {
    hawaiian: "manu",
    english: "bird",
    playAnimation: drawBird,
    setup: setupBird,
    soundFile: "assets/bird.mp3",
  },
  {
    hawaiian: "pua",
    english: "flower",
    playAnimation: drawFlower,
    setup: setupFlowers,
    soundFile: "assets/flower.mp3",
  },
  {
    hawaiian: "hōkū",
    english: "stars",
    playAnimation: drawStars,
    setup: setupStars,
    soundFile: "assets/stars.mp3",
  },
]);

function setupData(data) {
  return data.map((datum) => ({
    ...datum,
    wordX: getRandom(0, WIDTH),
    wordY: getRandom(-700, 0),
    fallingRate: getRandom(1, 2),
    animX: 0,
    animY: 0,
    timer: TIME_BUFFER,
    sound: null,
    clicked: false,
  }));
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
