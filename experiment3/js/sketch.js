// sketch.js - purpose and description here
// Author: Lyssa Li
// Date: Jan 29th

// L-systems base from https://editor.p5js.org/wmodes/sketches/UoSg_99pH

let boop;

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

    boop = new DragonCurve(5);
}

function mousePressed() {
    console.log('boop');
    boop.drawLine();
}

class DragonCurve {
    constructor(num) {
        this.rules = {
            "F": "F+G",
            "G": "F-G",
        }
        this.sentence = "F";
        this.len = 10;
        this.angle = 85;
        this.iterations = num;
        for (let i = 0; i < this.iterations; ++i) {
            this.generate();
        }

        // for iterating the lines
        this.index = 0;
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
        translate(width/2, height/2);
        while (this.index < this.sentence.length) {
            let current = this.sentence.charAt(this.index++);
            if (current === "F" || current === "G") {
                line(0, 0, -this.len, 0);
                translate(-this.len, 0);
            } else if (current === "+") {
                rotate(radians(this.angle));
            } else if (current === "-") {
                rotate(radians(-this.angle));
            }
        }
    }
}
