class Jugador {
    constructor(w, h, ctx, keys){

        this.ctx = ctx;
        this.canvasW = w;
        this.canvasH = h;
        this.keys = keys;
        
        this.x = this.canvasW * 0.03 //Anchura de la posición inicial.
        this.y0 = this.canvasH * 0.5 //Altura de la posición inicial. 
        
        this.y = this.y0;

        this.derribado = false;

        this.img = new Image();
        this.img.src = "assets/img/nave.png";

        this.img.frames = 3;
        this.img.frameIndex = 0;

        this.w = 150; //Anchura de la nave.
        this.h = 45;  //Altura de la nave.
    
        this.vy = 1;
        
        this.setListener()
        this.dy = 0;

        this.topLimit = this.canvasH * 0.03;
        this.bottomLimit = this.canvasH - this.h - this.topLimit;

        this.bullets = []

        this.sonidoLaser = new Audio('assets/snd/fire.wav');
        this.sonidoExplosion = new Audio('assets/snd/blast.wav');
    
    }

    //CONTROLES

    setListener(){
    
        document.onkeydown = function(event){
            if (event.keyCode === this.keys.ARROW_UP){
                this.dy = 4;
            }
            else if (event.keyCode === this.keys.ARROW_DOWN){
                this.dy = -4;
            }
            else if (event.keyCode === this.keys.CONTROL && !this.isFiring){ //Verifica si la tecla de control no se está manteniendo pulsada actualmente.
                
                this.fire();
                this.sonidoLaser.play();
                this.isFiring = true; //Establece la variable de estado en verdadero para indicar que el jugador está disparando actualmente.
            }
    
        }.bind(this);
    
        document.onkeyup = function(event){
            if (event.keyCode === this.keys.ARROW_UP){
                this.dy = 0;
            }
            else if (event.keyCode === this.keys.ARROW_DOWN){
                this.dy = 0;
            }
            else if (event.keyCode === this.keys.CONTROL){
                this.isFiring = false; //Establece la variable de estado en falso cuando se suelta la tecla de disparo.
            }
        }.bind(this);
    
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

        if (!this.derribado) {
            if (sumarFrames % 6 === 0){
                this.img.frameIndex++;
            }
            if (this.img.frameIndex > 2) this.img.frameIndex = 0;
            }

            else if (this.derribado) {
                
            }
    }

    explotar() {
        if (!this.derribado) {
          this.derribado = true;
          this.sonidoExplosion.play();
          this.img.frames = 12;
          this.img.frameIndex = 0;
          this.img.src = `assets/img/explosion.png`;
          const self = this;
          function detenerAnimacion() {
            self.img.frameIndex = self.img.frames - 1;
            self.animateImg = function() {};
          }
          setTimeout(detenerAnimacion, this.img.frames * 1);
        }
      }
      

    fire() {
        let bullet = new Laser(
            this.x + this.w -60,
            this.y + this.h / 2,
            this.ctx,
        )

        this.bullets.push(bullet)
    }

    }


