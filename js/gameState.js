console.log("gamestate");
var GameState = State.extend({
    init: function(game){
        this._super(game);
    },

    update: function(){
        console.log("test2222");
    }
});
