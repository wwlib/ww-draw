/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 7/7/15.
 */
/**
 * ...
 * @author Andrew Rapo (andrew@worthwhilegames.org)
 * @license MIT
 */
import Point from './Point';
import WwBrush from './WwBrush';
declare class WwDrawingHistoryBrushCommand {
    brushExpansionFactor: number;
    brushBlendMode: string;
    executionTime: number;
    brushAlpha: number;
    brushRotation: number;
    layerId: string;
    generatedCommand: boolean;
    offset: Point;
    scale: number;
    lineLength: number;
    prevCommand: WwDrawingHistoryBrushCommand;
    rendered: boolean;
    unitId: number;
    timeScale: number;
    normalizedExecutionTime: number;
    uintColor: number;
    private _brush;
    private _brushId;
    private _location;
    private _color;
    private _brushScale;
    constructor(brush_id: any, location_point: any, time?: any, uint_color?: any, brush_scale?: number, expansion_factor?: number, blend_mode?: string, alpha?: number, rotation?: number, layer_id?: string, generated?: boolean);
    onReady(): void;
    readonly brush: WwBrush;
    brushId: string;
    location: Point;
    color: number;
    brushScale: number;
    toString(): string;
    toStringMin(): string;
    updateBrushId(value: any): any;
    updateUintColor(value: any): any;
    updateUnitId(value: any): any;
    updateLayerId(value: any): any;
    updateExecutionTime(value: any): any;
    updateBrushScale(value: any): any;
    updateBlendMode(value: any): any;
    updateBrushAlpha(value: any): any;
    updateBrushRotation(value: any): any;
    updateX(value: any): any;
    updateY(value: any): any;
    checkRedundancyOfBrushId(data_object: any, property: any, value: any): void;
    checkRedundancyOfUintColor(data_object: any, property: any, value: any): void;
    checkRedundancyOfUnitId(data_object: any, property: any, value: any): void;
    checkRedundancyOfLayerId(data_object: any, property: any, value: any): void;
    checkRedundancyOfExecutionTime(data_object: any, property: any, value: any): void;
    checkRedundancyOfBrushScale(data_object: any, property: any, value: any): void;
    checkRedundancyOfBrushBlendMode(data_object: any, property: any, value: any): void;
    checkRedundancyOfBrushAlpha(data_object: any, property: any, value: any): void;
    checkRedundancyOfBrushRotation(data_object: any, property: any, value: any): void;
    checkRedundancyOfGeneratedCommand(data_object: any, property: any, value: any): void;
    checkRedundancyOfX(data_object: any, property: any, value: any): void;
    checkRedundancyOfY(data_object: any, property: any, value: any): void;
    static clone(_command: any, data_object?: any): WwDrawingHistoryBrushCommand;
    dispose(): void;
}
export default WwDrawingHistoryBrushCommand;
