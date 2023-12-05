const tablero = document.getElementById("tablero");
const points = document.getElementById("points");
const start=document.getElementById("start")
let comidaX=4;
let comidaY=18;
let snakeX = 10;
let snakeY = 10;
let velocityX = 0;
let velocityY = 0;
let snakeCuerpo=[]
let puntos = 0;
let perder=false
let setIntervalId
let movimientoEnProceso=false

start.addEventListener('click', () =>{
  start.classList.add("disguise")
  velocityX+=1
  initgame()
  document.addEventListener("keydown", controlSnake);
})

function crearTablero() {    
  for (let X = 0; X <= 19; X++) {
    for (let Y = 0; Y <= 19; Y++) {
      let casilla = document.createElement("div");
      casilla.className = "casilla";
      casilla.style.gridArea = `${X + 1} / ${Y + 1}`;
      tablero.appendChild(casilla);
    }
  }
}

function cambiarPosicion() {
  do {
    comidaX = Math.floor(Math.random() * 20) + 1;
    comidaY = Math.floor(Math.random() * 20) + 1;
  } while (snakeCuerpo.some(segment => segment[0] === comidaX && segment[1] === comidaY) || (snakeX === comidaX && snakeY === comidaY));
}


function initgame() {
  if(perder)return findejuego()
  
  let casilla = document.querySelector(`[style="grid-area: ${comidaY} / ${comidaX};"]`);
  casilla.className = "comida";

  if(snakeX==comidaX && snakeY==comidaY){
    soundeat()
    puntos++
    puntaje()
    cambiarPosicion()
    snakeCuerpo.push([comidaY,comidaX])
    casilla.classList.remove("comida")
  }

  for(let i=snakeCuerpo.length-1;i>0;i--){
    snakeCuerpo[i]=[...snakeCuerpo[i-1]]
  }

  snakeCuerpo[0]=[snakeX,snakeY]
  snakeX += velocityX;
  snakeY += velocityY;

  //detecta si la serpiente coliciona con los bordes del tablero
  if(snakeX<=0|| snakeX>20 || snakeY<=0 || snakeY>20){
    perder=true
    findejuego()
    return
  }

  //detecta si la srpiente ha chocado con su propio cuerpo
  for(let i=1; i<snakeCuerpo.length;i++){
    if(snakeX===snakeCuerpo[i][0] && snakeY===snakeCuerpo[i][1]){
      perder=true
    }
  }

  for(let i=0;i<snakeCuerpo.length;i++){
    let cuerpoSnake = document.querySelector(`[style="grid-area: ${snakeCuerpo[i][1]} / ${snakeCuerpo[i][0]};"]`);
    cuerpoSnake.classList.add("snake");
  }

  tablero.querySelectorAll('.snake').forEach((segment) => {
    segment.classList.remove('snake');
  });

  // Agregar la clase "snake" a la cabeza de la serpiente
  let cabezaSnake = document.querySelector(`[style="grid-area: ${snakeY} / ${snakeX};"]`);
  cabezaSnake.classList.add("snake");
  for(let i=0;i<snakeCuerpo.length;i++){
    let cuerpoSnake = document.querySelector(`[style="grid-area: ${snakeCuerpo[i][1]} / ${snakeCuerpo[i][0]};"]`);
    cuerpoSnake.classList.add("snake");
  }
  movimientoEnProceso=false

}

function  findejuego(){
  soundlose()
  clearInterval(setIntervalId)
  getName()
}

function getName(){
  const btn = document.getElementById('add-botton')
  const userInput = document.getElementById('input-user')
  document.getElementById('name-user').style.display = 'flex'
  btn.addEventListener('click', () => {
    document.getElementById('name-user').style.display = 'none'
    tryAgainGame()
  })


  btn.addEventListener('click', () =>{
    const newPlayer = {
      name: userInput.value,
      score: puntos
    }

    players.push(newPlayer)
    savePlayersToLocalStorage()
  })
}

function tryAgainGame(){
  const tryAgain=document.getElementById("try-again")
  document.getElementById('restart-game').style.display = 'flex'
  
  tryAgain.addEventListener('click', () => {
    location.reload()
  })
}

function savePlayersToLocalStorage(){
  localStorage.setItem('players', JSON.stringify(players))
}

function puntaje() {
  points.innerText = puntos.toString();
}

const controlSnake = (e) => {
 if(movimientoEnProceso) return;
  movimientoEnProceso=true
  if (e.key === "ArrowRight" && velocityX !== -1) {
    velocityX = 1;
    velocityY = 0;
  } else if (e.key === "ArrowLeft" && velocityX !== 1) {
    velocityX = -1;
    velocityY = 0;
  } else if (e.key === "ArrowUp" && velocityY !== 1) {
    velocityX = 0;
    velocityY = -1;
  } else if (e.key === "ArrowDown" && velocityY !== -1) {
    velocityX = 0;
    velocityY = 1;
  }
}

crearTablero();
cambiarPosicion()
//initgame();
//document.addEventListener("keydown", controlSnake);
setIntervalId=setInterval(initgame,120 );
 

let scoreRedirigir = document.getElementById("scoreBTN");
let homeRedirigir = document.getElementById("homeBTN");

scoreRedirigir.addEventListener("click", function () {
  window.location.href = "../html/high scores.html";
})


homeRedirigir.addEventListener("click", function () {
  window.location.href = "../html/pantallaHome.html";
});

function soundeat(){
  let eatsound=new Howl({
    src:['../../efectos de sonido/decidemp3-14575.mp3']
  })
  eatsound.play()
}
function soundlose(){
  let loseSound=new Howl({
    src:[`../../efectos de sonido/F.wav`],
  })
  loseSound.play()
}