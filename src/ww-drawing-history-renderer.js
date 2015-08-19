/**
 * Created by andrew on 8/13/15.
 */

class WwDrawingHistoryRenderer {
    constructor(history, context, start_time=0, end_time=0) {
        this.history = history;
        this.context = context;
        this.startTime = start_time;
        this.endTime = end_time;
        this.time = this.startTime;

        this.mergedCommandsUnit = this.history.concatAllCommands();
    }

    set testBrush(brush) {
        this.brush = brush;
    }

    get ended() {
        return !this.mergedCommandsUnit.hasNext();
    }

    renderCommand(command) {
        if (this.brush) {
            this.brush.x = command.location.x;
            this.brush.y = command.location.y;
            this.brush.draw(this.context);
        } else {
            console.log(`renderCommand: brush is undefined`);
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
