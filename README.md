# MA-Studio-1--Physical-Computing

An example for connecting Arduino with P5js over Serial 

Currently, Web Serial only runs on Internet Explorer and Chrome, so to use it, you need to install Chrome (or a Chrome-based) browser. To check if your browser supports WebSerial open a console (cmd + option+ i on Mac or ctrl + alt + i on Windows) and type in:

await navigator.serial.requestPort();

If the browser supports it, you will see a pop-up window, where you can choose one of the ports with Arduino plugged in.

http://wiki.iad.zhdk.ch/EE/2606759947/Arduino+and+P5.js
