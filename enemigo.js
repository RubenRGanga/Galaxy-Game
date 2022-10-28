const randomInt = (min, max)  => Math.floor(Math.random() * (max - min) + min);

class Enemigo {
    constructor(canvasW, y, w, h, img, ctx) {
        this.ctx = ctx;
        
        this.img = img
        
        this.w = w
        this.h = h

        this.x = canvasW
        this.y = y
        this.derribado = false;
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
        this.dx = dx
    }

    explotar(arrEnemigos) {
        if(!this.derribado) {
            this.arrEnemigos = arrEnemigos;
            this.derribado = true;
            this.img.frames = 11
            this.img.frameIndex = 0
            
            this.img.src = `assets/img/explosion.png`
        }
    }

    
}

// Enemigo > Nave
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
       
    }

    dispara (sumarFrame) {
        if(sumarFrame % 100 === 0) {
            console.log("NUEVA LASEr")
            const bullet = new Laser(
                this.x + 60,
                this.y + this.h / 2,
                this.ctx,
                randomInt(-50, -1),
                "0" + randomInt(1, 9)
                )

            bullet.vel_x = -20;
            this.bullets.push(bullet)
        }
            
        this.bullets = this.bullets.filter((b) => b.x > 0 )

        this.bullets.forEach((b) => {
            b.dibujar();
            b.movimientoDisparo();
        }) 
    }
}

// Enemigo > Nave > NaveMetralla
class NaveMetralla extends Nave {
    constructor(canvasW, canvasH, ctx) {
        const tipo = 1;
        const crop = canvasH * .1;
        
        super(canvasW, canvasH, tipo, crop, ctx)
        super.setDX(5)
    }
}

// Enemigo > Nave > NaveSupersonica
class NaveSupersonica extends Nave {
    constructor(canvasW, canvasH, ctx) {
        const tipo = 2;
        const crop = canvasH * .2;

        super(canvasW, canvasH, tipo,crop, ctx)
        super.setDX(7)
        
    }
}

// Enemigo > Mina
class Mina extends Enemigo {
    
}