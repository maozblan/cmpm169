// fireworks.js - dragon curve firework oop
// Author: Lyssa Li
// Date: Jan 29th 2024, updated Jan 27th 2025

class Firework {
  constructor(x, y, color, p5) {
    // randomize the firework
    let count = Math.floor(p5.random(15, 30)); // how many Dragon Curves are in the firework

    this.x = x;
    this.y = y;

    this.p5 = p5; // p5 instance

    // list of dragon curves
    this.firework = [];
    let broken = p5.random(0, 1) <= 0.25 ? true : false; // add a chance element to get broken fireworks
    for (let i = 0; i < count; ++i) {
      let complexity = Math.floor(p5.random(5, 7)); // how many generations the Dragon Curve is
      this.firework.push(
        new DragonCurve(complexity, this.x, this.y, color, broken, p5)
      );
    }

    // for animation
    this.index = 0;
    this.stemIndex = 0;
    this.stemHeight = p5.height;
    this.stemLength = 5;
    this.color = color;
  }

  draw() {
    this.drawStem();
    if (this.stemIndex > (this.p5.height - this.y) / this.stemLength + 50) {
      // give a slight pause before fireworks hit
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
    this.p5.stroke(...this.color);
    if (this.stemIndex < (this.p5.height - this.y) / this.stemLength) {
      this.p5.line(this.x, this.stemHeight, this.x, this.stemHeight - this.stemLength);
      this.stemHeight -= this.stemLength;
    }
    this.stemIndex++;
  }
}

class DragonCurve {
  constructor(iterations, x, y, color, broken, p5) {
    // L system
    this.rules = {
      F: "F+G",
      G: "F-G",
    };
    this.sentence = "F";

    // dragon curve data
    this.len = p5.random(7, 10);
    this.angle = p5.random(95, 105);
    this.iterations = iterations;
    for (let i = 0; i < this.iterations; ++i) {
      this.generate(); // make sentence
    }

    // for the math (to avoid translations)
    this.x = x;
    this.y = y;
    this.currentAngle = p5.random(0, 360);

    // for animation
    this.index = 0;
    this.color = color;
    this.straight = broken;

    // p5 instance to draw from
    this.p5 = p5;
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
    this.p5.stroke(...this.color);
    if (this.index < this.sentence.length) {
      let current = this.sentence.charAt(this.index++);
      if (current === "F" || current === "G") {
        let offsetX = this.len * Math.cos(this.p5.radians(this.currentAngle));
        let offsetY = this.len * Math.sin(this.p5.radians(this.currentAngle));
        this.p5.line(this.x, this.y, this.x - offsetX, this.y + offsetY);
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
        this.index++; // makes the fireworks straight lines by incrementing over the + and -
      }
      return true;
    } else {
      return false;
    }
  }
}
