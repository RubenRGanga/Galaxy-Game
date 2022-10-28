class Laser {
    constructor(x, y, ctx, v = 20, tipo = 24,){
        this.x = x;
        this.y = y;
        this.laserW = 20;
        this.laserH = this.laserW;
        this.ctx = ctx;

        this.img = new Image();
        this.img.src = `assets/img/laser/${tipo}.png`;

        this.vel_x = v; 

        
    }

    dibujar() {
        this.ctx.drawImage(
            this.img,
            this.x,          //posicion x de la nave
            this.y,            //posicion y de la nave
            this.laserW,
            this.laserH
        )
    }

    movimientoDisparo(){
        this.x += this.vel_x;
    }
}