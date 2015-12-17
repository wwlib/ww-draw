/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 8/13/15.
 */

import WwDrawingHistoryBrushCommand from './ww-drawing-history-brush-command';
import Point from './point.js';
import Rect from './rect';

class WwDrawingHistoryRenderer {
    constructor(history, context, bounding_rect=null, center_drawing=false, scale=null, start_time=0, end_time=0) {
        this.history = history;
        this.context = context;
        this.boundingRect = bounding_rect;
        if (this.boundingRect) {
            this.x = this.boundingRect.left;
            this.y = this.boundingRect.top;
            this.width = this.boundingRect.width;
            this.height = this.boundingRect.height;
        }
        this.centerDrawing = center_drawing;
        this.startTime = start_time;
        this.endTime = end_time;
        this.time = this.startTime;

        this.mergedCommandsUnit = this.history.concatAllCommands();
        if (this.boundingRect) {
            this.mergedCommandsUnit.shiftOriginToMinXY();
            this.mergedCommandsUnit.resetBoundingRect();
        }

        //console.log(`history bounds: ${this.history.boundingRect.toString()}`);
        //console.log(`merged unit bounds: ${this.mergedCommandsUnit.boundingRect.toString()}`);
        //console.log(`${this.mergedCommandsUnit.toString()}`);

        if (scale) {
            this.scale = scale;
        } else {
            this.scale = 1.0;
            if (this.boundingRect && this.mergedCommandsUnit && this.mergedCommandsUnit.boundingRect) {
                try {
                    if (this.mergedCommandsUnit.boundingRect.width > this.mergedCommandsUnit.boundingRect.height) {
                        if (this.boundingRect.width < this.mergedCommandsUnit.boundingRect.width) {
                            this.scale = this.boundingRect.width / this.mergedCommandsUnit.boundingRect.width;
                        }
                    } else {
                        if (this.boundingRect.height < this.mergedCommandsUnit.boundingRect.height) {
                            this.scale = this.boundingRect.height / this.mergedCommandsUnit.boundingRect.height;
                        }
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        }
        console.log(` scale: ${this.scale}`);

        this.offset = new Point();

        if (this.boundingRect && this.mergedCommandsUnit && this.mergedCommandsUnit.boundingRect) {
            //console.log(` updating offset: `);
            try {
                this.offset = new Point(this.boundingRect.left - this.mergedCommandsUnit.boundingRect.left, this.boundingRect.top - this.mergedCommandsUnit.boundingRect.top);

                if (this.centerDrawing) {
                    let scaled_drawing_width = this.mergedCommandsUnit.boundingRect.width * this.scale;
                    let center_x_offset = (this.boundingRect.width - scaled_drawing_width) / 2;
                    let scaled_drawing_height = this.mergedCommandsUnit.boundingRect.height * this.scale;
                    let center_y_offset = (this.boundingRect.height - scaled_drawing_height) / 2;
                    //console.log(` center_x_offset: ${center_x_offset}, ${this.boundingRect.width} - ${scaled_drawing_width}`);
                    //console.log(` center_y_offset: ${center_y_offset}, ${this.boundingRect.width} - ${scaled_drawing_height}`);
                    this.offset.x += center_x_offset;
                    this.offset.y += center_y_offset;
                }
            } catch (e) {
                console.log(e);
            }
        }

        //if (this.boundingRect) {
        //    console.log(` bounding rect: ${this.boundingRect.toString()}`);
        //}
        //console.log(` merged unit bounding rect: ${this.mergedCommandsUnit.boundingRect.toString()}`);
        //console.log(` offset: ${this.offset.toString()}`);

    }

    get ended() {
        return !this.mergedCommandsUnit.hasNext();
    }

    renderCommand(command) {

        command.offset = this.offset;
        command.scale = this.scale;
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
