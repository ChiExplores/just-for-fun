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

let endangeredSpecies = [
  {
    name: "O'hia",
    description: 'description of flower here',
    nameX: getRandomInt(window.outerWidth),
    nameY: 0,
    descriptionX: 0,
    descriptionY: 0,
    fallingRate: getRandomInt(3, 1),
    clicked: false,
    counter: 0,
  },
  {
    name: 'Akikiki',
    description: 'description of bird here',
    nameX: getRandomInt(window.outerWidth),
    nameY: 0,
    descriptionX: 0,
    descriptionY: 0,
    fallingRate: getRandomInt(3, 1),
    clicked: false,
    counter: 0,
  },
  {
    name: "O'hia",
    description: 'description of bird here',
    nameX: getRandomInt(window.outerWidth),
    nameY: 0,
    descriptionX: 0,
    descriptionY: 0,
    fallingRate: getRandomInt(3, 1),
    clicked: false,
    counter: 0,
  },
  {
    name: 'Akikiki',
    description: 'description of bird here',
    nameX: getRandomInt(window.outerWidth),
    nameY: 0,
    descriptionX: 0,
    descriptionY: 0,
    fallingRate: getRandomInt(3, 1),
    clicked: false,
    counter: 0,
  },
  {
    name: "O'hia",
    description: 'description of flower here',
    nameX: getRandomInt(window.outerWidth),
    nameY: 0,
    descriptionX: 0,
    descriptionY: 0,
    fallingRate: getRandomInt(3, 1),
    clicked: false,
    counter: 0,
  },
  {
    name: 'Akikiki',
    description: 'description of bird here',
    nameX: getRandomInt(window.outerWidth),
    nameY: 0,
    descriptionX: 0,
    descriptionY: 0,
    fallingRate: getRandomInt(3, 1),
    clicked: false,
    counter: 0,
  },
]

// let fontRegular;
// function preload() {
//   fontRegular = loadFont('assets/PlaypenSans-Regular.ttf');
// }


function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(10);
}


let i = 0;

function draw() {
  background(500);
  i += 1;
  console.log(i);

  textFont('ariel');
  for (let species of endangeredSpecies) {
    push();
    if (!species.clicked) {
      text(species.name, species.nameX, species.nameY);
    } else {
      if (i === species.counter + 50) {
        species.clicked = false;
      }
      text(species.description, species.descriptionX, species.descriptionY);
      console.log('showng descripi', species.description, species.descriptionX, species.descriptionY)
    }
    species.nameY += species.fallingRate;
    if (species.nameY >= window.innerHeight) {
      species.nameY = 0;
      species.nameX = getRandomInt(window.innerWidth);
    }
    pop();
  }

}

function mouseClicked() {
  console.log('mouse clicked', mouseX, mouseY);
  for (let species of endangeredSpecies) {
    if (species.nameX - 50 <= mouseX && species.nameX + 50 >= mouseX && mouseY >= species.nameY - 100 && mouseY <= species.nameY + 100) {
      species.clicked = true;
      species.counter = i;
      species.descriptionX = species.nameX;
      species.descriptionY = species.nameY;
      species.nameY = -100
    }
  }
}

