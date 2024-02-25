// just the line graph OOP

var framesPerPoint = 10; // to use elsewhere

class LineGraph {
    constructor(color, zero, xStart, xEnd) {
        this.data = [zero]; // should be a list of points
        this.index = 0; // current point to be animated
        this.zero = zero; // y index of "y=0"
        this.color = color; // color of line
        this.xStart = xStart;
        this.xEnd = xEnd;
        
        this.yScalar = 25; // scale up the y values maybe
        
        // animate between the points
        this.counter = 0;
        this.framesPerPoint = framesPerPoint;

        // tracking
        this.currentLoc = this.zero; // current y-loc
        this.echoCount = 50; // number of points that are remembered
        this.echoArr = new Array(this.echoCount).fill(this.currentLoc);
    }

    setData(data) {
        this.data = data;
        this.index = 0;
        // console.log(data);
    }
    
    draw() {
        stroke(this.color);
        strokeWeight(3);
        noFill();
        if (this.index < this.data.length-1) {
            // difference of this point to next point, scaled down
            this.currentLoc += (this.data[this.index+1] - this.data[this.index]) / this.framesPerPoint * this.yScalar;
            if (this.counter === this.framesPerPoint) {
                this.index++;
                this.counter = 0;
            } else {
                this.counter++;
            }
        } else {
            this.currentLoc = this.zero;
        }
        this.echoArr.shift();
        this.echoArr.push(this.currentLoc);
        // draw the lines
        let x = this.xStart;
        const xStep = (this.xEnd-this.xStart)/this.echoArr.length;
        for (let i = 0; i < this.echoArr.length-1; ++i) {
            line(x, this.echoArr[i], x+xStep, this.echoArr[i+1]);
            x += xStep;
        }
        // console.log(this.echoArr, this.index);
    }
}
