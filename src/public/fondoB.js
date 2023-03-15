class FondoB{ //background
    constructor(w, h, ctx){//establece los nombres de los valores para el constructor
        this.w = w;
        this.h = h;
        this.ctx = ctx;
        //Instancia una nueva imagen y establece la imagen con .src .
        this.img = new Image(); 
        this.img.src = "assets/img/fondo_b.png"
        this.x = 0 //situa la imagen en el eje X e Y
        this.y = 0
        
        this.dx = 0.1 //Establece los pixeles que se desplaza dando la sensación de movimiento. 
    }

    dibujar(){ //draw
        this.ctx.drawImage( //Creo que es una función de CANVAS tiene que escribirse
            this.img,
            this.x,
            this.y,
            this.w,
            this.h
        )

        this.ctx.drawImage(
            this.img,
            this.x + this.w,
            this.y,
            this.w,
            this.h
        )

 
    }

    movimiento(){ //move
        this.x -= this.dx
        if ( this.x < -this.w) this.x = 0;
    }
}