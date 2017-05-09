/**
 * Created by andrew on 12/18/15.
 */

const path = require('path');
const fs = require('fs');
import PIXI = require('pixi.js');
import WwDrawingBrushManager from './WwDrawingBrushManager';
import Rect from './rect';
import Point from './point';
import { getTimer } from './GetTimer';
import WwDrawingHistoryBrushCommand from './WwDrawingHistoryBrushCommand';
import WwDrawingHistory from './WwDrawingHistory';
import WwDrawingHistoryRenderer from './WwDrawingHistoryRenderer';
import WwDrawingHistoryUnit from './WwDrawingHistoryUnit';
import WwPixiRenderTextureContext from './WwPixiRenderTextureContext';

let app;
let appCanvas;
let renderTexture:PIXI.RenderTexture;
let renderTextureContext: WwPixiRenderTextureContext;
let rtSprite: PIXI.Sprite;

let commandTime: number;
let commandTimeStart: number;
let renderRect: Rect; //(185, 466, 350, 350);
let drawingHistory: WwDrawingHistory;
let captureInProgress:boolean;
let drawingHistoryUnit: WwDrawingHistoryUnit;
let drawingRenderer: WwDrawingHistoryRenderer;

let brushes_path = path.join(__dirname, '../images/brushes/');
console.log(brushes_path);
let brushes = require(path.join(brushes_path, 'brushes.json'));
let notepad: any = {};

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
            app.renderer.render(app.stage);
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

    let canvas: any = document.getElementById("demo-canvas");
    if (canvas) {
        canvas.style.display="none";
    }

    app = new PIXI.Application(1280, 720, {backgroundColor : 0x1099bb});
    appCanvas = document.body.appendChild(app.view);
    appCanvas.id = 'app-canvas';

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
    if (rtSprite) {
        app.stage.removeChild(rtSprite);
    }
    if (renderTexture) {
        renderTexture.destroy(true);
    }
    let brt = new PIXI.BaseRenderTexture(1280, 720, PIXI.SCALE_MODES.LINEAR, 1);
    renderTexture = new PIXI.RenderTexture(brt);

    let webGlRenderer: PIXI.WebGLRenderer = <PIXI.WebGLRenderer>app.renderer;
    renderTextureContext = new WwPixiRenderTextureContext(webGlRenderer, renderTexture);

    rtSprite = new PIXI.Sprite(renderTexture);
    app.stage.addChild(rtSprite);
    app.renderer.render(app.stage);
}


function captureMouseEvents() {
    commandTime = 0;
    commandTimeStart = 0;
    renderRect = new Rect(0, 0, 1280, 720); //(185, 466, 350, 350);
    drawingHistory = null;
    captureInProgress = false;
    mouseDownHandler = onMouseDownHandler;
}

function addCommand(e) {
    if (captureInProgress) {
        let location = new Point(e.pageX, e.pageY);
        commandTime = getTimer() - commandTimeStart;
        let command = new WwDrawingHistoryBrushCommand('hard', location, commandTime, null, 0.5, 1.0, 'normal', 0.3);
        drawingHistoryUnit.addCommand(command);

        //draw history so far
        let temp_history = new WwDrawingHistory();
        temp_history.addUnit(drawingHistoryUnit);
        // TODO: Should only render un-rendered commands

        let temp_renderer = new WwDrawingHistoryRenderer(temp_history, renderTextureContext, null, false, null);
        temp_renderer.renderHistory();
        app.renderer.render(app.stage);
    }
}

function onMouseDownHandler(e) {
    mouseDownHandler = null;
    mouseUpHandler = onPressUpHandler;
    mouseMoveHandler = onPressMoveHandler;

    drawingHistory = new WwDrawingHistory();
    drawingHistoryUnit = new WwDrawingHistoryUnit();
    commandTimeStart = getTimer();
    commandTime = 0;
    captureInProgress = true;
}

function onPressMoveHandler(e) {
    if (captureInProgress) {
        addCommand(e);
    }
}

function onPressUpHandler(e) {
    mouseUpHandler = null;
    mouseMoveHandler = null;

    if (captureInProgress) {
        drawingHistory.addUnit(drawingHistoryUnit);
        console.log(drawingHistory);
        captureInProgress = false;
    }

    newRenderTexture();
    renderRect = new Rect(0, 0, 1280, 720); //(185, 466, 350, 350);
    drawingRenderer = new WwDrawingHistoryRenderer(drawingHistory, renderTextureContext, renderRect, true, null);
    writeDrawingJSON();
    nextState = 'replayDrawing';
}

function writeDrawingJSON() {
    let drawing_path = path.join(__dirname, '../images/drawings/captured-drawing.json');
    console.log(drawingHistory.json);
    let data = JSON.stringify(drawingHistory.json);
    fs.writeFile(drawing_path, data, function (err) {
        if (err) {
            return console.log(err);
        }
    });
}


function replayDrawing() {
    if (drawingRenderer.ended) {
        nextState = 'captureDrawing';
    } else {
        drawingRenderer.renderHistoryWithDuration(33);
        app.renderer.render(app.stage);
    }
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
    isMouseDown = true;
    if (mouseDownHandler) {
        mouseDownHandler(e);
    }

}

function mouseUp(e) {
    isMouseDown = false;
    if (mouseUpHandler) {
        mouseUpHandler(e);
    }

}

function mouseMove(e) {
    if (isMouseDown) {
        if (mouseMoveHandler) {
            mouseMoveHandler(e);
        }
    }
}
