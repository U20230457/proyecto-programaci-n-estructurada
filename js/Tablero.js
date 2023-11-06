let cuadrilla = document.querySelector(".screen")
let tryAgain = document.getElementById("try-again")
let printScore = document.getElementById("score")

let indiceActual = 0
let indiceManzana = 0
let serpienteActual = [2,1,0]
let direcction = 1
let score = 0
let speed = 0.8
let intervalTime = 0
let interval = 0

document.addEventListener("loaderContent", ()=>{
    document.addEventListener("keyup",control)
    createTable()
    startGame()
})

let point = document.getElementById("po")

point.innerHTML = "<span>30</span>"