class Laser {
    constructor(x, y, ctx, v = 20, tipo = 64,){
        this.x = x;
        this.y = y;
        this.laserW = 60; //Ancho del disparo.
        this.laserH = 20; //Alto del disparo.
        this.ctx = ctx;

        this.img = new Image();
        this.img.src = `assets/img/laser/${tipo}.png`;

        this.vel_x = 20; 

        
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