# Examples for communicating between Arduino and p5.js

Some simple examples for connecting Arduino with P5js over (Web Serial API)[https://developer.mozilla.org/en-US/docs/Web/API/Web_Serial_API]
Currently, Web Serial API is in experimental phase, so to use it you need to install Chrome (or a Chrome-based) browser. To check if your browser supports WebSerial open a console (`cmd + option+ i` on Mac or `ctrl + alt + i` on Windows) and type in:

`await navigator.serial.requestPort();`

If the browser supports it, you will see a pop-up window, where you can choose one of the ports with Arduino plugged in.


