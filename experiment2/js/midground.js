// miground.js - handles drawing of noise line used for mist + stars
// edited from https://editor.p5js.org/wmodes/sketches/SFh-TOVFs
// Author: Lyssa Li
// Date: 2024 Jan 22, updated 2025 Jan 15

//stars
let starX = [];
let starY = [];
let stars = [];
// mist
let field;

let mg = new p5((sketch) => {
  sketch.setup = () => {
    canvasContainer = $("#midground");
    let canvas = sketch.createCanvas(
      canvasContainer.width(),
      canvasContainer.height()
    );
    canvas.parent("midground");
    // resize canvas is the page is resized
    $(window).resize(function () {
      console.log("Resizing...");
      sketch.resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });

    // set up the mist
    field = new Field((-1 * canvasContainer.height()) / 3);

    // set up stars
    // i just like it sparkling all over the place soo i moved it in front of the trees
    // who doesn't like a good bling bling
    for (let i = 0; i < 50; i++) {
      stars[i] = new Star();
    }
  };

  // OOP
  class Line {
    constructor(xNoiseFreq, yNoiseFreq, xIncrement, yOffset) {
      this.xNoiseFreq = xNoiseFreq;
      this.yNoiseFreq = yNoiseFreq;
      this.xIncrement = xIncrement;
      // save the current framecount for later
      this.frameCount = sketch.frameCount;
      this.noiseValues = Array();
      // save yOffset for draw()
      this.yOffset = yOffset;
      // create this line
      let numPoints = sketch.windowWidth / this.xIncrement;
      for (
        let x = 0;
        x <= sketch.windowWidth;
        x += sketch.windowWidth / numPoints
      ) {
        this.noiseValues.push(
          sketch.noise(x * this.xNoiseFreq, this.frameCount * this.yNoiseFreq) *
            sketch.windowHeight
        );
      }
    }

    draw() {
      sketch.beginShape();
      for (let i = 0; i < this.noiseValues.length; i++) {
        sketch.curveVertex(
          i * (this.xIncrement * 2) - sketch.windowWidth * 0.3,
          this.noiseValues[i] + this.yOffset
        );
      }
      sketch.endShape();
    }
  }

  sketch.draw = () => {
    sketch.clear();
    field.draw();

    // draw stars
    for (let i = 0; i < stars.length; i++) {
      stars[i].draw();
    }
  }

  class Field {
    constructor(yOffset = 0) {
      this.xNoiseFreq = 0.0039229599817706405;
      this.yNoiseFreq = 0.051384283767210024;
      this.xNoiseStep = 1.1;
      this.yNoiseStep = 1.1;
      this.numPoints = 150;
      this.echoes = 10;
      this.echoArray = Array();
      // offset height of noise (higher number moves it lower)
      this.yOffset = yOffset;
      // frame rate counter
      this.counter = 0;
      this.secondsPerFrame = 2;
    }

    draw() {
      // redefine context to ensure correct context before drawing
      sketch.strokeWeight(1);
      sketch.noFill();
      // slow down the framerate for slower rolling mist
      if (this.counter == this.secondsPerFrame) {
        this.counter = 0;
        // calculate the xIncrement based on the windowWidth of the
        // screen, the desired number of points and echoes value
        // in order to keep a constant number of points/speed
        let xIncrement = (sketch.windowWidth * this.echoes) / this.numPoints;
        // create new line
        let newLine = new Line(
          this.xNoiseFreq,
          this.yNoiseFreq,
          xIncrement,
          this.yOffset
        );
        // add it to the array of echoes
        this.echoArray.push(newLine);
        // remove any unneeded lines
        let numElementsToRemove = this.echoArray.length - this.echoes;
        this.echoArray.splice(0, numElementsToRemove);
      } else {
        this.counter++;
      }
      // draw all the lines in the echo array
      // using color and alpha to slowly make the older lines transluscent
      let color = 255;
      let a = 300;
      for (let i = 0; i < this.echoArray.length; i++) {
        sketch.stroke(color, color, color, a);
        this.echoArray[i].draw();
        a -= sketch.int(300 / this.echoArray.length);
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