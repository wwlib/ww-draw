/**
 * Created by andrew on 8/13/15.
 */

/**
 * ...
 * @author Andrew Rapo (andrew@worthwhilegames.org)
 * @license MIT
 */

import Point from './point';
import getTimer from './get-timer';
import WwDrawingHistoryDataTranslator from './ww-drawing-history-data-translator';


class WwDrawingHistoryUnit {
    constructor() {
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
    }

    toString()
    {
        var result:String = " Unit: " + this.id + ": start: " + this.startTime + ", duration: " + this.duration + ", end: " + (this.startTime + this.duration) + "\n";
        this.commands.forEach(temp_command => {
            result += `  Command: ${temp_command.unitId}: ${temp_command.executionTime} (${temp_command.location.x}, ${temp_command.location.y})\n`;
        });
        return result;
    }

    addCommand(_command, adjust_time_to_unit_time=true, link_prev_command=true)
    {

        this.commands.push(_command);
        if (this.prevCommand)
        {
            this.lineLength += Point.distance(this.prevCommand.location, _command.location);
            _command.lineLength = this.lineLength;
            if (link_prev_command)
            {
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

        if (adjust_time_to_unit_time)
        {
            _command.executionTime -= this.startTime;
        }

        this.duration = Math.max(this.duration, _command.executionTime);
    }

    sortComandsByExecutionTime()
    {
        this.commands = this.commands.sort(this.sortCompareExecutionTime);
    }

    sortCompareExecutionTime(_command1, _command2)
    {
        return _command1.executionTime - _command2.executionTime;
    }

    get json()
    {
        let json = new Object();
        json.id = this.id;
        json.start = startTime;
        json.dur = duration;
        json.end = startTime + duration;
        json.lid = this.layerId;
        json.ses = this.sessionId;

        var _commands = [];

        var dataTranslator = new WwDrawingHistoryDataTranslator();

        this.commands.forEach(_command => {

            var data_object:Object;
            data_object = dataTranslator.generateDataObjectWithCommand(_command);
            _commands.push(data_object);//(_command.json);
        });

        json.commands = _commands;

        return json;
    }

    hasNext() {
        return (this.currentCommandIndex + 1) < this.commands.length;
    }

    hasNextInTimeRange(start_time, end_time) {
        let next_command = null;
        let next_command_index = this.currentCommandIndex + 1;

        if (next_command_index < this.commands.length) {
            next_command =  this.commands[next_command_index];
            let next_command_time = next_command.executionTime;
            if (next_command_time >= start_time && next_command_time < end_time) {
                return true;
            }
        }

        return false;
    }

    next() {
        let next_command = null;

        this.currentCommandIndex++;
        if (this.currentCommandIndex < this.commands.length) {
            next_command = this.commands[this.currentCommandIndex];
        }
        return next_command;
    }

    nextInTimeRange(start_time, end_time) {
        let next_command = null;
        let next_command_index = this.currentCommandIndex + 1;

        if (next_command_index < this.commands.length) {
            next_command =  this.commands[next_command_index];
            let next_command_time = next_command.executionTime;
            if (next_command_time >= start_time && next_command_time < end_time) {
                this.currentCommandIndex++;
            } else {
                next_command = null;
            }
        }
        return next_command;
    }

}

export default WwDrawingHistoryUnit;

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