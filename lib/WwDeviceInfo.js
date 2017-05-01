"use strict";
/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 8/13/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class WwDeviceInfo {
    constructor() {
        this._assetScaleFactor = 1.0;
    }
    static get instance() {
        if (!WwDeviceInfo._instance) {
            WwDeviceInfo._instance = new WwDeviceInfo();
        }
        return WwDeviceInfo._instance;
    }
    get assetScaleFactor() {
        return this._assetScaleFactor;
    }
}
exports.default = WwDeviceInfo;
//# sourceMappingURL=WwDeviceInfo.js.map