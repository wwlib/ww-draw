"use strict";
/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 8/24/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const WwDrawingHistory_1 = require("./WwDrawingHistory");
const WwDrawingHistoryUnit_1 = require("./WwDrawingHistoryUnit");
const WwDrawingHistoryBrushCommand_1 = require("./WwDrawingHistoryBrushCommand");
const point_1 = require("./point");
class WwDrawingHistoryLoader {
    constructor() {
        this.history = null;
    }
    parseDrawingData(data) {
        this.history = new WwDrawingHistory_1.default();
        let base_command = new WwDrawingHistoryBrushCommand_1.default('hard', new point_1.default(0, 0));
        data.units.forEach(unit_data => {
            let unit = new WwDrawingHistoryUnit_1.default();
            unit.layerId = unit_data.lid;
            unit.sessionId = unit_data.ses;
            unit.startTime = unit_data.start;
            unit.id = unit_data.id;
            unit_data.commands.forEach(command_data => {
                if (!command_data.t) {
                    command_data.t = 0;
                }
                let command = WwDrawingHistoryBrushCommand_1.default.clone(base_command, command_data);
                //console.log(command.toStringMin());
                unit.addCommand(command);
                base_command = command;
            });
            this.history.addUnit(unit);
        });
    }
}
exports.default = WwDrawingHistoryLoader;
//# sourceMappingURL=WwDrawingHistoryLoader.js.map