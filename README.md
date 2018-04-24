### Customized Revised Version of the Electron-Based App

Changing add app for our purposes

We set up a text editor and go into the index.html file, removing the code reference to the D3 local file by commenting it out:
```
<!-- <script src = 'd3.js'></script> -->
```   
Working within the directory for the application, we remove the d3.js file, replacing it with a D3 code from the Node Package Manager:
```
npm install --save d3
```
To bring D3 into the Electron application, we need to add code to the D3 interactive visualization program in the file d3-bar-chart.js:
```
const d3 = require("d3")
```
We check that the Asset Distribution Application is still working, now using an npm-installed version of D3:
```
npm start
```
To refer to the bar code program itself, we can bring comment out one script from the index.html file:
```
<!-- <script src = 'd3-bar-chart.js'></script> -->
```
In its place, require code will be added to the renderer.js program:
```
require('./d3-bar-chart.js')
```
A similar approach may be used for the bootstrap code, editing the index.html file
```
<!-- <script src = 'bootstrap.min.js'></script> -->
```
and adding to the renderer.js program:
```
require('./bootstrap.min.js')
```
The original Asset Distribution Application depended on jQuery to check on the initial loading of the document. Let's draw on stackoverflow.com to locate code that does not depend on jQuery:
```
https://stackoverflow.com/questions/799981/document-ready-equivalent-without-jquery?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
```
Implementing this approach at the beginning of the d3-bar-chart.js program, we locate this line of the program:
```
$(document).ready(function() {
```
and replace it with these lines:
```
HTMLDocument.prototype.ready = new Promise(function(resolve) {
   if(document.readyState != "loading")
      resolve();
   else
      document.addEventListener("DOMContentLoaded", function() {
         resolve();
      });
});

document.ready.then(function() {
```
We have not completely gotten rid of jQuery, however, because the Bootstrap framework depends on it for handling user interaction. So we retain this script line relating to jQuery in index.html:
```
<script> window.$ = window.jQuery = require('./jquery.min.js') </script>
```
In subsequent programs, we can move away from Bootstrap and jQuery.

To complete the work on the revised Asset Distribution Application, let's comment out the command that brings up the Chromium Dev Tools in main.js:
```
// mainWindow.webContents.openDevTools()
```

-------------------------

A zip archive of the final directory for the revised Electron version of the Asset Distribution Application is provided as adapp-2.zip

To run the complete application on Mac or Windows, we can download the zip archive,  placing it in a directory of our choice, and we unzip the archive.

We need Node to run the application. So while working in a web browswer, we download  and install node. We select the most recent version from

https://nodejs.org/en/download/current/

We follow the installation instructions, obtaining Node and the Node Package Manager.

With Node installed, we go to the Terminal or command window and locate ourselves in the adapp directory that we have selected earlier.

Then within the adapp-2 directory, we use Node Package Manager to execute the application:
```
npm start
```   
