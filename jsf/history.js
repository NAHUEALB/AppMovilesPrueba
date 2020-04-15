var searchList = [];


function save_localStorage(author,word,date){

    
    console.log(author,word,date);
    //Meto en la lista search los valores de author y word en la lista
    //Creo el elemento de la lista
    var search = {
        palabra_clave: word,
        autor: author,
        fecha: date
    };
    
    //Lo gestiono tipo FILA
    if( searchList.length == 5){
        //Elimino el primero en llegar
        searchList.pop();
    }
    
    searchList.unshift(search);
    addLocalStorage(searchList);

    get_localStorage();
    
    }

//Agrego a localStorage la lista de busquedas
function addLocalStorage(SList){

    localStorage.setItem('Lista de Busquedas', JSON.stringify(SList));
}

 //LocalStorage solo interpresa strings, se parsea con el JSON
 //localStorage.setItem("Search", JSON.stringify(search));

 //Recupero los elementos de la lista
 function get_localStorage(){
    var tendencias = document.getElementById('prueba-tendendencias');
    var listSearch = localStorage.getItem('Lista de Busquedas');
    console.log(listSearch);
     if ( listSearch == null ){
        tendencias.innerHTML = '<div class="in-flex">No busco nada recientemente</div>'
     }
     else{
        searchList = JSON.parse(listSearch);
        var contenido = "";
        console.log(searchList[0].fecha);
        for( let i=0; i < searchList.length; i++ ){
            console.log(listSearch);
            
        contenido += '<a id="boton-'+i+'" onclick="get_Value('+i+')"><span>'+ searchList[i].palabra_clave  +'<br>'+searchList[i].autor+'</span></a>'; 
        }
        tendencias.innerHTML = contenido;

     }



 }

 //Retorno el valor del boton a los input
 function get_Value(index){
    console.log(index);


    document.getElementById('input-pc').value = searchList[index].palabra_clave;
    document.getElementById('input-autor').value = searchList[index].autor;
    document.getElementById('input-date').value = searchList[index].fecha;


   // apretarBoton();
 }