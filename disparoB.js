class Laser {
    constructor(x, y, w, ctx){
        this.x = x;
        this.y = y;
        this.misilW = w;
        this.misilH = this.misilW;
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
            this.misilW,
            this.misilH
        )
    }

    movimientoDisparo(){
        this.x += this.vel_x;
    }
}