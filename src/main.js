/**
 * Created by andrew on 7/7/15.
 */

import Point from './point';
import getTimer from './get-timer';
import WwSprite from './ww-sprite';
import WwBrush from './ww-brush';
import WwDrawingHistoryBrushCommand from './ww-drawing-history-brush-command';

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
test_brush.loadImageWithURLAndCallback('./images/brush_circle.png', onBrushImageLoaded);


function onSpriteImageLoaded(sprite) {
    console.log(`onSpriteImageLoaded: ${sprite}`);
    sprite.draw(ctx);
}

function onBrushImageLoaded(brush) {
    console.log(`onBrushImageLoaded: ${brush}`);
    brush.draw(ctx);

    let brush_command = new WwDrawingHistoryBrushCommand(0, new Point(100, 100), 0);
    console.log(`brush_command: ${brush_command.toString()}`);
}


export default {Point, getTimer};