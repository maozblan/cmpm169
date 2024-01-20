// sketch.js - purpose and description here
// Author: Your Name
// Date:

let counter = 0;

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

    forestSize = random(20, 30);
    //create tree and leaves array letiables 
    for (let i = 0; i < forestSize; i++) {
        this['tree' + i] = [];
        this['leaves' + i] = [];
    }

    for (let i = 0; i < forestSize; i++) {
        createTree(i);
    }
    
    /*
    resetButton = createImg('assets/restartIcon.png');
    resetButton.size(20, 20);
    resetButton.position(530, 252);
    resetButton.mousePressed(resetSketch);
    */
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


function createTree(num) {

    widthVal = random(1, width)

    if (widthVal > width / 2) {
        endRootVal = widthVal - (widthVal / random(1, 500));
    }
    else {
        endRootVal = widthVal + (widthVal / random(1, 500));
    }

    let a = createVector(widthVal, height);
    let b = createVector(endRootVal, height - random(40, 180));
    let root = new Branch(a, b);

    this['tree' + num][0] = root;

    let branchEnd = 6;
    for (let i = 0; i < branchEnd; i++) {

        for (let i = this['tree' + num].length - 1; i >= 0; i--) {
            if (!this['tree' + num][i].finished) {
                this['tree' + num].push(this['tree' + num][i].branchLeft());
                this['tree' + num].push(this['tree' + num][i].branchRight());
            }
            this['tree' + num][i].finished = true;
        }

        counter++;
        leafSpawnChance = random(0, 1);
        if (counter == branchEnd && leafSpawnChance > 0.2) {
            for (let i = 0; i < this['tree' + num].length; i++) {
                if (!this['tree' + num][i].finished) {
                    let leaf = this['tree' + num][i].end.copy();
                    this['leaves' + num].push(leaf);
                }
            }

        }
    }

    counter = 0;
}


// main loop! 
function draw() {

    // background
    drawGradient();
    drawStars();  // stars has it's own draw function


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

function drawTree(num) {

    //Show Tree
    for (let i = 0; i < this['tree' + num].length; i++) {
        this['tree' + num][i].show();
    }

    //Show Leaves
    for (let i = 0; i < this['leaves' + num].length; i++) {
        fill(7, 11, 52);
        noStroke();
        ellipse(this['leaves' + num][i].x, this['leaves' + num][i].y, 25, 25);
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

    draw() {
        this.t += 0.1;
        let scale = this.size + sin(this.t) * 2;
        noStroke();
        fill(255, 255, 255);

        ellipse(this.x, this.y, scale, scale);
    }
}
