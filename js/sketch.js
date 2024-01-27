// sketch.js - animating fun things in the homepage
// Author: Lyssa Li
// Date:

// the wave
let height = $('#canvas-container').height();
// edited from https://editor.p5js.org/wmodes/sketches/SFh-TOVFs
class Line {
  constructor(xNoiseFreq, yNoiseFreq, xIncrement, yOffset) {
    this.xNoiseFreq = xNoiseFreq;
    this.yNoiseFreq = yNoiseFreq;
    this.xIncrement = xIncrement;
    // save the current framecount for later
    this.frameCount = frameCount;
    this.noiseValues = Array();
    // save yOffset for draw()
    this.yOffset = yOffset;
    // create this line
    let numPoints = windowWidth / this.xIncrement;
    for (let x = 0; x <= windowWidth; x += windowWidth / numPoints) {
      this.noiseValues.push(noise(x * this.xNoiseFreq, this.frameCount * this.yNoiseFreq) * (height));
    }
  }

  draw() {
    beginShape();
    for (let i = 0; i < this.noiseValues.length; i++) {
      curveVertex(i * (this.xIncrement*2) - (windowWidth*0.3), this.noiseValues[i] + this.yOffset);
    }
    endShape();
  }
}
  
  
class Field {
  constructor(yOffset=0) {
    this.xNoiseFreq = 0.0039229599817706405;
    this.yNoiseFreq = 0.007384283767210024;
    this.xNoiseStep = 1.1;
    this.yNoiseStep = 1.1;
    this.numPoints = 150;
    this.echoes = 10;
    this.echoArray = Array();
    // offset height of noise (higher number moves it lower)
    this.yOffset = yOffset;
    // frame rate counter
    this.counter = 0;
    this.secondsPerFrame = 6;
  }
  
  draw() {
    // slow down the framerate for slower rolling mist
    if (this.counter == this.secondsPerFrame) {
      this.counter = 0;
      // calculate the xIncrement based on the windowWidth of the
      // screen, the desired number of points and echoes value
      // in order to keep a constant number of points/speed
      let xIncrement = windowWidth * this.echoes / this.numPoints;
      // create new line
      let newLine = new Line(this.xNoiseFreq, this.yNoiseFreq, xIncrement, this.yOffset);
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
    let a = 30;
    for(let i=0;i < this.echoArray.length;i++) {
      stroke(0, 136, 204, a);
      this.echoArray[i].draw();
      if (i < this.echoArray.length/2) {
        a += int(400/this.echoArray.length);
      } else {
        a -= int(400/this.echoArray.length);
      }
    }
  }
}

let field;
function setup() {
  createCanvas(windowWidth, windowHeight);
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized
  $(window).resize(function() {
      console.log("Resizing...");
      resizeCanvas(canvasContainer.width(), canvasContainer.height());
  });

  strokeWeight(3);
  noFill();
  field = new Field();
}

function draw() {
  clear();
  field.draw();
}
