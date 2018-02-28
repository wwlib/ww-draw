/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 7/7/15.
 */

import * as WwDraw from '../src/index';
const path = require('path');
const jsonfile = require('jsonfile');

const TestData = jsonfile.readFileSync(path.resolve('images/drawings/flower.json'));

let canvas: any = document.getElementById("example-canvas");
let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
ctx.clearRect(0, 0, canvas.width, canvas.height);

console.log(`getTimer: ${WwDraw.getTimer()}`);
console.log(`point: ${new WwDraw.Point().toString()}`);

let test_sprite: WwDraw.WwSprite = new WwDraw.WwSprite(1, 2);
console.log(`WwSprite: ${test_sprite}`);
test_sprite.loadImageWithURLAndCallback('./images/player.png', onSpriteImageLoaded);

let bg_sprite: WwDraw.WwSprite = new WwDraw.WwSprite(0, 0);
console.log(`WwSprite: ${bg_sprite}`);
bg_sprite.loadImageWithURLAndCallback('./images/bg_500.png', onBGImageLoaded);

let test_brush: WwDraw.WwBrush = new WwDraw.WwBrush();
console.log(`WwBrush: ${test_brush}`);
test_brush.loadImageWithURLAndCallback('./images/brushes/circle.png', onBrushImageLoaded);

let test_point1: WwDraw.Point = new WwDraw.Point(0,0);
let test_point2: WwDraw.Point = new WwDraw.Point(1,1);
console.log(`Distance between points: ${WwDraw.Point.distance(test_point1,test_point2)}`);

let device_info: WwDraw.WwDeviceInfo = WwDraw.WwDeviceInfo.instance;
console.log(`DeviceInfo: AssetScaleFactor: ${device_info.assetScaleFactor}`);

let brush_command: WwDraw.WwDrawingHistoryBrushCommand = new WwDraw.WwDrawingHistoryBrushCommand('hard', new WwDraw.Point(100, 100),  WwDraw.getTimer());
console.log(`${brush_command.toString()}`);

let drawing_history_unit: WwDraw.WwDrawingHistoryUnit = new WwDraw.WwDrawingHistoryUnit();
let test_unit: WwDraw.WwDrawingHistoryUnit = TestData.units[0];
let test_commands: WwDraw.WwDrawingHistoryBrushCommand[] = test_unit.commands;
let base_command: WwDraw.WwDrawingHistoryBrushCommand = new WwDraw.WwDrawingHistoryBrushCommand('hard', new WwDraw.Point(0,0));
test_commands.forEach((data_object: any) => {
    let command: WwDraw.WwDrawingHistoryBrushCommand = WwDraw.WwDrawingHistoryBrushCommand.clone(base_command, data_object);

    drawing_history_unit.addCommand(command);
    base_command = command;
});
//console.log(drawing_history_unit.toString());

WwDraw.WwDrawingBrushManager.instance.init(onBrushesLoaded);

let drawing_renderer: WwDraw.WwDrawingHistoryRenderer;

function onBrushesLoaded(brushes) {
    console.log(`onBrushesLoaded:`);
    console.log(brushes);

    let historyLoader: any = new WwDraw.WwDrawingHistoryLoader();
    historyLoader.parseDrawingData(TestData);

    let render_rect: WwDraw.Rect = new WwDraw.Rect(110, 390, 500, 500);

    drawing_renderer = new WwDraw.WwDrawingHistoryRenderer(historyLoader.history, ctx, render_rect, true, 0.8);

    window.requestAnimationFrame(update);
}

function update() {
    drawing_renderer.renderHistoryWithDuration(33); //render one 33ms segment of the drawing each frame

    if (!drawing_renderer.ended) {
        window.requestAnimationFrame(update);
    }
}

function onSpriteImageLoaded(sprite) {
    console.log(`onSpriteImageLoaded: ${sprite}`);
    sprite.draw(ctx);
}

function onBGImageLoaded(sprite) {
    console.log(`onBGImageLoaded: ${sprite}`);
    sprite.x = 390;
    sprite.y = 110;
    sprite.draw(ctx);
}

function onBrushImageLoaded(brush) {
    console.log(`onBrushImageLoaded: ${brush}`);
    brush.draw(ctx);
}
