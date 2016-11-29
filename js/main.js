/*
var Game = function(){};

Game.prototype.init = function(){

}
Game.prototype.run = function(){
    console.log("blast them!!!");
}
*/

var Game = Class.extend({

    init: function(){
        this.canvas = new Canvas(640,480); // set resolution for workspace
    },

    run: function(){
        this.canvas.animate(function(){
            console.log("I have bad feeling about this...");
        });
        console.log("blast them!!!!");
    }
});
