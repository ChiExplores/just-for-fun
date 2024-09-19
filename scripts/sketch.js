let fontStyle;
let song;

function preload() {
  fontStyle = loadFont("assets/PlaypenSans-Regular.ttf");
  song = loadSound("assets/bg.mp3");
  HAWAIIAN_WORDS.forEach((word) => {
    console.log("loaded", word.soundFile);
    word.sound = loadSound(word.soundFile);
  });
}

function setup() {
  createCanvas(WIDTH, HEIGHT);
  frameRate(FPS);
  textFont(fontStyle, 30);
  HAWAIIAN_WORDS.forEach((word) => {
    word.setup();
  });
}

function draw() {
  background(0, 30);
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
        word.fallingRate = random(1, 2);
        word.sound.stop();
        word.setup();
      } else {
        word.timer -= 1;
        word.fallingRate = 0;
        fill("red");
        text(word.english, word.descriptionX, word.descriptionY);
        word.playAnimation();
        if (!word.sound.isPlaying()) {
          word.sound.play();
        }
      }
    }

    word.wordY += word.fallingRate;
    if (word.wordY >= HEIGHT) {
      word.wordY = 0;
      word.wordX = random(0, WIDTH);
    }
    pop();
  });
}

function mouseClicked() {
  if (!song.isPlaying()) {
    song.play();
    fullscreen(true);
  }
  HAWAIIAN_WORDS.forEach((word) => {
    if (isWordInBounds(word)) {
      clickWord(word);
    }
  });
}

/** HELPER FUNCTIONS **/
function isWordInBounds(word) {
  return (
    word.wordX - WORD_WIDTH_BUFFER <= mouseX &&
    word.wordX + WORD_WIDTH_BUFFER >= mouseX &&
    mouseY >= word.wordY - WORD_HEIGHT_BUFFER &&
    mouseY <= word.wordY + WORD_HEIGHT_BUFFER
  );
}

function clickWord(word) {
  word.clicked = true;
  word.timer = TIME_BUFFER;
  word.descriptionX = word.wordX;
  word.descriptionY = word.wordY;
  word.wordY = -100;
  word.wordX = random(0, window.innerWidth);
}
