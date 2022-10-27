class Enemigo2 {

    constructor(w, h, ctx) {
        this.ctx = ctx;
        
        this.canvasW = w;
        this.canvasH = h;
        
     
        this.x0 = this.x
        this.x = this.canvasW
       

        this.y = Math.floor(Math.random() * 650)
       

        

        this.img = new Image();
        this.img.src = "assets/img/enemigo2.png"
        
        this.img.frames = 3;
        this.img.frameIndex = 0;

        this.w = 200;
        this.h = 60;

      
        this.dx = 7;

        
        

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


    }

    animateImg(sumarFrames) {

        if(sumarFrames % 3 === 0) {
            this.img.frameIndex++;
        }

        if(this.img.frameIndex > 1) this.img.frameIndex = 0;
    }
    movimiento() {
        this.x -= this.dx;
    }
}

