export declare class WwDrawingBrushManager {
    static _instance: WwDrawingBrushManager;
    initialized: boolean;
    brushIdArray: string[];
    brushURLs: any;
    brushes: any;
    brushesLoadedCount: number;
    callback: any;
    mode: string;
    brushesObject: any;
    PIXI: any;
    constructor();
    static readonly instance: WwDrawingBrushManager;
    init(callback?: any, brushes_obj?: any, mode?: string, PIXI?: any): void;
    onBrushImageLoaded(sprite: any): void;
    getBrushFromBrushId(_id: any): any;
    getBrushIdWithIndex(index: any): string;
}
