// sketch.js - the main sketch
// Author: Lyssa Li
// edited from https://openprocessing.org/sketch/890654
// and with the help of chatGPT 
// Date: 2024 02 12

var particles = [];
const maxParticles = 1000;
const particlesPerRound = 50;
let index = 0; // current index of next available particle

// for the cube
var balls = [], r = 0;
const quant = 300, f = 1.00001, g = 0.1, bounce = 0.1, rad = 10;
const cube = {x:300, y:300, z:300}

function setup() {
	angleMode(DEGREES);
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height(), WEBGL);
    canvas.parent("canvas-container");
    // resize canvas is the page is resized
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });

	for(var i = 0; i<maxParticles; i++){
		particles.push(new particle);
	}
}

function draw() {
	rotateX(-mouseY);
	rotateY(mouseX);
	background(0);
    drawBox();

    // set up lights
    ambientLight(10);

	for(var i = 0; i<particles.length; i++){
		particles[i].update();
	}
}

class particle{
	constructor(){
		this.x = 0;
		this.y = 0;
		this.z = 0;
		this.ded = true;    // DON'T PLAY ON CREATION
		this.vel = [random(0, 0.5), random(0, 0.5), random(0, 0.5)];
		this.total = 0.5/(sqrt((this.vel[0]*this.vel[0])+(this.vel[1]*this.vel[1])+(this.vel[2]*this.vel[2]))+random(-0.9, -0.3));
		this.vel = [this.vel[0]*this.total*random([-1, 1]), this.vel[1]*this.total*random([-1, 1]), this.vel[2]*this.total*random([-1, 1])];
		this.color = 255;
		this.age = 0;
        this.size = random(1, 3);
        this.blink = false;
        this.blinkCounter = 0;
	}
    
    reset() {
        this.x = 0;
		this.y = 0;
		this.z = 0;
        this.ded = false;
		this.vel = [random(0, 0.5), random(0, 0.5), random(0, 0.5)];
		this.total = 0.5/(sqrt((this.vel[0]*this.vel[0])+(this.vel[1]*this.vel[1])+(this.vel[2]*this.vel[2]))+random(-0.9, -0.3));
		this.vel = [this.vel[0]*this.total*random([-1, 1]), this.vel[1]*this.total*random([-1, 1]), this.vel[2]*this.total*random([-1, 1])];
		this.color = 255;
		this.age = 0;
        this.size = random(1, 3);
        this.blink = false;
        this.blinkCounter = 0;
    }

	update() {
        if (!this.ded) {
            push();
            noStroke();
            fill(0);
            this.age += random(0.2, 2);
            if(this.ded === false && 1500<this.age){
                this.ded = true;
            }
            this.vel = [this.vel[0]*random(0.99, 1.001), this.vel[1]*random(0.99, 1.001), this.vel[2]*random(0.99, 1.001)];
            this.x += this.vel[0];
            this.y += this.vel[1];
            this.z += this.vel[2];
            
            // collision detection
            if (this.y > cube.y/2)      {this.y = cube.y/2;}
            if (this.y < -cube.y/2)     {this.y = -cube.y/2;}
            if (this.x > cube.x/2)      {this.x = cube.x/2;}
            if (this.x < -cube.x/2)     {this.x = -cube.x/2;}
            if (this.z > cube.z/2)      {this.z = cube.z/2;}
            if (this.z < -cube.z/2)     {this.z = -cube.z/2;}

            translate(this.x, this.y, this.z);

            // twinkling of stars 
            emissiveMaterial(255, 255, 255, 255); // Set the emissive (glowing) color
            if (random(0, 1) > 0.9995) {
                this.blink = true;
            }
            if (this.blink) {
                emissiveMaterial(0, 0, 0, 0);
                if (this.blinkCounter++ > 45) {
                    this.blink = false;
                }
            }
            sphere(this.size, 8, 4);
            pop();
        }
	}
}

function mousePressed() {
    // refactor next group of particles
    for(var i = 0; i<particlesPerRound; i++){
        particles[index++ % maxParticles].reset();
    }
}

function drawBox() {
    push();
    stroke(255/3);
    noFill();
	box(cube.x + rad * 2, cube.y + rad * 2, cube.z + rad * 2);
    translate(-cube.x / 2, -cube.y / 2, -cube.z / 2);
    pop();
}