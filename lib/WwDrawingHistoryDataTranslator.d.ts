/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 8/13/15.
 */
import { WwDrawingHistoryBrushCommand } from './WwDrawingHistoryBrushCommand';
export declare class WwDrawingHistoryDataTranslator {
    previousCommandData: WwDrawingHistoryBrushCommand;
    drawingScale: number;
    constructor();
    generateCommandWithDataObject(data_object: any): WwDrawingHistoryBrushCommand;
    generateDataObjectWithCommand(command: any): {};
}
