/**
 * Created by andrew on 8/13/15.
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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
        key: "renderCommand",
        value: function renderCommand(command) {
            if (this.brush) {
                this.brush.x = command.location.x;
                this.brush.y = command.location.y;
                this.brush.draw(this.context);
            } else {
                console.log("renderCommand: brush is undefined");
            }
        }
    }, {
        key: "renderHistory",
        value: function renderHistory() {
            var _this = this;

            this.mergedCommandsUnit.commands.forEach(function (command) {
                _this.renderCommand(command);
            });
        }
    }, {
        key: "renderHistoryWithDuration",
        value: function renderHistoryWithDuration(duration) {
            //console.log(`renderHistoryWithDuration: ${duration}, time: ${this.time}`);
            this.renderHistoryWithTimeRange(this.time, this.time + duration);
        }
    }, {
        key: "renderHistoryWithTimeRange",
        value: function renderHistoryWithTimeRange(start_time, end_time) {

            while (this.mergedCommandsUnit.hasNextInTimeRange(start_time, end_time)) {
                this.renderCommand(this.mergedCommandsUnit.nextInTimeRange(start_time, end_time));
            }

            this.time = end_time;
        }
    }, {
        key: "testBrush",
        set: function set(brush) {
            this.brush = brush;
        }
    }, {
        key: "ended",
        get: function get() {
            return !this.mergedCommandsUnit.hasNext();
        }
    }]);

    return WwDrawingHistoryRenderer;
})();

exports["default"] = WwDrawingHistoryRenderer;
module.exports = exports["default"];
//# sourceMappingURL=ww-drawing-history-renderer.js.map