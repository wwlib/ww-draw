/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 8/13/15.
 */

/**
 * ...
 * @author Andrew Rapo (andrew@worthwhilegames.org)
 * @license MIT
 */

import WwDrawingHistoryUnit from'./ww-drawing-history-unit';
import WwDeviceInfo from './ww-device-info';
import Rect from './rect';

class WwDrawingHistory {
    constructor() {
        this.units = [];
        this.startTime = 0;
        this.duration = 0;
        this.boundingRect = null;
    }

    toString()
    {
        let result = "Start: " + this.startTime + ", duration: " + this.duration + ", end: " + (this.startTime + this.duration) + "\n";
        this.units.forEach(unit => {
            result += unit.toString();
        });
        return result;
    }

    addUnit(unit)
    {
        if (unit)
        {
            this.units.push(unit);
            if (!this.boundingRect) {
                this.boundingRect = unit.boundingRect;
            } else {
                this.boundingRect.expandToIncludeRect(unit.boundingRect);
            }
            this.unitLineLength += unit.lineLength;
            this.duration += unit.duration;
        }
        else
        {
            console.log(`WwDrawingHistory:addUnit: unit is null`);
        }
    }


    concatAllCommands(layer = null) {
        let unit = new WwDrawingHistoryUnit();
        let unit_start_time_offset = 0;

        this.units.forEach(temp_unit => {
            if (temp_unit) {
                temp_unit.commands.forEach(temp_command => {
                    /*
                    if (this.startTime == 0) {
                        this.startTime = temp_command.executionTime;
                    }
                    else {
                        this.startTime = Math.min(this.startTime, temp_command.executionTime);
                    }
                    */
                    temp_command.executionTime += unit_start_time_offset;
                    this.duration = Math.max(this.duration, temp_command.executionTime);
                    if (layer) {
                        if (layer == temp_command.layerId) {
                            //console.log(` add: ${temp_unit.id}: ${temp_command.executionTime}`);
                            unit.addCommand(temp_command, false, false);//, false, false);
                        }
                    }
                    else {
                        unit.addCommand(temp_command, false, false);//, false, false);
                    }
                });
                unit_start_time_offset += temp_unit.duration;
            }
        });

        return unit;
    }
}

export default WwDrawingHistory;

/*

 package org.wwlib.drawing
 {
 import org.wwlib.utils.WwDebug;
 import org.wwlib.utils.WwDeviceInfo;


public class WwDrawingHistory
{
    private var __debug:WwDebug;
    private var __units:Vector.<WwDrawingHistoryUnit>;
    private var __startTime:int;
    private var __duration:int;
    private var __timeScale:Number = 1.0;
    private var __id:int;
    private var __unitLineLength:Number;
    private var __sessions:Vector.<WwDrawingHistorySession>;

    private var __json:Object = null;

    public function WwDrawingHistory()
    {
        __debug = WwDebug.instance;
        __units = new Vector.<WwDrawingHistoryUnit>;
        __startTime = 0;
        __duration = 0;
        __unitLineLength = 0;
        __sessions = new Vector.<WwDrawingHistorySession>;
    }

    public function addUnit(_unit:WwDrawingHistoryUnit):void
    {

        if (_unit)
        {
            //__debug.msg("QcColoringHistory:addUnit: " + _unit.id, "6");
            __units.push(_unit);
            __unitLineLength += _unit.lineLength;
            __duration += _unit.duration;
        }
        else
        {
            __debug.msg("WwDrawingHistory:addUnit: unit is null", "6");
        }
    }

    public function removeLastUnit():WwDrawingHistoryUnit
    {
        var unit:WwDrawingHistoryUnit = __units.pop();
        if (unit)
        {
            __unitLineLength -= unit.lineLength;
            __duration -= unit.duration;
        }

        return unit;
    }

    public static function MERGE_HISTORIES(_history1:WwDrawingHistory, _history2:WwDrawingHistory, _history3:WwDrawingHistory):WwDrawingHistory
    {
        var new_history:WwDrawingHistory = new WwDrawingHistory;
        var unit:WwDrawingHistoryUnit;

        for each (unit in _history1.units)
        {
            new_history.addUnit(unit);
        }

        for each (unit in _history2.units)
        {
            new_history.addUnit(unit);
        }

        for each (unit in _history3.units)
        {
            new_history.addUnit(unit);
        }

        return new_history;
    }

    public function sortUnitsByStartTime():void
    {
        __units = __units.sort(sortCompareUnitStartTime);
    }

    private function sortCompareUnitStartTime(_unit1:WwDrawingHistoryUnit, _unit2:WwDrawingHistoryUnit):Number
    {
        return _unit1.startTime - _unit2.startTime;
    }

    public function debugTime():String
    {
        var result:String = "History: " + __id + ": start: " + __startTime + ", duration: " + __duration + ", end: " + (__startTime + __duration) + "\n";
        for each (var _unit:WwDrawingHistoryUnit in __units)
        {
            result += _unit.debugTime();
        }
        return result;
    }

    public function concatAllCommands(layer:String=null):WwDrawingHistoryUnit
    {
        var _unit:WwDrawingHistoryUnit = new WwDrawingHistoryUnit();

        for each (var temp_unit:WwDrawingHistoryUnit in __units)
        {
            if (temp_unit)
            {
                for each (var temp_command:WwDrawingHistoryBrushCommand in temp_unit.commands)
                {
                    if (__startTime == 0)
                    {
                        __startTime = temp_command.executionTime;
                    }
                    else
                    {
                        __startTime = Math.min(__startTime, temp_command.executionTime);
                    }
                    __duration = Math.max(__duration, temp_command.executionTime);
                    if (_layer)
                    {
                        if (_layer == temp_command.layerID)
                        {
                            _unit.addCommand(temp_command, false, false);//, false, false);
                        }
                    }
                    else
                    {
                        _unit.addCommand(temp_command, false, false);//, false, false);
                    }
                }
            }
        }

        return _unit;
    }

    public function deleteUnitsByLayerID(_id:String):void
    {
        var _new_unit_list:Vector.<WwDrawingHistoryUnit> = new Vector.<WwDrawingHistoryUnit>;

        for each (var temp_unit:WwDrawingHistoryUnit in __units)
        {
            if (temp_unit)
            {
                if (temp_unit.layerID != _id)
                {
                    _new_unit_list.push(temp_unit);
                }
                else
                {
                    temp_unit.dispose();
                }
            }
        }

        __units = _new_unit_list;
    }

*/

/*

    public function get json():Object
    {
        __json = new Object();
        __json.id = __id;
        __json.start = startTime;
        __json.end = duration;
        __json.scale = WwDeviceInfo.instance.assetScaleFactor;

        // units
        var _units:Array = new Array();
        for each (var _unit:WwDrawingHistoryUnit in __units)
        {
            _units.push(_unit.json);
        }
        __json.units = _units;

        // sessions
        var _sessions:Array = [];
        for each (var _session:WwDrawingHistorySession in __sessions)
        {
            _sessions.push(_session.json);
        }
        __json.sessions = _sessions;

        // add redundant stats - most recent - for inclusion in fdl
        __json.stats = _session.stats.json;

        return __json;
    }

    public function reset():void
    {
        __units = new Vector.<WwDrawingHistoryUnit>;
        __startTime = 0;
    }

    public function debug():void
    {
        //__debug.clear();
        __debug.msg("History: debug: " + __units.length, "1");
        for each (var temp_unit:WwDrawingHistoryUnit in __units)
        {
            __debug.msg("  " + temp_unit.startTime, "1");
        }
    }

    public function dispose():void
    {
        for each (var _unit:WwDrawingHistoryUnit in __units)
        {
            _unit.dispose();
        }
        __units = null;
    }

    public function get units():Vector.<WwDrawingHistoryUnit>
{
        return __units
}

public function set units(_units:Vector.<WwDrawingHistoryUnit>):void
{
    __units = _units;
}

public function get unitCount():int
{
    return __units.length;
}


public function get startTime():int
{
    return __startTime;
}

public function get timeScale():Number
{
    return __timeScale;
}

public function set timeScale(value:Number):void
{
    __timeScale = value;
    for each (var temp_unit:WwDrawingHistoryUnit in __units)
    {
        temp_unit.timeScale = __timeScale;
    }
}

public function get scaledDuration():int
{
    return __duration * __timeScale;
}

public function get duration():int
{
    return __duration;
}

public function set duration(value:int):void
{
    __duration = value;
}

public function get unitLineLength():Number
{
    return __unitLineLength;
}

public function get sessions():Vector.<WwDrawingHistorySession>
{
    return __sessions;
}

public function set sessions(value:Vector.<WwDrawingHistorySession>):void
{
    __sessions = value;
}


}
}
 */