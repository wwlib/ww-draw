/**
 * Created by andrew on 8/13/15.
 */

//import WwDrawingBrushManager from './ww-drawing-brush-manager';

import WwDrawingHistoryBrushCommand from './ww-drawing-history-brush-command';
import Point from './point.js';

class WwDrawingHistoryRenderer {
    constructor(history, context, start_time=0, end_time=0) {
        this.history = history;
        this.context = context;
        this.startTime = start_time;
        this.endTime = end_time;
        this.time = this.startTime;

        this.mergedCommandsUnit = this.history.concatAllCommands();
    }

    get ended() {
        return !this.mergedCommandsUnit.hasNext();
    }

    renderCommand(command) {

        if (command.prevCommand) {
            let draw_distance = command.lineLength - command.prevCommand.lineLength;
            let draw_steps = (draw_distance / 2.0) + 1.0;

            for (let i = draw_steps; i > 0; i--) {
                let interpolationFactor = i / draw_steps;

                let temp_command = WwDrawingHistoryBrushCommand.clone(command);
                let temp_point = Point.interpolate(command.prevCommand.location, command.location, interpolationFactor);
                temp_command.location = temp_point;
                temp_command.generatedCommand = true;
                this.brush = temp_command.brush;
                if (this.brush) {
                    this.brush.draw(this.context);
                }
            }
        } else { //DOT
            this.brush = command.brush; //WwDrawingBrushManager.instance.getBrushFromBrushId(command.brushId);
            if (this.brush) {
                this.brush.draw(this.context);
            }
        }
    }

    renderHistory() {
        this.mergedCommandsUnit.commands.forEach(command => {
            this.renderCommand(command);
        });
    }

    renderHistoryWithDuration(duration) {
        //console.log(`renderHistoryWithDuration: ${duration}, time: ${this.time}`);
        this.renderHistoryWithTimeRange(this.time, this.time + duration);
    }

    renderHistoryWithTimeRange(start_time, end_time) {

        while (this.mergedCommandsUnit.hasNextInTimeRange(start_time, end_time)) {
            this.renderCommand(this.mergedCommandsUnit.nextInTimeRange(start_time, end_time));
        }

        this.time = end_time;
    }
}

export default WwDrawingHistoryRenderer;
