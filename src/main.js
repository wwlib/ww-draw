/**
 * Created by andrew on 7/7/15.
 */

import Point from './point';
import getTimer from './get-timer';
import WwSprite from './ww-sprite';

console.log(`getTimer: ${getTimer()}`);
console.log(`point: ${new Point().toString()}`);

let test_sprite = new WwSprite(1, 2);
console.log(`WwSprite: ${test_sprite}`);
test_sprite.loadImageWithURLAndCallback('./images/brush_circleSoft.png', onSpriteImageLoaded);

function onSpriteImageLoaded(sprite) {
    console.log(`onSpriteImageLoaded: ${sprite}`);

    let canvas = document.getElementById("test-canvas");
    let ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    sprite.draw(ctx);

}


export default {Point, getTimer};