
#define INPUT_PIN A0
#define BUTTON_PIN 2
const int MAX_ANALOG_INPUT = 1023;
const int DELAY_MS = 5;

int prevValue = -1;
int lastButtonState;
int currentButtonState;
int state = 0;
float sizeFrac;

void setup() {
  Serial.begin(9600); // set baud rate to 9600
  pinMode(BUTTON_PIN, INPUT_PULLUP);
  currentButtonState = digitalRead(BUTTON_PIN);
}

void loop() {

  // Get the new analog value
  int currentVal = analogRead(INPUT_PIN);
  float prevSizeFrac = sizeFrac;

  // If the analog value has changed, assign it to sizeFrac
  if (prevValue != currentVal) {
    sizeFrac = currentVal / (float) MAX_ANALOG_INPUT;
  }

  // Get button state
  currentButtonState = digitalRead(BUTTON_PIN); // read new state
  int prevState = state;

  if (lastButtonState == HIGH && currentButtonState != lastButtonState) {
    state = 1 - state;
  }

  if (prevSizeFrac != sizeFrac || prevState != state) {
    Serial.print(sizeFrac, 4); // 4 decimal point precision
    Serial.print(",");
    Serial.println(state);
  }

  prevValue = currentVal;
  lastButtonState = currentButtonState;

}
