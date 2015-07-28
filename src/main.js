/**
 * Created by andrew on 7/7/15.
 */

import Point from './point';
import getTimer from './get-timer';
import WwSprite from './ww-sprite';

console.log(`getTimer: ${getTimer()}`);
console.log(`point: ${new Point().toString()}`);

let sprite = new WwSprite(1, 2);
console.log(`WwSprite: ${sprite}`);
sprite.loadImageWithURLAndCallback('./images/player.png', onSpriteImageLoaded);

function onSpriteImageLoaded(image) {
    console.log(`onSpriteImageLoaded: ${image}`);
}


export default {Point, getTimer};