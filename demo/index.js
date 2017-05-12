var app = require('electron').app;
var BrowserWindow = require('electron').BrowserWindow;
var Menu =  require('electron').Menu;
var mainWindow = null;
var path = require('path');

var template = [
    {
        label: 'Electron',
        submenu: [
            {
                label: 'Quit',
                accelerator: 'Command+Q',
                click: function () {
                    app.quit();
                }
            },
        ]
    },
    {
        label: 'View',
        submenu: [
            {
                label: 'Reload',
                accelerator: 'Command+R',
                click: function () {
                    BrowserWindow.getFocusedWindow().reloadIgnoringCache();
                }
            },
            {
                label: 'Toggle DevTools',
                accelerator: 'Alt+Command+I',
                click: function () {
                    BrowserWindow.getFocusedWindow().toggleDevTools();
                }
            }
        ]
    }
];

app.on('window-all-closed', function () {
    if (process.platform != 'darwin')
        app.quit();
});


app.on('ready', function () {
    //set the context menu
    Menu.setApplicationMenu(Menu.buildFromTemplate(template));

    mainWindow = new BrowserWindow({width: 1280, height: 720, resizable: false, frame: false, title: 'Title'});
    mainWindow.loadURL('file://' + __dirname + '/index.html');
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
});
