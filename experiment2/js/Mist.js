// Mist.js - handles drawing of noise line used for mist
// edited from https://editor.p5js.org/wmodes/sketches/SFh-TOVFs
// Author: Lyssa Li
// Date: 2024 Jan 22

class Line {
  constructor(xNoiseFreq, yNoiseFreq, xIncrement, yOffset) {
    this.xNoiseFreq = xNoiseFreq;
    this.yNoiseFreq = yNoiseFreq;
    this.xIncrement = xIncrement;
    // save the current framecount for later
    this.frameCount = sketchy.frameCount;
    this.noiseValues = Array();
    // save yOffset for draw()
    this.yOffset = yOffset;
    // create this line
    let numPoints = sketchy.windowWidth / this.xIncrement;
    for (let x = 0; x <= sketchy.windowWidth; x += sketchy.windowWidth / numPoints) {
      this.noiseValues.push(sketchy.noise(x * this.xNoiseFreq, this.frameCount * this.yNoiseFreq) * sketchy.windowHeight);
    }
  }

  draw() {
    sketchy.beginShape();
    for (let i = 0; i < this.noiseValues.length; i++) {
      sketchy.curveVertex(i * (this.xIncrement*2) - (sketchy.windowWidth*0.3), this.noiseValues[i] + this.yOffset);
    }
    sketchy.endShape();
  }
}
  
  
class Field {
  constructor(yOffset=0) {
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
    sketchy.strokeWeight(1);
    sketchy.noFill();
    // slow down the framerate for slower rolling mist
    if (this.counter == this.secondsPerFrame) {
      this.counter = 0;
      // calculate the xIncrement based on the windowWidth of the
      // screen, the desired number of points and echoes value
      // in order to keep a constant number of points/speed
      let xIncrement = sketchy.windowWidth * this.echoes / this.numPoints;
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
    let color = 255;
    let a = 300;
    for(let i=0;i < this.echoArray.length;i++) {
      sketchy.stroke(color, color, color, a);
      this.echoArray[i].draw();
      a -= sketchy.int(300/this.echoArray.length);
    }
  }
}