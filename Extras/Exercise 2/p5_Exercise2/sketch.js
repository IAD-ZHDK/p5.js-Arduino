/* jshint esversion: 8 */

let msg;
let serialOptions = { baudRate: 9600 };
let serial;
let clicked = true;
var connect = false;
let isConnected = false;

function setup() {
  createCanvas(400,400);
  background(255);
  textAlign(CENTER)

  gui = createGui("");
  gui.addGlobals('connect');

  //create a slider here
  send = createSlider(0, 180, 0);
  send.position(20, 100);
  send.style('width', '200px');
  send.style('cursor', 'pointer');
  send.changed(serialWriteNumberData);

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
  background(255);
  text(send.value(), 240, 105);
    // Check if connect button is pressed and the connection is not established
    if (connect && !isConnected) {
      connectPort();
      isConnected = true; 
    } else if (!connect && isConnected) {
      closePort();
      isConnected = false; 
    }

   // serialWriteNumberData();
}

async function connectPort() {
  if (!serial.isOpen()) {
    await serial.connectAndOpen(null, serialOptions);
  } else {
    serial.autoConnectAndOpenPreviouslyApprovedPort(serialOptions);
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
}
 
async function serialWriteNumberData() {
  if (serial.isOpen()) {
    await serial.writeLine(send.value());
  }
}
