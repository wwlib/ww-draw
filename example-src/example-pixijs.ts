/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 7/7/15.
 */

const path = require('path');
const jsonfile = require('jsonfile');
import PIXI = require('pixi.js');

import * as WwDraw from '../src/index';

let canvas: any = document.getElementById("example-canvas");
if (canvas) {
    canvas.style.display="none";
}
const drawings = jsonfile.readFileSync(path.resolve('images/drawings/drawings.json'));

let drawings_count = drawings.list.length;
let drawing_index = Math.floor(Math.random() * drawings_count);
let drawing_filename = drawings.list[drawing_index];
let drawing_path = path.join('images/drawings', drawing_filename);

let TestData = jsonfile.readFileSync(drawing_path);

let stage, rtSprite;
let drawing_renderer: WwDraw.WwDrawingHistoryRenderer;
let app: PIXI.Application = new PIXI.Application(1280, 720, {backgroundColor : 0x1099bb});
let appCanvas: any = document.body.appendChild(app.view);
appCanvas.id = 'app-canvas';
console.log(appCanvas);

let brt: PIXI.BaseRenderTexture = new PIXI.BaseRenderTexture(1280, 720, PIXI.SCALE_MODES.LINEAR, 1);
let renderTexture: PIXI.RenderTexture = new PIXI.RenderTexture(brt);
rtSprite = new PIXI.Sprite(renderTexture);

app.stage.addChild(rtSprite);

WwDraw.WwDrawingBrushManager.instance.init(onBrushesLoaded.bind(this), null, 'pixijs', PIXI);

function onBrushesLoaded(brushes) {
    console.log(`onBrushesLoaded:`);
    console.log(brushes);

    let historyLoader: WwDraw.WwDrawingHistoryLoader = new WwDraw.WwDrawingHistoryLoader();
    historyLoader.parseDrawingData(TestData);

    let render_rect: WwDraw.Rect = new WwDraw.Rect(110, 390, 500, 500);
    let webGlRenderer: PIXI.WebGLRenderer = <PIXI.WebGLRenderer>app.renderer;
    let renderTextureContext: WwDraw.WwRenderTextureContext = new WwDraw.WwRenderTextureContext(webGlRenderer, renderTexture);

    drawing_renderer = new WwDraw.WwDrawingHistoryRenderer(historyLoader.history, renderTextureContext, render_rect, true);

    window.requestAnimationFrame(update);
}

function update() {
    drawing_renderer.renderHistoryWithDuration(33); //render one 33ms segment of the drawing each frame
    app.renderer.render(app.stage);

    if (!drawing_renderer.ended) {
        window.requestAnimationFrame(update);
    }
}
