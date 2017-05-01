/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 6/3/15.
 */
export default class Vector2 {
    static degrees: number;
    x: number;
    y: number;
    constructor(x: any, y: any);
    valid(): boolean;
    set(x: any, y: any): this;
    setWithVector(vector: any): this;
    add(vector: any): this;
    subtract(vector: any): this;
    diff(vector: any): Vector2;
    mult(vector: any): this;
    scale(scalar: any): this;
    div(scalar: any): this;
    dot(vector: any): number;
    min(vector: any): this;
    max(vector: any): this;
    lt(vector: any): boolean;
    gt(vector: any): boolean;
    readonly magnitude: number;
    normalize(): void;
    clone(): Vector2;
    toString(): string;
    horizontalAngle(): number;
    horizontalAngleDeg(): number;
    verticalAngle(): number;
    verticalAngleDeg(): number;
    rotate(angle: any): this;
    rotateDeg(angle: any): this;
    random(min: any, max: any): number;
    radian2degrees(rad: any): number;
    degrees2radian(deg: any): number;
}
