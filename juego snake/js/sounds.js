document.addEventListener("DOMContentLoaded", function () {

    let scoreBTN = document.getElementById("scoreBTN");
    let homeBTN=document.getElementById("homeBTN")
    let sonidoReproducido = false;

    function touch() {
        if (!sonidoReproducido) {
            let efetcs = new Howl({
                src: ['../../efectos de sonido/eat.wav'],
                
                onend: function() {
                    // Cuando el sonido termine, permite reproducir nuevamente
                    sonidoReproducido = false;
                }
            });

            efetcs.play();

            // Cambia el estado de la variable para que no se reproduzca de nuevo
            sonidoReproducido = true;
        }
    }

    

    // Asociación del evento click al botón
    scoreBTN.addEventListener("click", function () {
        touch();
    });
    homeBTN.addEventListener("click", function () {
        touch();
    })

    window.addEventListener('pageshow', function () {
        sonidoPrincipal.stop();
        sonidoPrincipal.play();
    });
    let efectmove = new Howl({
        src: ['../../efectos de sonido/shooting-sound-fx-159024.mp3'],
        loop: true  // Configura el sonido como bucle
    });
    
    let isKeyPressed = false;  // Variable para rastrear si la tecla está presionada
    
    const startSound = () => {
        if (!isKeyPressed) {
            efectmove.play();
            isKeyPressed = true;
        }
    };
    
    const stopSound = () => {
        efectmove.stop();
        isKeyPressed = false;
    };
    
    // Evento al presionar la tecla
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "ArrowDown") {
            startSound();
        }
    });
    
    // Evento al soltar la tecla
    document.addEventListener("keyup", (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft" || e.key === "ArrowUp" || e.key === "ArrowDown") {
            stopSound();
        }
    });
});
 