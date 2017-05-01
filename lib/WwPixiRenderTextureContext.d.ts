import PIXI = require('pixi.js');
export default class WwPixiRenderTextureContext {
    renderer: PIXI.WebGLRenderer;
    rt: PIXI.RenderTexture;
    constructor(renderer: PIXI.WebGLRenderer, rt: PIXI.RenderTexture);
    render(container: PIXI.Container): void;
}
