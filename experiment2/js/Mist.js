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
      this.noiseValues.push(noise(x * this.xNoiseFreq, this.frameCount * this.yNoiseFreq) * windowHeight);
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
    strokeWeight(1);
    noFill();
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
    let color = 255;
    let a = 300;
    for(let i=0;i < this.echoArray.length;i++) {
      stroke(color, color, color, a);
      this.echoArray[i].draw();
      a -= int(300/this.echoArray.length);
    }
  }
}