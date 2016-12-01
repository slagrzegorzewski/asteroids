console.log("gamestate");

// asteroids points to draw
var Points = {
    ASTEROIDS: [
        [-4,-2,-2,-4,0,-2,2,-4,4,-2,3,0,4,2,1,4,-2,4,-4,2,-4,-2],
        [-4,-2,-2,-4,0,-3,2,-4,4,-2,2,-1,4,1,2,4,-1,3,-2,4,-4,2,-3,0,-4,-2],
        [-4,-1,-1,-4,2,-4,4,-1,4,1,2,4,0,4,0,2,-2,4,-4,1,-2,0,-4,-1],
        [-4,-1,-1,-4,2,-4,4,-1,4,1,2,4,0,4,0,2,-2,4,-4,1,-2,0,-4,-1],
        [-2,-4,2,-4,4,-2,4,2,2,4,-2,4,-4,2,-4,-2,-2,-4]
    ]
}

var GameState = State.extend({

    init: function(game){
        this._super(game);
        // save place for draw asteroids
        var n = Math.round(Math.random() * (Points.ASTEROIDS.length - 1));
        this.astr = new Asteroid(Points.ASTEROIDS[n], 10, 100, 100); // new asteroid 1: points, 2: scale, 3: x, 4: y
        this.astr.maxX = game.canvas.ctx.width;
        this.astr.maxY = game.canvas.ctx.height;
    },

    update: function(){
        this.astr.update();
    },
    // refresh context and draw asteroid
    render: function(ctx){
        ctx.clearAll();

        this.astr.draw(ctx);
    }
});
