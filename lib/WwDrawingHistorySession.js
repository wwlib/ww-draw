"use strict";
/**
 * Created by andrew rapo (andrew@worthwhilegames.org) on 8/13/15.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class WwDrawingHistorySession {
    constructor() {
    }
}
exports.WwDrawingHistorySession = WwDrawingHistorySession;
/*

 package org.wwlib.drawing
 {
 public class WwDrawingHistorySession
 {
 private var __id:int;
 private var __authorID:String;
 private var __authorName:String;
 private var __timestamp:Number;
 private var __stats:WwDrawingHistoryStats;

 public function WwDrawingHistorySession(id=0, author_id=0, author_name="", _timestamp=0)
 {
 __id = id;
 __authorID = author_id;
 __authorName = author_name;
 __timestamp = _timestamp;
 if (__timestamp == 0)
 {
 __timestamp = new Date().time;
 }

 __stats = new WwDrawingHistoryStats();
 }

 public function get json():Object
 {
 var obj:Object = new Object();

 obj.id = id;
 obj.authorId = authorID;
 obj.authorName = authorName;
 obj.timestamp = timestamp;
 obj.stats = __stats.json;

 return obj;
 }

 public function setStatsWithJSON(obj:Object):void
 {
 __stats.units = obj.units;
 __stats.length = obj.length;
 __stats.time = obj.time;
 }

 public function get id():int
 {
 return __id;
 }

 public function set id(value:int):void
 {
 __id = value;
 }

 public function get authorID():String
 {
 return __authorID;
 }

 public function set authorID(value:String):void
 {
 __authorID = value;
 }

 public function get authorName():String
 {
 return __authorName;
 }

 public function set authorName(value:String):void
 {
 __authorName = value;
 }

 public function get timestamp():Number
 {
 return __timestamp;
 }

 public function set timestamp(value:Number):void
 {
 __timestamp = value;
 }

 public function get stats():WwDrawingHistoryStats
 {
 return __stats;
 }

 public function set stats(value:WwDrawingHistoryStats):void
 {
 __stats = value;
 }

 }
 }
 */
//# sourceMappingURL=WwDrawingHistorySession.js.map