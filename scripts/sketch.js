let fontStyle;
let song;

function preload() {
  fontStyle = loadFont("assets/PlaypenSans-Regular.ttf");
  song = loadSound('assets/bg.mp3');
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
  if (!song.isPlaying()) {
    song.play();
  }
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


