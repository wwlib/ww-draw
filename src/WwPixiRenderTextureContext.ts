import PIXI = require('pixi.js');

export default class WwPixiRenderTextureContext {

    public renderer: PIXI.WebGLRenderer;
    public rt: PIXI.RenderTexture;

    constructor(renderer: PIXI.WebGLRenderer, rt: PIXI.RenderTexture) {
        this.renderer = renderer;
        this.rt = rt;
    }

    render(container: PIXI.Container) :void {
        this.renderer.render(container, this.rt, false);
    }
}
