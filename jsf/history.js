var searchList = [];


function save_localStorage(author,word){

    console.log(author,word);
    //Meto en la lista search los valores de author y word en la lista
    //Creo el elemento de la lista
    var search = {
        palabra_clave: word,
        autor: author,
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
    var segundo = document.getElementById('segunda-busqueda')
    console.log(listSearch);
     if ( listSearch == null ){
        tendencias.innerHTML = '<div class="in-flex">No busco nada recientemente</div>'
     }
     else{
        searchList = JSON.parse(listSearch);
        var contenido = "";
        for( let i=0; i < searchList.length; i++ ){
            console.log(listSearch);
            
        contenido += '<button class="in-flex">'+ searchList[i].palabra_clave  +'</button>'; 
        }
        tendencias.innerHTML = contenido;

     }



 }