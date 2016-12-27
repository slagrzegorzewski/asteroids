// here we are creating area for action
var Canvas = Class.extend({
    //
    init: function(width, height){
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;

        this.ctx = (function(ctx) {
            ctx.width = ctx.canvas.width;
            ctx.height = ctx.canvas.height;

            ctx.ACODE = "A".charCodeAt(0);
            ctx.ZCODE = "0".charCodeAt(0);

            ctx.drawPolygon = function(p, x, y){
                p = p.points;

                this.beginPath();
                this.moveTo(p[0] + x, p[1] + y);
                for(var i = 2, len = p.length; i < len; i += 2){
                    this.lineTo(p[i] + x, p[i + 1] + y);
                }
                this.strokeStyle = "#FFF";
                this.stroke();
            };

            ctx.drawPolygonShip = function(p, x, y){
                p = p.points;

                this.beginPath();
                this.moveTo(p[0] + x, p[1] + y);
                for(var i = 2, len = p.length; i < len; i += 2){
                    this.lineTo(p[i] + x, p[i + 1] + y);
                }
                this.strokeStyle = "#F00";
                this.stroke();
            };

            ctx.vectorText = function(text, s, x, y){
                text = text.toString().toUpperCase();
                var step = s * 6;

                x = x + 0.5;
                y = y + 0.5;

                for(var i = 0, len = text.length; i < len; i++){
                    var ch = text.charCodeAt(i);

                    var p;
                    if(ch - this.ACODE >= 0){
                        p = Points.LETTERS[ch - this.ACODE];
                    }
                    else{
                        p = Points.NUMBERS[ch - this.ZCODE];
                    }
                    this.beginPath();
                    this.moveTo(p[0] * s + x, p[1] * s + y);
                    for(var j = 2, len2 = p.length; j < len2; j += 2){
                        this.lineTo(p[j] * s + x, p[j + 1] * s + y);
                    }
                    this.strokeStyle = "#00FF00";
                    this.stroke();
                    x = x + step;
                }
            };

            ctx.clearAll = function(){
                this.clearRect(0, 0, this.width, this.height);
            };

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
