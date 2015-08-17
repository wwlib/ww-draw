/**
 * Created by andrew on 8/13/15.
 */

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

WwDeviceInfo._instance = null;

export default WwDeviceInfo;
