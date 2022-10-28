class Enemigo1 {

    constructor(w, h, ctx) {
        this.ctx = ctx;
        
        this.canvasW = w;
        this.canvasH = h;
        
     
        this.x0 = this.x
        this.x = this.canvasW
       

        this.y = Math.floor(Math.random() * 680)
    
        this.img = new Image();
        this.img.src = "assets/img/enemigo1.png"
        
        this.img.frames = 3;
        this.img.frameIndex = 0;

        this.w = 200;
        this.h = 60;

      
        this.dx = 5; 

        this.bulletsEnemy = []
        

    }
    dibujar(sumarFrames) {
        this.ctx.drawImage(

            this.img,
            this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
            0,
            Math.floor(this.img.width / this.img.frames),
            this.img.height,
            this.x,
            this.y,
            this.w,
            this.h
        )

    this.animateImg(sumarFrames)

    this.bulletsEnemy = this.bulletsEnemy.filter((bulletEnemy) => bulletEnemy.x < this.canvasW )
        
    this.bulletsEnemy.forEach((bullet) => {
        bulletEnemy.dibujar();
        bulletEnemy.movimientoDisparo();
    })


    }

    animateImg(sumarFrames) {

        if(sumarFrames % 6 === 0) {
            this.img.frameIndex++;
        }

        if(this.img.frameIndex > 2) this.img.frameIndex = 0;
    }
    movimiento() {
        this.x -= this.dx;
    }

    fireEnemy() {
        const bulletEnemy = new Disparo(
            this.x + this.w,
            this.y + this.h / 2,
            this.y0,
            this.h,
            this.ctx
        )

        this.bulletsEnemy.push(bulletEnemy)
    }
}

