#define NUM_VALUES 1
#define OUTPUT_PIN A0

int incomingValues[NUM_VALUES];
const int DELAY_MS = 50;

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
    int ouputValue =map(rcvdSerialData.toInt(), 0, 1, 0, 1023);
    analogWrite(OUTPUT_PIN, ouputValue);
    Serial.println(ouputValue);
  }
  
  delay(DELAY_MS);
}