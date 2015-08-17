/**
 * Created by andrew on 8/13/15.
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

var _wwBrush = require('./ww-brush');

var _wwBrush2 = _interopRequireDefault(_wwBrush);

var WwDrawingBrushManager = (function () {
    function WwDrawingBrushManager() {
        _classCallCheck(this, WwDrawingBrushManager);
    }

    _createClass(WwDrawingBrushManager, null, [{
        key: 'instance',
        get: function get() {
            if (!WwDrawingBrushManager._instance) {
                WwDrawingBrushManager._instance = new WwDrawingBrushManager();
            }

            return WwDrawingBrushManager._instance;
        }
    }]);

    return WwDrawingBrushManager;
})();

WwDrawingBrushManager._instance = null;

exports['default'] = WwDrawingBrushManager;

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
module.exports = exports['default'];
//# sourceMappingURL=WwDrawingBrushManager.js.map