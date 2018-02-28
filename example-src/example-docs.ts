/**
 * Created by andrew rapo (andrew@worthwhilegames.org) 12/18/15.
 */

import PIXI = require('pixi.js');
import * as WwDraw from '../src/index';

let app;
let appCanvas;
let renderTexture:PIXI.RenderTexture;
let renderTextureContext: WwDraw.WwRenderTextureContext;
let rtSprite: PIXI.Sprite;

let commandTime: number;
let commandTimeStart: number;
let renderRect: WwDraw.Rect; //(185, 466, 350, 350);
let drawingHistory: WwDraw.WwDrawingHistory;
let captureInProgress:boolean;
let drawingHistoryUnit: WwDraw.WwDrawingHistoryUnit;
let drawingRenderer: WwDraw.WwDrawingHistoryRenderer;

let brushes_path = 'images/brushes/brushes.json';
let brushes: any = {
  "list": [
    "arrow.png",
    "calligraphy.png",
    "circle.png",
    "circleSoft.png",
    "crayon.png",
    "crosshairs.png",
    "hard.png",
    "hard_blue.png",
    "pencil.png",
    "pencil_fine.png",
    "pencil_fine_48.png",
    "pencil_very_fine.png",
    "soft.png",
    "soft_75.png",
    "spiral.png",
    "star.png",
    "x.png"
  ]
};
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

    let canvas: any = document.getElementById("example-canvas");
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
    WwDraw.WwDrawingBrushManager.instance.init(onBrushesLoaded.bind(this), null, 'pixijs', PIXI);
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
    renderTextureContext = new WwDraw.WwRenderTextureContext(webGlRenderer, renderTexture);

    rtSprite = new PIXI.Sprite(renderTexture);
    app.stage.addChild(rtSprite);
    app.renderer.render(app.stage);
}


function captureMouseEvents() {
    commandTime = 0;
    commandTimeStart = 0;
    renderRect = new WwDraw.Rect(0, 0, 1280, 720); //(185, 466, 350, 350);
    drawingHistory = null;
    captureInProgress = false;
    mouseDownHandler = onMouseDownHandler;
}

function addCommand(e) {
    if (captureInProgress) {
        let location = new WwDraw.Point(e.pageX, e.pageY);
        commandTime = WwDraw.getTimer() - commandTimeStart;
        let command = new WwDraw.WwDrawingHistoryBrushCommand('hard', location, commandTime, null, 0.5, 1.0, 'normal', 0.3);
        drawingHistoryUnit.addCommand(command);

        //draw history so far
        let temp_history = new WwDraw.WwDrawingHistory();
        temp_history.addUnit(drawingHistoryUnit);
        // TODO: Should only render un-rendered commands

        let temp_renderer = new WwDraw.WwDrawingHistoryRenderer(temp_history, renderTextureContext, null, false, null);
        temp_renderer.renderHistory();
        app.renderer.render(app.stage);
    }
}

function onMouseDownHandler(e) {
    mouseDownHandler = null;
    mouseUpHandler = onPressUpHandler;
    mouseMoveHandler = onPressMoveHandler;

    drawingHistory = new WwDraw.WwDrawingHistory();
    drawingHistoryUnit = new WwDraw.WwDrawingHistoryUnit();
    commandTimeStart = WwDraw.getTimer();
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
    renderRect = new WwDraw.Rect(0, 0, 1280, 720); //(185, 466, 350, 350);
    drawingRenderer = new WwDraw.WwDrawingHistoryRenderer(drawingHistory, renderTextureContext, renderRect, true, null);
    writeDrawingJSON();
    nextState = 'replayDrawing';
}

function writeDrawingJSON() {
    console.log(JSON.stringify(drawingHistory.json));
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
