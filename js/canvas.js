var Canvas = Class.extend({

    init: function(width, height){
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;

        this.ctx = (function(ctx) {
            ctx.width = ctx.canvas.width;
            ctx.height = ctx.canvas.height;

            return ctx;
        })(this.canvas.getContext("2d"));

        document.body.appendChild(this.canvas); //put canvas in body element
    },
    // reqest for browser to refresh animation
    animate: function(loop){
        var refre = (function(){
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestWindowFrame ||
                // function for operation frequency
                function(cb, el){
                    window.setTimeout(cb, 1000/60);
                }
        })();

        var self = this;
        var l = function(){
            loop();
            refre(l, self.canvas);
        }
        refre(l, self.canvas);
    }
});
