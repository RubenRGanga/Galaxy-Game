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
        console.log("INICIA")
        
        this.reset()
        

        this.loop = setInterval (() =>{  //interval
            this.sumarFrames++;

            this.moverTodo(); //moveAll
            this.pintarTodo();//drawAll

        }, 1000 / this.fps)
    },

    reset: function(){
        this.fondo = new Fondo(this.canvas.width, this.canvas.height, this.ctx)
        this.sumarFrames = 0 //frameCounter 
    },

    moverTodo: function(){
        console.log("M")
        this.fondo.movimiento()
    },
    pintarTodo: function(){
        console.log("P")
        this.fondo.dibujar()
    },
    stop: function(){
        clearInterval(this.loop)
    },
}

