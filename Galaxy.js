window.onload = function () {

  Swal.fire({
    title: 'GALAXY GAME \n (Rubén R. Ganga)',
    html: 
      'For a better experience, recommend run the game on Chrome in full-screen mode (<b>Press F11</b>).<br><br><b>FIRE!</b> = Ctrl<br><b>MOVE</b> = Arrow Up/Down<br><b>MUSIC ON</b> = M - <b>MUSIC OFF</b> = N',
    icon: 'info',
    iconColor: '',
    confirmButtonText: 'OK!',
    footer: '<a href="https://github.com/RubenRGanga/Galaxy-Game" target="_blank">VIEW GIT REPOSITORY!</a>',
  }).then ((result) => {


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
  } else if (reproducir) {
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
      // case 77: //m
      //   pauseAudio();
      //   break;
  }

}

document.addEventListener('keydown', teclado, false);
   
    Game.init()
  })
}