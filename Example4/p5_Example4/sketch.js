/* jshint esversion: 8 */

let shapeFraction = 0; // tracks the new shape fraction off serial
let serial; // the Serial object
let serialOptions = { baudRate: 9600 };
var connect = false;
let isConnected = false;
var previousData= null;

function setup() {
  createCanvas(800, 800);
  background(0);
  //add gui
  gui = createGui("");
  gui.addGlobals("connect");

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
  background(0);

  // Check if connect button is pressed and the connection is not established
  if (connect && !isConnected) {
    connectPort();
    isConnected = true;
  } else if (!connect && isConnected) {
    closePort();
    isConnected = false;
  }

  // Set the diameter based on potentiometer value
  const maxDiameter = min(width, height);
  let circleDiameter = maxDiameter * shapeFraction;
  console.log("circleDiameter", circleDiameter);
  circle(width / 2, height / 2, circleDiameter);
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
}

function onSerialConnectionOpened(eventSender) {
  console.log("onSerialConnectionOpened");
}

function onSerialConnectionClosed(eventSender) {
  console.log("onSerialConnectionClosed");
}

function onSerialDataReceived(eventSender, newData) {
  msg.html("onSerialDataReceived: " + newData);

  if (newData.length != 0) {
    if (newData !== previousData) {
      shapeFraction = newData;
      previousData = newData;
    }
  }
}
