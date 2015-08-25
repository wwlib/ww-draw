/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 4/14/15.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _point = require('./point');

var _point2 = _interopRequireDefault(_point);

var Rect = (function () {
    function Rect() {
        var top = arguments[0] === undefined ? 0 : arguments[0];
        var left = arguments[1] === undefined ? 0 : arguments[1];
        var width = arguments[2] === undefined ? 0 : arguments[2];
        var height = arguments[3] === undefined ? 0 : arguments[3];

        _classCallCheck(this, Rect);

        this.top = top;
        this.left = left;
        this.width = width;
        this.height = height;
        this._right = this.right;
        this._bottom = this.bottom;
    }

    _createClass(Rect, [{
        key: 'toString',
        value: function toString() {
            return 'top: ' + this.top + ', left: ' + this.left + ', bottom: ' + this.bottom + ', right ' + this.right + ' - ' + this.width + ', ' + this.height;
        }
    }, {
        key: 'inBounds',
        value: function inBounds(point) {
            return point.x >= this.left && point.x <= this.right && point.y >= this.top && point.y <= this.bottom;
        }
    }, {
        key: 'expandToIncludePoint',
        value: function expandToIncludePoint(point) {
            this.top = Math.min(this.top, point.y);
            this.left = Math.min(this.left, point.x);
            this._right = Math.max(this._right, point.x);
            this._bottom = Math.max(this._bottom, point.y);

            this.width = this._right - this.left;
            this.height = this._bottom - this.top;
        }
    }, {
        key: 'expandToIncludeRect',
        value: function expandToIncludeRect(rect) {
            this.expandToIncludePoint(new _point2['default'](rect.left, rect.top));
            this.expandToIncludePoint(new _point2['default'](rect.right, rect.bottom));
        }
    }, {
        key: 'right',
        get: function get() {
            return this.left + this.width;
        }
    }, {
        key: 'bottom',
        get: function get() {
            return this.top + this.height;
        }
    }]);

    return Rect;
})();

exports['default'] = Rect;
module.exports = exports['default'];
//# sourceMappingURL=rect.js.map