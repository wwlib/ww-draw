/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 7/7/15.
 */

'use strict';

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

var _imagesDrawingsDrawingsJson = require('../images/drawings/drawings.json');

var _imagesDrawingsDrawingsJson2 = _interopRequireDefault(_imagesDrawingsDrawingsJson);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var drawings_count = _imagesDrawingsDrawingsJson2['default'].list.length;
var drawing_index = Math.floor(Math.random() * drawings_count);
var drawing_filename = _imagesDrawingsDrawingsJson2['default'].list[drawing_index];
var drawing_path = _path2['default'].join(__dirname, '../images/drawings', drawing_filename);

console.log(drawing_path);

var TestData = require(drawing_path);

var pixijs_renderer = undefined,
    stage = undefined,
    renderTexture = undefined,
    rtSprite = undefined;
var drawing_renderer = undefined;

if (!PIXI) {
    console.log('test-pixijs.js: PIXI must be defined in \'pixijs\' mode!');
} else {

    pixijs_renderer = new PIXI.autoDetectRenderer(1280, 720, {
        view: document.getElementById('test-canvas'),
        backgroundColor: 0x000000,
        antialias: true
    });

    stage = new PIXI.Container();

    renderTexture = new PIXI.RenderTexture(pixijs_renderer, 1280, 720);

    rtSprite = new PIXI.Sprite(renderTexture);
    stage.addChild(rtSprite);

    _wwDrawingBrushManager2['default'].instance.init(onBrushesLoaded, 'pixijs');
}

function onBrushesLoaded(brushes) {
    console.log('onBrushesLoaded:');
    console.log(brushes);

    var historyLoader = new _wwDrawingHistoryLoader2['default']();
    historyLoader.parseDrawingData(TestData);

    var render_rect = new _rect2['default'](110, 390, 500, 500);

    drawing_renderer = new _wwDrawingHistoryRenderer2['default'](historyLoader.history, renderTexture, render_rect, true);

    window.requestAnimationFrame(update);
}

function update() {
    drawing_renderer.renderHistoryWithDuration(33); //render one 33ms segment of the drawing each frame
    pixijs_renderer.render(stage);

    if (!drawing_renderer.ended) {
        window.requestAnimationFrame(update);
    }
}
//# sourceMappingURL=demo-pixijs.js.map