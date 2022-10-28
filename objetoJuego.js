const Game = {
    canvas: undefined,
    ctx: undefined,
    fps: 60,
    keys: {
        ARROW_UP: 38,
        ARROW_DOWN: 40,
        CONTROL: 17,
    },

    init: function () {
        console.log("CARGADO")
        this.canvas = document.getElementById('canvas')
        this.ctx = canvas.getContext('2d');
        //https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
        
        

        this.start()
    },

    start: function (){
        // console.log("INICIA")
        
        this.reset()
        

        this.loop = setInterval (() =>{  //interval
            this.sumarFrames++; //frameCounter

            if(this.sumarFrames % 300 === 0) {
                this.genarateEnemigo1() 
            }

            if(this.sumarFrames % 500 === 0) {
                this.genarateEnemigo2() 
            }


            this.moverTodo(); //moveAll
            this.pintarTodo();//drawAll

            this.clearEnemigo1()
            this.clearEnemigo2()

            if (this.colision()) {
                this.gameOver()
            }

            if (this.colision2()) {
                this.gameOver()
            }

            if (this.laserColision()){
                console.log("destruido")
            }

        }, 1000 / this.fps)
    },

    reset: function(){
        this.fondo = new Fondo(this.canvas.width, this.canvas.height, this.ctx)
        this.sumarFrames = 0 //frameCounter 
        this.fondo1 = new Fondo1(this.canvas.width, this.canvas.height, this.ctx)
        
        this.fondo2 = new Fondo2(this.canvas.width, this.canvas.height, this.ctx)
        
        this.fondo3 = new Fondo3(this.canvas.width, this.canvas.height, this.ctx)
        
        this.fondo4 = new Fondo4(this.canvas.width, this.canvas.height, this.ctx)
        
        this.jugador = new Jugador(this.canvas.width, this.canvas.height, this.ctx, this.keys)
        
        this.arrayEnemigo1 = [];
        this.arrayEnemigo2 = [];
        
      
    },

    moverTodo: function(){
        // console.log("M")
        this.fondo.movimiento()
        this.fondo1.movimiento()
        this.fondo2.movimiento()
        this.fondo3.movimiento()
        this.fondo4.movimiento()
        this.jugador.movimiento()
        
        this.arrayEnemigo1.forEach(enemigo1 => {
            enemigo1.movimiento()
        })

        this.arrayEnemigo2.forEach(enemigo2 => {
            enemigo2.movimiento()
        })
    
        
    },
    pintarTodo: function(){
        // console.log("P")

        this.fondo.dibujar()
        this.fondo4.dibujar()
        this.fondo3.dibujar()
        this.fondo2.dibujar()
        this.jugador.dibujar(this.sumarFrames)
        this.fondo1.dibujar()

        this.arrayEnemigo1.forEach(enemigo1 => {
            enemigo1.dibujar(this.sumarFrames)
        })
        
        this.arrayEnemigo2.forEach(enemigo2 => {
            enemigo2.dibujar(this.sumarFrames)
        })
        
    },
    stop: function(){
        clearInterval(this.loop)
    },

//ENEMIGO 1
    
    genarateEnemigo1: function() {
        this.arrayEnemigo1.push(
            new Enemigo1(this.canvas.width, this.canvas.height, this.ctx)
        )
    },

    clearEnemigo1: function() {
        this.arrayEnemigo1 = this.arrayEnemigo1.filter((enemigo1) => enemigo1.x >= 0)
    },

//ENEMIGO 2
    genarateEnemigo2: function() {
        this.arrayEnemigo2.push(
            new Enemigo2(this.canvas.width, this.canvas.height, this.ctx)
        )
    },

    clearEnemigo2: function() {
        this.arrayEnemigo2 = this.arrayEnemigo2.filter((enemigo2) => enemigo2.x >= 0)
    },

    colision: function(){
        return this.arrayEnemigo1.some(enUno => {
            return (
                this.jugador.y <= enUno.y + enUno.h*0.75 &&
                this.jugador.x + this.jugador.w*0.75 >= enUno.x &&
                this.jugador.y + this.jugador.h*0.75 >= enUno.y
                // && this.jugador.x <= enUno.x + enUno.w
            )
        })
    },

    colision2: function(){
        return this.arrayEnemigo2.some(enDos => {
            return (
                this.jugador.y <= enDos.y + enDos.h*0.75 &&
                this.jugador.x + this.jugador.w*0.75 >= enDos.x &&
                this.jugador.y + this.jugador.h*0.75 >= enDos.y
                // && this.jugador.x <= enDos.x + enDos.w
            )
        })
    },

    laserColision: function () {
        return this.arrayEnemigo1.some(enUno => {
            return this.jugador.bullets.some(laser => {
                const result = (
                    laser.y <= enUno.y + enUno.h &&
                    laser.x <= enUno.x + enUno.w &&
                    laser.x + laser.laserW >= enUno.x &&
                    laser.y + laser.laserH >= enUno.y
                )
                if(result) {
                    this.arrayEnemigo1 = this.arrayEnemigo1.filter(en => en !== enUno)
                    this.jugador.bullets = this.jugador.bullets.filter(l => l !== laser)
                    }
                    return result
            })
        })
    },

    // misilCollision: function () {
    //     return this.enemies.some(ovni => {
    //         return this.shuttle.missiles.some(misil => {
    //             const result = (
    //                 misil.y <= ovni.y + ovni.h &&
    //                 misil.x <= ovni.x + ovni.w &&
    //                 misil.x + misil.misilW >= ovni.x &&
    //                 misil.y + misil.misilH >= ovni.y
    //             )
    //             if(result) {
    //                 this.enemies = this.enemies.filter(o => o !== ovni)
    //                 this.shuttle.missiles = this.shuttle.missiles.filter(m => m !== misil)
    //             }
    //             return result
    //         })


    diana: function(){
        console.log("Destruido!")
    },

    gameOver: function(){
        this.stop();
        if (confirm("GAME OVER \n NO HAS DEFENDIDO TU PLANETA \n ¿VOLVER A INTENTARLO?")) {
            this.reset();
            this.start();
        }
    }
}


