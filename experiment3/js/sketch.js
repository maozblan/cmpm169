// sketch.js - purpose and description here
// Author: Lyssa Li
// Date: Jan 29th

// L-systems base from https://editor.p5js.org/wmodes/sketches/UoSg_99pH

let boops = [];
let color1 = [255];

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
    boops = new Firework(color1);
}

function draw() {
    background(0, 0, 0, 7);
    boops.draw();
}

function mousePressed() {
    boops.push()
}

class Firework {
    constructor(color) {
        // randomize the firework
        let count = Math.floor(random(15, 30));    // how many Dragon Curves are in the firework
        
        // pad the screen so the fireworks don't appear too close to the edges
        let padding = 10;
        // let x = random(width/padding, width-(width/padding));
        // let y = random(height/padding, height-(height/padding));
        this.x = width/2;
        this.y = height/2;
        // list of dragon curves
        this.firework = [];
        for (let i = 0; i < count; ++i) {
            let complexity = Math.floor(random(5, 8));     // how many generations the Dragon Curve is
            this.firework.push(new DragonCurve(complexity, this.x, this.y, color));
        }

        // for animation
        this.index = 0;
        this.stemIndex = 0;
        this.stemHeight = height;
        this.stemLength = 5;
        this.color = color;
    }

    draw() {
        this.drawStem();
        if (this.stemIndex > (height-this.y)/this.stemLength + 50) { // give a slight pause before fireworks hit
            this.drawFirework();
        }
    }

    drawFirework() {
        if (this.index < this.firework[0].sentence.length) {
            for (let i = 0; i < this.firework.length; ++i) {
                this.firework[i].draw();
            }
        }
    }
    
    drawStem() {
        stroke(...this.color);
        if (this.stemIndex < (height-this.y)/this.stemLength) {
            line(this.x, this.stemHeight, this.x, this.stemHeight-this.stemLength);
            this.stemHeight -= this.stemLength;
        }
        this.stemIndex++;
    }
}

class DragonCurve {
    constructor(iterations, x, y, color) {
        // L system
        this.rules = {
            "F": "F+G",
            "G": "F-G",
        }
        this.sentence = "F";
        
        // dragon curve data
        this.len = random(7, 10);
        this.angle = random(95, 105);
        this.iterations = iterations;
        for (let i = 0; i < this.iterations; ++i) {
            this.generate();    // make sentence
        }

        // for the math (to avoid translations)
        this.x = x;
        this.y = y;
        this.currentAngle = random(0, 360);

        // for animation
        this.index = 0;
        this.color = color;
    }

    generate() {
        let nextSentence = "";
        for (let i = 0; i < this.sentence.length; i++) {
            let current = this.sentence.charAt(i);
            nextSentence += this.rules[current] || current;
        }
        this.sentence = nextSentence;
    }

    draw() {
        stroke(...this.color);
        if (this.index < this.sentence.length) {
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
