console.log("gamestate");
var GameState = State.extend({

    init: function(game){
        this._super(game);

        this.astr = new Asteroid([-1, -1, 1, 1, -1, 1, -1, -1], 20, 100, 100);
    },

    update: function(){
    },

    render: function(ctx){
        ctx.clearAll();

        this.astr.draw(ctx);
    }
});
