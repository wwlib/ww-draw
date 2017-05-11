"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WwRenderTextureContext {
    constructor(renderer, rt) {
        this.renderer = renderer;
        this.rt = rt;
    }
    render(container) {
        this.renderer.render(container, this.rt, false);
    }
}
exports.default = WwRenderTextureContext;
//# sourceMappingURL=WwRenderTextureContext.js.map