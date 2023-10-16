
#define INPUT_PIN A0
const int MAX_ANALOG_INPUT = 1023;
const int DELAY_MS = 50;

// variables:
int sensorValue = 0;         // the sensor value
int sensorMin = 1023;        // minimum sensor value
int sensorMax = 0;           // maximum sensor value

void setup() {
  Serial.begin(9600); // set baud rate to 9600

  // calibrate during the first five seconds
  while (millis() < 5000) {
    sensorValue = analogRead(INPUT_PIN);

    // record the maximum sensor value
    if (sensorValue > sensorMax) {
      sensorMax = sensorValue;
    }

    // record the minimum sensor value
    if (sensorValue < sensorMin) {
      sensorMin = sensorValue;
    }
    // delay a bit
    delay(DELAY_MS);
  }

}

void loop() {
  // Get the new analog value
  sensorValue = analogRead(INPUT_PIN);
  // apply the calibration to the sensor reading
  sensorValue = map(sensorValue, sensorMin, sensorMax, 0, 255);
  // in case the sensor value is outside the range seen during calibration
  sensorValue = constrain(sensorValue, 0, 255);

  Serial.println(sensorValue);
  delay(DELAY_MS);
}
