"use strict";
/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 7/7/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class GetTimer {
    static getTimer() {
        return new Date().getTime();
    }
}
let _getTimer = GetTimer.getTimer;
exports.getTimer = _getTimer;
//# sourceMappingURL=GetTimer.js.map