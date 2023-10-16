
#define INPUT_PIN A0

const int MAX_ANALOG_INPUT = 1023;
const int DELAY_MS = 50;

int prevValue = -1;
float sizeFrac;

void setup() {
  Serial.begin(9600); // set baud rate to 9600
}

void loop() {

  // Get the new analog value
  int currentVal = analogRead(INPUT_PIN);

  if (prevValue != currentVal) {
    sizeFrac = currentVal / (float) MAX_ANALOG_INPUT;
  }

  if (prevValue != sizeFrac ) {
    Serial.println(sizeFrac, 4);
  }

  prevValue = currentVal;

}
