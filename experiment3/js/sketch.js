// sketch.js - purpose and description here
// Author: Lyssa Li
// Date: Jan 29th

// L-systems base from https://editor.p5js.org/wmodes/sketches/UoSg_99pH

let boops = [];
let color1 = [255];         // normal fireworks
let color2 = [255, 0, 0];   // user click fireworks

// pad the screen so the fireworks don't appear too close to the edges
let padding = 10;

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
    // start firework show
    boops.push(new Firework(width/2, height/2, color1));
}

function draw() {
    // fade out the previous drawings
    background(0, 0, 0, 20);        // alpha suggestion 7 <= a <= 30
    for (let i = 0; i < boops.length; ++i) {
        if (boops[i].draw()) {
            boops.splice(i, 1);
        }
    }
    if (random(0, 1) > 0.97) {
        let x = random(width/padding, width-(width/padding));
        let y = random(height/padding, height-(height/padding));
        boops.push(new Firework(x, y, color1));
    }
}

function mousePressed() {
    boops.push(new Firework(mouseX, mouseY, color2));
}

class Firework {
    constructor(x, y, color) {
        // randomize the firework
        let count = Math.floor(random(15, 30));    // how many Dragon Curves are in the firework
        
        this.x = x;
        this.y = y;

        // list of dragon curves
        this.firework = [];
        let broken = random(0, 1) <= 0.25 ? true : false;  // add a chance element to get broken fireworks
        for (let i = 0; i < count; ++i) {
            let complexity = Math.floor(random(5, 7));     // how many generations the Dragon Curve is
            this.firework.push(new DragonCurve(complexity, this.x, this.y, color, broken));
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
            return this.drawFirework();
        }
    }

    // returns true or false depending on if the fireworks are done
    drawFirework() {
        for (let i = 0; i < this.firework.length; ++i) {
            if (!this.firework[i].draw()) {
                this.firework.splice(i, 1);
            }
        }
        this.index++;
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
    constructor(iterations, x, y, color, broken) {
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
        this.straight = broken;
    }

    generate() {
        let nextSentence = "";
        for (let i = 0; i < this.sentence.length; i++) {
            let current = this.sentence.charAt(i);
            nextSentence += this.rules[current] || current;
        }
        this.sentence = nextSentence;
    }

    // returns true/false on "is there more to draw"
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
            if (this.straight) {
                this.index++;   // makes the fireworks straight lines by incrementing over the + and -
            }
            return true;
        } else {
            return false;
        }
    }
}
