/**
 * Created by andrew on 7/7/15.
 */

var should = require("should");

//import {Point, getTimer} from '../lib/main';
var Point = module.require("../lib/main").Point;


describe('point', function() {

    it('should have x and y properties == (0,0)', function() {
        var p1 = new Point();
        p1.x.should.equal(0);
        p1.y.should.equal(0);
    });
});


















