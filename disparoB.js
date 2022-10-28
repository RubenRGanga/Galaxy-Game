class Laser {
    constructor(x, y, w, ctx){
        this.x = x;
        this.y = y;
        this.laserW = w;
        this.laserH = this.laserW;
        this.ctx = ctx;

        this.img = new Image();
        this.img.src = "assets/img/laser/24.png";

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