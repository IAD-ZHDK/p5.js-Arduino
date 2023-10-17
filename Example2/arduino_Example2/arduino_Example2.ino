
#define NUM_VALUES 1
#define OUTPUT_PIN 5

int incomingValues[NUM_VALUES];
const int DELAY_MS = 500;

void setup() {
  Serial.begin(9600);
  pinMode(OUTPUT_PIN, OUTPUT);
}

void loop() {
  // Check to see if there is any incoming serial data
  if(Serial.available() > 0){
    
    // read string until the endo of the line
    String rcvdSerialData = Serial.readStringUntil('\n'); 
    split(rcvdSerialData, incomingValues, NUM_VALUES);
    
     for (int j=0; j < NUM_VALUES; j++) {
      analogWrite(OUTPUT_PIN,incomingValues[j]);
      delay(DELAY_MS);
  }
     
}
  
}

void split(String inputString, int returnData[], int numOfValues)
{
  int index = 0;
  int lastPos = 0;

  for (int i = 0; i < inputString.length(); i++)
  {
    if (inputString.charAt(i) == ',' && index < numOfValues)
    {
      String tempStr = inputString.substring(lastPos, i);
      Serial.println(tempStr);
      returnData[index] = tempStr.toInt();
      index++;
      lastPos = i + 1;
    }
  }
}
