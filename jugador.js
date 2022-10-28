class Jugador {
    constructor(w, h, ctx, keys){

        this.ctx = ctx;
        this.canvasW = w;
        this.canvasH = h;
        this.keys = keys;
        
        this.x = this.canvasW * 0.03 //Anchura de la posición inicial.
        this.y0 = this.canvasH * 0.5 //Altura de la posición inicial. 
        
        this.y = this.y0;

        this.img = new Image();
        this.img.src = "assets/img/nave4.png";

        this.img.frames = 3;
        this.img.frameIndex = 0;

        this.w = 200;
        this.h = 60;
    
        this.vy = 1;
        
        this.setListener()
        this.dy = 0;

        
        this.topLimit = this.canvasH * 0.03;
        this.bottomLimit = this.canvasH - this.h - this.topLimit;

        this.bullets = []

        this.lastPress = 0;

    
    }

    // myListener() {
    //     this.now = Date.now();
    //     if (this.now - this.lastPress < 1000) return; // less than a second ago, stop
    //     this.lastPress = this.now;
    //     // continue..
    // }

    

    setListener(){
        
        document.onkeydown = function(event){
            if (event.keyCode === this.keys.ARROW_UP){
                this.dy = 3
                }
                else if (event.keyCode === this.keys.ARROW_DOWN){
                this.dy = -3
               }
                    else if (event.keyCode === this.keys.CONTROL){
            
                    this.fire()
                    
                    }

        }.bind(this) 

        

        document.onkeyup = function(event){
            if (event.keyCode === this.keys.ARROW_UP){
                this.dy = 0
                }
                else if (event.keyCode === this.keys.ARROW_DOWN){
                this.dy = 0
                }
        }.bind(this) 

    }
    

    dibujar(sumarFrames){
        this.ctx.drawImage(
            this.img,
            this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
            0,
            Math.floor(this.img.width / this.img.frames),
            this.img.height,
            this.x,
            this.y,
            this.w,
            this.h,

        )

    this.animarImg(sumarFrames)
    
    
    //Borrar disparos

    this.bullets = this.bullets.filter((bullet) => bullet.x < this.canvasW )
        
    this.bullets.forEach((bullet) => {
        bullet.dibujar();
        bullet.movimientoDisparo();
    })

    }

    movimiento(){
        
        if (
            this.y >= this.topLimit && this.y <= this.bottomLimit ||
            this.y < this.topLimit && this.dy <  0 ||
            this.y > this.bottomLimit && this.dy > 0
            ){
            this.y -= this.dy
        } 

        // this.x -= this.nx
        
    }

    animarImg(sumarFrames){

        if (sumarFrames % 6 === 0){
            this.img.frameIndex++;
        }
        if (this.img.frameIndex > 2) this.img.frameIndex = 0;
    }



    fire() {
        let bullet = new Laser(
            this.x + this.w -60,
            this.y + this.h / 2,
            20,
            // this.h,
            this.ctx
        )

        this.bullets.push(bullet)
    }

    }


