/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 8/24/15.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _wwDrawingHistory = require('./ww-drawing-history');

var _wwDrawingHistory2 = _interopRequireDefault(_wwDrawingHistory);

var _wwDrawingHistoryUnit = require('./ww-drawing-history-unit');

var _wwDrawingHistoryUnit2 = _interopRequireDefault(_wwDrawingHistoryUnit);

var _wwDrawingHistoryBrushCommand = require('./ww-drawing-history-brush-command');

var _wwDrawingHistoryBrushCommand2 = _interopRequireDefault(_wwDrawingHistoryBrushCommand);

var _point = require('./point');

var _point2 = _interopRequireDefault(_point);

var WwDrawingHistoryLoader = (function () {
    function WwDrawingHistoryLoader() {
        _classCallCheck(this, WwDrawingHistoryLoader);

        this.history = null;
    }

    _createClass(WwDrawingHistoryLoader, [{
        key: 'parseDrawingData',
        value: function parseDrawingData(data) {
            var _this = this;

            this.history = new _wwDrawingHistory2['default']();
            var base_command = new _wwDrawingHistoryBrushCommand2['default']('hard', new _point2['default'](0, 0));

            data.units.forEach(function (unit_data) {
                var unit = new _wwDrawingHistoryUnit2['default']();
                unit.layerId = unit_data.lid;
                unit.sessionId = unit_data.ses;
                unit.startTime = unit_data.start;
                unit.id = unit_data.id;

                unit_data.commands.forEach(function (command_data) {
                    if (!command_data.t) {
                        command_data.t = 0;
                    }
                    var command = _wwDrawingHistoryBrushCommand2['default'].clone(base_command, command_data);
                    //console.log(command.toStringMin());
                    unit.addCommand(command);
                    base_command = command;
                });
                _this.history.addUnit(unit);
            });
        }
    }]);

    return WwDrawingHistoryLoader;
})();

exports['default'] = WwDrawingHistoryLoader;
module.exports = exports['default'];
//# sourceMappingURL=ww-drawing-history-loader.js.map