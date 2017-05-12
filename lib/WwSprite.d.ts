/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 7/7/15.
 */
import { WwRenderTextureContext } from './WwRenderTextureContext';
/**
 * @author Andrew Rapo (andrew@worthwhilegames.org)
 * @license MIT
 */
export declare class WwSprite {
    static BASE_SCALE_FACTOR: number;
    static SPRITE_STAGE: any;
    x: number;
    y: number;
    mode: string;
    width: number;
    height: number;
    pivotX: number;
    pivotY: number;
    scale: number;
    rotation: number;
    alpha: number;
    sourceX: number;
    sourceY: number;
    img: any;
    pixijsSprite: any;
    scaleFactor: number;
    url: string;
    PIXI: any;
    private _onReadyCallback;
    constructor(x?: number, y?: number, mode?: string, PIXI?: any);
    toString(): string;
    loadImageWithURL(url: any): void;
    loadImageWithURLAndCallback(url: any, callback: any): void;
    onReadyCallback: any;
    onReady(): void;
    draw(context: WwRenderTextureContext | CanvasRenderingContext2D): void;
    fill(context: any): void;
    centerPivot(): void;
    log(msg: any): void;
}
