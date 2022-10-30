window.onload = function () {

confirm("DISPARO = Ctrl \n MOVERSE = Flechas Arriba/Abajo\n ACTIVAR MUSICA = M")

let reproducir = false;
let musica = new Audio("assets/snd/DUST.mp3");

//arranca la música en bucle
musica.addEventListener('ended', function() {
    this.currentTime=0.60;
    this.play();
}, false);
musica.play();

function resumeAudio () {
  if (!reproducir) {
    reproducir = true;
    musica.play();
  }
}

function pauseAudio () {
  if (reproducir) {
    reproducir = false;
    musica.pause();
  }
}

function teclado(objeto) {
  var tecla = objeto.which;
  var num;

  switch (tecla) {
      case 77: //m
        resumeAudio();
        break;
      case 78: //n
        pauseAudio();
        break;
  }

}

document.addEventListener('keydown', teclado, false);
   
    Game.init()
}