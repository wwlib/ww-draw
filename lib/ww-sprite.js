/**
 * Created by andrew on 7/7/15.
 */

/**
 * Adds image loading, crude debugging and other generally useful functionality...
 * @author Andrew Rapo (andrew@worthwhilegames.org)
 * @license MIT
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WwSprite = (function () {
    function WwSprite() {
        var x = arguments[0] === undefined ? 0 : arguments[0];
        var y = arguments[1] === undefined ? 0 : arguments[1];

        _classCallCheck(this, WwSprite);

        this.x = x;
        this.y = y;
        this.width = 0;
        this.height = 0;

        this.img = {};
        this.bmp = {};
        //this.debug:WwDebug = WwDebug.instance;
        this.scaleFactor = WwSprite.BASE_SCALE_FACTOR;
        this.url = "";

        this._onReadyCallback = null;
    }

    _createClass(WwSprite, [{
        key: "toString",
        value: function toString() {
            return "WwSprite: (" + this.x + ", " + this.y + "): url: " + this.url;
        }
    }, {
        key: "loadImageWithURL",
        value: function loadImageWithURL(url) {
            this.loadImageWithURLAndCallback(url, this.onImageLoaded);
        }
    }, {
        key: "loadImageWithURLAndCallback",
        value: function loadImageWithURLAndCallback(url, callback) {
            var _this = this;

            this.log("WwSprite: load: " + url + ", " + callback);

            this.url = url;
            if (this.url != null && this.url != "") {
                this.url = url;
                var temp_img = new Image();

                temp_img.onload = function (img) {
                    //console.log(`Sprite: onLoad: ${callback}`);
                    _this.img = img;
                    _this.width = img.width;
                    _this.height = img.height;

                    if (callback) {
                        callback(temp_img);
                    }
                };

                temp_img.src = url;
            } else {
                this.onReady();
            }
        }
    }, {
        key: "onImageLoaded",
        value: function onImageLoaded(img) {
            this.log("onImageLoaded: " + this.url);
            //__bmp = event.target.content as Bitmap;
            //removeChild(__img);
            //__img = Image.fromBitmap(__bmp);
            //resetScale();
            //__img.alpha = 0.5;
            //addChild(__img);
            //__bmp = null;
            this.onReady();
        }
    }, {
        key: "onReady",

        // Override this
        value: function onReady() {
            this.log("onReady:  " + this.url);
            if (this._onReadyCallback != null) {
                this._onReadyCallback(this.url);
            }
        }
    }, {
        key: "log",
        value: function log(msg) {
            console.log("WwSprite: " + msg);
        }
    }, {
        key: "onReadyCallback",
        set: function set(callback) {
            this._onReadyCallback = callback;
        }
    }]);

    return WwSprite;
})();

WwSprite.BASE_SCALE_FACTOR = 0.5;
WwSprite.SPRITE_STAGE = {};

exports["default"] = WwSprite;

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
module.exports = exports["default"];
//# sourceMappingURL=ww-sprite.js.map