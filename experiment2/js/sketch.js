// sketch.js - main sketch loops to draw animation, calls all other files
// Author: Lyssa Li
// Date: 2024 Jan 22, updated 2025 Jan 25

// Globals
let canvasContainer;
//stars
let starX = [];
let starY = [];
let stars = [];
// trees
let forestSize;
// mist
let field;
// birds
let flocks = [];
let sketchy;

// p5 instances
let bg = new p5((sketch) => {
  sketchy = sketch;
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
    });

    initStars();

    forestSize = sketch.int(sketch.width / 150);
    //create tree and leaves array letiables
    for (let i = 0; i < forestSize; i++) {
      this["tree" + i] = [];
      this["tree" + (forestSize + i)] = [];
      this["leaves" + i] = [];
      this["leaves" + (forestSize + i)] = [];
    }

    // create the list of trees to be drawn
    for (let i = 0; i < forestSize; i++) {
      // layer 1
      createTree(i, sketch.height * 0.1, sketch.height * 0.3);
      // layer 2
      createTree(forestSize + i, sketch.height * 0.2, sketch.height * 0.35);
    }

    // set up the mist
    field = new Field((-1 * canvasContainer.height()) / 3);
  };

  sketch.draw = () => {
    // background
    drawGradient();

    // back tree layer
    for (let i = 0; i < forestSize; i++) {
      drawTree(forestSize + i);
    }

    // mist
    field.draw();

    // front tree layer
    for (let i = 0; i < forestSize; i++) {
      drawTree(i);
    }

    // i just like it sparkling all over the place soo i moved it in front of the trees
    // who doesn't like a good bling bling
    drawStars(); // stars has it's own draw function

    // draw the birds
    drawBirds();
  };

  function initStars() {
  for (let i = 0; i < 50; i++) {
    stars[i] = new Star();
  }
}

// make a list of tree branchs and leaves
function createTree(num, minHeight, maxHeight) {
  // random x location for root of tree and ending position of tree
  widthVal = sketch.random(1, sketch.width);
  if (widthVal > sketch.width / 2) {
    endRootVal = widthVal - widthVal / sketch.random(1, 500);
  } else {
    endRootVal = widthVal + widthVal / sketch.random(1, 500);
  }

  let a = sketch.createVector(widthVal, sketch.height);
  let b = sketch.createVector(endRootVal, sketch.height - sketch.random(minHeight, maxHeight));
  let root = new Branch(a, b);

  this["tree" + num][0] = root;

  let branchEnd = 3;
  let counter = 0;
  for (let i = 0; i < branchEnd; i++) {
    // mock recursive fractal calls
    for (let i = this["tree" + num].length - 1; i >= 0; i--) {
      if (!this["tree" + num][i].finished) {
        this["tree" + num].push(this["tree" + num][i].branchLeft());
        this["tree" + num].push(this["tree" + num][i].branchRight());
      }
      this["tree" + num][i].finished = true;
    }
    counter++;
    if (counter == branchEnd) {
      for (let i = 0; i < this["tree" + num].length; i++) {
        if (!this["tree" + num][i].finished) {
          let leaf = this["tree" + num][i].end.copy();
          this["leaves" + num].push(leaf);
        }
      }
    }
  }
}

// from the list of trees made in createTree
function drawTree(num) {
  // Show Tree
  for (let i = 0; i < this["tree" + num].length; i++) {
    this["tree" + num][i].show();
  }
  // Show Leaves
  for (let i = 0; i < this["leaves" + num].length; i++) {
    sketch.fill(0);
    sketch.noStroke();
    let leafSize = 100;
    sketch.ellipse(
      this["leaves" + num][i].x,
      this["leaves" + num][i].y,
      leafSize,
      leafSize
    );
  }
}

function drawStars() {
  for (let i = 0; i < stars.length; i++) {
    stars[i].draw();
  }
}

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

class Star {
  constructor() {
    this.x = sketch.random(canvasContainer.width());
    this.y = sketch.random(canvasContainer.height());
    this.size = sketch.random(0.25, 4);
    this.t = sketch.random(sketch.TAU);
  }

  // has it's own draw function so make the "sparkle"
  draw() {
    this.t += 0.1;
    let scale = this.size + sketch.sin(this.t) * 2;
    sketch.noStroke();
    sketch.fill(255);
    sketch.ellipse(this.x, this.y, scale, scale);
  }
}

});