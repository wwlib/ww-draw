"use strict";
/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 8/24/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const WwDrawingHistory_1 = require("./WwDrawingHistory");
const WwDrawingHistoryUnit_1 = require("./WwDrawingHistoryUnit");
const WwDrawingHistoryBrushCommand_1 = require("./WwDrawingHistoryBrushCommand");
const Point_1 = require("./Point");
const jsonfile = require('jsonfile');
class WwDrawingHistoryLoader {
    constructor() {
        this.history = null;
    }
    loadAndParseDrawingData(fileUrl, callback) {
        jsonfile.readFile(fileUrl, (err, data) => {
            if (err) {
                callback(err);
            }
            else {
                this.parseDrawingData(data);
                callback(err, data);
            }
        });
    }
    parseDrawingData(data) {
        this.history = new WwDrawingHistory_1.WwDrawingHistory();
        let base_command = new WwDrawingHistoryBrushCommand_1.WwDrawingHistoryBrushCommand('hard', new Point_1.Point(0, 0));
        data.units.forEach(unit_data => {
            let unit = new WwDrawingHistoryUnit_1.WwDrawingHistoryUnit();
            unit.layerId = unit_data.lid;
            unit.sessionId = unit_data.ses;
            unit.startTime = unit_data.start;
            unit.id = unit_data.id;
            unit_data.commands.forEach(command_data => {
                if (!command_data.t) {
                    command_data.t = 0;
                }
                let command = WwDrawingHistoryBrushCommand_1.WwDrawingHistoryBrushCommand.clone(base_command, command_data);
                //console.log(command.toStringMin());
                unit.addCommand(command);
                base_command = command;
            });
            this.history.addUnit(unit);
        });
    }
}
exports.WwDrawingHistoryLoader = WwDrawingHistoryLoader;
//# sourceMappingURL=WwDrawingHistoryLoader.js.map