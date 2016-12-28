console.log("gamestate");

// asteroids points to draw

var AsteroidSize = 8;

var GameState = State.extend({

    init: function(game){
        this._super(game);
        this.canvasWidth = game.canvas.ctx.width;
        this.canvasHeight = game.canvas.ctx.height;

        this.ship = new Ship(Points.SHIP, Points.FLAMES, 2, 0, 0);
        this.ship.maxX = this.canvasWidth;
        this.ship.maxY = this.canvasHeight;

        this.lives = 3;
        this.lifePolygon = new Polygon(Points.SHIP);
        this.lifePolygon.scale(1.5);
        this.lifePolygon.rotate(-Math.PI/2);
        this.gameOver = false;

        this.score = 0;
        this.lvl = 0;

        this.generateLVL();

    },

    generateLVL: function(){
        var num = Math.round(10 * Math.atan(this.lvl / 25)) + 4;

        this.ship.x = this.canvasWidth/2;
        this.ship.y = this.canvasHeight/2;

        this.bullets = [];
        this.asteroids = [];
        for (var i = 0; i < num; i++){
            var n = Math.round(Math.random() * (Points.ASTEROIDS.length - 1));

            var x = 0, y = 0;
            if(Math.random() > 0.5){
                x = Math.random() * this.canvasWidth;
            }
            else{
                y = Math.random() * this.canvasHeight;
            }

            var astr = new Asteroid(Points.ASTEROIDS[n], AsteroidSize, x, y); // new asteroid 1: points, 2: scale, 3: x, 4: y
            astr.maxX = this.canvasWidth;
            astr.maxY = this.canvasHeight;

            this.asteroids.push(astr);
        }
    },
    //key options for ship
    handleInputs: function(input){
        if(!this.ship.visible){
            if(input.isPressed("spacebar")){
                this.ship.visible = true;
            }
            return;
        }
        if(input.isDown("right")){
            this.ship.rotate(0.06);
        }
        if(input.isDown("left")){
            this.ship.rotate(-0.06);
        }
        if(input.isDown("up")){
            this.ship.addVel();
        }
        if(input.isPressed("spacebar")){
            this.bullets.push(this.ship.shoot());
        }
    },
    update: function(){
        for (var i = 0, len = this.asteroids.length; i < len; i++){
            var a = this.asteroids[i];
            a.update();
            //collide system and reset ship position.
            if(this.ship.collide(a)){
                this.ship.x = this.canvasWidth/2;
                this.ship.y = this.canvasHeight/2;

                this.ship.vel = {
                    x: 0,
                    y: 0
                }
                this.lives--;
                if(this.lives <= 0){
                    this.gameOver = true;
                }
                this.ship.visible = false;

                console.log("collide");
            }

            for(j = 0, lenBullet = this.bullets.length; j < lenBullet; j++){
                var b = this.bullets[j];
                if(a.hasPoint(b.x, b.y)){
                    this.bullets.splice(j, 1);
                    lenBullet--;
                    j--;
                    switch (a.size){
                        case AsteroidSize:
                            this.score += 20;
                            break;
                        case AsteroidSize/2:
                            this.score += 50;
                            break;
                        case AsteroidSize/4:
                            this.score += 100;
                            break;
                    }

                    if(a.size > AsteroidSize/4){
                        for (var k = 0; k < 2; k++){
                            var n = Math.round(Math.random() * (Points.ASTEROIDS.length - 1));
                            var astr = new Asteroid(Points.ASTEROIDS[n], a.size/2, a.x, a.y); // new asteroid 1: points, 2: scale, 3: x, 4: y
                            astr.maxX = this.canvasWidth;
                            astr.maxY = this.canvasHeight;

                            this.asteroids.push(astr);
                            len++;
                        }
                    }
                    this.asteroids.splice(i, 1);
                    len--;
                    i--;
                }
            }
        }
        for (var i = 0, len = this.bullets.length; i < len; i++){
            var b = this.bullets[i];
            b.update();
            if (b.shallRemove){
                this.bullets.splice(i, 1);
                len--;
                i--;
            }
        }
        this.ship.update();

        if(this.asteroids.length === 0){
            this.lvl++;
            this.generateLVL();
        }
    },
    // refresh context and draw asteroid
    render: function(ctx){
        ctx.clearAll();

        ctx.vectorText(this.score, 3, 15, 20)
        for(var i = 0; i < this.lives; i++){
            ctx.drawPolygonShip(this.lifePolygon, 20 + 30 * i, 60);
        }
        for (var i = 0, len = this.asteroids.length; i < len; i++){
            this.asteroids[i].draw(ctx);
        }
        for (var i = 0, len = this.bullets.length; i < len; i++){
            this.bullets[i].draw(ctx);
        }
        this.ship.draw(ctx);
    }
});
