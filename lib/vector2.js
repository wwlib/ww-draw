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
//# sourceMappingURL=vector2.js.map