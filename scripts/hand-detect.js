const video = document.getElementById("myvideo");

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton");
let updateNote = document.getElementById("updatenote");

let isVideo = false;
let model = null;
let timeMap = new Map();
const requiredTime = 1;

const modelParams = {
  flipHorizontal: true, // flip e.g for video
  maxNumBoxes: 5, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.6, // confidence threshold for predictions.
};

function startVideo() {
  handTrack.startVideo(video).then(function (status) {
    console.log("video started", status);
    if (status) {
      updateNote.innerText = "Video started. Now tracking";
      isVideo = true;
      runDetection();
    } else {
      updateNote.innerText = "Please enable video";
    }
  });
}

function toggleVideo() {
  if (!isVideo) {
    updateNote.innerText = "Starting video";
    startVideo();
  } else {
    updateNote.innerText = "Stopping video";
    handTrack.stopVideo(video);
    isVideo = false;
    updateNote.innerText = "Video stopped";
  }
}

trackButton.addEventListener("click", function () {
  toggleVideo();
});

function runDetection() {
  model.detect(video).then((predictions) => {
    // console.log("Predictions: ", predictions);
    // {
    //   "bbox": [
    //     190.38740158081055,
    //     250.2805995941162,
    //     175.31755447387695,
    //     250.0557804107666
    //   ],
    //   "class": 5,
    //   "label": "face",
    //   "score": "0.95"
    // }
    // [x, y, width, height]
    // Determine if prediction hand is contained within the bounding box of a word.
    // We can determine by the bounding box of the hand or the center point of the hand's bbox
    // Easiest state is to use the center point of the hand
    predictions.forEach((prediction, i) => {
      HAWAIIAN_WORDS.forEach((word) => {
        faceX = prediction.bbox[0];
        faceY = prediction.bbox[1];
        const wordBbox = [word.wordX, word.wordY, WORD_WIDTH_BUFFER, WORD_HEIGHT_BUFFER];
        if (isWithinBbox(prediction.bbox, wordBbox)) {
          word.clicked = true;
          if (!timeMap.get(i)) {
            console.log("START TIME FOR", i);
            timeMap.set(i, Date.now());
          } else if (timeMap.get(i) + requiredTime <= Date.now()) {
            // Success!
            console.log("was above threshold for required time!", i);
            timeMap.set(i, null);
          }
        }
      });
    });
    // if (predictions)
    model.renderPredictions(predictions, canvas, context, video);
    if (isVideo) {
      requestAnimationFrame(runDetection);
    }
  });
}

function isWithinBbox(predictionBbox, otherBbox) {
  const predictionX = predictionBbox[0];
  const predictionY = predictionBbox[1];
  return (
    otherBbox[0] <= predictionX &&
    predictionX <= otherBbox[0] + otherBbox[2] && // bounded by x-pos
    otherBbox[1] <= predictionY &&
    predictionY <= otherBbox[1] + otherBbox[3] // bounded by y-pos
  );
}

// Load the model.
handTrack.load(modelParams).then((lmodel) => {
  // detect objects in the image.
  model = lmodel;
  console.log("model", model);
  updateNote.innerText = "Loaded Model!";
  trackButton.disabled = false;
});
