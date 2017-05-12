/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 7/7/15.
 */

import * as WwLib from '../../lib';

const TestData = require('../images/drawings/flower.json');

let canvas: any = document.getElementById("demo-canvas");
let ctx: CanvasRenderingContext2D = canvas.getContext("2d");
ctx.clearRect(0, 0, canvas.width, canvas.height);

console.log(`getTimer: ${WwLib.getTimer()}`);
console.log(`point: ${new WwLib.Point().toString()}`);

let test_sprite: WwLib.WwSprite = new WwLib.WwSprite(1, 2);
console.log(`WwSprite: ${test_sprite}`);
test_sprite.loadImageWithURLAndCallback('./images/player.png', onSpriteImageLoaded);

let bg_sprite: WwLib.WwSprite = new WwLib.WwSprite(0, 0);
console.log(`WwSprite: ${bg_sprite}`);
bg_sprite.loadImageWithURLAndCallback('./images/bg_500.png', onBGImageLoaded);

let test_brush: WwLib.WwBrush = new WwLib.WwBrush();
console.log(`WwBrush: ${test_brush}`);
test_brush.loadImageWithURLAndCallback('./images/brushes/circle.png', onBrushImageLoaded);

let test_point1: WwLib.Point = new WwLib.Point(0,0);
let test_point2: WwLib.Point = new WwLib.Point(1,1);
console.log(`Distance between points: ${WwLib.Point.distance(test_point1,test_point2)}`);

let device_info: WwLib.WwDeviceInfo = WwLib.WwDeviceInfo.instance;
console.log(`DeviceInfo: AssetScaleFactor: ${device_info.assetScaleFactor}`);

let brush_command: WwLib.WwDrawingHistoryBrushCommand = new WwLib.WwDrawingHistoryBrushCommand('hard', new WwLib.Point(100, 100),  WwLib.getTimer());
console.log(`${brush_command.toString()}`);

let drawing_history_unit: WwLib.WwDrawingHistoryUnit = new WwLib.WwDrawingHistoryUnit();
let test_unit: WwLib.WwDrawingHistoryUnit = TestData.units[0];
let test_commands: WwLib.WwDrawingHistoryBrushCommand[] = test_unit.commands;
let base_command: WwLib.WwDrawingHistoryBrushCommand = new WwLib.WwDrawingHistoryBrushCommand('hard', new WwLib.Point(0,0));
test_commands.forEach((data_object: any) => {
    let command: WwLib.WwDrawingHistoryBrushCommand = WwLib.WwDrawingHistoryBrushCommand.clone(base_command, data_object);

    drawing_history_unit.addCommand(command);
    base_command = command;
});
//console.log(drawing_history_unit.toString());

WwLib.WwDrawingBrushManager.instance.init(onBrushesLoaded);

let drawing_renderer: WwLib.WwDrawingHistoryRenderer;

function onBrushesLoaded(brushes) {
    console.log(`onBrushesLoaded:`);
    console.log(brushes);

    let historyLoader: any = new WwLib.WwDrawingHistoryLoader();
    historyLoader.parseDrawingData(TestData);

    let render_rect: WwLib.Rect = new WwLib.Rect(110, 390, 500, 500);

    drawing_renderer = new WwLib.WwDrawingHistoryRenderer(historyLoader.history, ctx, render_rect, true, 0.8);

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
