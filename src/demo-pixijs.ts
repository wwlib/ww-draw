/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 7/7/15.
 */

const path = require('path');
import PIXI = require('pixi.js');

import Rect from './rect';
import WwDrawingBrushManager from './WwDrawingBrushManager';
import WwDrawingHistoryRenderer from './WwDrawingHistoryRenderer';
import WwDrawingHistoryLoader from './WwDrawingHistoryLoader';
import WwPixiRenderTextureContext from './WwPixiRenderTextureContext';

let canvas: any = document.getElementById("demo-canvas");
if (canvas) {
    canvas.style.display="none";
}
const drawings = require('../images/drawings/drawings.json');

let drawings_count = drawings.list.length;
let drawing_index = Math.floor(Math.random() * drawings_count);
let drawing_filename = drawings.list[drawing_index];
let drawing_path = path.join(__dirname, '../images/drawings', drawing_filename);

console.log(drawing_path);

let TestData = require(drawing_path);

let stage, rtSprite;
let drawing_renderer;
let app = new PIXI.Application(1280, 720, {backgroundColor : 0x1099bb});
let appCanvas = document.body.appendChild(app.view);
appCanvas.id = 'app-canvas';
console.log(appCanvas);

let brt: PIXI.BaseRenderTexture = new PIXI.BaseRenderTexture(1280, 720, PIXI.SCALE_MODES.LINEAR, 1);
let renderTexture: PIXI.RenderTexture = new PIXI.RenderTexture(brt);
rtSprite = new PIXI.Sprite(renderTexture);

app.stage.addChild(rtSprite);

WwDrawingBrushManager.instance.init(onBrushesLoaded, 'pixijs');

function onBrushesLoaded(brushes) {
    console.log(`onBrushesLoaded:`);
    console.log(brushes);

    let historyLoader: WwDrawingHistoryLoader = new WwDrawingHistoryLoader();
    historyLoader.parseDrawingData(TestData);

    let render_rect: Rect = new Rect(110, 390, 500, 500);
    let webGlRenderer: PIXI.WebGLRenderer = <PIXI.WebGLRenderer>app.renderer;
    let renderTextureContext: WwPixiRenderTextureContext = new WwPixiRenderTextureContext(webGlRenderer, renderTexture);

    drawing_renderer = new WwDrawingHistoryRenderer(historyLoader.history, renderTextureContext, render_rect, true);

    window.requestAnimationFrame(update);
}

function update() {
    drawing_renderer.renderHistoryWithDuration(33); //render one 33ms segment of the drawing each frame
    app.renderer.render(app.stage);

    if (!drawing_renderer.ended) {
        window.requestAnimationFrame(update);
    }
}
