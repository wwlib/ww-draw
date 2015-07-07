/**
 * Created by andrew on 7/7/15.
 */

class GetTimer {
    constructor() {
    }

    static getTimer() {
        return new Date().getTime();
    }
}

export default GetTimer.getTimer;