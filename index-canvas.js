
var app = require('electron').app;
var BrowserWindow = require('electron').BrowserWindow;
var Menu =  require('electron').Menu;
var mainWindow = null;
var path = require('path');

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  if (process.platform != 'darwin')
    app.quit();
});



// This method will be called when atom-shell has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 1280, height: 720});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index-canvas.html');

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
