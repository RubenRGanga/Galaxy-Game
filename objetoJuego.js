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
        this.canvas = document.getElementById('canvas')
        //https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
        this.ctx = canvas.getContext('2d');
        
        this.start()
    },

    start: function (){
        this.reset()
        
        this.loop = setInterval (() =>{  
            this.sumarFrames++; //frameCounter

            if (this.sumarFrames % 300 === 0) {
                this.generaEnemigo("NaveMetralla") 
            }

            if (this.sumarFrames % 500 === 0) {
                this.generaEnemigo("NaveSupersonica") 
            }

            this.moverTodo(); 
            this.pintarTodo();
            this.shootIA()

            this.limpiaEnemigo()
           
            if (this.esColision() || this.isDamage())
                this.gameOver()
            this.esDiana() && console.log(++this.score)

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
        
        this.enemigos = [];
        this.score = 0;
    },

    moverTodo: function(){
        // console.log("M")
        this.fondo.movimiento()
        this.fondo1.movimiento()
        this.fondo2.movimiento()
        this.fondo3.movimiento()
        this.fondo4.movimiento()
        this.jugador.movimiento()
        
        this.enemigos.forEach(enemigo => enemigo.movimiento())
    },
    pintarTodo: function(){
        this.fondo.dibujar()
        this.fondo4.dibujar()
        this.fondo3.dibujar()
        this.fondo2.dibujar()
        this.jugador.dibujar(this.sumarFrames)
        this.fondo1.dibujar()

        this.enemigos.forEach(enemigo => enemigo.dibujar(this.sumarFrames))
    },
    stop: function(){
        clearInterval(this.loop)
    },

//ENEMIGO
    
    generaEnemigo: function(tipo) {
            this.enemigos.push(
                new (eval(tipo))(this.canvas.width, this.canvas.height, this.ctx)
            )  
    },

    limpiaEnemigo: function() {
        this.enemigos = this.enemigos.filter((enemigo) => enemigo.x >= 0)
    },

    esColision: function(){
        return this.enemigos.some(enemigo => {
            return (
                this.jugador.y <= enemigo.y + enemigo.h*0.75 &&
                this.jugador.x + this.jugador.w*0.75 >= enemigo.x &&
                this.jugador.y + this.jugador.h*0.75 >= enemigo.y
                // && this.jugador.x <= enUno.x + enUno.w
            )
        })
    },

    isDamage: function () {
        return this.enemigos.some(enemigo => {
            if (!(enemigo instanceof Nave)) return false
            return enemigo.bullets.some(laser => {
                return (
                    laser.y <= this.jugador.y + this.jugador.h &&
                    laser.x <= this.jugador.x + this.jugador.w - 80 &&
                    laser.x + laser.laserW >= this.jugador.x &&
                    laser.y + laser.laserH >= this.jugador.y)
            })
        })
    },

    esDiana: function () {
        return this.enemigos.some(enemigo => {
            return this.jugador.bullets.some(laser => {
                const result = (
                    laser.y <= enemigo.y + enemigo.h &&
                    laser.x <= enemigo.x + enemigo.w &&
                    laser.x + laser.laserW >= enemigo.x &&
                    laser.y + laser.laserH >= enemigo.y
                )

                if(result) {

                    enemigo.explotar(this.enemigos)
                    //this.enemigos = this.enemigos.filter(ene => ene !== enemigo)
                    this.jugador.bullets = this.jugador.bullets.filter(las => las !== laser)       
                }

                return result
            })
        })
    },

    shootIA() {
        this.enemigos.forEach(enemigo => {
            if (enemigo instanceof Nave)
                enemigo.dispara(this.sumarFrames)
        })
    },

    gameOver: function(){
        this.stop();
        if (confirm("GAME OVER \n NO HAS DEFENDIDO TU PLANETA \n ¿VOLVER A INTENTARLO?")) {
            this.reset();
            this.start();
        }
    },
}


