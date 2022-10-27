class Disparo {

    constructor(x, y, y0, h, ctx) {
        this.x = x;
        this.y = y;
        this.y0 = y0;
        

        this.playerH = h;

        this.ctx = ctx;

        this.r = 4; //Radio si se usa una pelota

        this.vx = 20;
        this.vy = 1;

        // this.gravity = 0.25;

        // this.img = new Image();
        // this.img.src = "assets/img/Laser Sprites/24.png"

        // this.w = 25;
        // this.h = 12;
    }
    

    draw() {
        this.ctx.beginPath();
        this.ctx.fillStyle = "red";
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }   




    move() {
        // Avance pelota
        this.x += this.vx;


    }
}