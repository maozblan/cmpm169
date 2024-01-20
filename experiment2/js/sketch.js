// sketch.js - purpose and description here
// Author: Your Name
// Date:

let starX = [];
let starY = [];
let stars = [];

let forestSize;
let resetButton

function preload() {
    
}

function setup() {

    createCanvas(windowWidth, windowHeight);
    //textFont(myFont);

    initStars();

    forestSize = int(width / 100);
    //create tree and leaves array letiables 
    for (let i = 0; i < forestSize; i++) {
        this['tree' + i] = [];
        this['tree' + (forestSize+i)] = [];
        this['leaves' + i] = [];
        this['leaves' + (forestSize+i)] = [];
    }

    // create the list of trees to be drawn
    for (let i = 0; i < forestSize; i++) {
        // layer 1
        createTree(i, height * 0.07, height * 0.25);
        // layer 2
        createTree(forestSize+i, height * 0.23, height * 0.4);
    }
}

function resetSketch() {
    clear();
    //resetButton.remove();
    setup();
}

function initStars() {
    for (let i = 0; i < 50; i++) {
        stars[i] = new Star();
    }
}

// make a list of tree branchs and leaves
function createTree(num, minHeight, maxHeight) {
    // random x location for root of tree and ending position of tree
    widthVal = random(1, width);
    if (widthVal > width / 2) {
        endRootVal = widthVal - (widthVal / random(1, 500));
    } else {
        endRootVal = widthVal + (widthVal / random(1, 500));
    }

    let a = createVector(widthVal, height);
    let b = createVector(endRootVal, height - random(minHeight, maxHeight));
    let root = new Branch(a, b);

    this['tree' + num][0] = root;

    let branchEnd = 3;
    let counter = 0;
    for (let i = 0; i < branchEnd; i++) {
        // mock recursive fractal calls
        for (let i = this['tree' + num].length - 1; i >= 0; i--) {
            if (!this['tree' + num][i].finished) {
                this['tree' + num].push(this['tree' + num][i].branchLeft());
                this['tree' + num].push(this['tree' + num][i].branchRight());
            }
            this['tree' + num][i].finished = true;
        }
        counter++;
        if (counter == branchEnd) {
            for (let i = 0; i < this['tree' + num].length; i++) {
                if (!this['tree' + num][i].finished) {
                    let leaf = this['tree' + num][i].end.copy();
                    this['leaves' + num].push(leaf);
                }
            }

        }
    }
}


// main loop! 
function draw() {

    // background
    drawGradient();
    drawStars();  // stars has it's own draw function


    // back tree layer
    for (let i = 0; i < forestSize; i++) {
        drawTree(forestSize+i);
    }

    // mist

    // front tree layer
    for (let i = 0; i < forestSize; i++) {
        drawTree(i);
    }

    //text
    noStroke();
    textSize(25);
    fill(255)
    //text('F r a c t a l    F o r e s t', 130, 270);

    noStroke();
    textSize(15);
    //text('~ V i v e k   S i n g h   N e g i', 130, 310);
}

// from the list of trees made in createTree
function drawTree(num) {
    // Show Tree
    for (let i = 0; i < this['tree' + num].length; i++) {
        this['tree' + num][i].show();
    }
    // Show Leaves
    for (let i = 0; i < this['leaves' + num].length; i++) {
        fill(0);
        noStroke();
        let leafSize = 100;
        ellipse(this['leaves' + num][i].x, this['leaves' + num][i].y, leafSize, leafSize);
    }
}


function drawStars() {
    for (let i = 0; i < stars.length; i++) {
        stars[i].draw();
    }
}

function drawGradient() {
    let color1 = color(50);  //top
    let color2 = color(150); //bottom
    setGradient(0, 0, windowWidth, windowHeight, color1, color2, "Y");
}

function setGradient(x, y, w, h, c1, c2, axis) {
    noFill();
    if (axis == "Y") {  // Top to bottom gradient
        for (let i = y; i <= y + h; i++) {
            let inter = map(i, y, y + (h * 1.3), 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(x, i, x + w, i);
        }
    }
}

class Star {
    constructor() {
        this.x = random(windowWidth);
        this.y = random(windowHeight);
        this.size = random(0.25, 4);
        this.t = random(TAU);
    }

    // has it's own draw function so make the "sparkle"
    draw() {
        this.t += 0.1;
        let scale = this.size + sin(this.t) * 2;
        noStroke();
        fill(255, 255, 255);
        ellipse(this.x, this.y, scale, scale);
    }
}
