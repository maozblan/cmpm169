// sketch.js - purpose and description here
// Author: Lyssa Li
// Date: Jan 29th

// L-systems base from https://editor.p5js.org/wmodes/sketches/UoSg_99pH

let boops = [];

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
}

function mousePressed() {
    boops.push(new DragonCurve(random(5,7)));
    console.log('boop');
    boops[boops.length-1].drawLine();
}

class DragonCurve {
    constructor(num) {
        this.rules = {
            "F": "F+G",
            "G": "F-G",
        }
        this.sentence = "F";
        this.len = 10;
        this.angle = 95;
        this.iterations = num;
        for (let i = 0; i < this.iterations; ++i) {
            this.generate();
        }

        // for iterating the lines
        this.index = 0;

        // for the math (to avoid translations)
        this.x = random(width/4, width/2);
        this.y = random(height/4, height/2);
        this.currentAngle = random(0, 360);
    }

    generate() {
        let nextSentence = "";
        for (let i = 0; i < this.sentence.length; i++) {
            let current = this.sentence.charAt(i);
            nextSentence += this.rules[current] || current;
        }
        this.sentence = nextSentence;
    }

    drawLine() {
        while (this.index < this.sentence.length) {
            let current = this.sentence.charAt(this.index++);
            if (current === "F" || current === "G") {
                let offsetX = this.len*Math.cos(radians(this.currentAngle));
                let offsetY = this.len*Math.sin(radians(this.currentAngle));
                line(this.x, this.y, this.x-offsetX, this.y+offsetY);
                // update x and y
                this.x -= offsetX;
                this.y += offsetY;
            } else if (current === "+") {
                this.currentAngle += 180 - this.angle;
            } else if (current === "-") {
                this.currentAngle += 180 + this.angle;
            }
            this.currentAngle = this.currentAngle % 360;
        }
    }
}
