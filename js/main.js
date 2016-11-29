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
        this.canvas = new Canvas(640,480);
    },

    run: function(){
        console.log("blast them!!!!");
    }
});
