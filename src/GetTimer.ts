/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 7/7/15.
 */

class GetTimer {

    static getTimer() {
        return new Date().getTime();
    }
}

let _getTimer: any = GetTimer.getTimer

export  { _getTimer as getTimer };
