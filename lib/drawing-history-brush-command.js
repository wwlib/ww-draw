/**
 * Created by andrew on 7/7/15.
 */

/**
 * ...
 * @author Andrew Rapo (andrew@worthwhilegames.org)
 * @license MIT
 */

'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _point = require('./point');

var _point2 = _interopRequireDefault(_point);

;

/*
import flash.utils.getTimer;

import org.wwlib.starling.WwBrush;
import org.wwlib.utils.WwDebug;

import starling.display.BlendMode;


    public class WwDrawingHistoryBrushCommand
    {
        private var __debug:WwDebug;
        private var __brushID:String;
        private var __brush:WwBrush;
        private var __location:Point;
        private var __uintColor:uint;
        private var __brushScale:Number;
        private var __brushExpansionFactor:Number = 1.0;
        private var __brushBlendMode:String;
        private var __executionTime:int;
        private var __normalizedExecutionTime:int;
        private var __brushAlpha:Number;
        private var __brushRotation:Number;
        private var __timeScale:Number = 1.0;
        private var __layerID:String;
        private var __generatedCommand:Boolean;
        private var __unitID:int;
        private var __lineLength:Number = 0;
        private var __prevCommand:WwDrawingHistoryBrushCommand = null;
        private var __rendered:Boolean = false;

        private var __json:Object = null;

        public function WwDrawingHistoryBrushCommand(_brushID:String, _location:Point=null, _uint_color:uint=0, _brush_scale:Number=1.0, _expansion_factor:Number=1.0, _blend_mode:String="normal", _time:int=0, _alpha:Number=1.0, _rotation:Number=0, _layerID:String="UNDER", _generated:Boolean=false):void
    {
        __debug = WwDebug.instance;
        __brushID = _brushID;
        __location = _location;
        __uintColor = _uint_color;
        __brushScale = _brush_scale;
        __brushExpansionFactor = _expansion_factor;
        __brushBlendMode = _blend_mode;
        __executionTime = _time;
        __brushAlpha = _alpha;
        __brushRotation = _rotation;
        __layerID = _layerID;
        __generatedCommand = _generated;

        if (__executionTime == 0) __executionTime = getTimer();
        __normalizedExecutionTime = __executionTime;
    }

    public static function clone(_command:WwDrawingHistoryBrushCommand):WwDrawingHistoryBrushCommand
    {
        var _clone:WwDrawingHistoryBrushCommand = new WwDrawingHistoryBrushCommand(_command.brushID);

        _clone.location = _command.location;
        _clone.uintColor = _command.uintColor;
        _clone.brushScale = _command.brushScale;
        _clone.brushExpansionFactor = _command.brushExpansionFactor;
        _clone.brushBlendMode = _command.brushBlendMode;
        _clone.executionTime = _command.executionTime;
        _clone.brushAlpha = _command.brushAlpha;
        _clone.brushRotation = _command.brushRotation;
        _clone.timeScale = _command.timeScale;
        _clone.layerID = _command.layerID;
        _clone.generatedCommand = _command.generatedCommand;
        _clone.unitID = _command.unitID;
        //_clone.lineLength = _command.lineLength;
        //_clone.prevCommand = _command.prevCommand;
        //_clone.rendered = _command.rendered;

        return _clone;
    }

    public function dispose():void
{
    __brush = null;
    __debug = null;
    __location = null;
}

public function debug():void
    {
        __debug.msg("Command: " + __brushID, "1");
__debug.msg(" " + __unitID, "1");
__debug.msg(" " + __location, "1");
__debug.msg(" " + __uintColor, "1");
__debug.msg(" " + __brushScale, "1");
__debug.msg(" " + __brushExpansionFactor, "1");
__debug.msg(" " + __brushBlendMode, "1");
__debug.msg(" " + __executionTime, "1");
__debug.msg(" " + __brushAlpha, "1");
__debug.msg(" " + __brushRotation, "1");
__debug.msg(" " + __timeScale, "1");
__debug.msg(" " + __layerID, "1");
__debug.msg(" " + __generatedCommand, "1");
__debug.msg(" " + __brush, "1");
}

public function debugTime():String
{
    return "  Command: " + __unitID + ": " + __executionTime + "\n";
}

public function get xml():String
{
    return "  <command uid=\"" + unitID + "\" lid=\"" + layerID + "\" t=\"" + __executionTime + "\" bid=\"" + __brushID + "\" c=\"" + __uintColor + "\" s=\"" + __brushScale + "\" bm=\"" + __brushBlendMode + "\" a=\"" + __brushAlpha + "\" r=\"" + __brushRotation + "\" g=\"" + __generatedCommand + "\" x=\"" + __location.x + "\" y=\"" + __location.y + "\" />\n";
}

public function get json():Object
{
    __json = new Object();
    __json.uid = unitID;
    __json.lid = layerID;
    __json.t = __executionTime;
    __json.bid = __brushID;
    __json.c = __uintColor;
    __json.s = __brushScale;
    __json.bm = __brushBlendMode;
    __json.a = __brushAlpha;
    __json.r = __brushRotation;
    __json.g = __generatedCommand;
    __json.x = __location.x;
    __json.y = __location.y;

    return __json;
}

public function setCurrentTime():void
{
    __executionTime = getTimer();
}

public function get brush():WwBrush
{
    __brush = WwDrawingBrushManager.instance.getBrushFromBrushID(__brushID);

    if (__brush)
    {
        __brush.brushScale = __brushScale * __brushExpansionFactor;

        switch(__brushBlendMode)
        {
            case "erase": __brush.image.blendMode = BlendMode.ERASE;
                break;

            case "normal": __brush.image.blendMode = BlendMode.NORMAL;
                break;

            default: __brush.image.blendMode = BlendMode.NORMAL;
                break;
        }

        __brush.image.color = __uintColor;
        __brush.image.rotation = __brushRotation;
        __brush.image.x = __location.x;
        __brush.image.y = __location.y;
        __brush.image.alpha = __brushAlpha;
    }

    return __brush;
}

public function get brushID():String
{
    return __brushID;
}

public function set brushID(value:String):void
{
    __brushID = value;
}


public function get location():Point
{
    return __location;
}

public function set location(value:Point):void
{
    __location = value;
}

public function get uintColor():uint
{
    return __uintColor;
}

public function set uintColor(value:uint):void
{
    __uintColor = value;
}

public function get brushScale():Number
{
    return __brushScale;
}

public function set brushScale(value:Number):void
{
    __brushScale = value;
}

public function get brushExpansionFactor():Number
{
    return __brushExpansionFactor;
}

public function set brushExpansionFactor(value:Number):void
{
    __brushExpansionFactor = value;
}

public function get brushBlendMode():String
{
    return __brushBlendMode;
}

public function set brushBlendMode(value:String):void
{
    __brushBlendMode = value;
}

public function get executionTime():int
{
    return __executionTime;
}

public function set executionTime(value:int):void
{
    __executionTime = value;
__normalizedExecutionTime = value;
}

public function get scaledExecutionTime():int
{
    return __executionTime * __timeScale;
}

public function get brushAlpha():Number
{
    return __brushAlpha;
}

public function set brushAlpha(value:Number):void
{
    __brushAlpha = value;
}

public function get brushRotation():Number
{
    return __brushRotation;
}

public function set brushRotation(value:Number):void
{
    __brushRotation = value;
}

public function get timeScale():Number
{
    return __timeScale;
}

public function set timeScale(value:Number):void
{
    __timeScale = value;
}

public function get layerID():String
{
    return __layerID;
}

public function set layerID(value:String):void
{
    __layerID = value;
}

//NormalizedExecutionTime seems to be the same as regular executionTime

public function get normalizedExecutionTime():int
{
    return __normalizedExecutionTime;
}



public function get scaledNormalizedExecutionTime():int
{
    return __normalizedExecutionTime * __timeScale;
}


public function get generatedCommand():Boolean
{
    return __generatedCommand;
}

public function set generatedCommand(value:Boolean):void
{
    __generatedCommand = value;
}

public function get x():Number { return __location.x}
public function get y():Number { return __location.y}

public function get unitID():int
{
    return __unitID;
}

public function set unitID(value:int):void
{
    __unitID = value;
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

public function get rendered():Boolean
{
    return __rendered;
}

public function set rendered(value:Boolean):void
{
    __rendered = value;
}

// Update Methods

public function updateBrushId(value:String):String
{
    if (value) { __brushID = value; return value }
    else { return __brushID }
}

public function updateUintColor(value:uint):uint
{
    if (value) { __uintColor = value; return value }
    else { return __uintColor }
}

public function updateUnitID(value:int):int
{
    if (value) { __unitID = value; return value }
    else { return __unitID }
}

public function updateLayerID(value:String):String
{
    if (value) { __layerID = value; return value }
    else { return __layerID }
}

public function updateExecutionTime(value:int):int
{
    if (value >= 0) { __executionTime = value; return value }
    else { return __executionTime }
}

public function updateBrushScale(value:Number):Number
{
    if (value) { __brushScale = value; return value }
    else { return __brushScale }
}

public function updateBlendMode(value:String):String
{
    if (value) { __brushBlendMode = value; return value }
    else { return __brushBlendMode }
}

public function updateBrushAlpha(value:Number):Number
{
    if (value) { __brushAlpha = value; return value }
    else { return __brushAlpha }
}

public function updateBrushRotation(value:Number):Number
{
    if (value) { __brushRotation = value; return value }
    else { return __brushRotation }
}

public function updateX(value:int):int
{
    if (!location) { location = new Point(0,0); }

    if (value) { __location.x = value; return value }
    else { return __location.x }
}

public function updateY(value:int):int
{
    if (!location) { location = new Point(0,0); }

    if (value) { __location.y = value; return value }
    else { return __location.y }
}


//Redundancy Methods

public function checkRedundancyOfBrushID(data_object:Object, property:String, value:String):void
{
    if (value == __brushID) { }
else { __brushID = value; data_object[property] = __brushID }
}

public function checkRedundancyOfUintColor(data_object:Object, property:String, value:uint):void
{
    if (value == __uintColor) { }
else { __uintColor = value; data_object[property] = __uintColor }
}

public function checkRedundancyOfUnitID(data_object:Object, property:String, value:int):void
{
    if (value == __unitID) { }
else { __unitID = value; data_object[property] = __unitID }
}

public function checkRedundancyOfLayerID(data_object:Object, property:String, value:String):void
{
    if (value == __layerID) { }
else { __layerID = value; data_object[property] = __layerID }
}

public function checkRedundancyOfExecutionTime(data_object:Object, property:String, value:int):void
{
    //always include time parameter. SAR:150619
    if (false && value == __executionTime) { }
else { __executionTime = value; data_object[property] = __executionTime }
}

public function checkRedundancyOfBrushScale(data_object:Object, property:String, value:Number):void
{
    if (value == __brushScale) { }
else { __brushScale = value; data_object[property] = __brushScale }
}

public function checkRedundancyOfBrushBlendMode(data_object:Object, property:String, value:String):void
{
    if (value == __brushBlendMode) { }
else { __brushBlendMode = value; data_object[property] = __brushBlendMode }
}

public function checkRedundancyOfBrushAlpha(data_object:Object, property:String, value:Number):void
{
    if (value == __brushAlpha) { }
else { __brushAlpha = value; data_object[property] = __brushAlpha }
}

public function checkRedundancyOfBrushRotation(data_object:Object, property:String, value:Number):void
{
    if (value == __brushRotation) { }
else { __brushRotation = value; data_object[property] = __brushRotation }
}

public function checkRedundancyOfGeneratedCommand(data_object:Object, property:String, value:Boolean):void
{
    if (value == __generatedCommand) { }
else { __generatedCommand = value; data_object[property] = __generatedCommand }
}

public function checkRedundancyOfX(data_object:Object, property:String, value:Number):void
{
    if (!location) { location = new Point(0,0); }

if (value == __location.x) { }
else { __location.x = value; data_object[property] = __location.x }
}

public function checkRedundancyOfY(data_object:Object, property:String, value:Number):void
{
    if (!location) { location = new Point(0,0); }

if (value == __location.y) { }
else { __location.y = value; data_object[property] =  __location.y }
}
}
}

*/
//# sourceMappingURL=drawing-history-brush-command.js.map