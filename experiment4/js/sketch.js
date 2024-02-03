// sketch.js - it draw art
// Author: Lyssa Li
// edited from https://openprocessing.org/sketch/2141314
// music from here https://pixabay.com/music/search/short%20classic%20piano/
// image from a google search
// with help from chatGPT https://chat.openai.com/share/e100ede3-374e-4566-9162-ee7ed8b0aca2
// Date:

var particles;
var img;
var s, l, maxR;
let start = false;
let cleanPage = false;
let song, amp, fft;
let lastPitch = 0;
let lastLevel = 0;

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
	
	maxR = height/2 - height/20;
	
	particles = [];

    // starter text
    textAlign(CENTER);
    text('CLICK TO PLAY', width/2, height/2);

    amp = new p5.Amplitude();
    fft = new p5.FFT();
}

function preload() {
    img = loadImage('img/starryNight.PNG');
    song = loadSound('img/lilix27s-dream-116990.mp3');
}

function draw() {
    translate(width/2, height/2);
    noStroke();
    
    let spectrum = fft.analyze();
    let pitch = getPitch(spectrum);
    let offset = 5;

    let level = amp.getLevel();
    let threshold = 0.02;
    // console.log(parseFloat(pitch.toFixed(5)), level);
    
    // Check if the pitch has changed
    if (start && ((level > lastLevel+threshold || level < lastLevel-threshold) || (pitch > lastPitch+offset || pitch < lastPitch-offset))) {
        // console.log('here');
        if (level > 0.15) {
            s = 9;
            l = 250;
        } else if (level < 0.11) {
            s = 3;
            l = 200;
        } else {
            s = 15;
            l = 350;
        }
        particles.push(new Particle(maxR, s, l));
        var p = particles[particles.length-1];
        var x = int(map(p.pos.x, -maxR, maxR, 1, img.width));
        var y = int(map(p.pos.y, -maxR, maxR, 2, img.height));
        p.c = img.get(x, y);
        lastPitch = pitch;
        lastLevel = level;
    }
    
    if (s > 1) {
        for (let i = 0; i < particles.length; i++) {
            var p = particles[i];
            p.show();
            p.move();
            
            if (p.isDead()) particles.splice(i, 1);
        }
    }

    // "background"
    stroke('#888888');
    strokeWeight(250);
    noFill();
    ellipse(0, 0, 825, 825);
    // amp circle
    let spec = fft.analyze();
    stroke('#9DD7DE');
    strokeWeight(2);
    
    beginShape();
    for (let i = 0; i < spec.length; i++) {
        let angle = map(i, 0, spec.length, 0, 80*PI);
        let amp = map(spec[i], 0, 255, 300, 450); // Adjust the amplitude range
    
        // Convert polar to Cartesian coordinates
        let x = cos(angle-PI/2.5) * amp;
        let y = sin(angle-PI/2.5) * amp;
    
        vertex(x, y);
    }
    endShape(CLOSE);

    if (cleanPage && !song.isPlaying()) {
        stroke('#064249');
        strokeWeight(1);
        textSize(30);
        text('f i n .', 350, 200); 
    }
}

function mousePressed() {
    if (!start) {
        if (!cleanPage) {
            background('#888888');
            cleanPage = true;
        }
        amp = new p5.Amplitude();
        fft = new p5.FFT();
        song.play();
        song.setVolume(0.7);
        start = true;
    } else {
        song.pause();
        start = false;
    }
}

class Particle {
  
  constructor(maxR_, s_, life) {  // s_ = size of particle
    this.s = s_;
    this.c = "";
    this.maxR = maxR_;
    
    this.life = life;
    
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

// from chatGPT
function getPitch(spectrum) {
    // Analyze the spectrum to get the dominant pitch
    let maxIndex = 0;
    for (let i = 1; i < spectrum.length; i++) {
        if (spectrum[i] > spectrum[maxIndex]) {
            maxIndex = i;
        }
    }
  
    // Map the index to a pitch value
    let pitch = map(maxIndex, 0, spectrum.length, 20, 20000);
  
    return pitch;
}
