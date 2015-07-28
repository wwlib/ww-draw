/**
 * Created by andrew on 7/7/15.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _point = require('./point');

var _point2 = _interopRequireDefault(_point);

var _getTimer = require('./get-timer');

var _getTimer2 = _interopRequireDefault(_getTimer);

var _wwSprite = require('./ww-sprite');

var _wwSprite2 = _interopRequireDefault(_wwSprite);

console.log('getTimer: ' + (0, _getTimer2['default'])());
console.log('point: ' + new _point2['default']().toString());

var sprite = new _wwSprite2['default'](1, 2);
console.log('WwSprite: ' + sprite);
sprite.loadImageWithURLAndCallback('./images/player.png', onSpriteImageLoaded);

function onSpriteImageLoaded(image) {
  console.log('onSpriteImageLoaded: ' + image);
}

exports['default'] = { Point: _point2['default'], getTimer: _getTimer2['default'] };
module.exports = exports['default'];
//# sourceMappingURL=main.js.map