/**
 * Created by andrew on 8/13/15.
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WwDeviceInfo = (function () {
    function WwDeviceInfo() {
        _classCallCheck(this, WwDeviceInfo);

        this._assetScaleFactor = 1.0;
    }

    _createClass(WwDeviceInfo, [{
        key: "assetScaleFactor",
        get: function get() {
            return this._assetScaleFactor;
        }
    }], [{
        key: "instance",
        get: function get() {
            if (!WwDeviceInfo._instance) {
                WwDeviceInfo._instance = new WwDeviceInfo();
            }

            return WwDeviceInfo._instance;
        }
    }]);

    return WwDeviceInfo;
})();

WwDeviceInfo._instance = null;

exports["default"] = WwDeviceInfo;
module.exports = exports["default"];
//# sourceMappingURL=ww-device-info.js.map