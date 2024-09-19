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