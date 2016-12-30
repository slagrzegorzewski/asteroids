// States for game
var States = {
    NO_CHANGE: 0,
    MENU: 1,
    GAME: 2,
    END: 3
}
// making some place for game - canvas and drawing style for elements
var Game = Class.extend({

    init: function(){
        this.canvas = new Canvas(800,600); // set resolution for workspace

        this.input = new InputHandler({
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            spacebar: 32,
            enter: 13
        })

//        this.canvas.ctx.strokeStyle = "#fff";

        this.currentState = null;
        this.stateVars = {
            score: 0
        }
        this.nextState = States.MENU;
    },

    run: function(){
        var self = this;
        this.canvas.animate(function(){
            if(self.nextState !== States.NO_CHANGE){
                switch(self.nextState){
                        case States.MENU:
                        self.currentState = new MenuState(self);
                        break;
                        case States.GAME:
                        self.currentState = new GameState(self);
                        break;
                        case States.END:
                        self.currentState = new EndState(self);
                        break;
                }
                self.nextState = States.NO_CHANGE;
            }

            self.currentState.handleInputs(self.input);
            self.currentState.update();
            self.currentState.render(self.canvas.ctx);
//            console.log("I have bad feeling about this...");
        });
//        console.log("blast them!!!!");
    }
});
