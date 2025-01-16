// foreground.js - foreground trees
// Author: Lyssa Li
// Date: 2025 Jan 15

let fg = new p5((sketch) => {
  let canvasContainer;

  sketch.setup = () => {
    canvasContainer = $("#foreground");
    let canvas = sketch.createCanvas(
      canvasContainer.width(),
      canvasContainer.height()
    );
    canvas.parent("foreground");
    // resize canvas is the page is resized
    $(window).resize(function () {
      console.log("Resizing...");
      sketch.resizeCanvas(canvasContainer.width(), canvasContainer.height());
      sketch.setup();
    });

    // trees
    sketch.fill(0, 0, 0, 255 / 2);
    sketch.noStroke();
    makeTrees(sketch.height / 2, sketch.height / 3, 0.03, sketch);
  };
});
