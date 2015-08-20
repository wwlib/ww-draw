/**
 * Created by andrew on 7/7/15.
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

var _get = function get(_x11, _x12, _x13) { var _again = true; _function: while (_again) { var object = _x11, property = _x12, receiver = _x13; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x11 = parent; _x12 = property; _x13 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _point = require('./point');

var _point2 = _interopRequireDefault(_point);

var _getTimer = require('./get-timer');

var _getTimer2 = _interopRequireDefault(_getTimer);

var _wwBrush = require('./ww-brush');

var _wwBrush2 = _interopRequireDefault(_wwBrush);

var _wwDrawingBrushManager = require('./ww-drawing-brush-manager');

var _wwDrawingBrushManager2 = _interopRequireDefault(_wwDrawingBrushManager);

var WwDrawingHistoryBrushCommand = (function () {
    function WwDrawingHistoryBrushCommand(brush_id, location_point) {
        var time = arguments[2] === undefined ? null : arguments[2];
        var uint_color = arguments[3] === undefined ? null : arguments[3];
        var brush_scale = arguments[4] === undefined ? 1.0 : arguments[4];
        var expansion_factor = arguments[5] === undefined ? 1.0 : arguments[5];
        var blend_mode = arguments[6] === undefined ? 'normal' : arguments[6];
        var alpha = arguments[7] === undefined ? 1.0 : arguments[7];
        var rotation = arguments[8] === undefined ? 0 : arguments[8];
        var layer_id = arguments[9] === undefined ? 'UNDER' : arguments[9];
        var generated = arguments[10] === undefined ? false : arguments[10];

        _classCallCheck(this, WwDrawingHistoryBrushCommand);

        this._brushId = brush_id;
        this._location = location_point;
        this._color = uint_color;
        this._brushScale = brush_scale;
        this.brushExpansionFactor = expansion_factor;
        this.brushBlendMode = blend_mode;
        this.executionTime = time;
        this.brushAlpha = alpha;
        this.brushRotation = rotation;
        this.layerId = layer_id;
        this.generatedCommand = generated;

        this.lineLength = 0; //the line length up to this point, from the start of the unit
        this.prevCommand = null;
        this.rendered = false;

        this.unitId = null;
        this.timeScale = 1.0;
        this._brush = null;

        if (this.executionTime == null) {
            this.executionTime = (0, _getTimer2['default'])();
        }
        this.normalizedExecutionTime = this.executionTime;
    }

    _createClass(WwDrawingHistoryBrushCommand, [{
        key: 'onReady',
        value: function onReady() {
            this.centerPivot();
            _get(Object.getPrototypeOf(WwDrawingHistoryBrushCommand.prototype), 'onReady', this).call(this);

            //__img.blendMode = BlendMode.NORMAL;
            //__img.color = __color;
        }
    }, {
        key: 'toString',
        value: function toString() {
            var result = 'WwDrawingHistoryBrushCommand\n';
            result += this._brushId + '\n';
            result += this.unitId + '\n';
            result += this._location + '\n';
            result += this._color + '\n';
            result += this._brushScale + '\n';
            result += this.brushExpansionFactor + '\n';
            result += this.brushBlendMode + '\n';
            result += this.executionTime + '\n';
            result += this.brushAlpha + '\n';
            result += this.brushRotation + '\n';
            result += this.timeScale + '\n';
            result += this.layerId + '\n';
            result += this.generatedCommand + '\n';
            result += this._brush + '\n';

            return result;
        }
    }, {
        key: 'updateBrushId',

        // Update Methods

        value: function updateBrushId(value) {
            if (value) {
                this.brushId = value;return value;
            } else {
                return this.brushId;
            }
        }
    }, {
        key: 'updateUintColor',
        value: function updateUintColor(value) {
            if (value) {
                this.uintColor = value;return value;
            } else {
                return this.uintColor;
            }
        }
    }, {
        key: 'updateUnitId',
        value: function updateUnitId(value) {
            if (value) {
                this.unitId = value;return value;
            } else {
                return this.unitId;
            }
        }
    }, {
        key: 'updateLayerId',
        value: function updateLayerId(value) {
            if (value) {
                this.layerId = value;return value;
            } else {
                return this.layerId;
            }
        }
    }, {
        key: 'updateExecutionTime',
        value: function updateExecutionTime(value) {
            if (value != undefined) {
                this.executionTime = value;return value;
            } else {
                return this.executionTime;
            }
        }
    }, {
        key: 'updateBrushScale',
        value: function updateBrushScale(value) {
            if (value) {
                this.brushScale = value;return value;
            } else {
                return this.brushScale;
            }
        }
    }, {
        key: 'updateBlendMode',
        value: function updateBlendMode(value) {
            if (value) {
                this.brushBlendMode = value;return value;
            } else {
                return this.brushBlendMode;
            }
        }
    }, {
        key: 'updateBrushAlpha',
        value: function updateBrushAlpha(value) {
            if (value) {
                this.brushAlpha = value;return value;
            } else {
                return this.brushAlpha;
            }
        }
    }, {
        key: 'updateBrushRotation',
        value: function updateBrushRotation(value) {
            if (value) {
                this.brushRotation = value;return value;
            } else {
                return this.brushRotation;
            }
        }
    }, {
        key: 'updateX',
        value: function updateX(value) {
            if (!this._location) {
                this._location = new _point2['default'](0, 0);
            }

            if (value) {
                this._location.x = value;return value;
            } else {
                return this._location.x;
            }
        }
    }, {
        key: 'updateY',
        value: function updateY(value) {
            if (!this._location) {
                this._location = new _point2['default'](0, 0);
            }

            if (value) {
                this._location.y = value;return value;
            } else {
                return this._location.y;
            }
        }
    }, {
        key: 'checkRedundancyOfBrushId',

        //Redundancy Methods

        value: function checkRedundancyOfBrushId(data_object, property, value) {
            if (value == this.brushId) {} else {
                this.brushId = value;data_object[property] = this.brushId;
            }
        }
    }, {
        key: 'checkRedundancyOfUintColor',
        value: function checkRedundancyOfUintColor(data_object, property, value) {
            if (value == this.uintColor) {} else {
                this.uintColor = value;data_object[property] = this.uintColor;
            }
        }
    }, {
        key: 'checkRedundancyOfUnitId',
        value: function checkRedundancyOfUnitId(data_object, property, value) {
            if (value == this.unitId) {} else {
                this.unitId = value;data_object[property] = this.unitId;
            }
        }
    }, {
        key: 'checkRedundancyOfLayerId',
        value: function checkRedundancyOfLayerId(data_object, property, value) {
            if (value == this.layerId) {} else {
                this.layerId = value;data_object[property] = this.layerId;
            }
        }
    }, {
        key: 'checkRedundancyOfExecutionTime',
        value: function checkRedundancyOfExecutionTime(data_object, property, value) {
            //always include time parameter. SAR:150619
            if (false && value == this.executionTime) {} else {
                this.executionTime = value;data_object[property] = this.executionTime;
            }
        }
    }, {
        key: 'checkRedundancyOfBrushScale',
        value: function checkRedundancyOfBrushScale(data_object, property, value) {
            if (value == this.brushScale) {} else {
                this.brushScale = value;data_object[property] = this.brushScale;
            }
        }
    }, {
        key: 'checkRedundancyOfBrushBlendMode',
        value: function checkRedundancyOfBrushBlendMode(data_object, property, value) {
            if (value == this.brushBlendMode) {} else {
                this.brushBlendMode = value;data_object[property] = this.brushBlendMode;
            }
        }
    }, {
        key: 'checkRedundancyOfBrushAlpha',
        value: function checkRedundancyOfBrushAlpha(data_object, property, value) {
            if (value == this.brushAlpha) {} else {
                this.brushAlpha = value;data_object[property] = this.brushAlpha;
            }
        }
    }, {
        key: 'checkRedundancyOfBrushRotation',
        value: function checkRedundancyOfBrushRotation(data_object, property, value) {
            if (value == this.brushRotation) {} else {
                this.brushRotation = value;data_object[property] = this.brushRotation;
            }
        }
    }, {
        key: 'checkRedundancyOfGeneratedCommand',
        value: function checkRedundancyOfGeneratedCommand(data_object, property, value) {
            if (value == this.generatedCommand) {} else {
                this.generatedCommand = value;data_object[property] = this.generatedCommand;
            }
        }
    }, {
        key: 'checkRedundancyOfX',
        value: function checkRedundancyOfX(data_object, property, value) {
            if (!this._location) {
                this._location = new _point2['default'](0, 0);
            }

            if (value == this._location.x) {} else {
                this._location.x = value;data_object[property] = this._location.x;
            }
        }
    }, {
        key: 'checkRedundancyOfY',
        value: function checkRedundancyOfY(data_object, property, value) {
            if (!this._location) {
                this._location = new _point2['default'](0, 0);
            }

            if (value == this._location.y) {} else {
                this._location.y = value;data_object[property] = this._location.y;
            }
        }
    }, {
        key: 'dispose',
        value: function dispose() {
            this._brush = null;
            this._location = null;
        }
    }, {
        key: 'brush',
        get: function get() {
            this._brush = _wwDrawingBrushManager2['default'].instance.getBrushFromBrushId(this._brushId);

            if (this._brush) {
                this._brush.scale = this._brushScale * this.brushExpansionFactor;

                /*
                switch(this.brushBlendMode)
                {
                    case "erase": this._brush.image.blendMode = BlendMode.ERASE;
                        break;
                     case "normal": this._brush.image.blendMode = BlendMode.NORMAL;
                        break;
                     default: this._brush.image.blendMode = BlendMode.NORMAL;
                        break;
                }
                */

                this._brush.color = this._color;
                this._brush.rotation = this.brushRotation;
                this._brush.x = this._location.x;
                this._brush.y = this._location.y;
                this._brush.alpha = this.brushAlpha;
            }

            return this._brush;
        }
    }, {
        key: 'brushId',
        get: function get() {
            return this._brushId;
        },
        set: function set(value) {
            this._brushId = value;
        }
    }, {
        key: 'location',
        get: function get() {
            return this._location;
        },
        set: function set(value) {
            this._location = value;
        }
    }, {
        key: 'color',
        get: function get() {
            return this._color;
        },
        set: function set(value) {
            this._color = value;
        }
    }, {
        key: 'brushScale',
        get: function get() {
            return this._brushScale;
        },
        set: function set(value) {
            this._brushScale = value;
        }
    }], [{
        key: 'clone',
        value: function clone(_command) {
            var data_object = arguments[1] === undefined ? null : arguments[1];

            var _clone = new WwDrawingHistoryBrushCommand(_command.brushId, new _point2['default'](_command.location.x, _command.location.y));

            //_clone.location = new Point(_command.location.x, _command.location.y);
            _clone.uintColor = _command.uintColor;
            _clone.brushScale = _command.brushScale;
            _clone.brushExpansionFactor = _command.brushExpansionFactor;
            _clone.brushBlendMode = _command.brushBlendMode;
            _clone.executionTime = _command.executionTime;
            _clone.brushAlpha = _command.brushAlpha;
            _clone.brushRotation = _command.brushRotation;
            _clone.timeScale = _command.timeScale;
            _clone.layerId = _command.layerId;
            _clone.generatedCommand = _command.generatedCommand;
            _clone.unitID = _command.unitID;

            if (data_object) {
                _clone.updateUnitId(data_object.uid);
                _clone.updateBrushId(data_object.bid);
                _clone.updateX(data_object.x);
                _clone.updateY(data_object.y);
                _clone.updateExecutionTime(data_object.t);
                _clone.updateUintColor(data_object.c);
                _clone.updateBrushScale(data_object.s);
                _clone.updateBlendMode(data_object.bm);
                _clone.updateBrushAlpha(data_object.a);
                _clone.updateBrushRotation(data_object.r);
                _clone.updateLayerId(data_object.lid);
            }

            return _clone;
        }
    }]);

    return WwDrawingHistoryBrushCommand;
})();

exports['default'] = WwDrawingHistoryBrushCommand;

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
module.exports = exports['default'];
//# sourceMappingURL=ww-drawing-history-brush-command.js.map