// Birds.js - handles drawing of bird flocks on mouse click
// Author: Lyssa Li
// Date: 2024 Jan 22

class Bird {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(5, 10);
        this.rotation = random(TWO_PI);
        // for fade out effect, alpha in RGBA
        this.a = random(300, 400);
    }

    draw() {
        fill(255, 0, 0, this.a);
        noStroke();
        drawTriangle(this.x, this.y, this.size, this.rotation);
    }
    
    decreaseAlpha() {
        this.a -= random(10, 10);
    }
}

class Flock {
    constructor(x, y) {
        // flock fading out data
        this.counter = 0;
        this.birdCount = int(random(3, 5));
        // bird data
        this.flockArray = [new Bird(x, y)];
        this.lastBird = {'x': x, 'y': y};
    }

    draw() {
        for (let bird of this.flockArray) {
            bird.draw();
            // fade out the bird
            bird.decreaseAlpha();
            if (bird.a < 0) {
              this.flockArray.splice(this.flockArray.indexOf(bird), 1);
            }
        }
        // new birds
        if (this.counter < this.birdCount && random(0,1) > 0.4) {
            // tilt the new bird slightly right
            this.lastBird.x = this.lastBird.x + random(-5, 40);
            this.lastBird.y = this.lastBird.y + random(-40, 30);
            this.flockArray.push(new Bird(this.lastBird.x, this.lastBird.y));
            this.counter++;
            console.log(this.birdCount);
        }
    }
    
    addBird(bird) {
        this.flockArray.push(bird);
    }
}


// draws the birds
function drawBirds() {
    for (let flock of flocks) {
        flock.draw();
    }
}

// draws flock at mouse press location
function mousePressed() {
    console.log('boop');  
    let flock = new Flock(mouseX, mouseY);
    flocks.push(flock);
}

// edited from chatGPT
function drawTriangle(x, y, size, rotation) {
    push(); // Save the current transformation state
    translate(x, y); // Move the origin to the mouse position
    rotate(rotation); // Rotate

    // Draw a triangle with the given size
    triangle(-size / 2, size / (2 * sqrt(3)), 0, -size / sqrt(3), size / 2, size / (2 * sqrt(3)));

    pop(); // Restore the previous transformation state
}
