"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WwPixiRenderTextureContext {
    constructor(renderer, rt) {
        this.renderer = renderer;
        this.rt = rt;
    }
    render(container) {
        this.renderer.render(container, this.rt, false);
    }
}
exports.default = WwPixiRenderTextureContext;
//# sourceMappingURL=WwPixiRenderTextureContext.js.map