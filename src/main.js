/**
 * Created by andrew on 7/7/15.
 */

import Point from './point';
import getTimer from './get-timer';

console.log(`getTimer: ${getTimer()}`);
console.log(`point: ${new Point().toString()}`);

export default {Point, getTimer};