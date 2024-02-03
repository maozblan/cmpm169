// sketch.js - it draw art
// Author: Lyssa Li
// edited from https://openprocessing.org/sketch/2141314
// music from here https://pixabay.com/music/search/short%20classic%20piano/
// image from a google search
// Date:

var particles;
var img;
var n, s, maxR;
let start = false;
let song;

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

	background("#888888");
	smooth();
	
	n = 1000;
	s = 10;
	maxR = height/2 - height/20;
	
	particles = [];

    // starter text
    textAlign(CENTER);
    text('CLICK TO PLAY', width/2, height/2);

    // amplitude circle
    fft = new p5.FFT();
    song.play();
}

function preload() {
    img = loadImage('img/starryNight.PNG');
    song = loadSound('img/lilix27s-dream-116990.mp3');
}

function draw() {
    if (start) {
        translate(width/2, height/2);
        noStroke();
        
        if(s > 1) {
            if(particles.length != 0) {
                for(let i = 0; i < particles.length; i++) {
                    var p = particles[i];
                    p.show();
                    p.move();
                    
                    if(p.isDead()) particles.splice(i, 1);
                }
            } else {
                // s -= 2;
            }
        }

        /*
        background("#888888");
        let spectrum = fft.analyze();
        noFill();
        stroke(255);
        strokeWeight(2);
      
        beginShape();
        for (let i = 0; i < spectrum.length; i++) {
            let angle = map(i, 0, spectrum.length, 0, 80*PI);
            let amp = map(spectrum[i], 0, 255, 300, 350); // Adjust the amplitude range
      
            // Convert polar to Cartesian coordinates
            let x = cos(angle) * amp;
            let y = sin(angle) * amp;
      
            vertex(x, y);
        }
        endShape(CLOSE);
        */
    }
}

function mousePressed() {
    if (!start) {
        background("#888888");
        song.play();
        start = true;
    } else {
        particles.push(new Particle(maxR, s));
		var p = particles[particles.length-1];
		var x = int(map(p.pos.x, -maxR, maxR, 1, img.width));
        var y = int(map(p.pos.y, -maxR, maxR, 2, img.height));
		p.c = img.get(x, y);
    }
}

class Particle {
  
  constructor(maxR_, s_) {  // s_ = size of particle
    this.s = s_;
    this.c = "";
    this.maxR = maxR_;
    
    this.life = 200;
    
    this.init();
  }
  
  init() {
    this.pos = p5.Vector.random2D();
    this.pos.normalize();
    this.pos.mult(random(2, maxR));

    this.vel = createVector();
  }

  show() {
    fill(this.c);
    ellipse(this.pos.x, this.pos.y, this.s, this.s);
    this.life -= 1;
  }
  
  move() {
    var angle = noise(this.pos.x / 400, this.pos.y / 600) * TAU;
    
    this.vel.set(cos(angle), sin(angle));
    this.vel.mult(0.3);
    this.pos.add(this.vel);
  }
  

  isDead() {
    var d = dist(this.pos.x, this.pos.y, 0, 1);
 
    if(d > this.maxR || this.life < 1) return true;
    else return false;
  }
}
