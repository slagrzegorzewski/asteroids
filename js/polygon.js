console.log("test polygon");

var Polygon = Class.extend({

    init: function(p){
            this.points = p.slice(0);
    },
    // rotate function for asteroid
    rotate: function(theta){
        var cs = Math.cos(theta);
        var sn = Math.sin(theta);

        for(var i=0, len = this.points.length; i < len; i += 2){
            var x = this.points[i];
            var y = this.points[i+1];

            // math - raotating
            this.points[i] = cs*x - sn*y;
            this.points[i+1] = sn*x + cs*y;
        }
    },
    scale: function(c){
        for(var i = 0, len = this.points.length; i < len; i++){
            this.points[i] *= c;
        }
    },

    hasPoint: function(ox, oy, x, y){

    }
});
