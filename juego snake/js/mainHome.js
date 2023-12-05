let ayuda = document.getElementById("ayuda");
let history = document.getElementById("history");
let historyConten=document.getElementById("historyConten")
let helpcontent = document.getElementById("helpcontent");

let salirhelp=document.getElementById("salirHelp")
let salirhistory=document.getElementById("salirHistory")

function mostrar(etiqueta, clase) {
  etiqueta.classList.add(clase);
}

function remover(etiqueta, clase) {
  etiqueta.classList.remove(clase);
}


ayuda.addEventListener("click", function () {
  mostrar(helpcontent, "helpmostrar");
  remover(historyConten,"historymostrar")

});
history.addEventListener("click",function(){
    mostrar(historyConten,"historymostrar")
    remover(helpcontent,"helpmostrar")
})

salirhelp.addEventListener("click",function(){
    remover(helpcontent,"helpmostrar")
})
salirhistory.addEventListener("click",function(){
    remover(historyConten,"historymostrar")
})

let playRedirigir = document.getElementById("play");

playRedirigir.addEventListener("click", function () {
    
        window.location.href = "../html/index.html";
    });