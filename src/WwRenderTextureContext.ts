export default class WwRenderTextureContext {

    public renderer: any; //PIXI.WebGLRenderer;
    public rt: any; //PIXI.RenderTexture;

    constructor(renderer: any, rt: any) { // PIXI.WebGLRenderer, rt: PIXI.RenderTexture) {
        this.renderer = renderer;
        this.rt = rt;
    }

    render(container: any) :void { // PIXI.Container) :void {
        this.renderer.render(container, this.rt, false);
    }
}
