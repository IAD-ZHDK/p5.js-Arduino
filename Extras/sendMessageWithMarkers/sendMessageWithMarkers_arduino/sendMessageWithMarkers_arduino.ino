#define OUTPUT_PIN 13
#define OUTPUT_PIN2 12
#define OUTPUT_PIN3 11
#define MAX_VALUES 5; //maximum amount of values received

const byte numChars = 32; 
char receivedChars[numChars];
char tempChars[numChars]; // temporary array for parsing
boolean newData = false;

void setup() {
    Serial.begin(9600);
    pinMode(OUTPUT_PIN, OUTPUT);
    pinMode(OUTPUT_PIN2, OUTPUT);
    pinMode(OUTPUT_PIN3, OUTPUT);
    
}
void loop() {
    recvWithStartEndMarkers();
    if (newData == true) {
        strcpy(tempChars, receivedChars);
        // this temporary copy is necessary to protect the original data
        // beacues strtok() used in parseData() replaces the commas with \0
        parseData();
        newData = false;
    }
}
//receive data starting with markers defined inside of the function
void recvWithStartEndMarkers() {
    static boolean recvInProgress = false;
    static byte ndx = 0;
    char endMarker = '>';
    char startMarker = '<';
    char rc;

    while (Serial.available() > 0 && newData == false) {
        rc = Serial.read();
        if (recvInProgress == true) {
            if (rc != endMarker) {
                receivedChars[ndx] = rc;
                ndx++;
                if (ndx >= numChars) {
                    ndx = numChars - 1;
                }
            }
            else {
                receivedChars[ndx] = '\0'; // terminate the string
                recvInProgress = false;
                ndx = 0;
                newData = true;
            }
        }

        else if (rc == startMarker) {
            recvInProgress = true;
        }
    }
}
// split the data into parts
void parseData() {      
    char * strtokIndx;
    strtokIndx = strtok(tempChars,",");
    int one = atoi(strtokIndx);
    
    strtokIndx = strtok(NULL, ",");
    int two = atoi(strtokIndx);

    strtokIndx = strtok(NULL, ",");
    int three= atoi(strtokIndx);

    Serial.println(one);
    Serial.println(two);
    Serial.println(three);
  
    digitalWrite(OUTPUT_PIN, one);
    digitalWrite(OUTPUT_PIN, two);
    digitalWrite(OUTPUT_PIN, three);
        
}

