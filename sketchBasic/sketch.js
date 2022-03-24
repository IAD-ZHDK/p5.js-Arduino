/* jshint esversion: 8 */

var buffer;
let imagePixels = [];

function preload() {
  buffer = loadImage('img.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  setupSerial();
}


function draw() {
  background(0);
  let normalised = (SensorData/1024)
  if (!serialConnected) {
	  normalised = (mouseX/width)
  }
  circle(width/2,height/2, normalised*width,)
}

function keyPressed() {
    let fs = fullscreen();
    fullscreen(!fs);
  }

  /* full screening will change the size of the canvas */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
