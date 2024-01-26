// sketch.js - purpose and description here
// Author: Your Name
// Date:

const axiom = "F";
const rule = {
  "F": "F+G",
  "G": "F-G",
}
let sentence = axiom;
let len = 10;

function setup() {
    // place our canvas, making it fit our container
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
    canvas.parent("canvas-container");
    // resize canvas is the page is resized
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });

    background(0);
    stroke(255);
    for (let i = 0; i < 9; i++) {
        generate();
    }
    drawLSystem();
}

// L-systems base from https://editor.p5js.org/wmodes/sketches/UoSg_99pH
function generate() {
    let nextSentence = "";
    for (let i = 0; i < sentence.length; i++) {
        let current = sentence.charAt(i);
        nextSentence += rule[current] || current;
    }
    sentence = nextSentence;
}

function drawLSystem() {
  translate(width/2, height/2);
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    if (current === "F" || current === "G") {
      line(0, 0, -len, 0);
      translate(-len, 0);
    } else if (current === "+") {
      rotate(radians(80));
    } else if (current === "-") {
      rotate(radians(-80));
    }
  }
}
