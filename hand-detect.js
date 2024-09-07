const video = document.getElementById("myvideo");
console.log('1', video);
let video2;
function setup() {
  createCanvas(windowWidth, windowHeight);

  // Create a video capture (aka webcam input)
  video2 = createCapture(VIDEO);
  console.log('2', video2);

  // Specify the resolution of the webcam input (too high and you may notice performance issues, especially if you're extracting info from it or adding filters)
  video2.size(640, 480);

  // In some browsers, you may notice that a second video appears onscreen! That's because p5js actually creates a <video> html element, which then is piped into the canvas – the added command below ensures we don't see it :)
  video2.hide();
}

function draw() {

  // Display the video just like an image!
  image(video2, 0, 0);
}

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
let trackButton = document.getElementById("trackbutton");
let updateNote = document.getElementById("updatenote");

let isVideo = false;
let model = null;

// video.width = 500
// video.height = 400

const modelParams = {
  flipHorizontal: true, // flip e.g for video
  maxNumBoxes: 20, // maximum number of boxes to detect
  iouThreshold: 0.5, // ioU threshold for non-max suppression
  scoreThreshold: 0.6, // confidence threshold for predictions.
};

function startVideo() {
  // image(video, 0, 0);

  // Specify the resolution of the webcam input (too high and you may notice performance issues, especially if you're extracting info from it or adding filters)
  // video.size(200, 200);

  // In some browsers, you may notice that a second video appears onscreen! That's because p5js actually creates a <video> html element, which then is piped into the canvas – the added command below ensures we don't see it :)
  // video.hide();
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
    console.log("Predictions: ", predictions);
    model.renderPredictions(predictions, canvas, context, video);
    if (isVideo) {
      requestAnimationFrame(runDetection);
    }
  });
}

function runDetectionImage(img) {
  model.detect(img).then((predictions) => {
    console.log("Predictions: ", predictions);
    model.renderPredictions(predictions, canvas, context, img);
  });
}

// Load the model.
handTrack.load(modelParams).then((lmodel) => {
  // detect objects in the image.
  model = lmodel;
  console.log('model', model);
  updateNote.innerText = "Loaded Model!";
  trackButton.disabled = false;
});
