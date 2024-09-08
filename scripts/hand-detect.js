const video = document.getElementById("myvideo");

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton");
let updateNote = document.getElementById("updatenote");

let isVideo = false;
let model = null;
let wentAboveThresholdAt = null;
let handThresholdMap = new Map();
const objectBox = [0, 0, 200, 200];
const threshold = 0.8;
const requiredTime = 2000;

const modelParams = {
  flipHorizontal: true, // flip e.g for video
  maxNumBoxes: 20, // maximum number of boxes to detect
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
      if (prediction.label === "open" && prediction.score > threshold) {
        if (isHandWithinBbox(prediction.bbox, objectBox)) {
          if (!handThresholdMap.get(i)) {
            console.log("SET THRESHOLD", i);
            handThresholdMap.set(i, Date.now());
          } else if (handThresholdMap.get(i) + requiredTime <= Date.now()) {
            // Success!
            console.log("was above threshold for required time!", i);
            handThresholdMap.set(i, null);
          }
        }
      }
    });
    // if (predictions)
    model.renderPredictions(predictions, canvas, context, video);
    if (isVideo) {
      requestAnimationFrame(runDetection);
    }
  });
}

function isHandWithinBbox(handBbox, otherBbox) {
  const handCenterX = (handBbox[0] + handBbox[2]) >> 2; // bit shifted for optimization
  const handCenterY = (handBbox[1] + handBbox[3]) >> 2; // bit shifted for optimization
  return (
    otherBbox[0] <= handCenterX &&
    handCenterX <= otherBbox[0] + otherBbox[2] && // bounded by x-pos
    otherBbox[1] <= handCenterY &&
    handCenterY <= otherBbox[1] + otherBbox[3] // bounded by y-pos
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
