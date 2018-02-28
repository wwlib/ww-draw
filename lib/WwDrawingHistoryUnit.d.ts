import { Rect } from './Rect';
import { WwDrawingHistoryBrushCommand } from './WwDrawingHistoryBrushCommand';
export declare class WwDrawingHistoryUnit {
    id: number;
    commands: WwDrawingHistoryBrushCommand[];
    timeScale: number;
    layerId: string;
    lineLength: number;
    prevCommand: WwDrawingHistoryBrushCommand;
    startTime: number;
    duration: number;
    sessionId: number;
    currentCommandIndex: number;
    boundingRect: Rect;
    constructor();
    toString(): String;
    addCommand(_command: any, adjust_time_to_unit_time?: boolean, link_prev_command?: boolean): void;
    shiftOriginToMinXY(): void;
    resetBoundingRect(): void;
    updateBoundingRect(command: any): void;
    sortComandsByExecutionTime(): void;
    sortCompareExecutionTime(_command1: any, _command2: any): number;
    readonly json: any;
    hasNext(): boolean;
    hasNextInTimeRange(start_time: any, end_time: any): boolean;
    next(): any;
    nextInTimeRange(start_time: any, end_time: any): any;
}
