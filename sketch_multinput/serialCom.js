/* jshint esversion: 8 */

let msg;
let serialOptions = { baudRate: 9600 };
let serial;
let serialConnected = false;
let button;
let dataLength = 0;
let SensorData = "";
let dataAvailable = false;
let filterArray = []

function setupSerial(length) {
  dataLength = length;
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
  for (let i = 0; i < length; i++) { // change the max output from 10 to however many values are expexted
    filterArray[i] = 1.0
  }
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
  serialConnected = true
  button.remove();
}

/**
 * Callback function by serial.js when web serial connection is closed
 */
function onSerialConnectionClosed(eventSender) {
  console.log("onSerialConnectionClosed");
  serialConnected = false;
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

  if (SensorData) {
    dataAvailable = true;
    var dataArray = SensorData.split(','); // split the incomming string into aray items based on comma seperation
    dataLength = dataArray.length
    // filter 
    for (let i = 0; i < dataLength; i++) {
      let value = parseFloat(dataArray[i]); // we expect floats in this example 
      if (!filterArray[i]) {
        filterArray[i] = 1.0
      }
      filterArray[i] = filterArray[i] * 0.95
      filterArray[i] += value * 0.05
      value = parseFloat(dataArray[i]);
    }
  }
}

