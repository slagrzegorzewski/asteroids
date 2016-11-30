console.log("test polygon");

var Polygon = Class.extend({

    init: function(p){
            this.points = p.slice(0);
    },

    rotate: function(theta){
    },

    scale: function(c){
        for(var i = 0, len = this.points.length; i < len; i++){
            this.points[i] *= c;
        }
    },

    hasPoint: function(ox, oy, x, y){

    }
});
