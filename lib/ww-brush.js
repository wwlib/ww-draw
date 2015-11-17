/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 7/7/15.
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

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _wwSprite = require('./ww-sprite');

var _wwSprite2 = _interopRequireDefault(_wwSprite);

var WwBrush = (function (_WwSprite) {
    function WwBrush() {
        var mode = arguments[0] === undefined ? 'canvas' : arguments[0];

        _classCallCheck(this, WwBrush);

        _get(Object.getPrototypeOf(WwBrush.prototype), 'constructor', this).call(this, 0, 0, mode);
        this.color = null;
    }

    _inherits(WwBrush, _WwSprite);

    _createClass(WwBrush, [{
        key: 'onReady',
        value: function onReady() {
            this.centerPivot();
            _get(Object.getPrototypeOf(WwBrush.prototype), 'onReady', this).call(this);

            //__img.blendMode = BlendMode.NORMAL;
            //__img.color = __color;
        }
    }]);

    return WwBrush;
})(_wwSprite2['default']);

exports['default'] = WwBrush;

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
module.exports = exports['default'];
//# sourceMappingURL=ww-brush.js.map