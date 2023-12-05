document.addEventListener("DOMContentLoaded", function () {
    let music = new Howl({
        src: [`../../efectos de sonido/music-game.mp3`],
        loop: true,
        volume: 0.4,
    });
    music.play();

    const  volumeUp = document.getElementById("vol+");
    const  volumeDown = document.getElementById("vol-");
    const mute = document.getElementById("mute");

    volumeUp.addEventListener("click", function () {
        let volumen =music.volume()
        if(volumen<0.4){
            volumen+=0.1
        }
        music.volume(volumen)
    });

    volumeDown.addEventListener("click", function () {
        let volumen =music.volume()
        if (volumen > 0) {
            volumen -= 0.1;
        }
        music.volume(volumen)
    });

    mute.addEventListener("click", function () {
        // Cambiar el estado de mute (silenciar)
        music.mute(!music.mute());
    });
});