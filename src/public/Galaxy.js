// Función para cargar una imagen y devolver una promesa
function cargarImagen(src) {
  return new Promise((resolve, reject) => {
      let img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
  });
}

// Función para cargar un sonido y devolver una promesa
function cargarAudio(src) {
  return new Promise((resolve, reject) => {
      let audio = new Audio();
      audio.oncanplaythrough = () => resolve(audio);
      audio.onerror = reject;
      audio.src = src;
  });
}

// Función que precarga todos los assets
async function precargarYIniciarJuego() {
  try {
      // Carga de imágenes
      const manual = await cargarImagen('assets/img/init.png')
      const imgFondo = await cargarImagen('assets/img/parallax-mountain-bg.png');
      const imgFondoB = await cargarImagen('assets/img/fondo_b.png');
      const imgFondo4 = await cargarImagen('assets/img/parallax-mountain-montain-far.png');
      const imgFondo3 = await cargarImagen('assets/img/parallax-mountain-mountains.png');
      const imgFondo2 = await cargarImagen('assets/img/parallax-mountain-trees.png');
      const imgJugador = await cargarImagen('assets/img/nave.png');
      const imgFondo1 = await cargarImagen('assets/img/parallax-mountain-foreground-trees.png');    
      const imgEnemigo1 = await cargarImagen('assets/img/enemigo1.png');
      const imgEnemigo2 = await cargarImagen('assets/img/enemigo2.png');
      const imgMina = await cargarImagen('assets/img/mina.png');
      const imgDisparo = await cargarImagen('assets/img/laser/33.png');
      const imgDisparoEnemigo1 = await cargarImagen('assets/img/laser/13.png');
      const imgDisparoEnemigo2 = await cargarImagen('assets/img/laser/16.png');
      const imgExplosion = await cargarImagen('assets/img/explosion.png');
      // const imgGameOver = await cargarImagen('assets/img/gameover.png')

      // Carga de sonidos
      const sndMusica = await cargarAudio('assets/snd/DUST.mp3');
      const sndDisparo = await cargarAudio('assets/snd/fire.mp3');
      const sndDisparoEnemigo = await cargarAudio('assets/snd/laserEnemigo.wav');
      const sndExplosion = await cargarAudio('assets/snd/blast.mp3');
      const sndGameOver = await cargarAudio('assets/snd/gameover.mp3')

      // Asignación de ASSETS a CLASES
      
      //Fondos
      Fondo.prototype.img = imgFondo
      FondoB.prototype.img = imgFondoB
      Fondo4.prototype.img = imgFondo4
      Fondo3.prototype.img = imgFondo3
      Fondo2.prototype.img = imgFondo2
      Fondo1.prototype.img = imgFondo1

      //Jugador
      Jugador.prototype.img = imgJugador
      Jugador.prototype.imgExplosion = imgExplosion
      Jugador.prototype.sonidoDisparo = sndDisparo;
      Jugador.prototype.sonidoExplosion = sndExplosion;
      Laser.prototype.imgDisparo = imgDisparo;


      //Enemigos
      NaveMetralla.prototype.img = imgEnemigo1
      NaveMetralla.prototype.imgDisparoEnemigo = imgDisparoEnemigo1;
      NaveMetralla.prototype.sonidoDisparoEnemigo = sndDisparoEnemigo;
      NaveSupersonica.prototype.img = imgEnemigo2
      NaveSupersonica.prototype.imgDisparoEnemigo = imgDisparoEnemigo2;
      NaveSupersonica.prototype.sonidoDisparoEnemigo = sndDisparoEnemigo;
      Proyectil.prototype.img = imgMina
      Enemigo.prototype.imgExplosion = imgExplosion
      Enemigo.prototype.sonidoExplosion = sndExplosion
      Nave.prototype.sonidoDisparoEnemigo = sndDisparoEnemigo
      


      // Iniciar el juego solo si todos los assets se han cargado
      Game.init();
  } catch (error) {
      console.error("Error durante la carga de assets: ", error);
  }
}

// Función para convertir imagen a Data URL
function imageToDataUrl(img) {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL('image/png');
}

// Precarga del sonido
const audioGameOver = new Audio("assets/snd/gameover.mp3");
audioGameOver.volume = 0.3;

// Convertir la imagen a Data URL
const imgGameOverDataUrl = imageToDataUrl(imgGameOver);
const imgInitDataUrl = imageToDataUrl(manual)
export { audioGameOver };

// Exportar imgGameOverDataUrl si necesitas usarlo en otros archivos
export { imgGameOverDataUrl };


window.onload = function () {

  Swal.fire({
    allowEnterKey: true,
    background: '#212121',
    imageUrl: manual,
    backdrop: false,
    imageWidth: 280,
    imageAlt: 'Controls img',
    confirmButtonText: 'OK!',
    confirmButtonColor: '#7d1282',
    footer: '<a href="https://github.com/RubenRGanga/Galaxy-Game" target="_blank">VIEW GIT REPOSITORY!</a>',
  }).then (async (result) => {
    await precargarYIniciarJuego();


let reproducir = false;
// let musica = new Audio("assets/snd/DUST.mp3");
let musica = sndMusica
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