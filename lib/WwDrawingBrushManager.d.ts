export default class WwDrawingBrushManager {
    static _instance: WwDrawingBrushManager;
    brushIdArray: string[];
    brushURLs: any;
    brushes: any;
    brushesLoadedCount: number;
    callback: any;
    mode: string;
    brushesObject: any;
    constructor();
    static readonly instance: WwDrawingBrushManager;
    init(callback?: any, mode?: string, brushes_obj?: any): void;
    onBrushImageLoaded(sprite: any): void;
    getBrushFromBrushId(_id: any): any;
    getBrushIdWithIndex(index: any): string;
}
