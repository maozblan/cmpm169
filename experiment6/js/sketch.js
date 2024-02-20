// sketch.js - it's funnnn
// Author: Lyssa Li
// Date: 2024 02 19

// edited from https://openprocessing.org/sketch/1098610

const size = 30;
let img;

let chars = [" ", "；", "。", "光", "空", "亮", "耀"], // [" ", "*", "•", "o", "0", "O", "●"],
		data,
		particles = [],
		colors;

function setup() {
	// place our canvas, making it fit our container
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
    canvas.parent("canvas-container");

	textFont("Century Schoolbook", size*1);
	data = new Array(width/size*height/size).fill().map(() => 0);

	// image data
	colors = [];
	for (let j=0; j<height; j+=size) {
		for (let i=0; i<width; i+=size) {
			colors.push(getAverageColor(i, j, size))
		}
	}
}

function preload() {
    img = loadImage('img/starryNight.PNG');	// got too lazy to copy it over XD
}


function draw() {
	background(0);
	const ps = particles.sort((a, b) => a.vel.magSq()-b.vel.magSq());
	let p;
	for(let i = 0; i < data.length; i ++){
		fill(...colors[i]);
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

		// lower
		p.time -= Math.random(0.1, 2)
		if (p.time <= 0) {
			console.log('e', particles)
			particles.splice(particles.indexOf(p), 1);
		}
	}
}

function mouseDragged(){
	if (new p5.Vector(mouseX-pmouseX, mouseY-pmouseY).mag() > 5) {
		particles.push({
			pos: new p5.Vector(mouseX, mouseY),
			vel: new p5.Vector(mouseX-pmouseX, mouseY-pmouseY).div(4),
			time: 150,
		});
	}
}

// edited from chatGPT https://chat.openai.com/share/6ad70d5f-95cf-434b-a485-b77121985160
function getAverageColor(x, y, areaSize) {
	let totalR = 0;
	let totalG = 0;
	let totalB = 0;
  
	// Loop through the pixels in the specified area
	for (let i = 0; i <= areaSize; i++) {
	  for (let j = 0; j <= areaSize; j++) {
		let pixelColor = img.get(x + i, y + j);
  
		// Accumulate the RGB values
		totalR += red(pixelColor);
		totalG += green(pixelColor);
		totalB += blue(pixelColor);
	  }
	}
  
	// Calculate the average RGB values
	let avgR = totalR / (areaSize * areaSize);
	let avgG = totalG / (areaSize * areaSize);
	let avgB = totalB / (areaSize * areaSize);
  
	return [avgR, avgG, avgB];
  }
