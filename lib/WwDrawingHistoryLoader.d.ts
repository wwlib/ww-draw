/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 8/24/15.
 */
import WwDrawingHistory from './WwDrawingHistory';
declare class WwDrawingHistoryLoader {
    history: WwDrawingHistory;
    constructor();
    loadAndParseDrawingData(fileUrl: string, callback: any): void;
    parseDrawingData(data: any): void;
}
export default WwDrawingHistoryLoader;
