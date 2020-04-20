var divParaNoticias = document.getElementById('div-para-imprimir');
var divParaBotones = document.getElementById("div-para-botones-paginas");
var pag = 0;
var maxPags = 0;
var articulos = [];
var noticias_filtradas = [];

function dibujarHtmlParaNoticias() {
	var divParaNoticias = document.getElementById('div-para-imprimir');
		divParaNoticias.innerHTML = '<div style="background-color: rgba(50,255,50, 0.2);" id="div-resultado-busqueda">Se encontraron '+noticias_filtradas.length+' resultados</div>';
	var htmlParaNoticias = "";
	for (let i=(pag*10)-10; i<(pag*10); i++) {	
		if (noticias_filtradas[i] != (null && undefined)) {	
			htmlParaNoticias += '<div class="in-flex" id="una-noticia">' +
			'<br><img src="' + articulos[i].urlToImage + '" height="160" width="280"><hr />' +
			'<br><a id="titulo-noticia" href='+ noticias_filtradas[i].url +' target="_blank">'+articulos[i].title+'</a>'+
			'<br><a id="una-noticia">Autor: ' + noticias_filtradas[i].author + '</a>' +
			'<br><a id="una-noticia">Fecha de publicación: ' + (noticias_filtradas[i].publishedAt).slice(0, 10) + '</a>' +
			'<br><a id="una-noticia" href=' + noticias_filtradas[i].url + ' target="_blank">Link a la noticia</a>' + 
			'<br><button class="boton-cheto" class="btn-abrir-popup" type="button" id="btn-abrir-popup" onclick="showModal('+i+')">Compartir</button>' +
			'</div>';
			divParaNoticias = document.getElementById('div-para-imprimir');
			divParaNoticias.innerHTML = htmlParaNoticias; // dibujar html
		}
	}

	var htmlParaBotones = '<button class="boton-cheto" type="button" id="boton-prev" onclick="paginaPrevia()"> < </button>' +
	'<a id="numerador-paginas">' + pag + ' de ' + maxPags + '</a>' +
	'<button class="boton-cheto" type="button" id="boton-next" onclick="paginaSiguiente()"> > </button>';
	divParaBotones.innerHTML = htmlParaBotones;
	document.location.href = '#div-resultado-busqueda';

}

function paginaPrevia() {
	pag--;

	dibujarHtmlParaNoticias(); // función donde se imprimen todas las noticias obtenidas

	document.getElementById("boton-next").disabled = false; // el botón "siguiente" se activa
	(document.getElementById("boton-next")).classList.remove("boton-desactivado"); 
	if (pag == 1) { 
		document.getElementById("boton-prev").disabled = true;
		(document.getElementById("boton-prev")).classList.add("boton-desactivado"); 
	}
	else { 
		document.getElementById("boton-prev").disabled = false;
		(document.getElementById("boton-prev")).classList.remove("boton-desactivado"); 
	}
}

function paginaSiguiente() {
	pag++;

	dibujarHtmlParaNoticias(); // función donde se imprimen todas las noticias obtenidas
	
	document.getElementById("boton-prev").disabled = false; // el botón "previa" se activa
	(document.getElementById("boton-prev")).classList.remove("boton-desactivado"); 
	if (pag == maxPags) { 
		document.getElementById("boton-next").disabled = true;
		(document.getElementById("boton-next")).classList.add("boton-desactivado"); 
	}
	else { 
		document.getElementById("boton-next").disabled = false;
		(document.getElementById("boton-next")).classList.remove("boton-desactivado"); 
	}
}

function buscarNoticias() { 

	var palabras_clave = String(document.getElementById('input-pc').value);
	var autor = String(document.getElementById('input-autor').value);
	var fecha = String(document.getElementById('input-date').value);
	var hubo_resultados = false;

	// Le paso como parametros el contenido de los input
	save_localStorage(autor,palabras_clave,fecha);

	// se define el contenido de la url para la api
	var url = 'http://newsapi.org/v2/everything?q=';

	if (palabras_clave != "") { 
		url += palabras_clave; 
		if (fecha != "") {

			//Formateado yyyy-mm-dd asi lo entiende la api
			var datenow = new Date(); //Fecha del sistema
			var fecha_now = datenow.getFullYear() + "-" 
			if (datenow.getMonth() < 10) { fecha_now += "0"; } 
			fecha_now += ((datenow.getMonth()) + 1) + "-";
			if (datenow.getDate() < 10) { fecha_now += "0"; } 
			fecha_now += datenow.getDate();

	 		url += '&from=' + fecha + '&to=' + fecha_now;
		}
		
		url += '&pageSize=100&language=es&apiKey=41145be57b964f11a90511f640fa2eec';
		console.log(url);
		
		var pedidoApi = new Request(url);
		fetch(pedidoApi)
		.then(function(response) {
			return response.json();
		})
		.then(function(resultadoBusqueda) {
			divParaBotones = document.getElementById("div-para-botones-paginas");
			articulos = resultadoBusqueda.articles;

			if (articulos.length > 0) {
				if (autor != ("" && null)) {
					// inicializamos las noticias filtradas por último por autor
					noticias_filtradas = [];
					for (var n=0; n<articulos.length; n++){
						// si el autor coincide pero la fecha está vacía, se guarda por el autor
						if (autor != "" && ((String(articulos[n].author)).toLowerCase()).includes(autor.toLowerCase())) {
							noticias_filtradas.push(articulos[n]);
						}
					}
					if (noticias_filtradas.length > 0) {
						// si tras aplicar los filtros hay algún resultado, se dibuja el html
						hubo_resultados = true;
					}
				}
				else {
					// para el caso donde no hay filtros y se trae todo
					hubo_resultados = true;
					noticias_filtradas = articulos;
				}
			}

			if (hubo_resultados) {
				pag = 1;
				maxPags = Math.floor(noticias_filtradas.length/10);
				if (maxPags == 0) {
					maxPags = 1;
				}

				document.getElementById("div-resultado-busqueda").style.visibility = "visible";

				dibujarHtmlParaNoticias(); // función donde se imprimen todas las noticias obtenidas

				document.getElementById("boton-prev").style.visibility = "visible";
				document.getElementById("boton-next").style.visibility = "visible";
				if (pag == 1) { 
					document.getElementById("boton-prev").disabled = true;
					(document.getElementById("boton-prev")).classList.add("boton-desactivado");
					}
				else { 
					document.getElementById("boton-prev").disabled = false;
					(document.getElementById("boton-prev")).classList.remove("boton-desactivado"); 
				}

				if (pag == maxPags) { 
					document.getElementById("boton-next").disabled = true;
					(document.getElementById("boton-next")).classList.add("boton-desactivado");
				}
				else { 
					document.getElementById("boton-next").disabled = false;
					(document.getElementById("boton-next")).classList.remove("boton-desactivado");
				}
				var divParaNoticias = document.getElementById('div-resultado-busqueda');
				divParaNoticias.innerHTML = '<div style="background-color: rgba(50,255,50, 0.2);">Te traemos los mejores '+noticias_filtradas.length+' resultados</div>';
			}
			else { 
				pag = 0; maxPags = 0; // volvemos a definirlas en cero por las dudas

				document.getElementById("div-resultado-busqueda").style.visibility = "visible";

				var divParaNoticias = document.getElementById('div-resultado-busqueda');
				divParaNoticias.innerHTML = '<div style="background-color: rgba(255,200,50, 0.2);">La búsqueda no arrojó resultados</div>';
				if (document.getElementById("boton-prev") != null) {
					document.getElementById("boton-prev").style.visibility = "hidden";
				}
				if (document.getElementById("boton-next") != null) {
					document.getElementById("boton-next").style.visibility = "hidden";
				}
			}
			console.log(pag + " de " + maxPags + ", " + noticias_filtradas.length + " resultados.");
		})
	}
	else {
				
		// MEJORAR EL ESTILO VISUAL DE ESTE DIV DE "NO RESULTADOS"
		pag = 0; maxPags = 0; // volvemos a definirlas en cero por las dudas

		document.getElementById("div-resultado-busqueda").style.visibility = "visible";

		var divParaNoticias = document.getElementById('div-resultado-busqueda');
		divParaNoticias.innerHTML = '<div style="background-color: rgba(255,50,50, 0.2);">Por favor ingrese algo a buscar</div>';

		if (document.getElementById("boton-prev") != null) {
			document.getElementById("boton-prev").style.visibility = "hidden";
		}
		if (document.getElementById("boton-next") != null) {
			document.getElementById("boton-next").style.visibility = "hidden";
		}
	}
}

function elegirPregunta() {
	let randomquestion = Math.floor((Math.random() * 5) + 1);
	let plh = "";
	switch (randomquestion) {
		case 1: plh = "¿Qué buscamos hoy?"; document.getElementById("input-pc").placeholder = plh; break;
		case 2: plh = "Quien busca encuentra"; document.getElementById("input-pc").placeholder = plh; break;
		case 3: plh = "¿Con qué vendrás hoy?"; document.getElementById("input-pc").placeholder = plh; break;
		case 4: plh = "¿En qué puedo ayudarte?"; document.getElementById("input-pc").placeholder = plh; break;
		case 5: plh = "¿Qué querés encontrar?"; document.getElementById("input-pc").placeholder = plh; break;
	}
}


//FUNCIONES DEL MODAL

function showModal(index) {
	//Modifica el css el estado display de ModalDialog
	document.getElementById('openModal').style.display = 'block';
	//Tomando la url de la noticia compartida
	let url = noticias_filtradas[index].url;

    document.getElementById('mensaje').innerHTML= 'Un amigo quiere que veas esta noticia: '+url;

  }
  
  function CloseModal() {
    document.getElementById('openModal').style.display = 'none';
  }

  function ocultarPopup(){
    let ICE = document.getElementById('input-correo-emisor').value;
    let ICR = document.getElementById('input-correo-receptor').value;

    if ( ICE.includes("@") && ICR.includes("@")){
      alert("EMAIL ENVIADO");
      document.getElementById('openModal').style.display = 'none';
    }
  }
