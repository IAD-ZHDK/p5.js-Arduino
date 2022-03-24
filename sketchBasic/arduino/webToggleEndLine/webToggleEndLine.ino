
#define NUM_VALUES 2
#define OUTPUT_PIN 10
#define INPUT_PIN A0

int count = 0;
int lastSensorValue = 0;
int sensorFiltered = 0;
int incomingValues[NUM_VALUES];
const int DELAY_MS = 500;

void setup() {
  Serial.begin(9600);
  pinMode(OUTPUT_PIN, OUTPUT);
}

void loop() {
  // Check to see if there is any incoming serial data
  if (Serial.available() > 0) {
    // read string until the end of the line
    String rcvdSerialData = Serial.readStringUntil('\n');
    // set the output value of PWM pin
    int ouputValie = constrain(rcvdSerialData.toInt(), 0, 254);
    analogWrite(OUTPUT_PIN, ouputValie);
  }
  
  int sensorValue = analogRead(INPUT_PIN);
  // print the results to the Serial Monitor:
  sensorFiltered = sensorFiltered*0.9;
  sensorFiltered += sensorValue*0.1;
  
  if (lastSensorValue != sensorFiltered) {
    Serial.println(sensorFiltered);
    lastSensorValue = sensorFiltered;
  }
  
  // wait 2 milliseconds before the next loop for the analog-to-digital
  // converter to settle after the last reading:
  delay(2);
}


// Function for splitting incoming array values

//void split(String inputString, int returnData[], int numOfValues)
//{
//  int index = 0;
//  int lastPos = 0;
//
//  for (int i = 0; i < inputString.length(); i++)
//  {
//    if (inputString.charAt(i) == ',' && index < numOfValues)
//    {
//      String tempStr = inputString.substring(lastPos, i);
//      Serial.println(tempStr);
//      returnData[index] = tempStr.toInt();
//      index++;
//      lastPos = i + 1;
//    }
//  }
