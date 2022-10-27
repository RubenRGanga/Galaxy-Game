const Game = {
    canvas: undefined,
    ctx: undefined,
    fps: 60,
    keys: {
        ARROW_UP: 38,
        ARROW_DOWN: 40,
        SPACE: 32,
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

            if(this.sumarFrames % 500 === 0) {
                this.genarateEnemigo1()
                
            }

            this.moverTodo(); //moveAll
            this.pintarTodo();//drawAll

            this.clearEnemigo1()

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
        
        
    },
    stop: function(){
        clearInterval(this.loop)
    },
    
    genarateEnemigo1: function() {
        this.arrayEnemigo1.push(
            new Enemigo1(this.canvas.width, this.canvas.height, this.ctx)
        )
    },

    clearEnemigo1: function() {
        this.arrayEnemigo1 = this.arrayEnemigo1.filter((enemigo1) => enemigo1.x >= 0)
    },
}

