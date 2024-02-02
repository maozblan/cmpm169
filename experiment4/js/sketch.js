// sketch.js - it draw art
// Author: Lyssa Li
// Date:

var particles;
var img = []
var n, s, maxR;
var indexImg = 0;

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

	background("#FFEDDA");
	smooth();
	
	n = 1000;
	s = 10;
	maxR = height/2 - height/20;
	
	particles = [];
	
	img.push(loadImage('img/lasAmapolas.PNG'));
	img.push(loadImage('img/autorretrato.PNG'));
	img.push(loadImage('img/lilies.jpg'));
}

function draw() {
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
			s -= 2;
			initParticles();
		}
	}
}

function initParticles() {	
	for(let i = 0; i < n; i++) {
		particles.push(new Particle(maxR, s));
		
		var p = particles[i];
		var x = int(map(p.pos.x, -maxR, maxR, 1, img[indexImg].width));
    var y = int(map(p.pos.y, -maxR, maxR, 2, img[indexImg].height));
		p.c = img[indexImg].get(x, y);
	}
}

function mousePressed() {
	indexImg = (indexImg + 1) % img.length;
	setup();
}

class Particle {
  
  constructor(maxR_, s_) {
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
