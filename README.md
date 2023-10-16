# Arduino to P5js example 

Some simple examples for connecting Arduino with P5js over Serial 

Currently, Web Serial only runs on Internet Explorer and Chrome, so to use it, you need to install Chrome (or a Chrome-based) browser. To check if your browser supports WebSerial open a console the browser (cmd + option+ i on Mac or ctrl + alt + i on Windows) and type in:

`await navigator.serial.requestPort();`

If the browser supports it, you will see a pop-up window, where you can choose one of the ports with Arduino plugged in.


