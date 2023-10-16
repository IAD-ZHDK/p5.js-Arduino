/* jshint esversion: 8 */

let msg;
let serialOptions = { baudRate: 9600 };
let serial;
let clicked = true;
var connect = false;
let isConnected = false;
let col = 255;
var brightness = 1023;
var txt = "Day";
var previousData = "null"

function setup() {
  createCanvas(800,800);
  background(255);
  textSize(200)
  textAlign(CENTER, CENTER)
  textFont("Roboto Mono")
  //add gui
  gui = createGui("");
  gui.addGlobals('connect');

  // Setup Web Serial using serial.js
  serial = new Serial();
  serial.on(SerialEvents.CONNECTION_OPENED, onSerialConnectionOpened);
  serial.on(SerialEvents.CONNECTION_CLOSED, onSerialConnectionClosed);
  serial.on(SerialEvents.DATA_RECEIVED, onSerialDataReceived);
  serial.on(SerialEvents.ERROR_OCCURRED, onSerialErrorOccurred);
  // Add <p> element to provide messages. This is optional.
  msg = createP("");


}

function draw() {
  // Check if connect button is pressed and the connection is not established
  if (connect && !isConnected) {
    connectPort();
    isConnected = true; 
  } else if (!connect && isConnected) {
    closePort();
    isConnected = false; 
  }

 //change background color and text based on brightness
  if (brightness > 125){
    col = 0
    txt = "Day"
  }else {
   col = 255
    txt = "Night"
  }
  background(255- col);
  fill(col);
  text(txt, width/2, height/2);
}

async function connectPort() {
  if (!serial.isOpen()) {
    await serial.connectAndOpen(null, serialOptions);
  } else {
    serial.autoConnectAndOpenPreviouslyApprovedPort(serialOptions);
  }
}

async function closePort() {
  if (serial.isOpen()) {
    await serial.close();
  }
}

 function onSerialErrorOccurred(eventSender, error) {
  console.log("onSerialErrorOccurred", error);
  msg.html(error);
}

function onSerialConnectionOpened(eventSender) {
  console.log("onSerialConnectionOpened");
  msg.html("Serial connection opened successfully");
}

function onSerialConnectionClosed(eventSender) {
  console.log("onSerialConnectionClosed");
  msg.html("onSerialConnectionClosed");
}

function onSerialDataReceived(eventSender, newData) {
  console.log("onSerialDataReceived", newData);
  msg.html("onSerialDataReceived: " + newData);

  if (newData.length != 0) {
    if (newData !== previousData) {
      brightness = parseInt(newData);
      previousData = newData; // Update the previous data
    }
    
  }
}
 
