document.addEventListener("DOMContentLoaded", function () {
    let music=new Howl({
        src:[`../../efectos de sonido/Come Along With Me. _ Hora de Aventura. _ Sub Al Español..mp3`],
        loop:true,
        volume: 1,

    
    })
    music.play()
})