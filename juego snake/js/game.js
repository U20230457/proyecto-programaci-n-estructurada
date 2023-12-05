const board = document.getElementById("board");
const points = document.getElementById("points");
const start=document.getElementById("start")
let eatX=4;
let eatY=18;
let snakeX = 10;
let snakeY = 10;
let velocityX = 0;
let velocityY = 0;
let snakeBody=[]
let score = 0;
let gameOver=false
let setIntervalId
let move=false

start.addEventListener('click', () =>{
  start.classList.add("disguise")
  velocityX+=1
  initgame()
  document.addEventListener("keydown", controlSnake);
})

function createBoard() {
  for (let X = 0; X <= 19; X++) {
    for (let Y = 0; Y <= 19; Y++) {
      let casilla = document.createElement("div");
      casilla.className = "box";
      casilla.style.gridArea = `${X + 1} / ${Y + 1}`;
      board.appendChild(casilla);
    }
  }
}

function changePosition() {
  do {
    eatX = Math.floor(Math.random() * 20) + 1;
    eatY = Math.floor(Math.random() * 20) + 1;
  } while (snakeBody.some(segment => segment[0] === eatX && segment[1] === eatY) || (snakeX === eatX && snakeY === eatY));
}


function initgame() {
  if(gameOver)return findejuego()
  
  let casilla = document.querySelector(`[style="grid-area: ${eatY} / ${eatX};"]`);
  casilla.className = "eat";

  if(snakeX==eatX && snakeY==eatY){
    soundeat()
    score++
    puntaje()
    changePosition()
    snakeBody.push([eatY,eatX])
    casilla.classList.remove("eat")
  }

  for(let i=snakeBody.length-1;i>0;i--){
    snakeBody[i]=[...snakeBody[i-1]]
  }

  snakeBody[0]=[snakeX,snakeY]
  snakeX += velocityX;
  snakeY += velocityY;

  //detecta si la serpiente coliciona con los bordes del tablero
  if(snakeX<=0|| snakeX>20 || snakeY<=0 || snakeY>20){
    gameOver=true
    findejuego()
    return
  }

  //detecta si la srpiente ha chocado con su propio cuerpo
  for(let i=1; i<snakeBody.length;i++){
    if(snakeX===snakeBody[i][0] && snakeY===snakeBody[i][1]){
      gameOver=true
    }
  }

  for(let i=0;i<snakeBody.length;i++){
    let cuerpoSnake = document.querySelector(`[style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]};"]`);
    cuerpoSnake.classList.add("snake");
  }

  board.querySelectorAll('.snake').forEach((segment) => {
    segment.classList.remove('snake');
  });

  // Agregar la clase "snake" a la cabeza de la serpiente
  let cabezaSnake = document.querySelector(`[style="grid-area: ${snakeY} / ${snakeX};"]`);
  cabezaSnake.classList.add("snake");
  for(let i=0;i<snakeBody.length;i++){
    let cuerpoSnake = document.querySelector(`[style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]};"]`);
    cuerpoSnake.classList.add("snake");
  }
  move=false

}

function  findejuego(){
  soundlose()
  clearInterval(setIntervalId)
  getName()
}

function getName(){
  const btn = document.getElementById('add-botton');
  const userInput = document.getElementById('input-user');
  const nameUser = document.getElementById('name-user');

  document.getElementById('name-user').style.display = 'flex';

  btn.addEventListener('click', () => {
    if (userInput.innerText.trim() === '') {
      alert('Please enter a name before proceeding.');
    } else {
      nameUser.style.display = 'none';
      tryAgainGame();

    }
  });


  btn.addEventListener('click', () =>{
    const newPlayer = {
      name: userInput.value,
      score: score
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
  points.innerText = score.toString();
}

const controlSnake = (e) => {
 if(move) return;
  move=true
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

createBoard();
changePosition()
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