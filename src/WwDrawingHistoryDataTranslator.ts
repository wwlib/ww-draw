/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 8/13/15.
 */

import WwDrawingHistoryBrushCommand from './WwDrawingHistoryBrushCommand';
import WwDeviceInfo from './WwDeviceInfo';
import Point from './Point';

class WwDrawingHistoryDataTranslator {

    public previousCommandData: WwDrawingHistoryBrushCommand;
    public drawingScale: number;

    constructor() {
        this.previousCommandData = new WwDrawingHistoryBrushCommand("", null, 1, 0, 0, 0, "", 0, -1,"", false);
        this.drawingScale = 1.0;
    }

    generateCommandWithDataObject(data_object)
    {
        let command: WwDrawingHistoryBrushCommand = new WwDrawingHistoryBrushCommand("", null);
        command.brushId = this.previousCommandData.updateBrushId(data_object.bid);
        command.unitId = this.previousCommandData.updateUnitId(data_object.uid);
        command.layerId = this.previousCommandData.updateLayerId(data_object.lid);
        command.executionTime = this.previousCommandData.updateExecutionTime(data_object.t);
        command.uintColor = this.previousCommandData.updateUintColor(data_object.c);
        command.brushScale = this.previousCommandData.updateBrushScale(data_object.s);
        command.brushBlendMode = this.previousCommandData.updateBlendMode(data_object.bm);
        command.brushAlpha = this.previousCommandData.updateBrushAlpha(data_object.a);
        command.brushRotation = this.previousCommandData.updateBrushRotation(data_object.r);
        let _x = this.previousCommandData.updateX(data_object.x);
        let _y = this.previousCommandData.updateY(data_object.y);

        _x = Math.floor(_x * 10)/10;
        _y = Math.floor(_y * 10)/10;

        let _scale = WwDeviceInfo.instance.assetScaleFactor / this.drawingScale;//  1.0;  // 0.5 for iPad 2
        command.location = new Point(_x * _scale, _y * _scale);

        return command
    }

    generateDataObjectWithCommand(command) {
        var data_object = {};

        this.previousCommandData.checkRedundancyOfBrushId(data_object, "bid", command.brushId);
        this.previousCommandData.checkRedundancyOfUnitId(data_object, "uid", command.unitId);
        this.previousCommandData.checkRedundancyOfLayerId(data_object, "lid", command.layerId);
        this.previousCommandData.checkRedundancyOfExecutionTime(data_object, "t", command.executionTime);
        this.previousCommandData.checkRedundancyOfUintColor(data_object, "c", command.uintColor);
        this.previousCommandData.checkRedundancyOfBrushScale(data_object, "s", command.brushScale);
        this.previousCommandData.checkRedundancyOfBrushBlendMode(data_object, "bm", command.brushBlendMode);
        this.previousCommandData.checkRedundancyOfBrushAlpha(data_object, "a", command.brushAlpha);
        this.previousCommandData.checkRedundancyOfBrushRotation(data_object, "r", command.brushRotation);
        this.previousCommandData.checkRedundancyOfGeneratedCommand(data_object, "g", command.generatedCommand);
        this.previousCommandData.checkRedundancyOfX(data_object, "x", command.location.x);
        this.previousCommandData.checkRedundancyOfY(data_object, "y", command.location.y);

        return data_object;
    }
}

export default WwDrawingHistoryDataTranslator;

/*
package org.wwlib.drawing
{
import flash.geom.Point;

import org.wwlib.utils.WwDeviceInfo;

    public class WwDrawingHistoryDataTranslator
{
    private var __previousCommandData:WwDrawingHistoryBrushCommand;
    private var __drawingScale:Number;

    public function WwDrawingHistoryDataTranslator()
    {
        __previousCommandData = new WwDrawingHistoryBrushCommand("",null,1,0,0,"",-1,0,-1,"");
        __drawingScale = 1.0;
    }

    public function generateCommandWithDataObject(data_object:Object):WwDrawingHistoryBrushCommand
    {
        var command:WwDrawingHistoryBrushCommand = new WwDrawingHistoryBrushCommand("");
        command.brushID = __previousCommandData.updateBrushId(data_object.bid);
        command.unitID = __previousCommandData.updateUnitID(data_object.uid);
        command.layerID = __previousCommandData.updateLayerID(data_object.lid);
        command.executionTime = __previousCommandData.updateExecutionTime(data_object.t);
        command.uintColor = __previousCommandData.updateUintColor(data_object.c);
        command.brushScale = __previousCommandData.updateBrushScale(data_object.s);
        command.brushBlendMode = __previousCommandData.updateBlendMode(data_object.bm);
        command.brushAlpha = __previousCommandData.updateBrushAlpha(data_object.a);
        command.brushRotation = __previousCommandData.updateBrushRotation(data_object.r);
        var _x:Number = __previousCommandData.updateX(data_object.x);
        var _y:Number = __previousCommandData.updateY(data_object.y);

        _x = Math.floor(_x * 10)/10;
        _y = Math.floor(_y * 10)/10;

        var _scale:Number = WwDeviceInfo.instance.assetScaleFactor / __drawingScale;//  1.0;  // 0.5 for iPad 2
        command.location = new Point(_x * _scale, _y * _scale);

        return command
    }

    public function generateDataObjectWithCommand(command:WwDrawingHistoryBrushCommand):Object
    {
        var data_object:Object = {};

        __previousCommandData.checkRedundancyOfBrushID(data_object, "bid", command.brushID);
        __previousCommandData.checkRedundancyOfUnitID(data_object, "uid", command.unitID);
        __previousCommandData.checkRedundancyOfLayerID(data_object, "lid", command.layerID);
        __previousCommandData.checkRedundancyOfExecutionTime(data_object, "t", command.executionTime);
        __previousCommandData.checkRedundancyOfUintColor(data_object, "c", command.uintColor);
        __previousCommandData.checkRedundancyOfBrushScale(data_object, "s", command.brushScale);
        __previousCommandData.checkRedundancyOfBrushBlendMode(data_object, "bm", command.brushBlendMode);
        __previousCommandData.checkRedundancyOfBrushAlpha(data_object, "a", command.brushAlpha);
        __previousCommandData.checkRedundancyOfBrushRotation(data_object, "r", command.brushRotation);
        __previousCommandData.checkRedundancyOfGeneratedCommand(data_object, "g", command.generatedCommand);
        __previousCommandData.checkRedundancyOfX(data_object, "x", command.location.x);
        __previousCommandData.checkRedundancyOfY(data_object, "y", command.location.y);

        return data_object;
    }

    public function get drawingScale():Number
    {
        return __drawingScale;
    }

    public function set drawingScale(value:Number):void
    {
        __drawingScale = value;
    }


}
}
*/
