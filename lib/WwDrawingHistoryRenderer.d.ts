/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 8/13/15.
 */
import { WwDrawingHistory } from './WwDrawingHistory';
import { WwDrawingHistoryUnit } from './WwDrawingHistoryUnit';
import { WwRenderTextureContext } from './WwRenderTextureContext';
import { WwBrush } from './WwBrush';
import { Point } from './Point';
import { Rect } from './Rect';
export declare class WwDrawingHistoryRenderer {
    history: WwDrawingHistory;
    context: CanvasRenderingContext2D | WwRenderTextureContext;
    boundingRect: Rect;
    x: number;
    y: number;
    width: number;
    height: number;
    centerDrawing: boolean;
    startTime: number;
    endTime: number;
    time: number;
    scale: number;
    offset: Point;
    brush: WwBrush;
    mergedCommandsUnit: WwDrawingHistoryUnit;
    constructor(history: any, context: CanvasRenderingContext2D | WwRenderTextureContext, bounding_rect?: any, center_drawing?: boolean, scale?: any, start_time?: number, end_time?: number);
    readonly ended: boolean;
    renderCommand(command: any): void;
    renderHistory(): void;
    renderHistoryWithDuration(duration: any): void;
    renderHistoryWithTimeRange(start_time: any, end_time: any): void;
}
