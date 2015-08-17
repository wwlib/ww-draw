/**
 * Created by andrew on 7/7/15.
 */

import Point from './point';
import getTimer from './get-timer';
import WwSprite from './ww-sprite';
import WwBrush from './ww-brush';
import WwDrawingHistoryBrushCommand from './ww-drawing-history-brush-command';
import WwDeviceInfo from './ww-device-info';
import WwDrawingHistoryUnit from './ww-drawing-history-unit';
import WwDrawingBrushManager from './ww-drawing-brush-manager';

import TestData from '../images/drw_1432296509856_base_ALL.json';


let canvas = document.getElementById("test-canvas");
let ctx = canvas.getContext("2d");
ctx.clearRect(0, 0, canvas.width, canvas.height);

console.log(`getTimer: ${getTimer()}`);
console.log(`point: ${new Point().toString()}`);

let test_sprite = new WwSprite(1, 2);
console.log(`WwSprite: ${test_sprite}`);
test_sprite.loadImageWithURLAndCallback('./images/player.png', onSpriteImageLoaded);

let test_brush = new WwBrush();
console.log(`WwBrush: ${test_brush}`);
test_brush.loadImageWithURLAndCallback('./images/brushes/brush_circle.png', onBrushImageLoaded);

let test_point1 = new Point(0,0);
let test_point2 = new Point(1,1);
console.log(`Distance between points: ${Point.distance(test_point1,test_point2)}`);

let device_info = WwDeviceInfo.instance;
console.log(`DeviceInfo: AssetScaleFactor: ${device_info.assetScaleFactor}`);

let brush_command = new WwDrawingHistoryBrushCommand('hard', new Point(100, 100),  getTimer());
console.log(`${brush_command.toString()}`);

let drawing_history_unit = new WwDrawingHistoryUnit();
let test_unit = TestData.units[0];
let test_commands = test_unit.commands;
let base_command = new WwDrawingHistoryBrushCommand('hard', new Point(0,0));
test_commands.forEach(data_object => {
    //let command = new WwDrawingHistoryBrushCommand(c.bid, new Point(c.x, c.y), c.t, c.c, c.s, 1.0, c.bm, c.a, c.r, c.lid);
    let command = WwDrawingHistoryBrushCommand.clone(base_command, data_object);

    drawing_history_unit.addCommand(command);
    base_command = command;
});
console.log(drawing_history_unit.toString());

WwDrawingBrushManager.instance.init(onBrushesLoaded);

function onBrushesLoaded(brushes) {
    console.log(`onBrushesLoaded: ${brushes}`);
    drawing_history_unit.commands.forEach(command => {
        test_brush.x = command.location.x;
        test_brush.y = command.location.y;
        test_brush.draw(ctx);

    });
}

function onSpriteImageLoaded(sprite) {
    console.log(`onSpriteImageLoaded: ${sprite}`);
    sprite.draw(ctx);
}

function onBrushImageLoaded(brush) {
    console.log(`onBrushImageLoaded: ${brush}`);
    brush.draw(ctx);
}


export default {Point, getTimer};