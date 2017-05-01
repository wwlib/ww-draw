"use strict";
/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 7/7/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const point_1 = require("./point");
const rect_1 = require("./rect");
const GetTimer_1 = require("./GetTimer");
const WwSprite_1 = require("./WwSprite");
const WwBrush_1 = require("./WwBrush");
const WwDrawingHistoryBrushCommand_1 = require("./WwDrawingHistoryBrushCommand");
const WwDeviceInfo_1 = require("./WwDeviceInfo");
const WwDrawingHistoryUnit_1 = require("./WwDrawingHistoryUnit");
const WwDrawingBrushManager_1 = require("./WwDrawingBrushManager");
const WwDrawingHistoryRenderer_1 = require("./WwDrawingHistoryRenderer");
const WwDrawingHistoryLoader_1 = require("./WwDrawingHistoryLoader");
const TestData = require('../images/drawings/flower.json');
let canvas = document.getElementById("demo-canvas");
let ctx = canvas.getContext("2d");
ctx.clearRect(0, 0, canvas.width, canvas.height);
console.log(`getTimer: ${GetTimer_1.getTimer()}`);
console.log(`point: ${new point_1.default().toString()}`);
let test_sprite = new WwSprite_1.default(1, 2);
console.log(`WwSprite: ${test_sprite}`);
test_sprite.loadImageWithURLAndCallback('./images/player.png', onSpriteImageLoaded);
let bg_sprite = new WwSprite_1.default(0, 0);
console.log(`WwSprite: ${bg_sprite}`);
bg_sprite.loadImageWithURLAndCallback('./images/bg_500.png', onBGImageLoaded);
let test_brush = new WwBrush_1.default();
console.log(`WwBrush: ${test_brush}`);
test_brush.loadImageWithURLAndCallback('./images/brushes/circle.png', onBrushImageLoaded);
let test_point1 = new point_1.default(0, 0);
let test_point2 = new point_1.default(1, 1);
console.log(`Distance between points: ${point_1.default.distance(test_point1, test_point2)}`);
let device_info = WwDeviceInfo_1.default.instance;
console.log(`DeviceInfo: AssetScaleFactor: ${device_info.assetScaleFactor}`);
let brush_command = new WwDrawingHistoryBrushCommand_1.default('hard', new point_1.default(100, 100), GetTimer_1.getTimer());
console.log(`${brush_command.toString()}`);
let drawing_history_unit = new WwDrawingHistoryUnit_1.default();
let test_unit = TestData.units[0];
let test_commands = test_unit.commands;
let base_command = new WwDrawingHistoryBrushCommand_1.default('hard', new point_1.default(0, 0));
test_commands.forEach((data_object) => {
    let command = WwDrawingHistoryBrushCommand_1.default.clone(base_command, data_object);
    drawing_history_unit.addCommand(command);
    base_command = command;
});
//console.log(drawing_history_unit.toString());
WwDrawingBrushManager_1.default.instance.init(onBrushesLoaded);
let drawing_renderer;
function onBrushesLoaded(brushes) {
    console.log(`onBrushesLoaded:`);
    console.log(brushes);
    let historyLoader = new WwDrawingHistoryLoader_1.default();
    historyLoader.parseDrawingData(TestData);
    let render_rect = new rect_1.default(110, 390, 500, 500);
    drawing_renderer = new WwDrawingHistoryRenderer_1.default(historyLoader.history, ctx, render_rect, true, 0.8);
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
//# sourceMappingURL=demo-canvas.js.map