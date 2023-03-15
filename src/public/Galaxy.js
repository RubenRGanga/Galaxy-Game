window.onload = function () {

  Swal.fire({
    allowEnterKey: true,
    background: '#212121',
    imageUrl: 'assets/img/init.png',
    backdrop: false,
    imageWidth: 280,
    imageAlt: 'Controls img',
    confirmButtonText: 'OK!',
    confirmButtonColor: '#7d1282',
    footer: '<a href="https://github.com/RubenRGanga/Galaxy-Game" target="_blank">VIEW GIT REPOSITORY!</a>',
  }).then ((result) => {


let reproducir = false;
let musica = new Audio("assets/snd/DUST.mp3");
musica.volume = 0.4;

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