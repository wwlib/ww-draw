"use strict";
/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 7/7/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
const PIXI = require("pixi.js");
const rect_1 = require("./rect");
const WwDrawingBrushManager_1 = require("./WwDrawingBrushManager");
const WwDrawingHistoryRenderer_1 = require("./WwDrawingHistoryRenderer");
const WwDrawingHistoryLoader_1 = require("./WwDrawingHistoryLoader");
const WwPixiRenderTextureContext_1 = require("./WwPixiRenderTextureContext");
let canvas = document.getElementById("demo-canvas");
if (canvas) {
    canvas.style.display = "none";
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
let app = new PIXI.Application(1280, 720, { backgroundColor: 0x1099bb });
document.body.appendChild(app.view);
let brt = new PIXI.BaseRenderTexture(1280, 720, PIXI.SCALE_MODES.LINEAR, 1);
let renderTexture = new PIXI.RenderTexture(brt);
rtSprite = new PIXI.Sprite(renderTexture);
app.stage.addChild(rtSprite);
WwDrawingBrushManager_1.default.instance.init(onBrushesLoaded, 'pixijs');
function onBrushesLoaded(brushes) {
    console.log(`onBrushesLoaded:`);
    console.log(brushes);
    let historyLoader = new WwDrawingHistoryLoader_1.default();
    historyLoader.parseDrawingData(TestData);
    let render_rect = new rect_1.default(110, 390, 500, 500);
    let webGlRenderer = app.renderer;
    let renderTextureContext = new WwPixiRenderTextureContext_1.default(webGlRenderer, renderTexture);
    drawing_renderer = new WwDrawingHistoryRenderer_1.default(historyLoader.history, renderTextureContext, render_rect, true);
    window.requestAnimationFrame(update);
}
function update() {
    drawing_renderer.renderHistoryWithDuration(33); //render one 33ms segment of the drawing each frame
    app.renderer.render(app.stage);
    if (!drawing_renderer.ended) {
        window.requestAnimationFrame(update);
    }
}
//# sourceMappingURL=demo-pixijs.js.map