

var Asteroid = Polygon.extend({

    init: function(p, s, x, y){
        this._super(p);

        this.x = x;
        this.y = y;

        this.scale(s);

        this.rotAngle = 0.01*(Math.random()*2 - 1);

        var r = 2*Math.PI*Math.random();
        var v = Math.random()*4 + 1;
        this.vel ={
            x: v*Math.cos(r),
            y: v*Math.sin(r)
        }
    },

    update: function(){
        this.x += this.vel.x;
        this.y += this.vel.y;
        this.rotate(this.rotAngle);
    },

    draw: function(ctx){
        ctx.drawPolygon(this, this.x, this.y);
    }
});
