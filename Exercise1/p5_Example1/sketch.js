/* jshint esversion: 8 */
let msg;
let serialOptions = { baudRate: 9600 };
let serial;
var sendData = false;
var sendButton;
var connect = false;
let isConnected = false;

let timeBetweenDataSend = 500; // 100ms
let lastDataSendTime = 0; // init the last time data was sent

function setup() {
  createCanvas(400,400);
  background(255);
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
  background(0)
  // Check if connect button is pressed and the connection is not established
  if (connect && !isConnected) {
    connectPort();
    isConnected = true; 
  } else if (!connect && isConnected) {
    closePort();
    isConnected = false; 
  }

  let bright = map(mouseX, 0, width, 0, 255);
  bright = constrain(bright, 0,255);
  //send values to arduino

  // send data every x seconds defined by timeBetweenDataSend value
    let currentSendTime = millis() - lastDataSendTime;
    if(currentSendTime > timeBetweenDataSend){
      serialWriteNumberData(bright);
      lastDataSendTime = millis();
    }
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
}
 
// send data to serial port
async function serialWriteNumberData(val){
    console.log(val)
    serial.writeLine(val);
    //alt shift 7 to do a backslash
}

