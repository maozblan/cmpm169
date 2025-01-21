// sketch.js - compilation of the fireworks sketch
// Author: Lyssa Li
// Date: Jan 29th 2024, updated Jan 27th 2025

// L-systems base from https://editor.p5js.org/wmodes/sketches/UoSg_99pH

let boops = [];
let color1 = [255]; // normal fireworks
let color2 = [255, 0, 0]; // user click fireworks

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
      // start firework show
      boops.push(new Firework(sketch.width / 2, sketch.height / 2, color1, sketch));
    };

    sketch.draw = () => {
      // fade out the previous drawings
      sketch.background(0, 0, 0, 20); // alpha suggestion 7 <= a <= 30
      for (let i = 0; i < boops.length; ++i) {
        if (boops[i].draw()) {
          boops.splice(i, 1);
        }
      }
      if (sketch.random(0, 1) > 0.97) {
        let x = sketch.random(sketch.width / padding, sketch.width - sketch.width / padding);
        let y = sketch.random(sketch.height / padding, sketch.height - sketch.height / padding);
        boops.push(new Firework(x, y, color1, sketch));
      }
    };

		sketch.mousePressed = () => {
			boops.push(new Firework(sketch.mouseX, sketch.mouseY, color2, sketch));
		};
  });
}

createFireworkCanvas("canvas-container");
