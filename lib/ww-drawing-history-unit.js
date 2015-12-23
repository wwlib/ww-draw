/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 8/13/15.
 */

/**
 * ...
 * @author Andrew Rapo (andrew@worthwhilegames.org)
 * @license MIT
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _point = require('./point');

var _point2 = _interopRequireDefault(_point);

var _rect = require('./rect');

var _rect2 = _interopRequireDefault(_rect);

var _getTimer = require('./get-timer');

var _getTimer2 = _interopRequireDefault(_getTimer);

var _wwDrawingHistoryDataTranslator = require('./ww-drawing-history-data-translator');

var _wwDrawingHistoryDataTranslator2 = _interopRequireDefault(_wwDrawingHistoryDataTranslator);

var WwDrawingHistoryUnit = (function () {
    function WwDrawingHistoryUnit() {
        _classCallCheck(this, WwDrawingHistoryUnit);

        this.id = -1;
        this.commands = [];
        this.timeScale = 1.0;
        this.layerId = null;
        this.lineLength = 0;
        this.prevCommand = null;
        this.startTime = 0;
        this.duration = 0;
        this.sessionId = 0;

        this.currentCommandIndex = 0;
        this.boundingRect = null;

        // minX: redundant. for troubleshooting boundingRect issue. should be removed.
        //this.minX = 0;
        //this.maxX = 0;
        //this.minY = 0;
        //this.maxY = 0;
    }

    _createClass(WwDrawingHistoryUnit, [{
        key: 'toString',
        value: function toString() {
            var result = ' Unit: ' + this.id + ': start: ' + this.startTime + ', duration: ' + this.duration + ', end: ' + (this.startTime + this.duration) + '\n';
            //result += `  ${this.minX}, ${this.maxX}, ${this.minY}, ${this.maxY}\n`;
            this.commands.forEach(function (temp_command) {
                result += '  Command: ' + temp_command.unitId + ': ' + temp_command.executionTime + ' (' + temp_command.location.x + ', ' + temp_command.location.y + ')\n';
            });
            return result;
        }
    }, {
        key: 'addCommand',
        value: function addCommand(_command) {
            var adjust_time_to_unit_time = arguments[1] === undefined ? true : arguments[1];
            var link_prev_command = arguments[2] === undefined ? true : arguments[2];

            this.commands.push(_command);
            this.updateBoundingRect(_command);

            if (this.prevCommand) {
                var point_distance = _point2['default'].distance(this.prevCommand.location, _command.location);
                //console.log(`addCommand: ${point_distance}`);

                this.lineLength += point_distance;

                _command.lineLength = this.lineLength;
                if (link_prev_command) {
                    _command.prevCommand = this.prevCommand;
                }
            } else {
                this.startTime = _command.executionTime;
            }

            this.layerId = _command.layerId;
            this.prevCommand = _command;

            if (!_command.unitId) {
                _command.unitId = this.id;
            }

            if (adjust_time_to_unit_time) {
                _command.executionTime -= this.startTime;
            }

            this.duration = Math.max(this.duration, _command.executionTime);
        }
    }, {
        key: 'shiftOriginToMinXY',
        value: function shiftOriginToMinXY() {
            var _this = this;

            this.commands.forEach(function (command) {
                command.location.x -= _this.boundingRect.left; //this.minX;
                command.location.y -= _this.boundingRect.top; //this.minY;
            });
        }
    }, {
        key: 'resetBoundingRect',
        value: function resetBoundingRect() {
            var _this2 = this;

            this.boundingRect = null;
            this.commands.forEach(function (command) {
                _this2.updateBoundingRect(command);
            });
        }
    }, {
        key: 'updateBoundingRect',
        value: function updateBoundingRect(command) {
            if (!this.boundingRect) {
                this.boundingRect = new _rect2['default'](command.location.y, command.location.x, 0, 0);
                //this.minX = this.maxX = command.location.x;
                //this.minY = this.maxY = command.location.y;
                //console.log(`  init boundingRect: ${this.boundingRect.toString()}`);
            } else {
                this.boundingRect.expandToIncludePoint(command.location);
                //this.minX = Math.min(this.minX, command.location.x);
                //this.maxX = Math.max(this.maxX, command.location.x);
                //this.minY = Math.min(this.minY, command.location.y);
                //this.maxY = Math.max(this.maxY, command.location.y);
            }
        }
    }, {
        key: 'sortComandsByExecutionTime',
        value: function sortComandsByExecutionTime() {
            this.commands = this.commands.sort(this.sortCompareExecutionTime);
        }
    }, {
        key: 'sortCompareExecutionTime',
        value: function sortCompareExecutionTime(_command1, _command2) {
            return _command1.executionTime - _command2.executionTime;
        }
    }, {
        key: 'hasNext',
        value: function hasNext() {
            return this.currentCommandIndex + 1 < this.commands.length;
        }
    }, {
        key: 'hasNextInTimeRange',
        value: function hasNextInTimeRange(start_time, end_time) {
            var next_command = null;
            var next_command_index = this.currentCommandIndex + 1;

            if (next_command_index < this.commands.length) {
                next_command = this.commands[next_command_index];
                var next_command_time = next_command.executionTime;
                if (next_command_time >= start_time && next_command_time < end_time) {
                    return true;
                }
            }

            return false;
        }
    }, {
        key: 'next',
        value: function next() {
            var next_command = null;

            this.currentCommandIndex++;
            if (this.currentCommandIndex < this.commands.length) {
                next_command = this.commands[this.currentCommandIndex];
            }
            return next_command;
        }
    }, {
        key: 'nextInTimeRange',
        value: function nextInTimeRange(start_time, end_time) {
            var next_command = null;
            var next_command_index = this.currentCommandIndex + 1;

            if (next_command_index < this.commands.length) {
                next_command = this.commands[next_command_index];
                var next_command_time = next_command.executionTime;
                if (next_command_time >= start_time && next_command_time < end_time) {
                    this.currentCommandIndex++;
                } else {
                    next_command = null;
                }
            }
            return next_command;
        }
    }, {
        key: 'json',
        get: function get() {
            var json = {};
            json.id = this.id;
            json.start = this.startTime;
            json.dur = this.duration;
            json.end = this.startTime + this.duration;
            json.lid = this.layerId;
            json.ses = this.sessionId;

            var _commands = [];

            var dataTranslator = new _wwDrawingHistoryDataTranslator2['default']();

            this.commands.forEach(function (_command) {

                var data_object;
                data_object = dataTranslator.generateDataObjectWithCommand(_command);
                _commands.push(data_object); //(_command.json);
            });

            json.commands = _commands;

            return json;
        }
    }]);

    return WwDrawingHistoryUnit;
})();

exports['default'] = WwDrawingHistoryUnit;

/*

 package org.wwlib.drawing
 {
 import flash.geom.Point;
 import flash.utils.getTimer;

 import org.wwlib.utils.WwDebug;


public class WwDrawingHistoryUnit
{
    private var __debug:WwDebug;
    private var __id:int = -1;
    private var __commands:Vector.<WwDrawingHistoryBrushCommand>;
    private var __timeScale:Number = 1.0;
    private var __layerID:String;
    private var __lineLength:Number = 0;
    private var __prevCommand:WwDrawingHistoryBrushCommand = null;
    private var __startTime:int = 0;
    private var __duration:int = 0;
    private var __sessionID:int = 0;

    private var __json:Object = null;

    public function WwDrawingHistoryUnit()
    {
        __debug = WwDebug.instance;
        __commands = new Vector.<WwDrawingHistoryBrushCommand>;
    }

    public function addCommand(_command:WwDrawingHistoryBrushCommand, adjust_time_to_unit_time:Boolean=true, link_prev_command:Boolean=true):void
    {
        if (__startTime == 0)
        {
            __startTime = getTimer();
        }
        __commands.push(_command);
        if (__prevCommand)
        {
            __lineLength += Point.distance(__prevCommand.location, _command.location);
            _command.lineLength = __lineLength;
            if (link_prev_command)
            {
                _command.prevCommand = __prevCommand;
            }
        }
        __layerID = _command.layerID;
        __prevCommand = _command;

        if (adjust_time_to_unit_time)
        {
            _command.executionTime -= __startTime;
        }

        __duration = Math.max(__duration, _command.executionTime);
    }

    public static function MERGE_UNITS(_unit1:WwDrawingHistoryUnit, _unit2:WwDrawingHistoryUnit):WwDrawingHistoryUnit
    {
        var _merged_unit:WwDrawingHistoryUnit = new WwDrawingHistoryUnit();
        var temp_command:WwDrawingHistoryBrushCommand;

        for each (temp_command in _unit1.commands)
        {
            _merged_unit.addCommand(temp_command);
        }

        for each (temp_command in _unit2.commands)
        {
            _merged_unit.addCommand(temp_command);
        }

        return _merged_unit;
    }

    public function debugTime():String
    {
        var result:String = " Unit: " + __id + ": start: " + __startTime + ", duration: " + duration + ", end: " + (__startTime + duration) + "\n";
        for each (var temp_command:WwDrawingHistoryBrushCommand in __commands)
        {
            result += temp_command.debugTime();
        }
        return result;
    }

    public function sortComandsByExecutionTime():void
    {
        __commands = __commands.sort(sortCompareExecutionTime);
    }

    public function sortCompareExecutionTime(_command1:WwDrawingHistoryBrushCommand, _command2:WwDrawingHistoryBrushCommand):Number
    {
        return _command1.executionTime - _command2.executionTime;
    }

    public function filterCommandsByLayerID(_layerID):WwDrawingHistoryUnit
    {
        var _filtered_unit:WwDrawingHistoryUnit = new WwDrawingHistoryUnit();
        var temp_command:WwDrawingHistoryBrushCommand;

        for each (temp_command in __commands)
        {
            if (temp_command.layerID == _layerID)
            {
                _filtered_unit.addCommand(temp_command);
            }
        }

        return _filtered_unit;
    }

    public function get commands():Vector.<WwDrawingHistoryBrushCommand>
{
        return __commands
}

public function dispose():void
{
    for each (var _command:WwDrawingHistoryBrushCommand in __commands)
    {
        _command.dispose();
    }
    __commands = null;
}

public function get startTime():int {return __startTime}
public function set startTime(_time:int):void
{
    __startTime = _time;
}

public function get scaledStartTime():int
{
    return startTime * __timeScale;
}

public function get duration():int
{
    if (__duration ==0)
    {
        var _end_time:int = 0;
        for each (var _command:WwDrawingHistoryBrushCommand in __commands)
        {
            _end_time = Math.max(_end_time, _command.executionTime);
        }
        __duration = _end_time;
        return __duration;
    }
    else
    {
        return __duration;
    }

}

public function set duration(_time:int):void
{
    __duration = _time;
}

public function get scaledDuration():int
{
    return duration * __timeScale;
}

public function get timeScale():Number
{
    return __timeScale;
}

public function set timeScale(value:Number):void
{
    __timeScale = value;
    for each (var _command:WwDrawingHistoryBrushCommand in __commands)
    {
        _command.timeScale = __timeScale;
    }
}

public function get json():Object
{
    __json = new Object();
    __json.id = __id;
    __json.start = startTime;
    __json.dur = duration;
    __json.end = startTime + duration;
    __json.lid = __layerID;
    __json.ses = __sessionID;

    var _commands:Array = new Array();

    var dataTranslator:WwDrawingHistoryDataTranslator = new WwDrawingHistoryDataTranslator();


    for each (var _command:WwDrawingHistoryBrushCommand in __commands)
    {
        var data_object:Object;
        data_object = dataTranslator.generateDataObjectWithCommand(_command);
        _commands.push(data_object);//(_command.json);
    }

    __json.commands = _commands;

    return __json;
}

public function get layerID():String
{
    return __layerID;
}

public function set layerID(value:String):void
{
    __layerID = value;
}

public function get id():int
{
    return __id;
}

public function set id(value:int):void
{
    __id = value;
}

public function get lineLength():Number
{
    return __lineLength;
}

public function set lineLength(value:Number):void
{
    __lineLength = value;
}

public function get prevCommand():WwDrawingHistoryBrushCommand
{
    return __prevCommand;
}

public function set prevCommand(value:WwDrawingHistoryBrushCommand):void
{
    __prevCommand = value;
}

public function get sessionID():int
{
    return __sessionID;
}

public function set sessionID(value:int):void
{
    __sessionID = value;
}


}
}
 */
module.exports = exports['default'];
//# sourceMappingURL=ww-drawing-history-unit.js.map