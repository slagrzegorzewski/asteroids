var InputHandler = Class.extend({

    init: function(keys){ // left: 37, up: 38
        this.keys = {};
        this.down = {};
        this.pressed = {};

        for(key in keys){
            this.keys[code] = key;
            this.down[key] = false;
            this.pressed[key] = false;
        }

        var self = this;
        document.addEventListener("keydown", function(eve){
            if (self.keys[eve.keyCode]){
                self.down[self.keys[evt.keyCode]] = true;
            }
        });
        document.addEventListener("keyup", function(eve){

        });
    }
})
