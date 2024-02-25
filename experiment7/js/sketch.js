// sketch.js - some silly data visualization
// Author: Lyssa
// Date: 2024 02 26

let p1Line, p2Line, p3Line;

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

    // create the lines
    // LineGraph(color, zero, xStart, xEnd)
    p1Line = new LineGraph('#FF6464', 25, 0, width/2);
    p2Line = new LineGraph('#64FF64', 30, 0, width/2);
    p3Line = new LineGraph('#6464FF', 35, 0, width/2);
}

function draw() {
    background(255);
    p1Line.draw();
    p2Line.draw();
    p3Line.draw();
}

function mousePressed() {
    p1Line.setData(p1);
    p2Line.setData(p2);
    p3Line.setData(p3);
}
