let searchList = [];


function save_localstorage(author,word){

    console.log(author,word);

    //Creo el elemento de la lista
    var search = {
        palabra_clave: word,
        autor: author,
    };
    
    
    if( searchList.length == 5){
        searchList.pop();
    }
    searchList.unshift(search);
    addLocalStorage(searchList);
    
    }

//Agrego a localStorage la lista de busquedas
function addLocalStorage(SList){

    localStorage.setItem('Lista de Busquedas', JSON.stringify(SList));
}

 //LocalStorage solo interpresa strings, se parsea con el JSON
 //localStorage.setItem("Search", JSON.stringify(search));