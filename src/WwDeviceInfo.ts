/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 8/13/15.
 */

class WwDeviceInfo {

    private  static _instance: WwDeviceInfo;
    private _assetScaleFactor: number;

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

export default WwDeviceInfo;
