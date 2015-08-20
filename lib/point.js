/**
 * Created by andrew on 7/7/15.
 */

'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _vector2 = require('./vector2');

var _vector22 = _interopRequireDefault(_vector2);

var Point = (function () {
    function Point() {
        var x = arguments[0] === undefined ? 0 : arguments[0];
        var y = arguments[1] === undefined ? 0 : arguments[1];

        _classCallCheck(this, Point);

        this.x = x;
        this.y = y;
    }

    _createClass(Point, [{
        key: 'toString',
        value: function toString() {
            return '(' + this.x + ', ' + this.y + ')';
        }
    }], [{
        key: 'distance',
        value: function distance(point1, point2) {
            var vec1 = new _vector22['default'](point1.x, point1.y);
            var diff = vec1.diff(point2); //Point can be used as an argument for diff

            return diff.magnitude;
        }
    }, {
        key: 'interpolate',
        value: function interpolate(point1, point2, factor) {
            var dx = point1.x + (point2.x - point1.x) * factor;
            var dy = point1.y + (point2.y - point1.y) * factor;
            return new Point(dx, dy);
        }
    }]);

    return Point;
})();

exports['default'] = Point;
module.exports = exports['default'];
//# sourceMappingURL=point.js.map