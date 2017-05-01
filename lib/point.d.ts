/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 7/7/15.
 */
import Vector2 from './vector2';
declare class Point extends Vector2 {
    constructor(x?: number, y?: number);
    toString(): string;
    static distance(point1: any, point2: any): any;
    static interpolate(point1: any, point2: any, factor: any): Point;
}
export default Point;
