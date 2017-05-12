/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 7/7/15.
 */

const path = require('path');
import PIXI = require('pixi.js');

import * as WwLib from '../../lib';

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
let drawing_renderer: WwLib.WwDrawingHistoryRenderer;
let app: PIXI.Application = new PIXI.Application(1280, 720, {backgroundColor : 0x1099bb});
let appCanvas: any = document.body.appendChild(app.view);
appCanvas.id = 'app-canvas';
console.log(appCanvas);

let brt: PIXI.BaseRenderTexture = new PIXI.BaseRenderTexture(1280, 720, PIXI.SCALE_MODES.LINEAR, 1);
let renderTexture: PIXI.RenderTexture = new PIXI.RenderTexture(brt);
rtSprite = new PIXI.Sprite(renderTexture);

app.stage.addChild(rtSprite);

WwLib.WwDrawingBrushManager.instance.init(onBrushesLoaded.bind(this), null, 'pixijs', PIXI);

function onBrushesLoaded(brushes) {
    console.log(`onBrushesLoaded:`);
    console.log(brushes);

    let historyLoader: WwLib.WwDrawingHistoryLoader = new WwLib.WwDrawingHistoryLoader();
    historyLoader.parseDrawingData(TestData);

    let render_rect: WwLib.Rect = new WwLib.Rect(110, 390, 500, 500);
    let webGlRenderer: PIXI.WebGLRenderer = <PIXI.WebGLRenderer>app.renderer;
    let renderTextureContext: WwLib.WwRenderTextureContext = new WwLib.WwRenderTextureContext(webGlRenderer, renderTexture);

    drawing_renderer = new WwLib.WwDrawingHistoryRenderer(historyLoader.history, renderTextureContext, render_rect, true);

    window.requestAnimationFrame(update);
}

function update() {
    drawing_renderer.renderHistoryWithDuration(33); //render one 33ms segment of the drawing each frame
    app.renderer.render(app.stage);

    if (!drawing_renderer.ended) {
        window.requestAnimationFrame(update);
    }
}
