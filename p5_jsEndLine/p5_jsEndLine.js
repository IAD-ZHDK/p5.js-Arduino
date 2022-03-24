/* jshint esversion: 8 */

var buffer;
let imagePixels = [];

function preload() {
  buffer = loadImage('img.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  setupSerial();
	// loop through all the pixels in the buffer and save them to an array
	for (let x = 0; x < buffer.width; x++) {
		imagePixels[x] = []; // create nested array
		for (let y = 0; y < buffer.height; y++) {
			let pixelColor = buffer.get(x, y); 
			let r = red(pixelColor); //lets just take the first color chanel
			imagePixels[x][y] = r/5;
		}
	}
}


function draw() {
  background(0);
	stroke(255);
	strokeWeight(2);
	fill(0);
  let startX = -width*.05
  let startY = -height*.05
	let stepX = width*1.10/buffer.width;
	let stepY = height*1.10/buffer.height;
	// loop through all the pixels in the buffer
	for (let y = 0; y < buffer.height; y++) {
		beginShape();
		for (let x = 0; x < buffer.width; x++) {
      let normalised = (SensorData/1024)
			let h = imagePixels[x][y]*normalised*4; // we modify the height of our sudo 3D result using the mouseX¨
      let noiseVolume = (1.3-normalised)*10;
			let noiseMouse = noise(x*5, y*5, frameCount*(0.1+normalised))*noiseVolume; // here the noise value is tweeked with some modifiers to the result I was looking for
			h += noiseMouse;
			curveVertex(startX+(x*stepX), startY+(y*stepY)-h);
		}
		endShape();
	}
}

function mousePressed() {
    let fs = fullscreen();
    fullscreen(!fs);
  }

  /* full screening will change the size of the canvas */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
