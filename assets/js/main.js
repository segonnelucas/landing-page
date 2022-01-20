window.onload = function () {
  var canvas, context, video, xStart, yStart, xEnd, yEnd;

  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  canvas.addEventListener("mousedown", mouseDown);
  canvas.addEventListener("mouseup", mouseUp);

  function mouseDown(e) {
    if (video) {
      video.pause();
      video = null;
      context.clearRect(0, 0, canvas.width, canvas.height);
    }
    xStart = e.offsetX;
    yStart = e.offsetY;
  }

  function mouseUp(e) {
    xEnd = e.offsetX;
    yEnd = e.offsetY;
    if (xStart != xEnd && yStart != yEnd) {
      video = document.createElement("video");
      video.src = "http://techslides.com/demos/sample-videos/small.mp4";
      video.addEventListener("loadeddata", function () {
        console.log("loadeddata");
        video.play();
        setTimeout(videoLoop, 1000 / 30);
      });
    }
  }

  function videoLoop() {
    if (video && !video.paused && !video.ended) {
      context.drawImage(video, xStart, yStart, xEnd - xStart, yEnd - yStart);
      setTimeout(videoLoop, 1000 / 30);
    }
  }
};
