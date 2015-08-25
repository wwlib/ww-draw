/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 7/7/15.
 */

"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GetTimer = (function () {
    function GetTimer() {
        _classCallCheck(this, GetTimer);
    }

    _createClass(GetTimer, null, [{
        key: "getTimer",
        value: function getTimer() {
            return new Date().getTime();
        }
    }]);

    return GetTimer;
})();

exports["default"] = GetTimer.getTimer;
module.exports = exports["default"];
//# sourceMappingURL=get-timer.js.map