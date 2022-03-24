
#define INPUT_PIN1 A0
#define INPUT_PIN2 A1


void setup() {
  Serial.begin(9600);
  pinMode(INPUT_PIN1, INPUT);
  pinMode(INPUT_PIN2, INPUT);
}

void loop() {

  int sensorValue1 = analogRead(INPUT_PIN1);
  int sensorValue2 = analogRead(INPUT_PIN2);
  Serial.print(sensorValue1);
  Serial.print(",");
  Serial.println(sensorValue2);
  delay(2);
}
