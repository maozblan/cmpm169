// background.js - handles drawing of the gradient and back trees
// Author: Lyssa Li
// Date: 2025 Jan 15

let bg = new p5((sketch) => {
  let canvasContainer;

  sketch.setup = () => {
    canvasContainer = $("#background");
    let canvas = sketch.createCanvas(
      canvasContainer.width(),
      canvasContainer.height()
    );
    canvas.parent("background");
    // resize canvas is the page is resized
    $(window).resize(function () {
      console.log("Resizing...");
      sketch.resizeCanvas(canvasContainer.width(), canvasContainer.height());
      sketch.setup();
    });

    // background gradient
    drawGradient();

    // trees
    sketch.fill(50, 50, 50, 255 / 2);
    sketch.noStroke();
    makeTrees(sketch.height / 1.2, sketch.height / 2, 0.03, sketch);
  };

  function drawGradient() {
    let color1 = sketch.color(255); //top
    let color2 = sketch.color(0); //bottom
    setGradient(
      0,
      0,
      canvasContainer.width(),
      canvasContainer.height(),
      color1,
      color2,
      "Y"
    );
  }

  function setGradient(x, y, w, h, c1, c2, axis) {
    sketch.noFill();
    if (axis == "Y") {
      // Top to bottom gradient
      for (let i = y; i <= y + h; i++) {
        let inter = sketch.map(i, y, y + h * 1.3, 0, 1);
        let c = sketch.lerpColor(c1, c2, inter);
        sketch.stroke(c);
        sketch.line(x, i, x + w, i);
      }
    }
  }

});
