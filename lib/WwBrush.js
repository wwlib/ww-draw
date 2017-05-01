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
const WwSprite_1 = require("./WwSprite");
class WwBrush extends WwSprite_1.default {
    constructor(mode = 'canvas') {
        super(0, 0, mode);
        this.color = null;
    }
    onReady() {
        this.centerPivot();
        super.onReady();
        //__img.blendMode = BlendMode.NORMAL;
        //__img.color = __color;
    }
}
exports.default = WwBrush;
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
//# sourceMappingURL=WwBrush.js.map