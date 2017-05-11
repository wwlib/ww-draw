/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 7/7/15.
 */
/**
 * ...
 * @author Andrew Rapo (andrew@worthwhilegames.org)
 * @license MIT
 */
import WwSprite from './WwSprite';
declare class WwBrush extends WwSprite {
    color: number;
    constructor(mode?: string, PIXI?: any);
    onReady(): void;
}
export default WwBrush;
