function setup() {
  createCanvas(windowWidth, windowHeight);
  setupSerial();
}


function draw() {
  background(0);
  var array = SensorData.split(',');
  var value1 = parseInt(array[0]) / 1024;
  var value2 = parseInt(array[1]) / 1024;

  fill(value1*255,150,0)
  let sinWave = sin(radians(frameCount*value1))*(value2*width);
  circle(width/2,height/2, sinWave)
}

function keyPressed() {
//    let fs = fullscreen();
 //   fullscreen(!fs);
  }

  /* full screening will change the size of the canvas */
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
