/**
 * Created by andrew on 12/18/15.
 */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _wwDrawingBrushManager = require('./ww-drawing-brush-manager');

var _wwDrawingBrushManager2 = _interopRequireDefault(_wwDrawingBrushManager);

var _rect = require('./rect');

var _rect2 = _interopRequireDefault(_rect);

var _point = require('./point');

var _point2 = _interopRequireDefault(_point);

var _getTimer = require('./get-timer');

var _getTimer2 = _interopRequireDefault(_getTimer);

var _wwDrawingHistoryBrushCommandJs = require('./ww-drawing-history-brush-command.js');

var _wwDrawingHistoryBrushCommandJs2 = _interopRequireDefault(_wwDrawingHistoryBrushCommandJs);

var _wwDrawingHistoryJs = require('./ww-drawing-history.js');

var _wwDrawingHistoryJs2 = _interopRequireDefault(_wwDrawingHistoryJs);

var _wwDrawingHistoryRendererJs = require('./ww-drawing-history-renderer.js');

var _wwDrawingHistoryRendererJs2 = _interopRequireDefault(_wwDrawingHistoryRendererJs);

var _wwDrawingHistoryUnitJs = require('./ww-drawing-history-unit.js');

var _wwDrawingHistoryUnitJs2 = _interopRequireDefault(_wwDrawingHistoryUnitJs);

var brushes_path = _path2['default'].join(__dirname, '../images/brushes/');
console.log(brushes_path);
var brushes = require(_path2['default'].join(brushes_path, 'brushes.json'));
var notepad = {};

var mouseDownHandler = null;
var mouseMoveHandler = null;
var mouseUpHandler = null;

var nextState = 'init';
window.requestAnimationFrame(stateManager);

function stateManager() {
    //console.log(`StateManager: ${nextState}`);

    switch (nextState) {
        case 'init':
            init();
            nextState = null;
            break;
        case 'captureDrawing':
            console.log('State: captureDrawing');
            newRenderTexture();
            captureMouseEvents();
            nextState = 'render';
            break;
        case 'render':
            notepad.pixiRenderer.render(notepad.stage);
            break;
        case 'replayDrawing':
            console.log('State: replayDrawing');
            replayDrawing();
            break;
        default:
            break;
    }

    window.requestAnimationFrame(stateManager);
}

function init() {
    console.log('Initializing Pixijs');
    notepad.pixijsInitialized = true;
    notepad.pixiRenderer = new PIXI.autoDetectRenderer(1280, 720, {
        view: document.getElementById('demo-canvas'),
        backgroundColor: 0x000000,
        antialias: true
    });
    notepad.stage = new PIXI.Container();

    setupEvents();
    loadBrushes();

    var ui = document.getElementById('ui');
    ui.innerHTML = 'Click & drag to draw...';
}

function onBrushesLoaded(brushes) {
    console.log('onBrushesLoaded:');
    console.log(brushes);
    nextState = 'captureDrawing';
}

function loadBrushes() {

    console.log(brushes);

    brushes.path = brushes_path;

    _wwDrawingBrushManager2['default'].instance.init(onBrushesLoaded, 'pixijs', brushes);
}

function newRenderTexture() {
    if (notepad.rtSprite) {
        notepad.stage.removeChild(notepad.rtSprite);
    }
    if (notepad.renderTexture) {
        notepad.renderTexture.destroy(true);
    }
    notepad.renderTexture = new PIXI.RenderTexture(notepad.pixiRenderer, 1280, 720);
    notepad.rtSprite = new PIXI.Sprite(notepad.renderTexture);
    notepad.stage.addChild(notepad.rtSprite);
    notepad.pixiRenderer.render(notepad.stage);
}

function captureMouseEvents() {

    notepad.commandTime = 0;
    notepad.commandTimeStart = 0;
    notepad.renderRect = new _rect2['default'](0, 0, 1280, 720); //(185, 466, 350, 350);

    notepad.drawingHistory = null;
    notepad.captureInProgress = false;

    mouseDownHandler = onMouseDownHandler;
}

function addCommand(e) {
    //console.log(`addCommand`);
    if (notepad.captureInProgress) {
        var _location = new _point2['default'](e.pageX, e.pageY);
        notepad.commandTime = (0, _getTimer2['default'])() - notepad.commandTimeStart;
        var command = new _wwDrawingHistoryBrushCommandJs2['default']('hard', _location, notepad.commandTime, null, 0.5, 1.0, 'normal', 0.3);
        notepad.drawingHistoryUnit.addCommand(command);

        //draw history so far
        var temp_history = new _wwDrawingHistoryJs2['default']();
        temp_history.addUnit(notepad.drawingHistoryUnit);
        // TODO: Should only render un-rendered commands
        var temp_renderer = new _wwDrawingHistoryRendererJs2['default'](temp_history, notepad.renderTexture, null, false, null);
        temp_renderer.renderHistory();
        notepad.pixiRenderer.render(notepad.stage);
    }
}

function onMouseDownHandler(e) {
    //console.log(`onMouseDownHandler: ${e.target.parent}`);

    mouseDownHandler = null;
    mouseUpHandler = onPressUpHandler;
    mouseMoveHandler = onPressMoveHandler;

    notepad.drawingHistory = new _wwDrawingHistoryJs2['default']();
    notepad.drawingHistoryUnit = new _wwDrawingHistoryUnitJs2['default']();
    notepad.commandTimeStart = (0, _getTimer2['default'])();
    notepad.commandTime = 0;
    notepad.captureInProgress = true;
}

function onPressMoveHandler(e) {
    //console.log(`onPressMoveHandler: ${e.target.parent}`);
    if (notepad.captureInProgress) {
        addCommand(e);
    }
}

function onPressUpHandler(e) {
    //console.log(`onPressUpHandler: ${e.target.parent}`);
    mouseUpHandler = null;
    mouseMoveHandler = null;

    if (notepad.captureInProgress) {
        notepad.drawingHistory.addUnit(notepad.drawingHistoryUnit);
        console.log(notepad.drawingHistory);
        notepad.captureInProgress = false;
    }

    newRenderTexture();
    notepad.renderRect = new _rect2['default'](0, 0, 1280, 720); //(185, 466, 350, 350);
    notepad.drawingRenderer = new _wwDrawingHistoryRendererJs2['default'](notepad.drawingHistory, notepad.renderTexture, notepad.renderRect, true, null);
    writeDrawingJSON();
    nextState = 'replayDrawing';
}

function writeDrawingJSON() {
    var drawing_path = _path2['default'].join(__dirname, '../images/drawings/captured-drawing.json');
    console.log(notepad.drawingHistory.json);
    var data = JSON.stringify(notepad.drawingHistory.json);
    _fs2['default'].writeFile(drawing_path, data, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

function replayDrawing() {
    if (notepad.drawingRenderer.ended) {
        nextState = 'captureDrawing';
    } else {
        notepad.drawingRenderer.renderHistoryWithDuration(33);
        notepad.pixiRenderer.render(notepad.stage);
    }

    //notepad.drawingRenderer.renderHistory();
    //notepad.pixiRenderer.render(notepad.stage);
    //nextState = 'captureDrawing';
}

// EVENTS
var isMouseDown = false;

function setupEvents() {
    console.log('Adding Mouse Events');
    document.onmousedown = mouseDown;
    document.onmouseup = mouseUp;
    document.onmousemove = mouseMove;
}

//// GLOBAL EVENTS

function mouseDown(e) {
    //console.log(`mouseDown: ${e.pageX}, ${e.pageY}`);
    isMouseDown = true;
    if (mouseDownHandler) {
        mouseDownHandler(e);
    }
}

function mouseUp(e) {
    //console.log(`mouseUp (pressup): ${e.pageX}, ${e.pageY}`);
    isMouseDown = false;
    if (mouseUpHandler) {
        mouseUpHandler(e);
    }
}

function mouseMove(e) {
    if (isMouseDown) {
        //console.log(`mouseMove (pressmove):`);
        if (mouseMoveHandler) {
            mouseMoveHandler(e);
        }
    }
}
//# sourceMappingURL=demo-pixijs-capture.js.map