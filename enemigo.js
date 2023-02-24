const randomInt = (min, max)  => Math.floor(Math.random() * (max - min) + min);

//SUPER CLASE ENEMIGO

class Enemigo {
    constructor(canvasW, y, w, h, img, ctx) {
        this.ctx = ctx;
        
        this.img = img
        
        this.w = w
        this.h = h

        this.x = canvasW
        this.y = y
        this.derribado = false;

        this.sonidoExplosion = new Audio('assets/snd/blast.wav');

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

    //ANIMACIÓN SPRITE ENEMIGO.

    animateImg(sumarFrames) {
        if(sumarFrames % 6 === 0)
            this.img.frameIndex++;

        if(this.img.frameIndex > this.img.frames - 1) {

            if(this.derribado) {
                

                this.arrEnemigos[this.arrEnemigos.indexOf(this)] = null;
            }

            this.img.frameIndex = 0;
        }
            
    }

    movimiento() {
        this.x -= this.dx;
    }

    setDX(dx) {
        this.dx = dx //Velocidad desplazamiento horizontal del enemigo.
    }

    explotar(arrEnemigos) {
        if(!this.derribado) {
            this.arrEnemigos = arrEnemigos;
            this.derribado = true;
            this.sonidoExplosion.play();
            this.img.frames = 12 //Frames animación explosión.
            this.img.frameIndex = 0 //En que frame empieza la animación.
            this.img.h = 20 //No me acepta este parametro como tamaño del sprite.
            this.img.w = 20 //No me acepta este parametro como tamaño del sprite.
            
            this.img.src = `assets/img/explosion.png`

             // Guardar una referencia al objeto `this` en una variable
            const self = this;

            // Crear una función para detener la animación después de una reproducción
            function detenerAnimacion() {
                self.img.frameIndex = self.img.frames - 1;
                self.animateImg = function() {};
            }

            // Ejecutar la función `detenerAnimacion()` después de la animación
            setTimeout(detenerAnimacion, this.img.frames * 80);
            }
    }

    
}

// ENEMIGO > NAVE

class Nave extends Enemigo {
    constructor(canvasW, canvasH, tipo, crop, ctx) {
        const w = 200;
        const h = 60;

        const y = randomInt(0 + crop, canvasH - h - crop)
        const img = new Image();

        img.src = `assets/img/enemigo${tipo}.png`
        img.frames = 3
        img.frameIndex = 0

        super(canvasW, y, w, h, img, ctx)

        this.bullets = []

        this.sonidoLaserEnemigo = new Audio('assets/snd/laserEnemigo.wav');
       
    }

    dispara (sumarFrame) {
        if(!this.derribado && sumarFrame % 125 === 0) { //Cadencia de disparo enemigo.
            
            this.sonidoLaserEnemigo.play();
            
            const bullet = new Laser(
                this.x,
                this.y + this.h / 2,
                this.ctx,
                randomInt(-10, -1),
                "1" + randomInt(1, 9) //Skin del disparo enemigo.
                )

            bullet.vel_x = -10; //Velocidad del disparo enemigo.
            this.bullets.push(bullet)
        }
            
        this.bullets = this.bullets.filter((b) => b.x > 0 )

        this.bullets.forEach((b) => {
            b.dibujar();
            b.movimientoDisparo();
        }) 
    }
}

// ENEMIGO > NAVE > METRALLA
class NaveMetralla extends Nave {
    constructor(canvasW, canvasH, ctx) {
        const tipo = 1;
        const crop = canvasH * .1;
     
        
        super(canvasW, canvasH, tipo, crop, ctx)
        super.setDX(5)
        
    }
}

// ENEMIGO > NAVE > SUPERSONICA
class NaveSupersonica extends Nave {
    constructor(canvasW, canvasH, ctx) {
        const tipo = 2;
        const crop = canvasH * .2;

        super(canvasW, canvasH, tipo,crop, ctx)
        super.setDX(7)
        
    }
}

// ENEMIGO > MINA

// class Mina extends Enemigo {
//     constructor(canvasW, canvasH, tipo, playerY, crop, ctx, w, h) {
//       const w = 20;
//       const h = 20;
      
//       const y = playerY + h / 2;
//       const img = new Image();

//       const tipo = 3;
//       img.src = `assets/img/enemigo${tipo}.png`;
//       img.frames = 3;
//       img.frameIndex = 0;

//       super(canvasW, y, w, h, img, ctx);

//       const x = canvasW;
      
//       super.setDX(20);
//     }
//   }

// class Mina extends Enemigo {
//     constructor(canvasW, canvasH, ctx, playerY) {
//         const w = 40;
//         const h = 40;
//         const tipo = 3;
//         const crop = canvasH * .1;
//         const y = playerY + h /2;
        
//         super(canvasW, y, tipo, crop, ctx, canvasH)
//         super.setDX(20) //¿para que se desplace de forma senoidal tengo que añadir el coseno de x a la velocidad?

//         // const y = 300; //logicamente jugador no esta definido en esta linea. 
//         const img = new Image();

//         img.src = `assets/img/enemigo${tipo}.png`
//         img.frames = 3
//         img.frameIndex = 0
        
//     }
    
// }