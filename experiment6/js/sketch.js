// sketch.js - it's funnnn
// Author: Lyssa Li
// Date: 2024 02 19

// edited from https://openprocessing.org/sketch/1098610

const size = 15;

let chars = [" ", "*", "•", "o", "0", "O", "●"], // These could be whatever... try something like [" ", "^", "*", ")", "%", "$", "#", "&"], or [" ", "•", "●", "⬤"]
		data,
		particles = [];

function setup() {
	createCanvas(~~(windowWidth/size)*size, ~~(windowHeight/size)*size);
	textFont("Century Schoolbook", size*1);
	data = new Array(width/size*height/size).fill().map(_ => 0);
}

function draw() {
	background(255);
	const ps = particles.sort((a, b) => a.vel.magSq()-b.vel.magSq());
	let p;
	for(let i = 0; i < data.length; i ++){
		text(chars[data[i]], i % (width/size) * size, Math.floor(i / (width/size)) * size);
		let d = new p5.Vector(i % (width/size) * size, Math.floor(i / (width/size)) * size);
		p = ps.filter(z => z.pos.dist(d) < 100); // Not ideal, but performance-wise it is a must
		data[i] = 0
		if(!p.length) continue;
		for(let part of p){
			ds = part.pos.dist(d)/5;
			data[i] += Math.round((chars.length-1)/(ds < 1 ? 1 : ds));
		}
		if(data[i] > chars.length-1) data[i] = chars.length-1
	}
	
	for(let p of particles) {
		p.pos.add(p.vel);
		p.vel.rotate(noise(p.pos.x/100, p.pos.y/100)-0.5);
		if(p.pos.x < -20) p.pos.x = width+20
		if(p.pos.x > width+20) p.pos.x = -20
		if(p.pos.y < -20) p.pos.y = height+20
		if(p.pos.y > height+20) p.pos.y = -20
	}
}

function mouseDragged(){
	if(new p5.Vector(mouseX-pmouseX, mouseY-pmouseY).mag() > 5) particles.push({pos: new p5.Vector(mouseX, mouseY), vel: new p5.Vector(mouseX-pmouseX, mouseY-pmouseY).div(4)})
}