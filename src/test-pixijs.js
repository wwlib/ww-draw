/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 7/7/15.
 */

import Point from './point';
import Rect from './rect';
import getTimer from './get-timer';
import WwSprite from './ww-sprite';
import WwBrush from './ww-brush';
import WwDrawingHistoryBrushCommand from './ww-drawing-history-brush-command';
import WwDeviceInfo from './ww-device-info';
import WwDrawingHistoryUnit from './ww-drawing-history-unit';
import WwDrawingBrushManager from './ww-drawing-brush-manager';
import WwDrawingHistory from './ww-drawing-history';
import WwDrawingHistoryRenderer from './ww-drawing-history-renderer';
import WwDrawingHistoryLoader from './ww-drawing-history-loader';

import TestData from '../images/drawings/flower.json';

let pixijs_renderer, stage, renderTexture, rtSprite;

if (!PIXI) {
    console.log(`test-pixijs.js: PIXI must be defined in 'pixijs' mode!`);
} else {

    pixijs_renderer = new PIXI.autoDetectRenderer(1280, 720, {
        view: document.getElementById("test-canvas"),
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

    let renderer = new WwDrawingHistoryRenderer(historyLoader.history, renderTexture, render_rect, true, 0.8);

    let intervalId = setInterval(() => {
        if (renderer.ended) {
            clearInterval(intervalId);
        }
        else {
            renderer.renderHistoryWithDuration(99);
            pixijs_renderer.render(stage);
        }
    }, 33);

}

export default {Point, getTimer};