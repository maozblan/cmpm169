let field;

class Line {
  constructor(xNoiseFreq, yNoiseFreq, xIncrement) {
    this.xNoiseFreq = xNoiseFreq;
    this.yNoiseFreq = yNoiseFreq;
    this.xIncrement = xIncrement;
    // save the current framecount for later
    this.frameCount = frameCount;
    this.noiseValues = Array();
    // create this line
    let numPoints = windowWidth / this.xIncrement;
    for (let x = 0; x <= windowWidth; x += windowWidth / numPoints) {
      this.noiseValues.push(noise(x * this.xNoiseFreq, this.frameCount * this.yNoiseFreq) * (windowHeight/3.5));
    }
  }

  draw() {
    beginShape();
    for (let i = 0; i < this.noiseValues.length; i++) {
      curveVertex(i * (this.xIncrement*2) - (windowWidth*0.3), this.noiseValues[i]);
    }
    endShape();
  }
}
  
  
class Field {
  constructor(yOffset) {
    this.xNoiseFreq = 0.0039229599817706405;
    this.yNoiseFreq = 0.131384283767210024;
    this.xNoiseStep = 1.1;
    this.yNoiseStep = 1.1;
    this.numPoints = 150;
    this.echoes = 7;
    this.echoArray = Array();
    // offset height of noise
    this.yOffset = yOffset;
  }
  
  draw() {
    // redefine context to ensure correct context before drawing
    stroke(255);
    strokeWeight(1);
    noFill();
    // calculate the xIncrement based on the windowWidth of the
    // screen, the desired number of points and echoes value
    // in order to keep a constant number of points/speed
    let xIncrement = windowWidth * this.echoes / this.numPoints;
    // create new line
    let newLine = new Line(this.xNoiseFreq, this.yNoiseFreq, xIncrement);
    // add it to the array of echoes
    this.echoArray.push(newLine);
    // remove any unneeded lines
    let numElementsToRemove = this.echoArray.length - this.echoes;
    this.echoArray.splice(0, numElementsToRemove);
    // draw all the lines in the echo array
    for(let i=0;i < this.echoArray.length;i++) {
      this.echoArray[i].draw();
    }
  }
}