/**
 * Created by andrew on 7/7/15.
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

import TestData from '../images/drw_1432296509856_base_ALL.json';
import TestData2 from '../images/drw_1440163114487_base_ALL.json';


let canvas = document.getElementById("test-canvas");
let ctx = canvas.getContext("2d");
ctx.clearRect(0, 0, canvas.width, canvas.height);
//ctx.fillStyle = "#0000ff";
//ctx.fillRect(10, 10, 100, 100);

console.log(`getTimer: ${getTimer()}`);
console.log(`point: ${new Point().toString()}`);

let test_sprite = new WwSprite(1, 2);
console.log(`WwSprite: ${test_sprite}`);
test_sprite.loadImageWithURLAndCallback('./images/player.png', onSpriteImageLoaded);

let eye_sprite = new WwSprite(0, 0);
console.log(`WwSprite: ${eye_sprite}`);
eye_sprite.loadImageWithURLAndCallback('./images/eye_500.png', onEyeImageLoaded);

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
//console.log(drawing_history_unit.toString());

WwDrawingBrushManager.instance.init(onBrushesLoaded);

function onBrushesLoaded(brushes) {
    console.log(`onBrushesLoaded:`);
    console.log(brushes);

    /*
    let history = new WwDrawingHistory();
    let base_command = new WwDrawingHistoryBrushCommand('hard', new Point(0,0));

    TestData2.units.forEach(unit_data => {
        let unit = new WwDrawingHistoryUnit();
        unit.layerId = unit_data.lid;
        unit.sessionId = unit_data.ses;
        unit.startTime = unit_data.start;
        unit.id = unit_data.id;


        unit_data.commands.forEach(command_data => {
            if (!command_data.t) {
                command_data.t = 0;
            }
            let command = WwDrawingHistoryBrushCommand.clone(base_command, command_data);
            //console.log(command.toStringMin());
            unit.addCommand(command);
            base_command = command;
        });
        history.addUnit(unit);
    });
    //history.addUnit(drawing_history_unit);
    //console.log(history.toString());
    */

    let historyLoader = new WwDrawingHistoryLoader();
    historyLoader.parseDrawingData(TestData2);

    let render_rect = new Rect(110, 390, 500, 500);

    let renderer = new WwDrawingHistoryRenderer(historyLoader.history, ctx, render_rect, true, 0.8);
    //renderer.renderHistory();
    //renderer.renderHistoryWithTimeRange(0, 2000);


    //renderer.renderHistoryWithDuration(500);


    let intervalId = setInterval(() => {
        if (renderer.ended) {
            clearInterval(intervalId);
        }
        else {
            renderer.renderHistoryWithDuration(99);
        }
    }, 33);

}

function onSpriteImageLoaded(sprite) {
    console.log(`onSpriteImageLoaded: ${sprite}`);
    //sprite.draw(ctx);
}

function onEyeImageLoaded(sprite) {
    console.log(`onEyeImageLoaded: ${sprite}`);
    sprite.x = 390;
    sprite.y = 110;
    sprite.draw(ctx);
}

function onBrushImageLoaded(brush) {
    console.log(`onBrushImageLoaded: ${brush}`);
    //brush.draw(ctx);
}


export default {Point, getTimer};