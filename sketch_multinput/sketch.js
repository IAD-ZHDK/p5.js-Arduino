

function setup() {
  createCanvas(windowWidth, windowHeight);
  setupSerial(2); // give the length of the array here. this is important see serialCom.js

  noFill()
  stroke(255)
  strokeWeight(3);
}

function draw() {
  background(0);

    // draw output 
    let spacing = width / dataLength
    translate(spacing / 2, 0)
      for (let i = 0; i < dataLength; i++) {
        let value = filterArray[i];
        circle(spacing * i, height / 2, value)
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

function updateSensorDate() {

}