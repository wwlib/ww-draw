"use strict";
/**
 * Created by andrew on 12/18/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const fs = require('fs');
const PIXI = require("pixi.js");
const WwDrawingBrushManager_1 = require("./WwDrawingBrushManager");
const rect_1 = require("./rect");
const point_1 = require("./point");
const GetTimer_1 = require("./GetTimer");
const WwDrawingHistoryBrushCommand_1 = require("./WwDrawingHistoryBrushCommand");
const WwDrawingHistory_1 = require("./WwDrawingHistory");
const WwDrawingHistoryRenderer_1 = require("./WwDrawingHistoryRenderer");
const WwDrawingHistoryUnit_1 = require("./WwDrawingHistoryUnit");
const WwPixiRenderTextureContext_1 = require("./WwPixiRenderTextureContext");
let app;
let appCanvas;
let renderTexture;
let renderTextureContext;
let rtSprite;
let commandTime;
let commandTimeStart;
let renderRect; //(185, 466, 350, 350);
let drawingHistory;
let captureInProgress;
let drawingHistoryUnit;
let drawingRenderer;
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
    let canvas = document.getElementById("demo-canvas");
    if (canvas) {
        canvas.style.display = "none";
    }
    app = new PIXI.Application(1280, 720, { backgroundColor: 0x1099bb });
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
    WwDrawingBrushManager_1.default.instance.init(onBrushesLoaded, 'pixijs', brushes);
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
    let webGlRenderer = app.renderer;
    renderTextureContext = new WwPixiRenderTextureContext_1.default(webGlRenderer, renderTexture);
    rtSprite = new PIXI.Sprite(renderTexture);
    app.stage.addChild(rtSprite);
    app.renderer.render(app.stage);
}
function captureMouseEvents() {
    commandTime = 0;
    commandTimeStart = 0;
    renderRect = new rect_1.default(0, 0, 1280, 720); //(185, 466, 350, 350);
    drawingHistory = null;
    captureInProgress = false;
    mouseDownHandler = onMouseDownHandler;
}
function addCommand(e) {
    if (captureInProgress) {
        let location = new point_1.default(e.pageX, e.pageY);
        commandTime = GetTimer_1.getTimer() - commandTimeStart;
        let command = new WwDrawingHistoryBrushCommand_1.default('hard', location, commandTime, null, 0.5, 1.0, 'normal', 0.3);
        drawingHistoryUnit.addCommand(command);
        //draw history so far
        let temp_history = new WwDrawingHistory_1.default();
        temp_history.addUnit(drawingHistoryUnit);
        // TODO: Should only render un-rendered commands
        let temp_renderer = new WwDrawingHistoryRenderer_1.default(temp_history, renderTextureContext, null, false, null);
        temp_renderer.renderHistory();
        app.renderer.render(app.stage);
    }
}
function onMouseDownHandler(e) {
    mouseDownHandler = null;
    mouseUpHandler = onPressUpHandler;
    mouseMoveHandler = onPressMoveHandler;
    drawingHistory = new WwDrawingHistory_1.default();
    drawingHistoryUnit = new WwDrawingHistoryUnit_1.default();
    commandTimeStart = GetTimer_1.getTimer();
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
    renderRect = new rect_1.default(0, 0, 1280, 720); //(185, 466, 350, 350);
    drawingRenderer = new WwDrawingHistoryRenderer_1.default(drawingHistory, renderTextureContext, renderRect, true, null);
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
    }
    else {
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
//# sourceMappingURL=demo-pixijs-capture.js.map