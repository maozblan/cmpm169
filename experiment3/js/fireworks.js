// fireworks.js - l-system firework oop
// Author: Lyssa Li
// Date: Jan 29th 2024, updated Jan 27th 2025

class Firework {
  constructor(x, y, color, p5) {
    // firework data
    const a = [
      {
        type: DragonCurve,
        count: [15, 30],
        complexity: [5, 7],
      },
      {
        type: Tree,
        count: [15, 30],
        complexity: [3, 6],
      }
    ];

    // randomize the type of firework
    const k = p5.random(0, 1) <= 0.25 ? 1 : 0; // 25% chance of tree
    const fireworkType = a[k].type;

    // randomize the firework
    let count = Math.floor(p5.random(...a[k].count)); // how many curves are in the firework

    this.x = x;
    this.y = y;

    this.p5 = p5; // p5 instance

    // list of Curves
    this.firework = [];
    let diff = p5.random(0, 1) <= 0.30 ? true : false; // add a chance element to get mutated fireworks
    for (let i = 0; i < count; ++i) {
      let complexity = Math.floor(p5.random(...a[k].complexity)); // how many generations of L-system
      this.firework.push(
        new fireworkType(complexity, this.x, this.y, color, p5, diff)
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
      this.p5.line(
        this.x,
        this.stemHeight,
        this.x,
        this.stemHeight - this.stemLength
      );
      this.stemHeight -= this.stemLength;
    }
    this.stemIndex++;
  }
}

class DragonCurve {
  constructor(iterations, x, y, color, p5, broken) {
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
    for (let i = 0; i < this.sentence.length; ++i) {
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

class Tree {
  constructor(iterations, x, y, color, p5, reverse) {
    // L system
    this.rules = {
      1: "11",
      0: "1[0]0",
    };
    this.sentence = "0";

    // fractal tree data
    this.reverse = reverse;
    this.len = p5.random(7, 10);
    this.iterations = iterations;
    for (let i = 0; i < this.iterations; ++i) {
      this.generate(); // make sentence
    }

    // for the math (to avoid translations)
    this.x = x;
    this.y = y;
    this.currentAngle = p5.random(0, 360);
    this.loc = [];

    // for animation
    this.index = 0;
    this.color = color;

    // p5 instance to draw from
    this.p5 = p5;
  }

  generate() {
    let nextSentence = "";
    for (let i = 0; i < this.sentence.length; ++i) {
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
      if (current === "1" || current === "0") {
        let offsetX = this.len * Math.cos(this.p5.radians(this.currentAngle));
        let offsetY = this.len * Math.sin(this.p5.radians(this.currentAngle));
        this.p5.line(this.x, this.y, this.x - offsetX, this.y + offsetY);
        this.x -= offsetX;
        this.y += offsetY;
      } else if (current === "[") {
        if (this.reverse) {
          this.currentAngle += 45;
        } else {
          this.currentAngle -= 45;
        }
        this.#locPush();
      } else if (current === "]") {
        this.#locPop();
        if (this.reverse) {
          this.currentAngle -= 90;
        } else {
          this.currentAngle += 90;
        }
      }
      return true;
    } else {
      return false;
    }
  }

  #locPush() {
    this.loc.push([this.x, this.y, this.currentAngle]);
  }
  #locPop() {
    [this.x, this.y, this.currentAngle] = this.loc.pop();
  }
}
