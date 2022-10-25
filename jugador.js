class Jugador {
    constructor(w, h, ctx, keys){

        console.log(h)
        this.ctx = ctx;
        this.canvasW = w;
        this.canvasH = h;
        this.keys = keys;
        
        this.x = this.canvasW * 0.08

        this.y0 = this.canvasH * 0.2
        this.y = this.y0;

        this.img = new Image();
        this.img.src = "assets/img/nave_roja.png";

        this.img.frames = 3;
        this.img.frameIndex = 0;

        this.w = 140;
        this.h = 205;


        

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
    }

    movimiento(){

    }

    animarImg(sumarFrames){

        console.log(sumarFrames)
        if (sumarFrames % 6 === 0){
            this.img.frameIndex++;
        }
        if (this.img.frameIndex > 2) this.img.frameIndex = 0;
    }
}