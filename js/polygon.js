console.log("test polygon");

var Polygon = Class.extend({

    init: function(p){
            this.points = p.slice(0);
    },
    // rotate function for asteroid
    rotate: function(theta){
        var cs = Math.cos(theta),
            sn = Math.sin(theta);

        for(var i=0, len = this.points.length; i < len; i += 2){
            var x = this.points[i],
                y = this.points[i+1];

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
        var c = false,
            p = this.points,
            len = p.length;

        for(var i=0, j = len-2; i < len; i += 2){
            var px_1 = p[i] + ox,
                px_2 = p[j] + ox,
                py_1 = p[i+1] + oy,
                py_2 = p[j+1] + oy;

            if ( (py_1 > y != py_2 > y) &&
                 (x < (px_2 - px_1) *
                 (y - py_1) /
                 (py_2 - py_1) + px_1)){
                c = !c;
            }
            j = i;
        }
        return c;
    }
});
