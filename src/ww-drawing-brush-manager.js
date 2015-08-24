/**
 * Created by andrew on 8/13/15.
 */

/**
 * ...
 * @author Andrew Rapo (andrew@worthwhilegames.org)
 * @license MIT
 */

import WwBrush from'./ww-brush';

class WwDrawingBrushManager {
    constructor() {
        this.brushIdArray = [];
        this.brushURLs = {};
        this.brushes = {};
        this.brushesLoadedCount = 0;
    }

    static get instance() {
        if (!WwDrawingBrushManager._instance) {
            WwDrawingBrushManager._instance = new WwDrawingBrushManager();
        }

        return WwDrawingBrushManager._instance;
    }

    init(callback=null)
    {
        this.callback = callback;
        this.brushIdArray = [];
        this.brushURLs = {};
        this.brushes = {};
        this.brushesLoadedCount = 0;

        this.brushIdArray[0] = "hard";
        this.brushIdArray[1] = "soft";
        this.brushIdArray[2] = "crayon";
        this.brushIdArray[3] = "calligraphy";
        this.brushIdArray[4] = "pencil";
        this.brushIdArray[5] = "circleSoft";
        this.brushIdArray[6] = "star";

        this.brushURLs["hard"] = "./images/brushes/brush_hard_blue.png";
        this.brushURLs["soft"] = "./images/brushes/brush_soft.png";
        this.brushURLs["crayon"] = "./images/brushes/brush_crayon.png";
        this.brushURLs["calligraphy"] = "./images/brushes/brush_calligraphy.png";
        this.brushURLs["pencil"] = "./images/brushes/brush_pencil.png";
        this.brushURLs["circleSoft"] = "./images/brushes/brush_circleSoft.png";
        this.brushURLs["star"] = "./images/brushes/brush_star.png"; //,interval_dash";

        /*
        this.brushURLs.forEach(_key => {
            let _brush = new WwBrush();
            _brush.loadImage(this.brushURLs[_key]);
            this.brushes[_key] = _brush;
            //console.log("BrushManager: " + _key + ":" + this.brushes[_key] + ", " + this.brushURLs[_key], "1");
        });
        */

        for (let _key in this.brushURLs) {
            let _brush = new WwBrush();
            let onBrushImageLoadedCallback = this.onBrushImageLoaded.bind(this);
            _brush.loadImageWithURLAndCallback(this.brushURLs[_key], onBrushImageLoadedCallback);
            this.brushes[_key] = _brush;
        }
    }

    onBrushImageLoaded(sprite) {
        this.brushesLoadedCount++;

        if (this.brushesLoadedCount == this.brushIdArray.length) {
            if (this.callback) {
                this.callback(this.brushes);
                this.callback = null;
            }
        }
    }

    getBrushFromBrushId(_id)
    {
        return this.brushes[_id];
    }

    getBrushIdWithIndex(index)
    {
        return this.brushIdArray[index];
    }

}

WwDrawingBrushManager._instance = null;

export default WwDrawingBrushManager;

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