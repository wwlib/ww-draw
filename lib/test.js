/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 7/7/15.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _point = require('./point');

var _point2 = _interopRequireDefault(_point);

var _rect = require('./rect');

var _rect2 = _interopRequireDefault(_rect);

var _getTimer = require('./get-timer');

var _getTimer2 = _interopRequireDefault(_getTimer);

var _wwSprite = require('./ww-sprite');

var _wwSprite2 = _interopRequireDefault(_wwSprite);

var _wwBrush = require('./ww-brush');

var _wwBrush2 = _interopRequireDefault(_wwBrush);

var _wwDrawingHistoryBrushCommand = require('./ww-drawing-history-brush-command');

var _wwDrawingHistoryBrushCommand2 = _interopRequireDefault(_wwDrawingHistoryBrushCommand);

var _wwDeviceInfo = require('./ww-device-info');

var _wwDeviceInfo2 = _interopRequireDefault(_wwDeviceInfo);

var _wwDrawingHistoryUnit = require('./ww-drawing-history-unit');

var _wwDrawingHistoryUnit2 = _interopRequireDefault(_wwDrawingHistoryUnit);

var _wwDrawingBrushManager = require('./ww-drawing-brush-manager');

var _wwDrawingBrushManager2 = _interopRequireDefault(_wwDrawingBrushManager);

var _wwDrawingHistory = require('./ww-drawing-history');

var _wwDrawingHistory2 = _interopRequireDefault(_wwDrawingHistory);

var _wwDrawingHistoryRenderer = require('./ww-drawing-history-renderer');

var _wwDrawingHistoryRenderer2 = _interopRequireDefault(_wwDrawingHistoryRenderer);

var _wwDrawingHistoryLoader = require('./ww-drawing-history-loader');

var _wwDrawingHistoryLoader2 = _interopRequireDefault(_wwDrawingHistoryLoader);

var _imagesDrawingsFlowerJson = require('../images/drawings/flower.json');

var _imagesDrawingsFlowerJson2 = _interopRequireDefault(_imagesDrawingsFlowerJson);

var canvas = document.getElementById('test-canvas');
var ctx = canvas.getContext('2d');
ctx.clearRect(0, 0, canvas.width, canvas.height);

console.log('getTimer: ' + (0, _getTimer2['default'])());
console.log('point: ' + new _point2['default']().toString());

var test_sprite = new _wwSprite2['default'](1, 2);
console.log('WwSprite: ' + test_sprite);
test_sprite.loadImageWithURLAndCallback('./images/player.png', onSpriteImageLoaded);

var bg_sprite = new _wwSprite2['default'](0, 0);
console.log('WwSprite: ' + bg_sprite);
bg_sprite.loadImageWithURLAndCallback('./images/bg_500.png', onEyeImageLoaded);

var test_brush = new _wwBrush2['default']();
console.log('WwBrush: ' + test_brush);
test_brush.loadImageWithURLAndCallback('./images/brushes/brush_circle.png', onBrushImageLoaded);

var test_point1 = new _point2['default'](0, 0);
var test_point2 = new _point2['default'](1, 1);
console.log('Distance between points: ' + _point2['default'].distance(test_point1, test_point2));

var device_info = _wwDeviceInfo2['default'].instance;
console.log('DeviceInfo: AssetScaleFactor: ' + device_info.assetScaleFactor);

var brush_command = new _wwDrawingHistoryBrushCommand2['default']('hard', new _point2['default'](100, 100), (0, _getTimer2['default'])());
console.log('' + brush_command.toString());

var drawing_history_unit = new _wwDrawingHistoryUnit2['default']();
var test_unit = _imagesDrawingsFlowerJson2['default'].units[0];
var test_commands = test_unit.commands;
var base_command = new _wwDrawingHistoryBrushCommand2['default']('hard', new _point2['default'](0, 0));
test_commands.forEach(function (data_object) {
    var command = _wwDrawingHistoryBrushCommand2['default'].clone(base_command, data_object);

    drawing_history_unit.addCommand(command);
    base_command = command;
});
//console.log(drawing_history_unit.toString());

_wwDrawingBrushManager2['default'].instance.init(onBrushesLoaded);

function onBrushesLoaded(brushes) {
    console.log('onBrushesLoaded:');
    console.log(brushes);

    var historyLoader = new _wwDrawingHistoryLoader2['default']();
    historyLoader.parseDrawingData(_imagesDrawingsFlowerJson2['default']);

    var render_rect = new _rect2['default'](110, 390, 500, 500);

    var renderer = new _wwDrawingHistoryRenderer2['default'](historyLoader.history, ctx, render_rect, true, 0.8);

    var intervalId = setInterval(function () {
        if (renderer.ended) {
            clearInterval(intervalId);
        } else {
            renderer.renderHistoryWithDuration(99);
        }
    }, 33);
}

function onSpriteImageLoaded(sprite) {
    console.log('onSpriteImageLoaded: ' + sprite);
    sprite.draw(ctx);
}

function onEyeImageLoaded(sprite) {
    console.log('onEyeImageLoaded: ' + sprite);
    sprite.x = 390;
    sprite.y = 110;
    sprite.draw(ctx);
}

function onBrushImageLoaded(brush) {
    console.log('onBrushImageLoaded: ' + brush);
    brush.draw(ctx);
}

exports['default'] = { Point: _point2['default'], getTimer: _getTimer2['default'] };
module.exports = exports['default'];
//# sourceMappingURL=test.js.map