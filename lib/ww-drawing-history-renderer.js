/**
 * Created by andrew on 8/13/15.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _wwDrawingHistoryBrushCommand = require('./ww-drawing-history-brush-command');

var _wwDrawingHistoryBrushCommand2 = _interopRequireDefault(_wwDrawingHistoryBrushCommand);

var _pointJs = require('./point.js');

var _pointJs2 = _interopRequireDefault(_pointJs);

var _rect = require('./rect');

var _rect2 = _interopRequireDefault(_rect);

var WwDrawingHistoryRenderer = (function () {
    function WwDrawingHistoryRenderer(history, context) {
        var bounding_rect = arguments[2] === undefined ? null : arguments[2];
        var center_drawing = arguments[3] === undefined ? false : arguments[3];
        var scale = arguments[4] === undefined ? null : arguments[4];
        var start_time = arguments[5] === undefined ? 0 : arguments[5];
        var end_time = arguments[6] === undefined ? 0 : arguments[6];

        _classCallCheck(this, WwDrawingHistoryRenderer);

        this.history = history;
        this.context = context;
        this.boundingRect = bounding_rect;
        if (this.boundingRect) {
            this.x = this.boundingRect.left;
            this.y = this.boundingRect.top;
            this.width = this.boundingRect.width;
            this.height = this.boundingRect.height;
        }
        this.centerDrawing = center_drawing;
        this.startTime = start_time;
        this.endTime = end_time;
        this.time = this.startTime;

        this.mergedCommandsUnit = this.history.concatAllCommands();
        this.mergedCommandsUnit.shiftOriginToMinXY();
        this.mergedCommandsUnit.resetBoundingRect();

        console.log('history bounds: ' + this.history.boundingRect.toString());
        console.log('merged unit bounds: ' + this.mergedCommandsUnit.boundingRect.toString());
        //console.log(`${this.mergedCommandsUnit.toString()}`);

        if (scale) {
            this.scale = scale;
        } else {
            if (this.boundingRect) {
                if (this.mergedCommandsUnit.boundingRect.width > this.mergedCommandsUnit.boundingRect.height) {
                    if (this.boundingRect.width < this.mergedCommandsUnit.boundingRect.width) {
                        this.scale = this.boundingRect.width / this.mergedCommandsUnit.boundingRect.width;
                    }
                } else {
                    if (this.boundingRect.height < this.mergedCommandsUnit.boundingRect.height) {
                        this.scale = this.boundingRect.height / this.mergedCommandsUnit.boundingRect.height;
                    }
                }
            } else {
                this.scale = 1.0;
            }
        }

        this.offset = new _pointJs2['default']();

        if (this.boundingRect) {
            console.log(' updating offset: ');
            this.offset = new _pointJs2['default'](this.boundingRect.left - this.mergedCommandsUnit.boundingRect.left, this.boundingRect.top - this.mergedCommandsUnit.boundingRect.top);

            if (this.centerDrawing) {
                var scaled_drawing_width = this.mergedCommandsUnit.boundingRect.width * this.scale;
                var center_x_offset = (this.boundingRect.width - scaled_drawing_width) / 2;
                var scaled_drawing_height = this.mergedCommandsUnit.boundingRect.height * this.scale;
                var center_y_offset = (this.boundingRect.height - scaled_drawing_height) / 2;
                console.log(' center_x_offset: ' + center_x_offset + ', ' + this.boundingRect.width + ' - ' + scaled_drawing_width);
                console.log(' center_y_offset: ' + center_y_offset + ', ' + this.boundingRect.width + ' - ' + scaled_drawing_height);
                this.offset.x += center_x_offset;
                this.offset.y += center_y_offset;
            }
        }

        console.log(' bounding rect: ' + this.boundingRect.toString());
        console.log(' merged unit bounding rect: ' + this.mergedCommandsUnit.boundingRect.toString());
        console.log(' offset: ' + this.offset.toString());
    }

    _createClass(WwDrawingHistoryRenderer, [{
        key: 'renderCommand',
        value: function renderCommand(command) {

            command.offset = this.offset;
            command.scale = this.scale;
            if (command.prevCommand) {
                var draw_distance = command.lineLength - command.prevCommand.lineLength;
                var draw_steps = draw_distance / 2.0 + 1.0;

                for (var i = draw_steps; i > 0; i--) {
                    var interpolationFactor = i / draw_steps;

                    var temp_command = _wwDrawingHistoryBrushCommand2['default'].clone(command);

                    var temp_point = _pointJs2['default'].interpolate(command.prevCommand.location, command.location, interpolationFactor);
                    temp_command.location = temp_point;
                    temp_command.generatedCommand = true;
                    this.brush = temp_command.brush;
                    if (this.brush) {
                        this.brush.draw(this.context);
                    }
                }
            } else {
                //DOT
                this.brush = command.brush; //WwDrawingBrushManager.instance.getBrushFromBrushId(command.brushId);
                if (this.brush) {
                    this.brush.draw(this.context);
                }
            }
        }
    }, {
        key: 'renderHistory',
        value: function renderHistory() {
            var _this = this;

            this.mergedCommandsUnit.commands.forEach(function (command) {
                _this.renderCommand(command);
            });
        }
    }, {
        key: 'renderHistoryWithDuration',
        value: function renderHistoryWithDuration(duration) {
            //console.log(`renderHistoryWithDuration: ${duration}, time: ${this.time}`);
            this.renderHistoryWithTimeRange(this.time, this.time + duration);
        }
    }, {
        key: 'renderHistoryWithTimeRange',
        value: function renderHistoryWithTimeRange(start_time, end_time) {

            while (this.mergedCommandsUnit.hasNextInTimeRange(start_time, end_time)) {
                this.renderCommand(this.mergedCommandsUnit.nextInTimeRange(start_time, end_time));
            }

            this.time = end_time;
        }
    }, {
        key: 'ended',
        get: function get() {
            return !this.mergedCommandsUnit.hasNext();
        }
    }]);

    return WwDrawingHistoryRenderer;
})();

exports['default'] = WwDrawingHistoryRenderer;
module.exports = exports['default'];
//# sourceMappingURL=ww-drawing-history-renderer.js.map