/**
 * Created by andrew on 8/13/15.
 */

//import WwDrawingBrushManager from './ww-drawing-brush-manager';

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

var WwDrawingHistoryRenderer = (function () {
    function WwDrawingHistoryRenderer(history, context) {
        var start_time = arguments[2] === undefined ? 0 : arguments[2];
        var end_time = arguments[3] === undefined ? 0 : arguments[3];

        _classCallCheck(this, WwDrawingHistoryRenderer);

        this.history = history;
        this.context = context;
        this.startTime = start_time;
        this.endTime = end_time;
        this.time = this.startTime;

        this.mergedCommandsUnit = this.history.concatAllCommands();
    }

    _createClass(WwDrawingHistoryRenderer, [{
        key: 'renderCommand',
        value: function renderCommand(command) {

            if (command.prevCommand) {
                var draw_distance = command.lineLength - command.prevCommand.lineLength;
                var draw_steps = draw_distance / 2.0 + 1.0;

                for (var i = draw_steps; i > 0; i--) {
                    var interpolationFactor = i / draw_steps;

                    var temp_command = _wwDrawingHistoryBrushCommand2['default'].clone(command);
                    var temp_point = _pointJs2['default'].interpolate(command.prevCommand.location, command.location, interpolationFactor);
                    console.log('Interpoalting: step: ' + i + ' / ' + draw_steps + ': ' + interpolationFactor + ' -> ' + temp_point.toString());
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