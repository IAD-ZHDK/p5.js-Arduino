
let filterArray = []

function setup() {
  createCanvas(windowWidth, windowHeight);
  setupSerial(); // this is important see serialCom.js 
  for (let i = 0; i < 10; i++) { // change the max output from 10 to however many values are expexted
    filterArray[i] = 1.0
  }
  noFill()
  stroke(255)
  strokeWeight(3);
}

function draw() {
  background(0);
  if (SensorData) {
    var dataArray = SensorData.split(','); // split the incomming string into aray items based on comma seperation
    let length = dataArray.length
    // filter 
    for (let i = 0; i < length; i++) {
      let value = parseFloat(dataArray[i]); // we expect floats in this example 
      filterArray[i] = filterArray[i] * 0.95
      filterArray[i] += value * 0.05
      value = parseFloat(dataArray[i]);
    }
    // draw output 
    let spacing = width / length
    translate(spacing / 2, 0)
    for (let i = 0; i < length; i++) {
      let value = filterArray[i];
      circle(spacing * i, height / 2, value)
    }
  }
}



function keyPressed() {
  //    let fs = fullscreen();
  //   fullscreen(!fs);
}

/* full screening will change the size of the canvas */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
