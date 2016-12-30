var EndState = State.extend({

    init: function(game){
        this.game = game;
        this.hasEnterName = false;
        this.nick = "no name";
        this.score = game.stateVars.score;

        this.hiscores =[
            ["Szybki Edek", 5000],
            ["Arizona", 4000],
            ["Koksu", 1200],
            ["Bonus", 999]
        ];

        this.namefield = document.getElementById("namefield");
        this.namefield.value = "no name";
        this.namefield.focus();
        this.namefield.select();
    },

    handleInputs: function(input){
        if(this.hasEnterName){
            if(input.isPressed("spacebar")){
                this.game.nextState = States.MENU;
            }
        }
        else{
            if(input.isPressed("enter")){
                this.hasEnterName = true;
                this.nick = this.nick.replace(/[^a-zA-Z0-9\s]/g, "");
                this.hiscores.push([this.nick, this.score]);
                this.namefield.blur();

                this.hiscores.sort(function(a, b){
                    return b[1] - a[1];
                });
            }
        }
    },

    update: function(){
        if(!this.hasEnterName){
            this.namefield.focus();
            this.namefield.value = this.namefield.value.replace(/[^a-zA-Z0-9\s]/g, "");

            this.nick = this.namefield.value;
        }
    },

    render: function(ctx){
        ctx.clearAll();

        if(this.hasEnterName){

            ctx.vectorText("hiscore", 4, null, 150);
            for(var i = 0, len = this.hiscores.length; i < len; i++){
                var hs = this.hiscores[i];
                ctx.vectorText(hs[0], 2, 200, 200 + 25 * i);
                ctx.vectorText(hs[1], 2, 450, 200 + 25 * i, 10);
            }
            ctx.vectorText("press spacebar to continue", 2, null, 480);
        }
        else{
            ctx.vectorText("Thank U for playing", 5, null, 120);
            ctx.vectorText("nick", 3, null, 240);
            ctx.vectorText(this.nick, 4, null, 290);
            ctx.vectorText(this.score, 4, null, 380);
        }
    }
});
