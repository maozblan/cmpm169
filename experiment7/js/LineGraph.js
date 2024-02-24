// just the line graph OOP

class LineGraph {
    constructor(data, color, zero, xStart, xEnd) {
        this.data = data; // should be a list of points
        this.index = 0; // current point to be animated
        this.zero = zero; // y index of "y=0"
        this.color = color; // color of line
        this.xStart = xStart;
        this.xEnd = xEnd;
        
        this.yScalar = 10; // scale up the y values maybe
        
        // animate between the points
        this.counter = 0;
        this.framesPerPoint = 4;

        // tracking
        this.currentLoc = this.zero; // current y-loc
        this.echoCount = 10; // number of points that are remembered
        this.echoArr = new Array(this.echoCount).fill(this.currentLoc);
    }
    
    draw() {
        if (this.counter === this.framesPerPoint) {
            this.index++;
            this.counter = 0;
        }
        stroke(this.color);
        strokeWeight(1);
        noFill();
        // update the lines to draw
        this.echoArr.shift();
        // difference of this point to next point, scaled down
        if (this.index < this.data.length-1) {
            this.currentLoc += (this.data[this.index+1] - this.data[this.index]) / this.framesPerPoint;
            this.currentLoc *= this.yScalar; // scale Y so it doesn't stick to the bottom of the screen
            this.currentLoc += this.zero; // offset
        } else {
            this.currentLoc = this.zero;
        }
        this.echoArr.push(this.currentLoc);
        // draw the lines
        let x = this.xStart;
        const xStep = (this.xEnd-this.xStart)/this.echoCount;
        for (let i = 0; i < this.echoArr.length-1; ++i) {
            line(x, this.echoArr[i], x+xStep, this.echoArr[i+1]);
            x += xStep;
        }
    }
}
