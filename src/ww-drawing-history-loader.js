/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 8/24/15.
 */

import WwDrawingHistory from './ww-drawing-history';
import WwDrawingHistoryUnit from './ww-drawing-history-unit';
import WwDrawingHistoryBrushCommand from './ww-drawing-history-brush-command';
import Point from './point';

class WwDrawingHistoryLoader {
    constructor() {
        this.history = null;

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

export default WwDrawingHistoryLoader;
