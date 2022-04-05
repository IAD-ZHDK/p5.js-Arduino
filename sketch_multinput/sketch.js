
let filterArray = []

function setup() {
  createCanvas(windowWidth, windowHeight);
  setupSerial();
  for (let i = 0; i < 10; i++) {
    filterArray[i] = 1.0
  }
}

function draw() {
  background(0);
  if (SensorData) {
    var dataArray = SensorData.split(',');
    let length = dataArray.length
    // filter 
    for (let i = 0; i < length; i++) {
      let value = parseFloat(dataArray[i]);
      filterArray[i] = filterArray[i] * 0.95
      filterArray[i] += value * 0.05
      value = parseFloat(dataArray[i]);
    }
    // draw OUTPUT 
    let spacing = width / length
    noFill()
    stroke(255)
    strokeWeight(3);
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
