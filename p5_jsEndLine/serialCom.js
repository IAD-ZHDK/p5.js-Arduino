/* jshint esversion: 8 */

let msg;
let serialOptions = { baudRate: 9600 };
let serial;
let button;

let SensorData = 0;

function setupSerial() {
  // Setup Web Serial using serial.js
  serial = new Serial();
  serial.on(SerialEvents.CONNECTION_OPENED, onSerialConnectionOpened);
  serial.on(SerialEvents.CONNECTION_CLOSED, onSerialConnectionClosed);
  serial.on(SerialEvents.DATA_RECEIVED, onSerialDataReceived);
  serial.on(SerialEvents.ERROR_OCCURRED, onSerialErrorOccurred);
//  
  button = createButton('connect to serial');
  button.position(10, 10);
  button.mousePressed(connectPort);
}


async function connectPort() {
  if (!serial.isOpen()) {
    await serial.connectAndOpen(null, serialOptions);
  } else {
    serial.autoConnectAndOpenPreviouslyApprovedPort(serialOptions);
  }
}


/**
 * Callback function by serial.js when there is an error on web serial
 */
 function onSerialErrorOccurred(eventSender, error) {
  console.log("onSerialErrorOccurred", error);
 
}

/**
 * Callback function by serial.js when web serial connection is opened
 */
function onSerialConnectionOpened(eventSender) {
  console.log("Serial connection opened successfully");
  button.remove();
}

/**
 * Callback function by serial.js when web serial connection is closed
 */
function onSerialConnectionClosed(eventSender) {
  console.log("onSerialConnectionClosed");
  button = createButton('click me');
  button.position(10, 10);
  button.mousePressed(connectPort);
}

/**
 * Callback function serial.js when new web serial data is received
 * 
 * @param {*} eventSender 
 * @param {String} newData new data received over serial
 */
function onSerialDataReceived(eventSender, newData) {
  console.log("d:", newData);
 // msg.html("onSerialDataReceived: " + newData);
 SensorData = newData;
}

