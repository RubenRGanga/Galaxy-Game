class Laser {
    constructor(x, y, ctx, v = 20, tipo = 33,){
        this.x = x;
        this.y = y;
        this.laserW = 60; //Ancho del disparo.
        this.laserH = 20; //Alto del disparo.
        this.ctx = ctx;

        this.img = this.imgDisparo || new Image();
        // Si el prototipo tiene una imagen, usar eso, si no, crear una nueva imagen.
        
        if (!this.img.src) {
            // Si la imagen del prototipo no tiene una fuente, asignar una nueva.
            this.img.src = `assets/img/laser/${tipo}.png`; //Skin del disparo.
        }

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