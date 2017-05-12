/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 7/7/15.
 */

import Vector2 from './vector2';

export class Point extends Vector2 {

    constructor(x=0, y=0) {
        super(x, y);
        //this.x = x;
        //this.y = y;
    }

    toString() {
        return `(${this.x}, ${this.y})`;
    }

    static distance(point1, point2) {
        //let vec1 = new Vector2(point1.x, point1.y);
        //let diff = vec1.diff(point2); //Point can be used as an argument for diff

        let diff = point1.diff(point2);

        return diff.magnitude;
    }

    static interpolate(point1, point2, factor) {
            let dx = point1.x + (point2.x - point1.x) * factor;
            let dy = point1.y + (point2.y - point1.y) * factor;
            return new Point(dx, dy);
    }
}
