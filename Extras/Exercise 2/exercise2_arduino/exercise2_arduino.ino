#include <Servo.h>

int pos = 0;
Servo my_servo;
const int DELAY_MS = 20;

void setup()
{
  Serial.begin(9600);
  my_servo.attach(9);
}

void loop(){
   if (Serial.available() > 0) {
      String rcvdSerialData = Serial.readStringUntil('\n');
      //make sure this stays within 0 to 180 
      int currentValue = rcvdSerialData.toInt(); 
      my_servo.write(currentValue);
      Serial.println(currentValue);
      delay(DELAY_MS);    
  }
}