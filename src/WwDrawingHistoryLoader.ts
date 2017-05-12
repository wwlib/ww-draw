/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 8/24/15.
 */

import { WwDrawingHistory } from './WwDrawingHistory';
import { WwDrawingHistoryUnit } from './WwDrawingHistoryUnit';
import { WwDrawingHistoryBrushCommand } from './WwDrawingHistoryBrushCommand';
import { Point} from './Point';
const jsonfile = require('jsonfile');

export class WwDrawingHistoryLoader {

    public history: WwDrawingHistory;

    constructor() {
        this.history = null;

    }

    loadAndParseDrawingData(fileUrl: string, callback: any): void {
        jsonfile.readFile(fileUrl, (err: any, data: any) => {
            if (err) {
                callback(err);
            } else {
                this.parseDrawingData(data);
                callback(err, data);
            }
        });
    }

    parseDrawingData(data) {
        this.history = new WwDrawingHistory();
        let base_command = new WwDrawingHistoryBrushCommand('hard', new Point(0,0));

        data.units.forEach(unit_data => {
            let unit = new WwDrawingHistoryUnit();
            unit.layerId = unit_data.lid;
            unit.sessionId = unit_data.ses;
            unit.startTime = unit_data.start;
            unit.id = unit_data.id;


            unit_data.commands.forEach(command_data => {
                if (!command_data.t) {
                    command_data.t = 0;
                }
                let command = WwDrawingHistoryBrushCommand.clone(base_command, command_data);
                //console.log(command.toStringMin());
                unit.addCommand(command);
                base_command = command;
            });
            this.history.addUnit(unit);
        });
    }
}
