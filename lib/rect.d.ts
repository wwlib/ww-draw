export declare class Rect {
    top: number;
    left: number;
    width: number;
    height: number;
    private _right;
    private _bottom;
    constructor(top?: number, left?: number, width?: number, height?: number);
    toString(): string;
    readonly right: number;
    readonly bottom: number;
    inBounds(point: any): boolean;
    expandToIncludePoint(point: any): void;
    expandToIncludeRect(rect: any): void;
}
