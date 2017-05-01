/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 8/13/15.
 */
/**
 * ...
 * @author Andrew Rapo (andrew@worthwhilegames.org)
 * @license MIT
 */
import WwDrawingHistoryUnit from './WwDrawingHistoryUnit';
import Rect from './Rect';
declare class WwDrawingHistory {
    units: WwDrawingHistoryUnit[];
    startTime: number;
    duration: number;
    boundingRect: Rect;
    scale: number;
    sessions: any[];
    unitLineLength: number;
    constructor();
    toString(): string;
    addUnit(unit: any): void;
    concatAllCommands(layer?: any): WwDrawingHistoryUnit;
    readonly json: any;
}
export default WwDrawingHistory;
