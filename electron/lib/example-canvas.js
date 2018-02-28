/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 27);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 7/7/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vector2_1 = __webpack_require__(19);
class Point extends vector2_1.default {
    constructor(x = 0, y = 0) {
        super(x, y);
        //this.x = x;
        //this.y = y;
    }
    toString() {
        return `(${this.x}, ${this.y})`;
    }
    static distance(point1, point2) {
        //let vec1 = new Vector2(point1.x, point1.y);
        //let diff = vec1.diff(point2); //Point can be used as an argument for diff
        let diff = point1.diff(point2);
        return diff.magnitude;
    }
    static interpolate(point1, point2, factor) {
        let dx = point1.x + (point2.x - point1.x) * factor;
        let dy = point1.y + (point2.y - point1.y) * factor;
        return new Point(dx, dy);
    }
}
exports.Point = Point;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 7/7/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ...
 * @author Andrew Rapo (andrew@worthwhilegames.org)
 * @license MIT
 */
const Point_1 = __webpack_require__(0);
const WwDrawingBrushManager_1 = __webpack_require__(8);
class WwDrawingHistoryBrushCommand {
    constructor(brush_id, location_point, time = null, uint_color = null, brush_scale = 1.0, expansion_factor = 1.0, blend_mode = "normal", alpha = 1.0, rotation = 0, layer_id = "UNDER", generated = false) {
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
        this.offset = new Point_1.Point();
        this.scale = 1.0;
        this.lineLength = 0; //the line length up to this point, from the start of the unit
        this.prevCommand = null;
        this.rendered = false;
        this.unitId = null;
        this.timeScale = 1.0;
        this._brush = null;
        if (this.executionTime === null) {
            this.executionTime = 0; //getTimer();
        }
        this.normalizedExecutionTime = this.executionTime;
    }
    onReady() {
        // this.centerPivot();
        // super.onReady();
        //__img.blendMode = BlendMode.NORMAL;
        //__img.color = __color;
    }
    get brush() {
        this._brush = WwDrawingBrushManager_1.WwDrawingBrushManager.instance.getBrushFromBrushId(this._brushId);
        if (this._brush) {
            this._brush.scale = this._brushScale * this.brushExpansionFactor * this.scale;
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
            this._brush.x = this._location.x * this.scale + this.offset.x;
            this._brush.y = this._location.y * this.scale + this.offset.y;
            this._brush.alpha = this.brushAlpha;
        }
        return this._brush;
    }
    get brushId() {
        return this._brushId;
    }
    set brushId(value) {
        this._brushId = value;
    }
    get location() {
        return this._location;
    }
    set location(value) {
        this._location = value;
    }
    get color() {
        return this._color;
    }
    set color(value) {
        this._color = value;
    }
    get brushScale() {
        return this._brushScale;
    }
    set brushScale(value) {
        this._brushScale = value;
    }
    toString() {
        let result = `WwDrawingHistoryBrushCommand\n`;
        result += `${this._brushId}\n`;
        result += `${this.unitId}\n`;
        result += `${this._location}\n`;
        result += `${this._color}\n`;
        result += `${this._brushScale}\n`;
        result += `${this.brushExpansionFactor}\n`;
        result += `${this.brushBlendMode}\n`;
        result += `${this.executionTime}\n`;
        result += `${this.brushAlpha}\n`;
        result += `${this.brushRotation}\n`;
        result += `${this.timeScale}\n`;
        result += `${this.layerId}\n`;
        result += `${this.generatedCommand}\n`;
        result += `${this._brush}\n`;
        return result;
    }
    toStringMin() {
        return `Cmd: ${this.unitId}: ${this.layerId}: ${this.executionTime}`;
    }
    // Update Methods
    updateBrushId(value) {
        if (value) {
            this.brushId = value;
            return value;
        }
        else {
            return this.brushId;
        }
    }
    updateUintColor(value) {
        if (value) {
            this.uintColor = value;
            return value;
        }
        else {
            return this.uintColor;
        }
    }
    updateUnitId(value) {
        if (value) {
            this.unitId = value;
            return value;
        }
        else {
            return this.unitId;
        }
    }
    updateLayerId(value) {
        if (value) {
            this.layerId = value;
            return value;
        }
        else {
            return this.layerId;
        }
    }
    updateExecutionTime(value) {
        if (value != undefined) {
            this.executionTime = value;
            return value;
        }
        else {
            return this.executionTime;
        }
    }
    updateBrushScale(value) {
        if (value) {
            this.brushScale = value;
            return value;
        }
        else {
            return this.brushScale;
        }
    }
    updateBlendMode(value) {
        if (value) {
            this.brushBlendMode = value;
            return value;
        }
        else {
            return this.brushBlendMode;
        }
    }
    updateBrushAlpha(value) {
        if (value) {
            this.brushAlpha = value;
            return value;
        }
        else {
            return this.brushAlpha;
        }
    }
    updateBrushRotation(value) {
        if (value) {
            this.brushRotation = value;
            return value;
        }
        else {
            return this.brushRotation;
        }
    }
    updateX(value) {
        if (!this._location) {
            this._location = new Point_1.Point(0, 0);
        }
        if (value) {
            this._location.x = value;
            return value;
        }
        else {
            return this._location.x;
        }
    }
    updateY(value) {
        if (!this._location) {
            this._location = new Point_1.Point(0, 0);
        }
        if (value) {
            this._location.y = value;
            return value;
        }
        else {
            return this._location.y;
        }
    }
    //Redundancy Methods
    checkRedundancyOfBrushId(data_object, property, value) {
        if (value == this.brushId) { }
        else {
            this.brushId = value;
            data_object[property] = this.brushId;
        }
    }
    checkRedundancyOfUintColor(data_object, property, value) {
        if (value == this.uintColor) { }
        else {
            this.uintColor = value;
            data_object[property] = this.uintColor;
        }
    }
    checkRedundancyOfUnitId(data_object, property, value) {
        if (value == this.unitId) { }
        else {
            this.unitId = value;
            data_object[property] = this.unitId;
        }
    }
    checkRedundancyOfLayerId(data_object, property, value) {
        if (value == this.layerId) { }
        else {
            this.layerId = value;
            data_object[property] = this.layerId;
        }
    }
    checkRedundancyOfExecutionTime(data_object, property, value) {
        //always include time parameter. SAR:150619
        if (false) { }
        else {
            this.executionTime = value;
            data_object[property] = this.executionTime;
        }
    }
    checkRedundancyOfBrushScale(data_object, property, value) {
        if (value == this.brushScale) { }
        else {
            this.brushScale = value;
            data_object[property] = this.brushScale;
        }
    }
    checkRedundancyOfBrushBlendMode(data_object, property, value) {
        if (value == this.brushBlendMode) { }
        else {
            this.brushBlendMode = value;
            data_object[property] = this.brushBlendMode;
        }
    }
    checkRedundancyOfBrushAlpha(data_object, property, value) {
        if (value == this.brushAlpha) { }
        else {
            this.brushAlpha = value;
            data_object[property] = this.brushAlpha;
        }
    }
    checkRedundancyOfBrushRotation(data_object, property, value) {
        if (value == this.brushRotation) { }
        else {
            this.brushRotation = value;
            data_object[property] = this.brushRotation;
        }
    }
    checkRedundancyOfGeneratedCommand(data_object, property, value) {
        if (value == this.generatedCommand) { }
        else {
            this.generatedCommand = value;
            data_object[property] = this.generatedCommand;
        }
    }
    checkRedundancyOfX(data_object, property, value) {
        if (!this._location) {
            this._location = new Point_1.Point(0, 0);
        }
        if (value == this._location.x) { }
        else {
            this._location.x = value;
            data_object[property] = this._location.x;
        }
    }
    checkRedundancyOfY(data_object, property, value) {
        if (!this._location) {
            this._location = new Point_1.Point(0, 0);
        }
        if (value == this._location.y) { }
        else {
            this._location.y = value;
            data_object[property] = this._location.y;
        }
    }
    static clone(_command, data_object = null) {
        var _clone = new WwDrawingHistoryBrushCommand(_command.brushId, new Point_1.Point(_command.location.x, _command.location.y));
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
        _clone.unitId = _command.unitId;
        _clone.offset = _command.offset;
        _clone.scale = _command.scale;
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
    dispose() {
        this._brush = null;
        this._location = null;
    }
}
exports.WwDrawingHistoryBrushCommand = WwDrawingHistoryBrushCommand;
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 8/13/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ...
 * @author Andrew Rapo (andrew@worthwhilegames.org)
 * @license MIT
 */
const Point_1 = __webpack_require__(0);
const Rect_1 = __webpack_require__(5);
const WwDrawingHistoryDataTranslator_1 = __webpack_require__(16);
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
        this.boundingRect = null;
        // minX: redundant. for troubleshooting boundingRect issue. should be removed.
        //this.minX = 0;
        //this.maxX = 0;
        //this.minY = 0;
        //this.maxY = 0;
    }
    toString() {
        var result = " Unit: " + this.id + ": start: " + this.startTime + ", duration: " + this.duration + ", end: " + (this.startTime + this.duration) + "\n";
        //result += `  ${this.minX}, ${this.maxX}, ${this.minY}, ${this.maxY}\n`;
        this.commands.forEach(temp_command => {
            result += `  Command: ${temp_command.unitId}: ${temp_command.executionTime} (${temp_command.location.x}, ${temp_command.location.y})\n`;
        });
        return result;
    }
    addCommand(_command, adjust_time_to_unit_time = true, link_prev_command = true) {
        this.commands.push(_command);
        this.updateBoundingRect(_command);
        if (this.prevCommand) {
            let point_distance = Point_1.Point.distance(this.prevCommand.location, _command.location);
            //console.log(`addCommand: ${point_distance}`);
            this.lineLength += point_distance;
            _command.lineLength = this.lineLength;
            if (link_prev_command) {
                _command.prevCommand = this.prevCommand;
            }
        }
        else {
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
    shiftOriginToMinXY() {
        this.commands.forEach(command => {
            command.location.x -= this.boundingRect.left; //this.minX;
            command.location.y -= this.boundingRect.top; //this.minY;
        });
    }
    resetBoundingRect() {
        this.boundingRect = null;
        this.commands.forEach(command => {
            this.updateBoundingRect(command);
        });
    }
    updateBoundingRect(command) {
        if (!this.boundingRect) {
            this.boundingRect = new Rect_1.Rect(command.location.y, command.location.x, 0, 0);
            //this.minX = this.maxX = command.location.x;
            //this.minY = this.maxY = command.location.y;
            //console.log(`  init boundingRect: ${this.boundingRect.toString()}`);
        }
        else {
            this.boundingRect.expandToIncludePoint(command.location);
            //this.minX = Math.min(this.minX, command.location.x);
            //this.maxX = Math.max(this.maxX, command.location.x);
            //this.minY = Math.min(this.minY, command.location.y);
            //this.maxY = Math.max(this.maxY, command.location.y);
        }
    }
    sortComandsByExecutionTime() {
        this.commands = this.commands.sort(this.sortCompareExecutionTime);
    }
    sortCompareExecutionTime(_command1, _command2) {
        return _command1.executionTime - _command2.executionTime;
    }
    get json() {
        let json = {};
        json.id = this.id;
        json.start = this.startTime;
        json.dur = this.duration;
        json.end = this.startTime + this.duration;
        json.lid = this.layerId;
        json.ses = this.sessionId;
        var _commands = [];
        var dataTranslator = new WwDrawingHistoryDataTranslator_1.WwDrawingHistoryDataTranslator();
        this.commands.forEach(_command => {
            var data_object;
            data_object = dataTranslator.generateDataObjectWithCommand(_command);
            _commands.push(data_object); //(_command.json);
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
            next_command = this.commands[next_command_index];
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
            next_command = this.commands[next_command_index];
            let next_command_time = next_command.executionTime;
            if (next_command_time >= start_time && next_command_time < end_time) {
                this.currentCommandIndex++;
            }
            else {
                next_command = null;
            }
        }
        return next_command;
    }
}
exports.WwDrawingHistoryUnit = WwDrawingHistoryUnit;
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


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var _fs
try {
  _fs = __webpack_require__(20)
} catch (_) {
  _fs = __webpack_require__(3)
}

function readFile (file, options, callback) {
  if (callback == null) {
    callback = options
    options = {}
  }

  if (typeof options === 'string') {
    options = {encoding: options}
  }

  options = options || {}
  var fs = options.fs || _fs

  var shouldThrow = true
  // DO NOT USE 'passParsingErrors' THE NAME WILL CHANGE!!!, use 'throws' instead
  if ('passParsingErrors' in options) {
    shouldThrow = options.passParsingErrors
  } else if ('throws' in options) {
    shouldThrow = options.throws
  }

  fs.readFile(file, options, function (err, data) {
    if (err) return callback(err)

    data = stripBom(data)

    var obj
    try {
      obj = JSON.parse(data, options ? options.reviver : null)
    } catch (err2) {
      if (shouldThrow) {
        err2.message = file + ': ' + err2.message
        return callback(err2)
      } else {
        return callback(null, null)
      }
    }

    callback(null, obj)
  })
}

function readFileSync (file, options) {
  options = options || {}
  if (typeof options === 'string') {
    options = {encoding: options}
  }

  var fs = options.fs || _fs

  var shouldThrow = true
  // DO NOT USE 'passParsingErrors' THE NAME WILL CHANGE!!!, use 'throws' instead
  if ('passParsingErrors' in options) {
    shouldThrow = options.passParsingErrors
  } else if ('throws' in options) {
    shouldThrow = options.throws
  }

  var content = fs.readFileSync(file, options)
  content = stripBom(content)

  try {
    return JSON.parse(content, options.reviver)
  } catch (err) {
    if (shouldThrow) {
      err.message = file + ': ' + err.message
      throw err
    } else {
      return null
    }
  }
}

function writeFile (file, obj, options, callback) {
  if (callback == null) {
    callback = options
    options = {}
  }
  options = options || {}
  var fs = options.fs || _fs

  var spaces = typeof options === 'object' && options !== null
    ? 'spaces' in options
    ? options.spaces : this.spaces
    : this.spaces

  var str = ''
  try {
    str = JSON.stringify(obj, options ? options.replacer : null, spaces) + '\n'
  } catch (err) {
    if (callback) return callback(err, null)
  }

  fs.writeFile(file, str, options, callback)
}

function writeFileSync (file, obj, options) {
  options = options || {}
  var fs = options.fs || _fs

  var spaces = typeof options === 'object' && options !== null
    ? 'spaces' in options
    ? options.spaces : this.spaces
    : this.spaces

  var str = JSON.stringify(obj, options.replacer, spaces) + '\n'
  // not sure if fs.writeFileSync returns anything, but just in case
  return fs.writeFileSync(file, str, options)
}

function stripBom (content) {
  // we do this because JSON.parse would convert it to a utf8 string if encoding wasn't specified
  if (Buffer.isBuffer(content)) content = content.toString('utf8')
  content = content.replace(/^\uFEFF/, '')
  return content
}

var jsonfile = {
  spaces: null,
  readFile: readFile,
  readFileSync: readFileSync,
  writeFile: writeFile,
  writeFileSync: writeFileSync
}

module.exports = jsonfile


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 4/14/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = __webpack_require__(0);
class Rect {
    constructor(top = 0, left = 0, width = 0, height = 0) {
        this.top = top;
        this.left = left;
        this.width = width;
        this.height = height;
        this._right = this.right;
        this._bottom = this.bottom;
    }
    toString() {
        return `top: ${this.top}, left: ${this.left}, bottom: ${this.bottom}, right ${this.right} - ${this.width}, ${this.height}`;
    }
    get right() {
        return this.left + this.width;
    }
    get bottom() {
        return this.top + this.height;
    }
    inBounds(point) {
        return point.x >= this.left &&
            point.x <= this.right &&
            point.y >= this.top &&
            point.y <= this.bottom;
    }
    expandToIncludePoint(point) {
        this.top = Math.min(this.top, point.y);
        this.left = Math.min(this.left, point.x);
        this._right = Math.max(this._right, point.x);
        this._bottom = Math.max(this._bottom, point.y);
        this.width = this._right - this.left;
        this.height = this._bottom - this.top;
    }
    expandToIncludeRect(rect) {
        this.expandToIncludePoint(new Point_1.Point(rect.left, rect.top));
        this.expandToIncludePoint(new Point_1.Point(rect.right, rect.bottom));
    }
}
exports.Rect = Rect;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 7/7/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ...
 * @author Andrew Rapo (andrew@worthwhilegames.org)
 * @license MIT
 */
const WwSprite_1 = __webpack_require__(11);
class WwBrush extends WwSprite_1.WwSprite {
    constructor(mode = 'canvas', PIXI) {
        super(0, 0, mode, PIXI);
        this.color = null;
    }
    onReady() {
        this.centerPivot();
        super.onReady();
        //__img.blendMode = BlendMode.NORMAL;
        //__img.color = __color;
    }
}
exports.WwBrush = WwBrush;
/*
 package org.wwlib.starling
 {
 import flash.events.Event;

 import starling.display.BlendMode;


 public class WwBrush extends WwSprite
 {

 private var __color:uint;
 private var __brushScale:Number = 1.0;

 public function WwBrush()
 {

 }

 protected override function onImageLoaded(event:Event):void
 {
 super.onImageLoaded(event);

 resetPivot();
 __img.blendMode = BlendMode.NORMAL;
 __img.color = __color;

 __debug.msg("pivot: " + __img.pivotX + ", " + __img.pivotY);
 }

 public function resetPivot():void
 {
 if (__img)
 {
 //__img.pivotX = __img.width / 2; //(2 * __scaleFactor);
 //__img.pivotY = __img.height / 2; //(2 * __scaleFactor);

 // MAGIC NUMBER
 var brush_size:Number = 64.0 * __brushScale;
 var mid_point:Number = brush_size / 2.0;

 __img.pivotX = 32.0;
 __img.pivotY = 32.0;
 }
 }

 public function setColor(_color:uint):void
 {
 __color = _color;
 if (__img != null)
 {
 __img.color = __color;
 }
 }

 public override function resetScale():void
 {
 if (__img)
 {
 __img.scaleX = __scaleFactor * __brushScale;
 __img.scaleY = __scaleFactor * __brushScale;
 resetPivot();
 }
 }

 public function set brushScale(scale:Number):void
 {
 __brushScale = scale;
 resetScale();
 }

 }
 }
 */


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 8/13/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class WwDeviceInfo {
    constructor() {
        this._assetScaleFactor = 1.0;
    }
    static get instance() {
        if (!WwDeviceInfo._instance) {
            WwDeviceInfo._instance = new WwDeviceInfo();
        }
        return WwDeviceInfo._instance;
    }
    get assetScaleFactor() {
        return this._assetScaleFactor;
    }
}
exports.WwDeviceInfo = WwDeviceInfo;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 8/13/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ...
 * @author Andrew Rapo (andrew@worthwhilegames.org)
 * @license MIT
 */
const WwBrush_1 = __webpack_require__(6);
class WwDrawingBrushManager {
    constructor() {
        this.brushIdArray = [];
        this.brushURLs = {};
        this.brushes = {};
        this.brushesLoadedCount = 0;
        this.initialized = false;
    }
    static get instance() {
        if (!WwDrawingBrushManager._instance) {
            WwDrawingBrushManager._instance = new WwDrawingBrushManager();
        }
        return WwDrawingBrushManager._instance;
    }
    init(callback = null, brushes_obj = null, mode = 'canvas', PIXI) {
        console.log(`WwDrawingBrushManager: mode == ${mode}`);
        this.callback = callback;
        if (this.initialized) {
            console.log(`WwDrawingBrushManager: init: already initialized`);
            if (this.callback) {
                this.callback(this.brushes);
                this.callback = null;
            }
        }
        else {
            this.mode = mode;
            this.PIXI = PIXI;
            this.brushesObject = brushes_obj;
            this.brushIdArray = [];
            this.brushURLs = {};
            this.brushes = {};
            this.brushesLoadedCount = 0;
            if (!this.brushesObject) {
                this.brushIdArray[0] = "hard";
                this.brushIdArray[1] = "soft";
                this.brushIdArray[2] = "crayon";
                this.brushIdArray[3] = "calligraphy";
                this.brushIdArray[4] = "pencil";
                this.brushIdArray[5] = "circleSoft";
                this.brushIdArray[6] = "star";
                this.brushURLs["hard"] = "./images/brushes/hard_blue.png";
                this.brushURLs["soft"] = "./images/brushes/soft.png";
                this.brushURLs["crayon"] = "./images/brushes/crayon.png";
                this.brushURLs["calligraphy"] = "./images/brushes/calligraphy.png";
                this.brushURLs["pencil"] = "./images/brushes/pencil.png";
                this.brushURLs["circleSoft"] = "./images/brushes/circleSoft.png";
                this.brushURLs["star"] = "./images/brushes/star.png"; //,interval_dash";
            }
            else {
                let path = this.brushesObject.path ? this.brushesObject.path : "./images/brushes/";
                let list = this.brushesObject.list;
                if (!list) {
                    console.log(`WwDrawingBrushManager: brushes list must be a valid array of brush names!`);
                }
                else {
                    list.forEach((brush_filename) => {
                        let parts = brush_filename.split('.');
                        let id = parts[0];
                        this.brushIdArray.push(id);
                        this.brushURLs[id] = path + brush_filename;
                        //console.log(this.brushURLs[id]);
                    });
                }
            }
            //console.log(this.brushURLs);
            //console.log(this.brushIdArray);
            /*
            this.brushURLs.forEach(_key => {
                let _brush = new WwBrush();
                _brush.loadImage(this.brushURLs[_key]);
                this.brushes[_key] = _brush;
                //console.log("BrushManager: " + _key + ":" + this.brushes[_key] + ", " + this.brushURLs[_key], "1");
            });
            */
            for (let _key in this.brushURLs) {
                let _brush = new WwBrush_1.WwBrush(this.mode, this.PIXI);
                let onBrushImageLoadedCallback = this.onBrushImageLoaded.bind(this);
                _brush.loadImageWithURLAndCallback(this.brushURLs[_key], onBrushImageLoadedCallback);
                this.brushes[_key] = _brush;
            }
        }
    }
    onBrushImageLoaded(sprite) {
        this.brushesLoadedCount++;
        if (this.brushesLoadedCount == this.brushIdArray.length) {
            this.initialized = true;
            if (this.callback) {
                this.callback(this.brushes);
                this.callback = null;
            }
        }
    }
    getBrushFromBrushId(_id) {
        return this.brushes[_id];
    }
    getBrushIdWithIndex(index) {
        return this.brushIdArray[index];
    }
}
exports.WwDrawingBrushManager = WwDrawingBrushManager;
/*

 package org.wwlib.drawing
 {
 import flash.utils.Dictionary;

 import org.wwlib.starling.WwBrush;
 import org.wwlib.utils.WwDebug;


public class WwDrawingBrushManager
{
    private static var __instance:WwDrawingBrushManager;

    private var __debug:WwDebug;
    private var __brushIDArray:Array;
    private var __brushURLs:Dictionary;
    private var __brushes:Dictionary;
    //private var __brushBitmaps:Dictionary;

    //private var __debugBrush:WwBrush;


    public function WwDrawingBrushManager(enforcer:SingletonEnforcer)
    {
        if (!(enforcer is SingletonEnforcer))
        {
            throw new ArgumentError("QcColoringBrushManager cannot be directly instantiated!");
        }

        __debug = WwDebug.instance;
    }


    public static function init():WwDrawingBrushManager
    {
        //NOTE: Brush Manager needs to re-initialize whenever a new Starling context is created

        if (__instance != null)
        {
            __instance.dispose();
        }

        __instance = new WwDrawingBrushManager(new SingletonEnforcer());
        __instance.setup();

        return __instance;
    }

    public static function get instance(): WwDrawingBrushManager
    {
        return __instance;
    }

    private function setup():void
    {
        __brushIDArray = new Array();
        __brushURLs = new Dictionary();
        __brushes = new Dictionary();

        __brushIDArray[0] = "hard";
        __brushIDArray[1] = "soft";
        __brushIDArray[2] = "crayon";
        __brushIDArray[3] = "calligraphy";
        __brushIDArray[4] = "x";
        __brushIDArray[5] = "crosshairs";
        __brushIDArray[6] = "arrow";

        __brushURLs["hard"] = "assets/brushes/brush_hard.png";
        __brushURLs["soft"] = "assets/brushes/brush_soft.png";
        __brushURLs["crayon"] = "assets/brushes/brush_crayon.png";
        __brushURLs["calligraphy"] = "assets/brushes/brush_calligraphy.png";
        __brushURLs["x"] = "assets/brushes/brush_x.png";
        __brushURLs["crosshairs"] = "assets/brushes/brush_crosshairs.png";
        __brushURLs["arrow"] = "assets/brushes/brush_arrow.png"; //,interval_dash";

        var _key:Object;

        for (_key in __brushURLs)
        {
            var _brush:WwBrush = new WwBrush();
            _brush.loadImage(__brushURLs[_key]);
            __brushes[_key] = _brush;
            //__debug.msg("BrushManager: " + _key + ":" + __brushes[_key] + ", " + __brushURLs[_key], "1");
        }
    }

    //Moved to BrushManager from WwDrawingtarling 7/2/2015


    public function getBrushFromBrushID(_id:String):WwBrush
    {
        return __brushes[_id];
    }

    public function getBrushIDWithIndex(index:int):String
    {
        return __brushIDArray[index];
    }

    public function get brushIDs():Array
    {
        return __brushIDArray;
    }

    public function get brushURLs():Dictionary
    {
        return __brushURLs;
    }

    public function dispose():void
    {
        var brush:WwBrush;

        for each (brush in __brushes)
        {
            brush.dispose();
        }

        __brushIDArray = null;
        __brushURLs = null;
        __brushes = null;
    }


//		public function get brushBitmaps():Dictionary
//		{
//			return __brushBitmaps;
//		}


}
}


 */


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 8/13/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * ...
 * @author Andrew Rapo (andrew@worthwhilegames.org)
 * @license MIT
 */
const WwDrawingHistoryUnit_1 = __webpack_require__(2);
class WwDrawingHistory {
    constructor() {
        this.units = [];
        this.startTime = 0;
        this.duration = 0;
        this.boundingRect = null;
        this.scale = 1;
        this.sessions = [];
    }
    toString() {
        let result = "Start: " + this.startTime + ", duration: " + this.duration + ", end: " + (this.startTime + this.duration) + "\n";
        this.units.forEach(unit => {
            result += unit.toString();
        });
        return result;
    }
    addUnit(unit) {
        if (unit) {
            this.units.push(unit);
            if (!this.boundingRect) {
                this.boundingRect = unit.boundingRect;
            }
            else {
                this.boundingRect.expandToIncludeRect(unit.boundingRect);
            }
            this.unitLineLength += unit.lineLength;
            this.duration += unit.duration;
        }
        else {
            console.log(`WwDrawingHistory:addUnit: unit is null`);
        }
    }
    concatAllCommands(layer = null) {
        let unit = new WwDrawingHistoryUnit_1.WwDrawingHistoryUnit();
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
                            unit.addCommand(temp_command, false, false); //, false, false);
                        }
                    }
                    else {
                        unit.addCommand(temp_command, false, false); //, false, false);
                    }
                });
                unit_start_time_offset += temp_unit.duration;
            }
        });
        return unit;
    }
    get json() {
        console.log(`Generating json`);
        let json = {};
        json.start = this.startTime;
        json.end = this.duration;
        json.scale = this.scale;
        // units
        let _units = [];
        this.units.forEach(_unit => {
            _units.push(_unit.json);
        });
        json.units = _units;
        // sessions
        let _sessions = [];
        this.sessions.forEach(_session => {
            _sessions.push(_session.json);
            json.stats = _session.stats.json; //keep the latest
        });
        json.sessions = _sessions;
        return json;
    }
}
exports.WwDrawingHistory = WwDrawingHistory;
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


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class WwRenderTextureContext {
    constructor(renderer, rt) {
        this.renderer = renderer;
        this.rt = rt;
    }
    render(container) {
        this.renderer.render(container, this.rt, false);
    }
}
exports.WwRenderTextureContext = WwRenderTextureContext;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 7/7/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const WwRenderTextureContext_1 = __webpack_require__(10);
/**
 * @author Andrew Rapo (andrew@worthwhilegames.org)
 * @license MIT
 */
class WwSprite {
    constructor(x = 0, y = 0, mode = 'canvas', PIXI) {
        this.img = null;
        this.pixijsSprite = null;
        this.scaleFactor = WwSprite.BASE_SCALE_FACTOR;
        this.x = x;
        this.y = y;
        this.mode = mode;
        this.PIXI = PIXI;
        this.width = 0;
        this.height = 0;
        this.pivotX = 0;
        this.pivotY = 0;
        this.scale = 1.0;
        this.rotation = 0;
        this.alpha = 1.0;
        this.sourceX = 0;
        this.sourceY = 0;
        this.img = null;
        this.pixijsSprite = null;
        this.scaleFactor = WwSprite.BASE_SCALE_FACTOR;
        this.url = "";
        this._onReadyCallback = null;
    }
    toString() {
        return `WwSprite: (${this.x}, ${this.y}): url: ${this.url}, mode: ${this.mode}`;
    }
    loadImageWithURL(url) {
        this.loadImageWithURLAndCallback(url, null);
    }
    loadImageWithURLAndCallback(url, callback) {
        //this.log(`WwSprite: load: ${url}`);
        this.url = url;
        this._onReadyCallback = callback;
        if ((this.url != null) && (this.url != "")) {
            this.url = url;
            if (this.mode === 'canvas') {
                var temp_img = new Image();
                temp_img.onload = (e => {
                    //console.log(`Sprite: onLoad: ${e}`);
                    this.img = temp_img;
                    this.width = temp_img.width;
                    this.height = temp_img.height;
                    this.onReady();
                });
                temp_img.src = url;
            }
            else if (this.mode === 'pixijs') {
                if (!this.PIXI) {
                    console.log(`WwSprite: loadImageWithURLAndCallback: PIXI must be defined in 'pixijs' mode!`);
                }
                else {
                    let loader = new this.PIXI.loaders.Loader()
                        .add(url)
                        .once('complete', (loader, resources) => {
                        //console.log(`Load complete:`);
                        //console.log(this);
                        //console.log(resources);
                        this.pixijsSprite = this.PIXI.Sprite.fromImage(this.url);
                        this.onReady();
                    })
                        .load();
                }
            }
        }
        else {
            this.onReady();
        }
    }
    set onReadyCallback(callback) {
        this._onReadyCallback = callback;
    }
    // Override this
    onReady() {
        //this.log(`onReady:  ${this.url}`);
        if (this._onReadyCallback != null) {
            this._onReadyCallback(this);
        }
        this._onReadyCallback = null;
    }
    // draw(context: CanvasRenderingContext2D): void;
    // draw(context: WwRenderTextureContext): void;
    draw(context) {
        if (context instanceof CanvasRenderingContext2D) {
            if (this.img) {
                context.globalAlpha = this.alpha;
                context.drawImage(this.img, this.sourceX, this.sourceY, this.width, this.height, this.x - (this.pivotX * this.scale), this.y - (this.pivotY * this.scale), this.width * this.scale, this.height * this.scale);
            }
            else {
                this.fill(context);
            }
        }
        else if (context instanceof WwRenderTextureContext_1.WwRenderTextureContext) {
            this.pixijsSprite.x = this.x;
            this.pixijsSprite.y = this.y;
            this.pixijsSprite.scale.x = this.scale;
            this.pixijsSprite.scale.y = this.scale;
            this.pixijsSprite.anchor.x = 0.5;
            this.pixijsSprite.anchor.y = 0.5;
            let container = new this.PIXI.Container();
            container.addChild(this.pixijsSprite);
            context.render(container);
        }
    }
    // draw(context) {
    //
    //     if (this.mode === 'canvas') {
    //
    //         if (this.img) {
    //             context.globalAlpha = this.alpha;
    //             context.drawImage(
    //                 this.img,
    //                 this.sourceX,
    //                 this.sourceY,
    //                 this.width,
    //                 this.height,
    //                 this.x - (this.pivotX * this.scale),
    //                 this.y - (this.pivotY * this.scale),
    //                 this.width * this.scale,
    //                 this.height * this.scale
    //             );
    //         } else {
    //             this.fill(context);
    //         }
    //     } else if (this.mode === 'pixijs') {
    //         //console.log(`WwSprite: pixijs: draw: ${this.x}, ${this.y}`);
    //         this.pixijsSprite.x = this.x;
    //         this.pixijsSprite.y = this.y;
    //         this.pixijsSprite.scale.x = this.scale;
    //         this.pixijsSprite.scale.y = this.scale;
    //         this.pixijsSprite.anchor.x = 0.5;
    //         this.pixijsSprite.anchor.y = 0.5;
    //
    //         let container = new PIXI.Container();
    //         container.addChild(this.pixijsSprite);
    //         context.render(container);
    //     }
    // }
    fill(context) {
        context.fillStyle = "#999999";
        context.fillRect(this.x, this.y, this.width, this.height);
    }
    centerPivot() {
        if (this.img) {
            //TODO: Assumes square image
            let brush_size = this.width * this.scale;
            let mid_point = brush_size / 2.0;
            this.pivotX = mid_point;
            this.pivotY = mid_point;
        }
    }
    log(msg) {
        console.log(`WwSprite: ${msg}`);
    }
}
WwSprite.BASE_SCALE_FACTOR = 0.5;
WwSprite.SPRITE_STAGE = {};
exports.WwSprite = WwSprite;
/*
 package org.wwlib.starling
 {

 import flash.display.Bitmap;
 import flash.display.Loader;
 import flash.display.MovieClip;
 import flash.events.Event;
 import flash.net.URLRequest;
 import flash.system.ImageDecodingPolicy;
 import flash.system.LoaderContext;

 import org.wwlib.utils.WwDebug;

 import starling.display.Image;
 import starling.display.Sprite;


 public class WwSprite extends Sprite
 {
 public static var __baseScaleFactor:Number = 0.5;
 public static var FLASH_STAGE:flash.display.MovieClip;

 protected var __img:Image;
 protected var __x:int;
 protected var __y:int;
 protected var __bmp:Bitmap;
 protected var __debug:WwDebug = WwDebug.instance;
 protected var __scaleFactor:Number = WwSprite.__baseScaleFactor;
 protected var __url:String;

 protected var __onReadyCallback:Function;

 public function WwSprite()
 {

 }

 public function loadImage(url:String):void
 {
 __url = url;
 if ((__url != null) && (__url != ""))
 {
 // create a LoaderContext
 var loaderContext:LoaderContext = new LoaderContext();
 // specify async decoding
 loaderContext.imageDecodingPolicy = ImageDecodingPolicy.ON_LOAD;
 // create a Loader
 var loader:Loader = new Loader();
 // inform the Loader
 loader.contentLoaderInfo.addEventListener(Event.COMPLETE,onImageLoaded);
 loader.load( new URLRequest(url), loaderContext );
 }
 else
 {
 onReady();
 }
 }

 protected function onImageLoaded(event:Event):void
 {
 //__debug.msg("onImageLoaded: "+ __url);
 __bmp = event.target.content as Bitmap;
 removeChild(__img);
 __img = Image.fromBitmap(__bmp);
 resetScale();
 //__img.alpha = 0.5;
 addChild(__img);
 __bmp = null;
 onReady();
 }

 public function resetScale():void
 {
 __img.scaleX = __scaleFactor;
 __img.scaleY = __scaleFactor;
 }

 // Override this
 public function onReady():void
 {
 //__debug.msg("onReady: " + __url);
 if (__onReadyCallback != null)
 {
 __onReadyCallback(__url);
 }
 }

 public function set image(img:Image):void
 {
 __img = img;
 }

 public function get image():Image
 {
 return __img;
 }

 public function get url():String
 {
 return __url;
 }

 public function set onReadyCallback(f:Function):void
 {
 __onReadyCallback = f;
 }

 public function clearImg():void
 {
 removeChild(__img);
 __img = null;

 }

 public override function dispose():void
 {
 removeChild(__img);
 __img = null;
 super.dispose();
 }
 }

 }
 */


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fs = __webpack_require__(3)

module.exports = clone(fs)

function clone (obj) {
  if (obj === null || typeof obj !== 'object')
    return obj

  if (obj instanceof Object)
    var copy = { __proto__: obj.__proto__ }
  else
    var copy = Object.create(null)

  Object.getOwnPropertyNames(obj).forEach(function (key) {
    Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key))
  })

  return copy
}


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 7/7/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = __webpack_require__(0);
exports.Point = Point_1.Point;
var Rect_1 = __webpack_require__(5);
exports.Rect = Rect_1.Rect;
var GetTimer_1 = __webpack_require__(15);
exports.getTimer = GetTimer_1.getTimer;
var WwSprite_1 = __webpack_require__(11);
exports.WwSprite = WwSprite_1.WwSprite;
var WwBrush_1 = __webpack_require__(6);
exports.WwBrush = WwBrush_1.WwBrush;
var WwDrawingHistoryBrushCommand_1 = __webpack_require__(1);
exports.WwDrawingHistoryBrushCommand = WwDrawingHistoryBrushCommand_1.WwDrawingHistoryBrushCommand;
var WwDeviceInfo_1 = __webpack_require__(7);
exports.WwDeviceInfo = WwDeviceInfo_1.WwDeviceInfo;
var WwDrawingHistoryUnit_1 = __webpack_require__(2);
exports.WwDrawingHistoryUnit = WwDrawingHistoryUnit_1.WwDrawingHistoryUnit;
var WwDrawingBrushManager_1 = __webpack_require__(8);
exports.WwDrawingBrushManager = WwDrawingBrushManager_1.WwDrawingBrushManager;
var WwDrawingHistory_1 = __webpack_require__(9);
exports.WwDrawingHistory = WwDrawingHistory_1.WwDrawingHistory;
var WwDrawingHistoryRenderer_1 = __webpack_require__(18);
exports.WwDrawingHistoryRenderer = WwDrawingHistoryRenderer_1.WwDrawingHistoryRenderer;
var WwDrawingHistoryLoader_1 = __webpack_require__(17);
exports.WwDrawingHistoryLoader = WwDrawingHistoryLoader_1.WwDrawingHistoryLoader;
var WwRenderTextureContext_1 = __webpack_require__(10);
exports.WwRenderTextureContext = WwRenderTextureContext_1.WwRenderTextureContext;
console.log("ww-draw module loaded.");


/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 7/7/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class GetTimer {
    static getTimer() {
        return new Date().getTime();
    }
}
let _getTimer = GetTimer.getTimer;
exports.getTimer = _getTimer;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 8/13/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const WwDrawingHistoryBrushCommand_1 = __webpack_require__(1);
const WwDeviceInfo_1 = __webpack_require__(7);
const Point_1 = __webpack_require__(0);
class WwDrawingHistoryDataTranslator {
    constructor() {
        this.previousCommandData = new WwDrawingHistoryBrushCommand_1.WwDrawingHistoryBrushCommand("", null, 1, 0, 0, 0, "", 0, -1, "", false);
        this.drawingScale = 1.0;
    }
    generateCommandWithDataObject(data_object) {
        let command = new WwDrawingHistoryBrushCommand_1.WwDrawingHistoryBrushCommand("", null);
        command.brushId = this.previousCommandData.updateBrushId(data_object.bid);
        command.unitId = this.previousCommandData.updateUnitId(data_object.uid);
        command.layerId = this.previousCommandData.updateLayerId(data_object.lid);
        command.executionTime = this.previousCommandData.updateExecutionTime(data_object.t);
        command.uintColor = this.previousCommandData.updateUintColor(data_object.c);
        command.brushScale = this.previousCommandData.updateBrushScale(data_object.s);
        command.brushBlendMode = this.previousCommandData.updateBlendMode(data_object.bm);
        command.brushAlpha = this.previousCommandData.updateBrushAlpha(data_object.a);
        command.brushRotation = this.previousCommandData.updateBrushRotation(data_object.r);
        let _x = this.previousCommandData.updateX(data_object.x);
        let _y = this.previousCommandData.updateY(data_object.y);
        _x = Math.floor(_x * 10) / 10;
        _y = Math.floor(_y * 10) / 10;
        let _scale = WwDeviceInfo_1.WwDeviceInfo.instance.assetScaleFactor / this.drawingScale; //  1.0;  // 0.5 for iPad 2
        command.location = new Point_1.Point(_x * _scale, _y * _scale);
        return command;
    }
    generateDataObjectWithCommand(command) {
        var data_object = {};
        this.previousCommandData.checkRedundancyOfBrushId(data_object, "bid", command.brushId);
        this.previousCommandData.checkRedundancyOfUnitId(data_object, "uid", command.unitId);
        this.previousCommandData.checkRedundancyOfLayerId(data_object, "lid", command.layerId);
        this.previousCommandData.checkRedundancyOfExecutionTime(data_object, "t", command.executionTime);
        this.previousCommandData.checkRedundancyOfUintColor(data_object, "c", command.uintColor);
        this.previousCommandData.checkRedundancyOfBrushScale(data_object, "s", command.brushScale);
        this.previousCommandData.checkRedundancyOfBrushBlendMode(data_object, "bm", command.brushBlendMode);
        this.previousCommandData.checkRedundancyOfBrushAlpha(data_object, "a", command.brushAlpha);
        this.previousCommandData.checkRedundancyOfBrushRotation(data_object, "r", command.brushRotation);
        this.previousCommandData.checkRedundancyOfGeneratedCommand(data_object, "g", command.generatedCommand);
        this.previousCommandData.checkRedundancyOfX(data_object, "x", command.location.x);
        this.previousCommandData.checkRedundancyOfY(data_object, "y", command.location.y);
        return data_object;
    }
}
exports.WwDrawingHistoryDataTranslator = WwDrawingHistoryDataTranslator;
/*
package org.wwlib.drawing
{
import flash.geom.Point;

import org.wwlib.utils.WwDeviceInfo;

    public class WwDrawingHistoryDataTranslator
{
    private var __previousCommandData:WwDrawingHistoryBrushCommand;
    private var __drawingScale:Number;

    public function WwDrawingHistoryDataTranslator()
    {
        __previousCommandData = new WwDrawingHistoryBrushCommand("",null,1,0,0,"",-1,0,-1,"");
        __drawingScale = 1.0;
    }

    public function generateCommandWithDataObject(data_object:Object):WwDrawingHistoryBrushCommand
    {
        var command:WwDrawingHistoryBrushCommand = new WwDrawingHistoryBrushCommand("");
        command.brushID = __previousCommandData.updateBrushId(data_object.bid);
        command.unitID = __previousCommandData.updateUnitID(data_object.uid);
        command.layerID = __previousCommandData.updateLayerID(data_object.lid);
        command.executionTime = __previousCommandData.updateExecutionTime(data_object.t);
        command.uintColor = __previousCommandData.updateUintColor(data_object.c);
        command.brushScale = __previousCommandData.updateBrushScale(data_object.s);
        command.brushBlendMode = __previousCommandData.updateBlendMode(data_object.bm);
        command.brushAlpha = __previousCommandData.updateBrushAlpha(data_object.a);
        command.brushRotation = __previousCommandData.updateBrushRotation(data_object.r);
        var _x:Number = __previousCommandData.updateX(data_object.x);
        var _y:Number = __previousCommandData.updateY(data_object.y);

        _x = Math.floor(_x * 10)/10;
        _y = Math.floor(_y * 10)/10;

        var _scale:Number = WwDeviceInfo.instance.assetScaleFactor / __drawingScale;//  1.0;  // 0.5 for iPad 2
        command.location = new Point(_x * _scale, _y * _scale);

        return command
    }

    public function generateDataObjectWithCommand(command:WwDrawingHistoryBrushCommand):Object
    {
        var data_object:Object = {};

        __previousCommandData.checkRedundancyOfBrushID(data_object, "bid", command.brushID);
        __previousCommandData.checkRedundancyOfUnitID(data_object, "uid", command.unitID);
        __previousCommandData.checkRedundancyOfLayerID(data_object, "lid", command.layerID);
        __previousCommandData.checkRedundancyOfExecutionTime(data_object, "t", command.executionTime);
        __previousCommandData.checkRedundancyOfUintColor(data_object, "c", command.uintColor);
        __previousCommandData.checkRedundancyOfBrushScale(data_object, "s", command.brushScale);
        __previousCommandData.checkRedundancyOfBrushBlendMode(data_object, "bm", command.brushBlendMode);
        __previousCommandData.checkRedundancyOfBrushAlpha(data_object, "a", command.brushAlpha);
        __previousCommandData.checkRedundancyOfBrushRotation(data_object, "r", command.brushRotation);
        __previousCommandData.checkRedundancyOfGeneratedCommand(data_object, "g", command.generatedCommand);
        __previousCommandData.checkRedundancyOfX(data_object, "x", command.location.x);
        __previousCommandData.checkRedundancyOfY(data_object, "y", command.location.y);

        return data_object;
    }

    public function get drawingScale():Number
    {
        return __drawingScale;
    }

    public function set drawingScale(value:Number):void
    {
        __drawingScale = value;
    }


}
}
*/


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 8/24/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const WwDrawingHistory_1 = __webpack_require__(9);
const WwDrawingHistoryUnit_1 = __webpack_require__(2);
const WwDrawingHistoryBrushCommand_1 = __webpack_require__(1);
const Point_1 = __webpack_require__(0);
const jsonfile = __webpack_require__(4);
class WwDrawingHistoryLoader {
    constructor() {
        this.history = null;
    }
    loadAndParseDrawingData(fileUrl, callback) {
        jsonfile.readFile(fileUrl, (err, data) => {
            if (err) {
                callback(err);
            }
            else {
                this.parseDrawingData(data);
                callback(err, data);
            }
        });
    }
    parseDrawingData(data) {
        this.history = new WwDrawingHistory_1.WwDrawingHistory();
        let base_command = new WwDrawingHistoryBrushCommand_1.WwDrawingHistoryBrushCommand('hard', new Point_1.Point(0, 0));
        data.units.forEach(unit_data => {
            let unit = new WwDrawingHistoryUnit_1.WwDrawingHistoryUnit();
            unit.layerId = unit_data.lid;
            unit.sessionId = unit_data.ses;
            unit.startTime = unit_data.start;
            unit.id = unit_data.id;
            unit_data.commands.forEach(command_data => {
                if (!command_data.t) {
                    command_data.t = 0;
                }
                let command = WwDrawingHistoryBrushCommand_1.WwDrawingHistoryBrushCommand.clone(base_command, command_data);
                //console.log(command.toStringMin());
                unit.addCommand(command);
                base_command = command;
            });
            this.history.addUnit(unit);
        });
    }
}
exports.WwDrawingHistoryLoader = WwDrawingHistoryLoader;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 8/13/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const WwDrawingHistoryBrushCommand_1 = __webpack_require__(1);
const Point_1 = __webpack_require__(0);
class WwDrawingHistoryRenderer {
    constructor(history, context, bounding_rect = null, center_drawing = false, scale = null, start_time = 0, end_time = 0) {
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
        if (this.boundingRect) {
            this.mergedCommandsUnit.shiftOriginToMinXY();
            this.mergedCommandsUnit.resetBoundingRect();
        }
        //console.log(`history bounds: ${this.history.boundingRect.toString()}`);
        //console.log(`merged unit bounds: ${this.mergedCommandsUnit.boundingRect.toString()}`);
        //console.log(`${this.mergedCommandsUnit.toString()}`);
        if (scale) {
            this.scale = scale;
        }
        else {
            this.scale = 1.0;
            if (this.boundingRect && this.mergedCommandsUnit && this.mergedCommandsUnit.boundingRect) {
                try {
                    if (this.mergedCommandsUnit.boundingRect.width > this.mergedCommandsUnit.boundingRect.height) {
                        if (this.boundingRect.width < this.mergedCommandsUnit.boundingRect.width) {
                            this.scale = this.boundingRect.width / this.mergedCommandsUnit.boundingRect.width;
                        }
                    }
                    else {
                        if (this.boundingRect.height < this.mergedCommandsUnit.boundingRect.height) {
                            this.scale = this.boundingRect.height / this.mergedCommandsUnit.boundingRect.height;
                        }
                    }
                }
                catch (e) {
                    console.log(e);
                }
            }
        }
        //console.log(` scale: ${this.scale}`);
        this.offset = new Point_1.Point();
        if (this.boundingRect && this.mergedCommandsUnit && this.mergedCommandsUnit.boundingRect) {
            //console.log(` updating offset: `);
            try {
                this.offset = new Point_1.Point(this.boundingRect.left - this.mergedCommandsUnit.boundingRect.left, this.boundingRect.top - this.mergedCommandsUnit.boundingRect.top);
                if (this.centerDrawing) {
                    let scaled_drawing_width = this.mergedCommandsUnit.boundingRect.width * this.scale;
                    let center_x_offset = (this.boundingRect.width - scaled_drawing_width) / 2;
                    let scaled_drawing_height = this.mergedCommandsUnit.boundingRect.height * this.scale;
                    let center_y_offset = (this.boundingRect.height - scaled_drawing_height) / 2;
                    //console.log(` center_x_offset: ${center_x_offset}, ${this.boundingRect.width} - ${scaled_drawing_width}`);
                    //console.log(` center_y_offset: ${center_y_offset}, ${this.boundingRect.width} - ${scaled_drawing_height}`);
                    this.offset.x += center_x_offset;
                    this.offset.y += center_y_offset;
                }
            }
            catch (e) {
                console.log(e);
            }
        }
        //if (this.boundingRect) {
        //    console.log(` bounding rect: ${this.boundingRect.toString()}`);
        //}
        //console.log(` merged unit bounding rect: ${this.mergedCommandsUnit.boundingRect.toString()}`);
        //console.log(` offset: ${this.offset.toString()}`);
    }
    get ended() {
        return !this.mergedCommandsUnit.hasNext();
    }
    renderCommand(command) {
        command.offset = this.offset;
        command.scale = this.scale;
        if (command.prevCommand) {
            let draw_distance = command.lineLength - command.prevCommand.lineLength;
            let draw_steps = (draw_distance / 2.0) + 1.0;
            for (let i = draw_steps; i > 0; i--) {
                let interpolationFactor = i / draw_steps;
                let temp_command = WwDrawingHistoryBrushCommand_1.WwDrawingHistoryBrushCommand.clone(command);
                let temp_point = Point_1.Point.interpolate(command.prevCommand.location, command.location, interpolationFactor);
                temp_command.location = temp_point;
                temp_command.generatedCommand = true;
                this.brush = temp_command.brush;
                if (this.brush) {
                    this.brush.draw(this.context);
                }
            }
        }
        else {
            this.brush = command.brush; //WwDrawingBrushManager.instance.getBrushFromBrushId(command.brushId);
            if (this.brush) {
                this.brush.draw(this.context);
            }
        }
    }
    renderHistory() {
        this.mergedCommandsUnit.commands.forEach(command => {
            this.renderCommand(command);
        });
    }
    renderHistoryWithDuration(duration) {
        //console.log(`renderHistoryWithDuration: ${duration}, time: ${this.time}`);
        this.renderHistoryWithTimeRange(this.time, this.time + duration);
    }
    renderHistoryWithTimeRange(start_time, end_time) {
        while (this.mergedCommandsUnit.hasNextInTimeRange(start_time, end_time)) {
            this.renderCommand(this.mergedCommandsUnit.nextInTimeRange(start_time, end_time));
        }
        this.time = end_time;
    }
}
exports.WwDrawingHistoryRenderer = WwDrawingHistoryRenderer;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 6/3/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.set(x, y);
    }
    valid() {
        return true;
    }
    set(x, y) {
        this.x = x || 0.0;
        this.y = y || 0.0;
        return this;
    }
    setWithVector(vector) {
        this.x = vector.x || 0.0;
        this.y = vector.y || 0.0;
        return this;
    }
    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }
    subtract(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }
    diff(vector) {
        var diff_x = vector.x - this.x;
        var diff_y = vector.y - this.y;
        return new Vector2(diff_x, diff_y);
    }
    mult(vector) {
        this.x *= vector.x;
        this.y *= vector.y;
        return this;
    }
    scale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }
    div(scalar) {
        this.x /= scalar;
        this.y /= scalar;
        return this;
    }
    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }
    min(vector) {
        this.x = Math.min(this.x, vector.x);
        this.y = Math.min(this.y, vector.y);
        return this;
    }
    max(vector) {
        this.x = Math.max(this.x, vector.x);
        this.y = Math.max(this.y, vector.y);
        return this;
    }
    lt(vector) {
        return this.x < vector.x || this.y < vector.y;
    }
    gt(vector) {
        return this.x > vector.x || this.y > vector.y;
    }
    get magnitude() {
        let aa_plus_bb = this.x * this.x + this.y * this.y;
        return Math.sqrt(aa_plus_bb);
    }
    normalize() {
        let mag = this.magnitude;
        if (mag !== 0) {
            this.x /= mag;
            this.y /= mag;
        }
    }
    clone() {
        return new Vector2(this.x, this.y);
    }
    toString() {
        return `(${this.x}, ${this.y})`;
    }
    ////// BORROWED FROM VICTOR
    ////// TODO: use matrix2 for rotation
    horizontalAngle() {
        return Math.atan2(this.y, this.x);
    }
    horizontalAngleDeg() {
        return this.radian2degrees(this.horizontalAngle());
    }
    verticalAngle() {
        return Math.atan2(this.x, this.y);
    }
    verticalAngleDeg() {
        return this.radian2degrees(this.verticalAngle());
    }
    rotate(angle) {
        var nx = (this.x * Math.cos(angle)) - (this.y * Math.sin(angle));
        var ny = (this.x * Math.sin(angle)) + (this.y * Math.cos(angle));
        this.x = nx;
        this.y = ny;
        return this;
    }
    rotateDeg(angle) {
        angle = this.degrees2radian(angle);
        return this.rotate(angle);
    }
    /*
    rotateBy(rotation) {
        var angle = this.angle() + rotation;

        return this.rotate(angle);
    }

    rotateByDeg(rotation) {
        rotation = degrees2radian(rotation);
        return this.rotateBy(rotation);
    }
    */
    random(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
    radian2degrees(rad) {
        return rad * Vector2.degrees;
    }
    degrees2radian(deg) {
        return deg / Vector2.degrees;
    }
}
Vector2.degrees = 180 / Math.PI;
exports.default = Vector2;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(3)
var polyfills = __webpack_require__(22)
var legacy = __webpack_require__(21)
var queue = []

var util = __webpack_require__(26)

function noop () {}

var debug = noop
if (util.debuglog)
  debug = util.debuglog('gfs4')
else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ''))
  debug = function() {
    var m = util.format.apply(util, arguments)
    m = 'GFS4: ' + m.split(/\n/).join('\nGFS4: ')
    console.error(m)
  }

if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || '')) {
  process.on('exit', function() {
    debug(queue)
    __webpack_require__(23).equal(queue.length, 0)
  })
}

module.exports = patch(__webpack_require__(12))
if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH) {
  module.exports = patch(fs)
}

// Always patch fs.close/closeSync, because we want to
// retry() whenever a close happens *anywhere* in the program.
// This is essential when multiple graceful-fs instances are
// in play at the same time.
module.exports.close =
fs.close = (function (fs$close) { return function (fd, cb) {
  return fs$close.call(fs, fd, function (err) {
    if (!err)
      retry()

    if (typeof cb === 'function')
      cb.apply(this, arguments)
  })
}})(fs.close)

module.exports.closeSync =
fs.closeSync = (function (fs$closeSync) { return function (fd) {
  // Note that graceful-fs also retries when fs.closeSync() fails.
  // Looks like a bug to me, although it's probably a harmless one.
  var rval = fs$closeSync.apply(fs, arguments)
  retry()
  return rval
}})(fs.closeSync)

function patch (fs) {
  // Everything that references the open() function needs to be in here
  polyfills(fs)
  fs.gracefulify = patch
  fs.FileReadStream = ReadStream;  // Legacy name.
  fs.FileWriteStream = WriteStream;  // Legacy name.
  fs.createReadStream = createReadStream
  fs.createWriteStream = createWriteStream
  var fs$readFile = fs.readFile
  fs.readFile = readFile
  function readFile (path, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null

    return go$readFile(path, options, cb)

    function go$readFile (path, options, cb) {
      return fs$readFile(path, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$readFile, [path, options, cb]])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
          retry()
        }
      })
    }
  }

  var fs$writeFile = fs.writeFile
  fs.writeFile = writeFile
  function writeFile (path, data, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null

    return go$writeFile(path, data, options, cb)

    function go$writeFile (path, data, options, cb) {
      return fs$writeFile(path, data, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$writeFile, [path, data, options, cb]])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
          retry()
        }
      })
    }
  }

  var fs$appendFile = fs.appendFile
  if (fs$appendFile)
    fs.appendFile = appendFile
  function appendFile (path, data, options, cb) {
    if (typeof options === 'function')
      cb = options, options = null

    return go$appendFile(path, data, options, cb)

    function go$appendFile (path, data, options, cb) {
      return fs$appendFile(path, data, options, function (err) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$appendFile, [path, data, options, cb]])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
          retry()
        }
      })
    }
  }

  var fs$readdir = fs.readdir
  fs.readdir = readdir
  function readdir (path, options, cb) {
    var args = [path]
    if (typeof options !== 'function') {
      args.push(options)
    } else {
      cb = options
    }
    args.push(go$readdir$cb)

    return go$readdir(args)

    function go$readdir$cb (err, files) {
      if (files && files.sort)
        files.sort()

      if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
        enqueue([go$readdir, [args]])
      else {
        if (typeof cb === 'function')
          cb.apply(this, arguments)
        retry()
      }
    }
  }

  function go$readdir (args) {
    return fs$readdir.apply(fs, args)
  }

  if (process.version.substr(0, 4) === 'v0.8') {
    var legStreams = legacy(fs)
    ReadStream = legStreams.ReadStream
    WriteStream = legStreams.WriteStream
  }

  var fs$ReadStream = fs.ReadStream
  ReadStream.prototype = Object.create(fs$ReadStream.prototype)
  ReadStream.prototype.open = ReadStream$open

  var fs$WriteStream = fs.WriteStream
  WriteStream.prototype = Object.create(fs$WriteStream.prototype)
  WriteStream.prototype.open = WriteStream$open

  fs.ReadStream = ReadStream
  fs.WriteStream = WriteStream

  function ReadStream (path, options) {
    if (this instanceof ReadStream)
      return fs$ReadStream.apply(this, arguments), this
    else
      return ReadStream.apply(Object.create(ReadStream.prototype), arguments)
  }

  function ReadStream$open () {
    var that = this
    open(that.path, that.flags, that.mode, function (err, fd) {
      if (err) {
        if (that.autoClose)
          that.destroy()

        that.emit('error', err)
      } else {
        that.fd = fd
        that.emit('open', fd)
        that.read()
      }
    })
  }

  function WriteStream (path, options) {
    if (this instanceof WriteStream)
      return fs$WriteStream.apply(this, arguments), this
    else
      return WriteStream.apply(Object.create(WriteStream.prototype), arguments)
  }

  function WriteStream$open () {
    var that = this
    open(that.path, that.flags, that.mode, function (err, fd) {
      if (err) {
        that.destroy()
        that.emit('error', err)
      } else {
        that.fd = fd
        that.emit('open', fd)
      }
    })
  }

  function createReadStream (path, options) {
    return new ReadStream(path, options)
  }

  function createWriteStream (path, options) {
    return new WriteStream(path, options)
  }

  var fs$open = fs.open
  fs.open = open
  function open (path, flags, mode, cb) {
    if (typeof mode === 'function')
      cb = mode, mode = null

    return go$open(path, flags, mode, cb)

    function go$open (path, flags, mode, cb) {
      return fs$open(path, flags, mode, function (err, fd) {
        if (err && (err.code === 'EMFILE' || err.code === 'ENFILE'))
          enqueue([go$open, [path, flags, mode, cb]])
        else {
          if (typeof cb === 'function')
            cb.apply(this, arguments)
          retry()
        }
      })
    }
  }

  return fs
}

function enqueue (elem) {
  debug('ENQUEUE', elem[0].name, elem[1])
  queue.push(elem)
}

function retry () {
  var elem = queue.shift()
  if (elem) {
    debug('RETRY', elem[0].name, elem[1])
    elem[0].apply(null, elem[1])
  }
}


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var Stream = __webpack_require__(25).Stream

module.exports = legacy

function legacy (fs) {
  return {
    ReadStream: ReadStream,
    WriteStream: WriteStream
  }

  function ReadStream (path, options) {
    if (!(this instanceof ReadStream)) return new ReadStream(path, options);

    Stream.call(this);

    var self = this;

    this.path = path;
    this.fd = null;
    this.readable = true;
    this.paused = false;

    this.flags = 'r';
    this.mode = 438; /*=0666*/
    this.bufferSize = 64 * 1024;

    options = options || {};

    // Mixin options into this
    var keys = Object.keys(options);
    for (var index = 0, length = keys.length; index < length; index++) {
      var key = keys[index];
      this[key] = options[key];
    }

    if (this.encoding) this.setEncoding(this.encoding);

    if (this.start !== undefined) {
      if ('number' !== typeof this.start) {
        throw TypeError('start must be a Number');
      }
      if (this.end === undefined) {
        this.end = Infinity;
      } else if ('number' !== typeof this.end) {
        throw TypeError('end must be a Number');
      }

      if (this.start > this.end) {
        throw new Error('start must be <= end');
      }

      this.pos = this.start;
    }

    if (this.fd !== null) {
      process.nextTick(function() {
        self._read();
      });
      return;
    }

    fs.open(this.path, this.flags, this.mode, function (err, fd) {
      if (err) {
        self.emit('error', err);
        self.readable = false;
        return;
      }

      self.fd = fd;
      self.emit('open', fd);
      self._read();
    })
  }

  function WriteStream (path, options) {
    if (!(this instanceof WriteStream)) return new WriteStream(path, options);

    Stream.call(this);

    this.path = path;
    this.fd = null;
    this.writable = true;

    this.flags = 'w';
    this.encoding = 'binary';
    this.mode = 438; /*=0666*/
    this.bytesWritten = 0;

    options = options || {};

    // Mixin options into this
    var keys = Object.keys(options);
    for (var index = 0, length = keys.length; index < length; index++) {
      var key = keys[index];
      this[key] = options[key];
    }

    if (this.start !== undefined) {
      if ('number' !== typeof this.start) {
        throw TypeError('start must be a Number');
      }
      if (this.start < 0) {
        throw new Error('start must be >= zero');
      }

      this.pos = this.start;
    }

    this.busy = false;
    this._queue = [];

    if (this.fd === null) {
      this._open = fs.open;
      this._queue.push([this._open, this.path, this.flags, this.mode, undefined]);
      this.flush();
    }
  }
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var fs = __webpack_require__(12)
var constants = __webpack_require__(24)

var origCwd = process.cwd
var cwd = null

var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform

process.cwd = function() {
  if (!cwd)
    cwd = origCwd.call(process)
  return cwd
}
try {
  process.cwd()
} catch (er) {}

var chdir = process.chdir
process.chdir = function(d) {
  cwd = null
  chdir.call(process, d)
}

module.exports = patch

function patch (fs) {
  // (re-)implement some things that are known busted or missing.

  // lchmod, broken prior to 0.6.2
  // back-port the fix here.
  if (constants.hasOwnProperty('O_SYMLINK') &&
      process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
    patchLchmod(fs)
  }

  // lutimes implementation, or no-op
  if (!fs.lutimes) {
    patchLutimes(fs)
  }

  // https://github.com/isaacs/node-graceful-fs/issues/4
  // Chown should not fail on einval or eperm if non-root.
  // It should not fail on enosys ever, as this just indicates
  // that a fs doesn't support the intended operation.

  fs.chown = chownFix(fs.chown)
  fs.fchown = chownFix(fs.fchown)
  fs.lchown = chownFix(fs.lchown)

  fs.chmod = chmodFix(fs.chmod)
  fs.fchmod = chmodFix(fs.fchmod)
  fs.lchmod = chmodFix(fs.lchmod)

  fs.chownSync = chownFixSync(fs.chownSync)
  fs.fchownSync = chownFixSync(fs.fchownSync)
  fs.lchownSync = chownFixSync(fs.lchownSync)

  fs.chmodSync = chmodFixSync(fs.chmodSync)
  fs.fchmodSync = chmodFixSync(fs.fchmodSync)
  fs.lchmodSync = chmodFixSync(fs.lchmodSync)

  fs.stat = statFix(fs.stat)
  fs.fstat = statFix(fs.fstat)
  fs.lstat = statFix(fs.lstat)

  fs.statSync = statFixSync(fs.statSync)
  fs.fstatSync = statFixSync(fs.fstatSync)
  fs.lstatSync = statFixSync(fs.lstatSync)

  // if lchmod/lchown do not exist, then make them no-ops
  if (!fs.lchmod) {
    fs.lchmod = function (path, mode, cb) {
      if (cb) process.nextTick(cb)
    }
    fs.lchmodSync = function () {}
  }
  if (!fs.lchown) {
    fs.lchown = function (path, uid, gid, cb) {
      if (cb) process.nextTick(cb)
    }
    fs.lchownSync = function () {}
  }

  // on Windows, A/V software can lock the directory, causing this
  // to fail with an EACCES or EPERM if the directory contains newly
  // created files.  Try again on failure, for up to 60 seconds.

  // Set the timeout this long because some Windows Anti-Virus, such as Parity
  // bit9, may lock files for up to a minute, causing npm package install
  // failures. Also, take care to yield the scheduler. Windows scheduling gives
  // CPU to a busy looping process, which can cause the program causing the lock
  // contention to be starved of CPU by node, so the contention doesn't resolve.
  if (platform === "win32") {
    fs.rename = (function (fs$rename) { return function (from, to, cb) {
      var start = Date.now()
      var backoff = 0;
      fs$rename(from, to, function CB (er) {
        if (er
            && (er.code === "EACCES" || er.code === "EPERM")
            && Date.now() - start < 60000) {
          setTimeout(function() {
            fs.stat(to, function (stater, st) {
              if (stater && stater.code === "ENOENT")
                fs$rename(from, to, CB);
              else
                cb(er)
            })
          }, backoff)
          if (backoff < 100)
            backoff += 10;
          return;
        }
        if (cb) cb(er)
      })
    }})(fs.rename)
  }

  // if read() returns EAGAIN, then just try it again.
  fs.read = (function (fs$read) { return function (fd, buffer, offset, length, position, callback_) {
    var callback
    if (callback_ && typeof callback_ === 'function') {
      var eagCounter = 0
      callback = function (er, _, __) {
        if (er && er.code === 'EAGAIN' && eagCounter < 10) {
          eagCounter ++
          return fs$read.call(fs, fd, buffer, offset, length, position, callback)
        }
        callback_.apply(this, arguments)
      }
    }
    return fs$read.call(fs, fd, buffer, offset, length, position, callback)
  }})(fs.read)

  fs.readSync = (function (fs$readSync) { return function (fd, buffer, offset, length, position) {
    var eagCounter = 0
    while (true) {
      try {
        return fs$readSync.call(fs, fd, buffer, offset, length, position)
      } catch (er) {
        if (er.code === 'EAGAIN' && eagCounter < 10) {
          eagCounter ++
          continue
        }
        throw er
      }
    }
  }})(fs.readSync)
}

function patchLchmod (fs) {
  fs.lchmod = function (path, mode, callback) {
    fs.open( path
           , constants.O_WRONLY | constants.O_SYMLINK
           , mode
           , function (err, fd) {
      if (err) {
        if (callback) callback(err)
        return
      }
      // prefer to return the chmod error, if one occurs,
      // but still try to close, and report closing errors if they occur.
      fs.fchmod(fd, mode, function (err) {
        fs.close(fd, function(err2) {
          if (callback) callback(err || err2)
        })
      })
    })
  }

  fs.lchmodSync = function (path, mode) {
    var fd = fs.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode)

    // prefer to return the chmod error, if one occurs,
    // but still try to close, and report closing errors if they occur.
    var threw = true
    var ret
    try {
      ret = fs.fchmodSync(fd, mode)
      threw = false
    } finally {
      if (threw) {
        try {
          fs.closeSync(fd)
        } catch (er) {}
      } else {
        fs.closeSync(fd)
      }
    }
    return ret
  }
}

function patchLutimes (fs) {
  if (constants.hasOwnProperty("O_SYMLINK")) {
    fs.lutimes = function (path, at, mt, cb) {
      fs.open(path, constants.O_SYMLINK, function (er, fd) {
        if (er) {
          if (cb) cb(er)
          return
        }
        fs.futimes(fd, at, mt, function (er) {
          fs.close(fd, function (er2) {
            if (cb) cb(er || er2)
          })
        })
      })
    }

    fs.lutimesSync = function (path, at, mt) {
      var fd = fs.openSync(path, constants.O_SYMLINK)
      var ret
      var threw = true
      try {
        ret = fs.futimesSync(fd, at, mt)
        threw = false
      } finally {
        if (threw) {
          try {
            fs.closeSync(fd)
          } catch (er) {}
        } else {
          fs.closeSync(fd)
        }
      }
      return ret
    }

  } else {
    fs.lutimes = function (_a, _b, _c, cb) { if (cb) process.nextTick(cb) }
    fs.lutimesSync = function () {}
  }
}

function chmodFix (orig) {
  if (!orig) return orig
  return function (target, mode, cb) {
    return orig.call(fs, target, mode, function (er) {
      if (chownErOk(er)) er = null
      if (cb) cb.apply(this, arguments)
    })
  }
}

function chmodFixSync (orig) {
  if (!orig) return orig
  return function (target, mode) {
    try {
      return orig.call(fs, target, mode)
    } catch (er) {
      if (!chownErOk(er)) throw er
    }
  }
}


function chownFix (orig) {
  if (!orig) return orig
  return function (target, uid, gid, cb) {
    return orig.call(fs, target, uid, gid, function (er) {
      if (chownErOk(er)) er = null
      if (cb) cb.apply(this, arguments)
    })
  }
}

function chownFixSync (orig) {
  if (!orig) return orig
  return function (target, uid, gid) {
    try {
      return orig.call(fs, target, uid, gid)
    } catch (er) {
      if (!chownErOk(er)) throw er
    }
  }
}


function statFix (orig) {
  if (!orig) return orig
  // Older versions of Node erroneously returned signed integers for
  // uid + gid.
  return function (target, cb) {
    return orig.call(fs, target, function (er, stats) {
      if (!stats) return cb.apply(this, arguments)
      if (stats.uid < 0) stats.uid += 0x100000000
      if (stats.gid < 0) stats.gid += 0x100000000
      if (cb) cb.apply(this, arguments)
    })
  }
}

function statFixSync (orig) {
  if (!orig) return orig
  // Older versions of Node erroneously returned signed integers for
  // uid + gid.
  return function (target) {
    var stats = orig.call(fs, target)
    if (stats.uid < 0) stats.uid += 0x100000000
    if (stats.gid < 0) stats.gid += 0x100000000
    return stats;
  }
}

// ENOSYS means that the fs doesn't support the op. Just ignore
// that, because it doesn't matter.
//
// if there's no getuid, or if getuid() is something other
// than 0, and the error is EINVAL or EPERM, then just ignore
// it.
//
// This specific case is a silent failure in cp, install, tar,
// and most other unix tools that manage permissions.
//
// When running as root, or if other types of errors are
// encountered, then it's strict.
function chownErOk (er) {
  if (!er)
    return true

  if (er.code === "ENOSYS")
    return true

  var nonroot = !process.getuid || process.getuid() !== 0
  if (nonroot) {
    if (er.code === "EINVAL" || er.code === "EPERM")
      return true
  }

  return false
}


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = require("assert");

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("constants");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("stream");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 7/7/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const WwDraw = __webpack_require__(13);
const path = __webpack_require__(14);
const jsonfile = __webpack_require__(4);
const TestData = jsonfile.readFileSync(path.resolve('images/drawings/flower.json'));
let canvas = document.getElementById("example-canvas");
let ctx = canvas.getContext("2d");
ctx.clearRect(0, 0, canvas.width, canvas.height);
console.log(`getTimer: ${WwDraw.getTimer()}`);
console.log(`point: ${new WwDraw.Point().toString()}`);
let test_sprite = new WwDraw.WwSprite(1, 2);
console.log(`WwSprite: ${test_sprite}`);
test_sprite.loadImageWithURLAndCallback('./images/player.png', onSpriteImageLoaded);
let bg_sprite = new WwDraw.WwSprite(0, 0);
console.log(`WwSprite: ${bg_sprite}`);
bg_sprite.loadImageWithURLAndCallback('./images/bg_500.png', onBGImageLoaded);
let test_brush = new WwDraw.WwBrush();
console.log(`WwBrush: ${test_brush}`);
test_brush.loadImageWithURLAndCallback('./images/brushes/circle.png', onBrushImageLoaded);
let test_point1 = new WwDraw.Point(0, 0);
let test_point2 = new WwDraw.Point(1, 1);
console.log(`Distance between points: ${WwDraw.Point.distance(test_point1, test_point2)}`);
let device_info = WwDraw.WwDeviceInfo.instance;
console.log(`DeviceInfo: AssetScaleFactor: ${device_info.assetScaleFactor}`);
let brush_command = new WwDraw.WwDrawingHistoryBrushCommand('hard', new WwDraw.Point(100, 100), WwDraw.getTimer());
console.log(`${brush_command.toString()}`);
let drawing_history_unit = new WwDraw.WwDrawingHistoryUnit();
let test_unit = TestData.units[0];
let test_commands = test_unit.commands;
let base_command = new WwDraw.WwDrawingHistoryBrushCommand('hard', new WwDraw.Point(0, 0));
test_commands.forEach((data_object) => {
    let command = WwDraw.WwDrawingHistoryBrushCommand.clone(base_command, data_object);
    drawing_history_unit.addCommand(command);
    base_command = command;
});
//console.log(drawing_history_unit.toString());
WwDraw.WwDrawingBrushManager.instance.init(onBrushesLoaded);
let drawing_renderer;
function onBrushesLoaded(brushes) {
    console.log(`onBrushesLoaded:`);
    console.log(brushes);
    let historyLoader = new WwDraw.WwDrawingHistoryLoader();
    historyLoader.parseDrawingData(TestData);
    let render_rect = new WwDraw.Rect(110, 390, 500, 500);
    drawing_renderer = new WwDraw.WwDrawingHistoryRenderer(historyLoader.history, ctx, render_rect, true, 0.8);
    window.requestAnimationFrame(update);
}
function update() {
    drawing_renderer.renderHistoryWithDuration(33); //render one 33ms segment of the drawing each frame
    if (!drawing_renderer.ended) {
        window.requestAnimationFrame(update);
    }
}
function onSpriteImageLoaded(sprite) {
    console.log(`onSpriteImageLoaded: ${sprite}`);
    sprite.draw(ctx);
}
function onBGImageLoaded(sprite) {
    console.log(`onBGImageLoaded: ${sprite}`);
    sprite.x = 390;
    sprite.y = 110;
    sprite.draw(ctx);
}
function onBrushImageLoaded(brush) {
    console.log(`onBrushImageLoaded: ${brush}`);
    brush.draw(ctx);
}


/***/ })
/******/ ]);
//# sourceMappingURL=example-canvas.js.map