/**
 * Created by andrew on 12/18/15.
 */

import path from 'path';
import fs from 'fs';
import WwDrawingBrushManager from './ww-drawing-brush-manager';
import Rect from './rect';
import Point from './point';
import getTimer from './get-timer';
import WwDrawingHistoryBrushCommand from './ww-drawing-history-brush-command.js';
import WwDrawingHistory from './ww-drawing-history.js';
import WwDrawingHistoryRenderer from './ww-drawing-history-renderer.js';
import WwDrawingHistoryUnit from './ww-drawing-history-unit.js';



let brushes_path = path.join(__dirname, '../images/brushes/');
console.log(brushes_path);
let brushes = require(path.join(brushes_path, 'brushes.json'));
let notepad = {};

let mouseDownHandler = null;
let mouseMoveHandler = null;
let mouseUpHandler = null;

let nextState = 'init';
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
    console.log(`Initializing Pixijs`);
    notepad.pixijsInitialized = true;
    notepad.pixiRenderer = new PIXI.autoDetectRenderer(1280, 720, {
        view: document.getElementById("demo-canvas"),
        backgroundColor: 0x000000,
        antialias: true
    });
    notepad.stage = new PIXI.Container();

    setupEvents();
    loadBrushes();

    let ui = document.getElementById('ui');
    ui.innerHTML = 'Click & drag to draw...';
}

function onBrushesLoaded(brushes) {
    console.log(`onBrushesLoaded:`);
    console.log(brushes);
    nextState = 'captureDrawing';
}

function loadBrushes() {

    console.log(brushes);

    brushes.path = brushes_path;

    WwDrawingBrushManager.instance.init(onBrushesLoaded, 'pixijs', brushes);
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
    notepad.renderRect = new Rect(0, 0, 1280, 720); //(185, 466, 350, 350);

    notepad.drawingHistory = null;
    notepad.captureInProgress = false;

    mouseDownHandler = onMouseDownHandler;
}

function addCommand(e) {
    //console.log(`addCommand`);
    if (notepad.captureInProgress) {
        let location = new Point(e.pageX, e.pageY);
        notepad.commandTime = getTimer() - notepad.commandTimeStart;
        let command = new WwDrawingHistoryBrushCommand('hard', location, notepad.commandTime, null, 0.5, 1.0, 'normal', 0.3);
        notepad.drawingHistoryUnit.addCommand(command);

        //draw history so far
        let temp_history = new WwDrawingHistory();
        temp_history.addUnit(notepad.drawingHistoryUnit);
        // TODO: Should only render un-rendered commands
        let temp_renderer = new WwDrawingHistoryRenderer(temp_history, notepad.renderTexture, null, false, null);
        temp_renderer.renderHistory();
        notepad.pixiRenderer.render(notepad.stage);
    }
}

function onMouseDownHandler(e) {
    //console.log(`onMouseDownHandler: ${e.target.parent}`);

    mouseDownHandler = null;
    mouseUpHandler = onPressUpHandler;
    mouseMoveHandler = onPressMoveHandler;

    notepad.drawingHistory = new WwDrawingHistory();
    notepad.drawingHistoryUnit = new WwDrawingHistoryUnit();
    notepad.commandTimeStart = getTimer();
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
    notepad.renderRect = new Rect(0, 0, 1280, 720); //(185, 466, 350, 350);
    notepad.drawingRenderer = new WwDrawingHistoryRenderer(notepad.drawingHistory, notepad.renderTexture, notepad.renderRect, true, null);
    writeDrawingJSON();
    nextState = 'replayDrawing';
}

function writeDrawingJSON() {
    let drawing_path = path.join(__dirname, '../images/drawings/captured-drawing.json');
    console.log(notepad.drawingHistory.json);
    let data = JSON.stringify(notepad.drawingHistory.json);
    fs.writeFile(drawing_path, data, function (err) {
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
let isMouseDown = false;

function setupEvents() {
    console.log(`Adding Mouse Events`);
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