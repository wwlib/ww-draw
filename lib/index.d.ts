/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 7/7/15.
 */
import Point from './point';
import Rect from './rect';
import Sprite from './WwSprite';
import Brush from './WwBrush';
import DrawingHistoryBrushCommand from './WwDrawingHistoryBrushCommand';
import DeviceInfo from './WwDeviceInfo';
import DrawingHistoryUnit from './WwDrawingHistoryUnit';
import DrawingBrushManager from './WwDrawingBrushManager';
import DrawingHistory from './WwDrawingHistory';
import DrawingHistoryRenderer from './WwDrawingHistoryRenderer';
import DrawingHistoryLoader from './WwDrawingHistoryLoader';
import RenderTextureContext from './WwRenderTextureContext';
declare var _default: {
    Point: typeof Point;
    Rect: typeof Rect;
    getTimer: any;
    Sprite: typeof Sprite;
    Brush: typeof Brush;
    DrawingHistoryBrushCommand: typeof DrawingHistoryBrushCommand;
    DeviceInfo: typeof DeviceInfo;
    DrawingHistoryUnit: typeof DrawingHistoryUnit;
    DrawingBrushManager: typeof DrawingBrushManager;
    DrawingHistory: typeof DrawingHistory;
    DrawingHistoryRenderer: typeof DrawingHistoryRenderer;
    DrawingHistoryLoader: typeof DrawingHistoryLoader;
    RenderTextureContext: typeof RenderTextureContext;
};
export default _default;
