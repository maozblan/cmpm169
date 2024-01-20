class Line {
    constructor(xNoiseFreq, yNoiseFreq, xIncrement) {
      this.xNoiseFreq = xNoiseFreq;
      this.yNoiseFreq = yNoiseFreq;
      this.xIncrement = xIncrement;
      // save the current framecount for later
      this.frameCount = frameCount;
      this.noiseValues = Array();
      // create this line
      for (let x = 0; x <= width; x += this.xIncrement) {
        this.noiseValues.push(noise(x * this.xNoiseFreq, this.frameCount * this.yNoiseFreq) * height);
      }
    }
  
    draw() {
      beginShape();
      for (let i = 0; i < this.noiseValues.length; i++) {
        curveVertex(i * this.xIncrement, this.noiseValues[i]);
      }
      endShape();
    }
  }
  
  
  class Field {
    constructor(numPoints, echoes) {
      this.xNoiseFreq = 0.01;
      this.yNoiseFreq = 0.01;
      this.xNoiseStep = 1.1;
      this.yNoiseStep = 1.1;
      this.numPoints = numPoints;
      this.echoes = echoes;
      this.echoArray = Array();
    }
    
    setup() {
      stroke(255);
      noFill();
    }
    
    draw() {
      background(0);
      // calculate the xIncrement based on the width of the
      // screen, the desired number of points and echoes value
      // in order to keep a constant number of points/speed
      let xIncrement = width * this.echoes / numPoints;
      // create new line
      let newLine = new Line(this.xNoiseFreq, this.yNoiseFreq, xIncrement);
      // add it to the array of echoes
      this.echoArray.push(newLine);
      // remove any unneeded lines
      let numElementsToRemove = Math.max(
        this.echoArray.length - this.echoes, 0);
      for(let i=0; i < numElementsToRemove; i++) {
        this.echoArray.shift();
      }
      let sum = 0;
      // draw all the lines in the echo array
      for(let i=0;i < this.echoArray.length;i++) {
        this.echoArray[i].draw();
        sum += this.echoArray[i].noiseValues.length;
      }
      // console.log("Total points being drawn:", sum, "xIncrement:", xIncrement);
    }
    
    changeParams(key) {
      if (key === 'ArrowUp') {
        this.yNoiseFreq = this.yNoiseFreq * this.yNoiseStep;
      } else if (key === 'ArrowDown') {
        this.yNoiseFreq = this.yNoiseFreq / this.yNoiseStep;
      } else if (key === 'ArrowLeft') {
        this.xNoiseFreq = this.xNoiseFreq / this.xNoiseStep;
      } else if (key === 'ArrowRight') {
        this.xNoiseFreq = this.xNoiseFreq * this.xNoiseStep;
      } else if (key >= '0' && key <= 9) {
        this.echoes = parseInt(key);
      } else if (key === '+' || key === '=') {
        this.echoes += 1;
      } else if (key === '-' || key === '_') {
        if (this.echoes > 1) {
          this.echoes -= 1;
        }
      }
    }
  }