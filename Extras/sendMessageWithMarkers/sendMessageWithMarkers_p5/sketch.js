/* jshint esversion: 8 */
let msg;
let serialOptions = { baudRate: 9600 };
let serial;
let clicked = false;
var sendData = false;
var sendButton;
var connect = false;
let isConnected = false;

function setup() {
  createCanvas(400, 400);
  background(255);
  gui = createGui("");
  gui.addGlobals("connect");

  sendButton = createButton("NO DATA");
  sendButton.position(20, 100);
  sendButton.size(200, 100);
  sendButton.style("font-family", "Roboto Mono");
  sendButton.style("font-size", "30px");
  sendButton.mousePressed(serialWriteArrayData);

  // Setup Web Serial using serial.js
  serial = new Serial();
  serial.on(SerialEvents.CONNECTION_OPENED, onSerialConnectionOpened);
  serial.on(SerialEvents.CONNECTION_CLOSED, onSerialConnectionClosed);
  serial.on(SerialEvents.DATA_RECEIVED, onSerialDataReceived);
  serial.on(SerialEvents.ERROR_OCCURRED, onSerialErrorOccurred);

  // Add in a lil <p> element to provide messages. This is optional
  msg = createP("");
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

function draw() {
  // Check if connect button is pressed and the connection is not established
  if (connect && !isConnected) {
    connectPort();
    isConnected = true;
  } else if (!connect && isConnected) {
    closePort();
    isConnected = false;
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

async function serialWriteArrayData() {
  if (serial.isOpen()) {
    if (clicked) {
      data = ["<, 1023, 0, 500, >"];
      serial.writeLine(data);
      sendButton.html("SOME DATA");
    } else {
      data = ["<, 0, 0, 0, >"];
      serial.writeLine(data);
      sendButton.html("NO DATA");
    }
  }
  clicked = !clicked;
}
