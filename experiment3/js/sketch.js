// sketch.js - compilation of the fireworks sketch
// Author: Lyssa Li
// Date: Jan 29th 2024, updated Jan 27th 2025

// L-systems base from https://editor.p5js.org/wmodes/sketches/UoSg_99pH

let boops = [];
let white = [0, 0, 100]; // white in HSL

// pad the screen so the fireworks don't appear too close to the edges
let padding = 10;

function createFireworkCanvas(canvasID) {
  return new p5((sketch) => {
    sketch.setup = () => {
      // place our canvas, making it fit our container
      canvasContainer = $(`#${canvasID}`);
      let canvas = sketch.createCanvas(
        canvasContainer.width(),
        canvasContainer.height()
      );
      canvas.parent(canvasID);
      // resize canvas is the page is resized
      $(window).resize(function () {
        console.log("Resizing...");
        sketch.resizeCanvas(canvasContainer.width(), canvasContainer.height());
      });
      sketch.resizeCanvas(canvasContainer.width(), canvasContainer.height());

      sketch.background(0);

      // change colormode for ease of handling colors
      sketch.colorMode(sketch.HSL);
    };

    sketch.draw = () => {
      // fade out the previous drawings
      sketch.background(0, 0.11); // alpha suggestion 0.05 <= a <= 0.25
      for (let i = 0; i < boops.length; ++i) {
        if (boops[i].draw()) {
          boops.splice(i, 1);
        }
      }
      if (sketch.random(0, 1) > 0.97) {
        const color = [
          sketch.random(0, 255),
          sketch.random(70, 100),
          sketch.random(50, 70),
        ];
        let x = sketch.random(
          sketch.width / padding,
          sketch.width - sketch.width / padding
        );
        let y = sketch.random(
          sketch.height / padding,
          sketch.height - sketch.height / padding
        );
        boops.push(new Firework(x, y, color, sketch));
      }
    };

    sketch.mousePressed = () => {
      boops.push(new Firework(sketch.mouseX, sketch.mouseY, white, sketch));
    };
  });
}

createFireworkCanvas("canvas-container");
