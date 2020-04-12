console.log("Entre");
var btnAbrirPopUp = document.getElementById('btn-abrir-popup');
var overlay = document.getElementById('overlay');
var popup = document.getElementById('popup');
var btnCerrarPopUp = document.getElementById('btn-cerrar-popup');

console.log("probe el primer boton");

console.log(btnAbrirPopUp);
    btnAbrirPopUp.addEventListener('click', function(){
        console.log("abriendo popup");
        overlay.classList.add('active');
        popup.classList.add('active');

    });
console.log("A probar el segundo boton");

console.log(btnCerrarPopUp);
    btnCerrarPopUp.addEventListener('click', function(e){
        e.preventDefault();
        console.log("cerrando popup");
        overlay.classList.remove('active');
        popup.classList.remove('active');
    });


    var x = document.getElementById("btn-abrir-popup"); 
    x.addEventListener("mouseover", myFunction);
    x.addEventListener("click", mySecondFunction);
    x.addEventListener("mouseout", myThirdFunction);
    
    function myFunction() {
        console.log("Moused over!");
      /*document.getElementById("demo").innerHTML += "Moused over!<br>";*/
    }
    
    function mySecondFunction() {
        console.log("clicked!");
      //document.getElementById("demo").innerHTML += "Clicked!<br>";
    }
    
    function myThirdFunction() {
        console.log("tu vieja");
     //document.getElementById("demo").innerHTML += "Moused out!<br>";
    }