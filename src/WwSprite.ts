/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 7/7/15.
 */

 import { WwRenderTextureContext } from './WwRenderTextureContext';

/**
 * @author Andrew Rapo (andrew@worthwhilegames.org)
 * @license MIT
 */

export class WwSprite {

    static BASE_SCALE_FACTOR: number = 0.5;
    static SPRITE_STAGE: any = {};

    public x: number;
    public y: number;
    public mode:string;
    public width: number;
    public height: number;
    public pivotX: number;
    public pivotY: number;
    public scale: number;
    public rotation: number;
    public alpha: number;

    public sourceX: number;
    public sourceY: number;

    public img = null;
    public pixijsSprite = null;
    public scaleFactor = WwSprite.BASE_SCALE_FACTOR;
    public url: string;
    public PIXI: any;

    private _onReadyCallback: any;

    constructor(x = 0, y = 0, mode='canvas', PIXI?: any) {
        this.x = x;
        this.y = y;
        this.mode = mode;
        this.PIXI = PIXI;
        this.width = 0;
        this.height = 0;
        this.pivotX = 0;
        this.pivotY = 0;
        this.scale = 1.0;
        this.rotation = 0;
        this.alpha = 1.0;

        this.sourceX = 0;
        this.sourceY = 0;

        this.img = null;
        this.pixijsSprite = null;
        this.scaleFactor = WwSprite.BASE_SCALE_FACTOR;
        this.url = "";

        this._onReadyCallback = null;
    }

    toString() {
        return `WwSprite: (${this.x}, ${this.y}): url: ${this.url}, mode: ${this.mode}`;
    }

    loadImageWithURL(url) {
        this.loadImageWithURLAndCallback(url, null);
    }

    loadImageWithURLAndCallback(url, callback) {
        //this.log(`WwSprite: load: ${url}`);

        this.url = url;
        this._onReadyCallback = callback;

        if ((this.url != null) && (this.url != "")) {
            this.url = url;

            if (this.mode === 'canvas') {
                var temp_img = new Image();

                temp_img.onload = (e => {
                    //console.log(`Sprite: onLoad: ${e}`);
                    this.img = temp_img;
                    this.width = temp_img.width;
                    this.height = temp_img.height;

                    this.onReady();
                });

                temp_img.src = url;
            } else if (this.mode === 'pixijs') {
                if (!this.PIXI) {
                    console.log(`WwSprite: loadImageWithURLAndCallback: PIXI must be defined in 'pixijs' mode!`);
                } else {
                    let loader = new this.PIXI.loaders.Loader()
                        .add(url)
                        .once('complete', (loader, resources) =>
                        {
                            //console.log(`Load complete:`);
                            //console.log(this);
                            //console.log(resources);
                            this.pixijsSprite = this.PIXI.Sprite.fromImage(this.url);
                            this.onReady();
                        })
                        .load();
                }
            }
        } else {
            this.onReady();
        }
    }

    set onReadyCallback(callback)
    {
        this._onReadyCallback = callback;
    }

    // Override this
    onReady()
    {
        //this.log(`onReady:  ${this.url}`);
        if (this._onReadyCallback != null)
        {
            this._onReadyCallback(this);
        }

        this._onReadyCallback = null;
    }

    // draw(context: CanvasRenderingContext2D): void;
    // draw(context: WwRenderTextureContext): void;
    draw(context: WwRenderTextureContext | CanvasRenderingContext2D): void {
        if (context instanceof CanvasRenderingContext2D) {
            if (this.img) {
                context.globalAlpha = this.alpha;
                context.drawImage(
                    this.img,
                    this.sourceX,
                    this.sourceY,
                    this.width,
                    this.height,
                    this.x - (this.pivotX * this.scale),
                    this.y - (this.pivotY * this.scale),
                    this.width * this.scale,
                    this.height * this.scale
                );
            } else {
                this.fill(context);
            }
        } else if (context instanceof WwRenderTextureContext) {
            this.pixijsSprite.x = this.x;
            this.pixijsSprite.y = this.y;
            this.pixijsSprite.scale.x = this.scale;
            this.pixijsSprite.scale.y = this.scale;
            this.pixijsSprite.anchor.x = 0.5;
            this.pixijsSprite.anchor.y = 0.5;

            let container = new this.PIXI.Container();
            container.addChild(this.pixijsSprite);
            context.render(container);
        }
    }

    // draw(context) {
    //
    //     if (this.mode === 'canvas') {
    //
    //         if (this.img) {
    //             context.globalAlpha = this.alpha;
    //             context.drawImage(
    //                 this.img,
    //                 this.sourceX,
    //                 this.sourceY,
    //                 this.width,
    //                 this.height,
    //                 this.x - (this.pivotX * this.scale),
    //                 this.y - (this.pivotY * this.scale),
    //                 this.width * this.scale,
    //                 this.height * this.scale
    //             );
    //         } else {
    //             this.fill(context);
    //         }
    //     } else if (this.mode === 'pixijs') {
    //         //console.log(`WwSprite: pixijs: draw: ${this.x}, ${this.y}`);
    //         this.pixijsSprite.x = this.x;
    //         this.pixijsSprite.y = this.y;
    //         this.pixijsSprite.scale.x = this.scale;
    //         this.pixijsSprite.scale.y = this.scale;
    //         this.pixijsSprite.anchor.x = 0.5;
    //         this.pixijsSprite.anchor.y = 0.5;
    //
    //         let container = new PIXI.Container();
    //         container.addChild(this.pixijsSprite);
    //         context.render(container);
    //     }
    // }

    fill(context) {
        context.fillStyle = "#999999";
        context.fillRect(this.x, this.y, this.width, this.height);
    }

    centerPivot() {
        if (this.img)
        {
            //TODO: Assumes square image
            let brush_size = this.width * this.scale;
            let mid_point = brush_size / 2.0;

            this.pivotX = mid_point;
            this.pivotY = mid_point;
        }
    }

    log(msg) {
        console.log(`WwSprite: ${msg}`);
    }
}

/*
 package org.wwlib.starling
 {

 import flash.display.Bitmap;
 import flash.display.Loader;
 import flash.display.MovieClip;
 import flash.events.Event;
 import flash.net.URLRequest;
 import flash.system.ImageDecodingPolicy;
 import flash.system.LoaderContext;

 import org.wwlib.utils.WwDebug;

 import starling.display.Image;
 import starling.display.Sprite;


 public class WwSprite extends Sprite
 {
 public static var __baseScaleFactor:Number = 0.5;
 public static var FLASH_STAGE:flash.display.MovieClip;

 protected var __img:Image;
 protected var __x:int;
 protected var __y:int;
 protected var __bmp:Bitmap;
 protected var __debug:WwDebug = WwDebug.instance;
 protected var __scaleFactor:Number = WwSprite.__baseScaleFactor;
 protected var __url:String;

 protected var __onReadyCallback:Function;

 public function WwSprite()
 {

 }

 public function loadImage(url:String):void
 {
 __url = url;
 if ((__url != null) && (__url != ""))
 {
 // create a LoaderContext
 var loaderContext:LoaderContext = new LoaderContext();
 // specify async decoding
 loaderContext.imageDecodingPolicy = ImageDecodingPolicy.ON_LOAD;
 // create a Loader
 var loader:Loader = new Loader();
 // inform the Loader
 loader.contentLoaderInfo.addEventListener(Event.COMPLETE,onImageLoaded);
 loader.load( new URLRequest(url), loaderContext );
 }
 else
 {
 onReady();
 }
 }

 protected function onImageLoaded(event:Event):void
 {
 //__debug.msg("onImageLoaded: "+ __url);
 __bmp = event.target.content as Bitmap;
 removeChild(__img);
 __img = Image.fromBitmap(__bmp);
 resetScale();
 //__img.alpha = 0.5;
 addChild(__img);
 __bmp = null;
 onReady();
 }

 public function resetScale():void
 {
 __img.scaleX = __scaleFactor;
 __img.scaleY = __scaleFactor;
 }

 // Override this
 public function onReady():void
 {
 //__debug.msg("onReady: " + __url);
 if (__onReadyCallback != null)
 {
 __onReadyCallback(__url);
 }
 }

 public function set image(img:Image):void
 {
 __img = img;
 }

 public function get image():Image
 {
 return __img;
 }

 public function get url():String
 {
 return __url;
 }

 public function set onReadyCallback(f:Function):void
 {
 __onReadyCallback = f;
 }

 public function clearImg():void
 {
 removeChild(__img);
 __img = null;

 }

 public override function dispose():void
 {
 removeChild(__img);
 __img = null;
 super.dispose();
 }
 }

 }
 */
