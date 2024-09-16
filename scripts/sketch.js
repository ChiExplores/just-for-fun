
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
    img: 'assets/ohia.png',
  },
  {
    name: "'Akikiki",
    description: 'description of bird here',
    nameX: getRandomInt(window.outerWidth),
    nameY: 0,
    descriptionX: 0,
    descriptionY: 0,
    fallingRate: getRandomInt(3, 1),
    clicked: false,
    counter: 0,
    img: 'assets/ohia.png',
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
    img: 'assets/ohia.png',
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
    img: 'assets/ohia.png',
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
    img: 'assets/ohia.png',
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
    img: 'assets/ohia.png',
  },
]

let fontRegular;
let img;

function preload() {
  fontRegular = loadFont('assets/PlaypenSans-Regular.ttf');
  img = loadImage('assets/ohia.png');
}



function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(10);

}


let i = 0;
function draw() {

  background(500);
  textFont(fontRegular, 20);

  i += 1;

  for (let species of endangeredSpecies) {
    push();
    species.img = img;
    if (!species.clicked) {
      text(species.name, species.nameX, species.nameY);
    } else {
      if (i === species.counter + 50) {
        species.clicked = false;
      }
      // img = loadImage(species.img);
      console.log('IMG', species.img);
      image(species.img, species.descriptionX, species.descriptionY, 250, 250);
      text(species.description, species.descriptionX, species.descriptionY);
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

  for (let species of endangeredSpecies) {
    if (species.nameX - 30 <= mouseX && species.nameX + 30 >= mouseX && mouseY >= species.nameY - 30 && mouseY <= species.nameY + 30) {
      species.clicked = true;
      species.counter = i; /** what does this do again? not seeing species.counter used again */
      species.descriptionX = species.nameX;
      species.descriptionY = species.nameY;
      species.nameY = -100
    }
  }

}

