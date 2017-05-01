"use strict";
/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 4/14/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const Point_1 = require("./Point");
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
        this.expandToIncludePoint(new Point_1.default(rect.left, rect.top));
        this.expandToIncludePoint(new Point_1.default(rect.right, rect.bottom));
    }
}
exports.default = Rect;
//# sourceMappingURL=rect.js.map