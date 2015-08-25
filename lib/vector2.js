/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 6/3/15.
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vector2 = (function () {
    function Vector2(x, y) {
        _classCallCheck(this, Vector2);

        this.x = x;
        this.y = y;
        this.set(x, y);
    }

    _createClass(Vector2, [{
        key: "valid",
        value: function valid() {
            return true;
        }
    }, {
        key: "set",
        value: function set(x, y) {
            this.x = x || 0.0;
            this.y = y || 0.0;
            return this;
        }
    }, {
        key: "setWithVector",
        value: function setWithVector(vector) {
            this.x = vector.x || 0.0;
            this.y = vector.y || 0.0;
            return this;
        }
    }, {
        key: "add",
        value: function add(vector) {
            this.x += vector.x;
            this.y += vector.y;
            return this;
        }
    }, {
        key: "subtract",
        value: function subtract(vector) {
            this.x -= vector.x;
            this.y -= vector.y;
            return this;
        }
    }, {
        key: "diff",
        value: function diff(vector) {
            var diff_x = vector.x - this.x;
            var diff_y = vector.y - this.y;
            return new Vector2(diff_x, diff_y);
        }
    }, {
        key: "mult",
        value: function mult(vector) {
            this.x *= vector.x;
            this.y *= vector.y;
            return this;
        }
    }, {
        key: "scale",
        value: function scale(scalar) {
            this.x *= scalar;
            this.y *= scalar;
            return this;
        }
    }, {
        key: "div",
        value: function div(scalar) {
            this.x /= scalar;
            this.y /= scalar;
            return this;
        }
    }, {
        key: "dot",
        value: function dot(vector) {
            return this.x * vector.x + this.y * vector.y;
        }
    }, {
        key: "min",
        value: function min(vector) {
            this.x = Math.min(this.x, vector.x);
            this.y = Math.min(this.y, vector.y);
            return this;
        }
    }, {
        key: "max",
        value: function max(vector) {
            this.x = Math.max(this.x, vector.x);
            this.y = Math.max(this.y, vector.y);
            return this;
        }
    }, {
        key: "lt",
        value: function lt(vector) {
            return this.x < vector.x || this.y < vector.y;
        }
    }, {
        key: "gt",
        value: function gt(vector) {
            return this.x > vector.x || this.y > vector.y;
        }
    }, {
        key: "normalize",
        value: function normalize() {
            var mag = this.magnitude;
            if (mag !== 0) {
                this.x /= mag;
                this.y /= mag;
            }
        }
    }, {
        key: "clone",
        value: function clone() {
            return new Vector2(this.x, this.y);
        }
    }, {
        key: "toString",
        value: function toString() {
            return "(" + this.x + ", " + this.y + ")";
        }
    }, {
        key: "horizontalAngle",

        ////// BORROWED FROM VICTOR
        ////// TODO: use matrix2 for rotation

        value: function horizontalAngle() {
            return Math.atan2(this.y, this.x);
        }
    }, {
        key: "horizontalAngleDeg",
        value: function horizontalAngleDeg() {
            return this.radian2degrees(this.horizontalAngle());
        }
    }, {
        key: "verticalAngle",
        value: function verticalAngle() {
            return Math.atan2(this.x, this.y);
        }
    }, {
        key: "verticalAngleDeg",
        value: function verticalAngleDeg() {
            return this.radian2degrees(this.verticalAngle());
        }
    }, {
        key: "rotate",
        value: function rotate(angle) {
            var nx = this.x * Math.cos(angle) - this.y * Math.sin(angle);
            var ny = this.x * Math.sin(angle) + this.y * Math.cos(angle);

            this.x = nx;
            this.y = ny;

            return this;
        }
    }, {
        key: "rotateDeg",
        value: function rotateDeg(angle) {
            angle = this.degrees2radian(angle);
            return this.rotate(angle);
        }
    }, {
        key: "random",

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

        value: function random(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        }
    }, {
        key: "radian2degrees",
        value: function radian2degrees(rad) {
            return rad * Vector2.degrees;
        }
    }, {
        key: "degrees2radian",
        value: function degrees2radian(deg) {
            return deg / Vector2.degrees;
        }
    }, {
        key: "magnitude",
        get: function get() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
    }]);

    return Vector2;
})();

Vector2.degrees = 180 / Math.PI;

exports["default"] = Vector2;
module.exports = exports["default"];
//# sourceMappingURL=vector2.js.map