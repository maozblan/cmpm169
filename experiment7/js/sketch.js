// sketch.js - some silly data visualization
// Author: Lyssa
// Date: 2024 02 26

let p1Line, p2Line, p3Line, timer;

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
    p1Line = new LineGraph('#FFA9A9', 25, 0, width/2);
    p2Line = new LineGraph('#A9FFA9', 30, 0, width/2);
    p3Line = new LineGraph('#A9A9FF', 35, 0, width/2);

    // timer
    timer = new TimeData();
}

function draw() {
    background(255);

    // timer behind the lines
    timer.draw();
    
    p1Line.draw();
    p2Line.draw();
    p3Line.draw();
}

function keyPressed() {
    if (timer.isReady()) {
        let date = 0;
        let flag = true; // if it's okay to go
        switch (key) {
            case '1':
                flag = true;
                date = 1;
                break;
            case '2':
                flag = true;
                date = 2;
                break;
            case '3':
                flag = true;
                date = 3;
                break;
            case '4':
                flag = true;
                date = 4;
                break;
            case '5':
                flag = true;
                date = 5;
                break;
            default:
                flag = false;
        }
        if (flag) {
            p1Line.setData(p1[date-1]);
            p2Line.setData(p2[date-1]);
            p3Line.setData(p3[date-1]);
            timer.setDate(date);
            timer.start();
        }
    }
}
