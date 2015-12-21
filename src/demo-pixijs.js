/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 7/7/15.
 */

import path from 'path';

//import Point from './point';
import Rect from './rect';
//import getTimer from './get-timer';
//import WwSprite from './ww-sprite';
//import WwBrush from './ww-brush';
//import WwDrawingHistoryBrushCommand from './ww-drawing-history-brush-command';
//import WwDeviceInfo from './ww-device-info';
//import WwDrawingHistoryUnit from './ww-drawing-history-unit';
//import WwDrawingHistory from './ww-drawing-history';

import WwDrawingBrushManager from './ww-drawing-brush-manager';
import WwDrawingHistoryRenderer from './ww-drawing-history-renderer';
import WwDrawingHistoryLoader from './ww-drawing-history-loader';

import drawings from '../images/drawings/drawings.json';


let drawings_count = drawings.list.length;
let drawing_index = Math.floor(Math.random() * drawings_count);
let drawing_filename = drawings.list[drawing_index];
let drawing_path = path.join(__dirname, '../images/drawings', drawing_filename);

console.log(drawing_path);

let TestData = require(drawing_path);

let pixijs_renderer, stage, renderTexture, rtSprite;
let drawing_renderer;

if (!PIXI) {
    console.log(`test-pixijs.js: PIXI must be defined in 'pixijs' mode!`);
} else {

    pixijs_renderer = new PIXI.autoDetectRenderer(1280, 720, {
        view: document.getElementById("demo-canvas"),
        backgroundColor: 0x000000,
        antialias: true
    });

    stage = new PIXI.Container();

    renderTexture = new PIXI.RenderTexture(pixijs_renderer, 1280, 720);

    rtSprite = new PIXI.Sprite(renderTexture);
    stage.addChild(rtSprite);

    WwDrawingBrushManager.instance.init(onBrushesLoaded, 'pixijs');
}

function onBrushesLoaded(brushes) {
    console.log(`onBrushesLoaded:`);
    console.log(brushes);

    let historyLoader = new WwDrawingHistoryLoader();
    historyLoader.parseDrawingData(TestData);

    let render_rect = new Rect(110, 390, 500, 500);

    drawing_renderer = new WwDrawingHistoryRenderer(historyLoader.history, renderTexture, render_rect, true);

    window.requestAnimationFrame(update);
}

function update() {
    drawing_renderer.renderHistoryWithDuration(33); //render one 33ms segment of the drawing each frame
    pixijs_renderer.render(stage);

    if (!drawing_renderer.ended) {
        window.requestAnimationFrame(update);
    }
}