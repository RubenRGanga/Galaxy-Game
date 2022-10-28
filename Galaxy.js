window.onload = function () {
    alert("DISPARO = Ctrl \nMOVERSE = Flechas Arriba/Abajo")
    var myAudio= document.createElement('audio');
    var myMessageAlert = "";
    myAudio.src = 'assets/snd/DUST.mp3';
    myAudio.addEventListener('ended', function(){
       alert(myMessageAlert);
    });
   function Myalert(message) { 
       myAudio.play();
       myMessageAlert = message;
   } 
   Myalert("DISPARO = Ctrl - MOVERSE = Flechas Arriba/Abajo");

    Game.init()
}