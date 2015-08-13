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

var _wwBrush = require('./ww-brush');

var _wwBrush2 = _interopRequireDefault(_wwBrush);

var _wwDrawingHistoryBrushCommand = require('./ww-drawing-history-brush-command');

var _wwDrawingHistoryBrushCommand2 = _interopRequireDefault(_wwDrawingHistoryBrushCommand);

var canvas = document.getElementById('test-canvas');
var ctx = canvas.getContext('2d');
ctx.clearRect(0, 0, canvas.width, canvas.height);

console.log('getTimer: ' + (0, _getTimer2['default'])());
console.log('point: ' + new _point2['default']().toString());

var test_sprite = new _wwSprite2['default'](1, 2);
console.log('WwSprite: ' + test_sprite);
test_sprite.loadImageWithURLAndCallback('./images/player.png', onSpriteImageLoaded);

var test_brush = new _wwBrush2['default']();
console.log('WwBrush: ' + test_brush);
test_brush.loadImageWithURLAndCallback('./images/brush_circle.png', onBrushImageLoaded);

function onSpriteImageLoaded(sprite) {
    console.log('onSpriteImageLoaded: ' + sprite);
    sprite.draw(ctx);
}

function onBrushImageLoaded(brush) {
    console.log('onBrushImageLoaded: ' + brush);
    brush.draw(ctx);

    var brush_command = new _wwDrawingHistoryBrushCommand2['default'](0, new _point2['default'](100, 100), 0);
    console.log('brush_command: ' + brush_command.toString());
}

exports['default'] = { Point: _point2['default'], getTimer: _getTimer2['default'] };
module.exports = exports['default'];
//# sourceMappingURL=main.js.map