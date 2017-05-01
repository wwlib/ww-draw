/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 8/13/15.
 */
declare class WwDeviceInfo {
    private static _instance;
    private _assetScaleFactor;
    constructor();
    static readonly instance: WwDeviceInfo;
    readonly assetScaleFactor: number;
}
export default WwDeviceInfo;
