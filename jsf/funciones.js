var divParaNoticias = document.getElementById('div-para-imprimir');
var divParaBotones = document.getElementById("div-para-botones-paginas");
var pag = 0;
var maxPags = 0;
var articulos = [];
var noticias_filtradas = [];

function dibujarHtmlParaNoticias() {
	console.log ("hola mundo");
}

function paginaPrevia() {
	pag--;
	var htmlParaNoticias = "";
	for (let i=(pag*10)-10; i<(pag*10); i++) {	
		if (noticias_filtradas[i] != (null && undefined)) {	
			htmlParaNoticias += '<div class="in-flex" id="una-noticia">' +
			'<br><img src="' + articulos[i].urlToImage + '" height="160" width="280"><hr />' +
			'<br><a id="titulo-noticia" href='+ noticias_filtradas[i].url +' target="_blank">'+articulos[i].title+'</a>'+
			'<br><a id="una-noticia">Autor: ' + noticias_filtradas[i].author + '</a>' +
			'<br><a id="una-noticia">Fecha de publicación: ' + (noticias_filtradas[i].publishedAt).slice(0, 10) + '</a>' +
			'<br><a id="una-noticia" href=' + noticias_filtradas[i].url + ' target="_blank">Link a la noticia</a>' + 
			'<br><button class="boton-cheto" class="btn-abrir-popup" type="button" id="btn-abrir-popup" onclick="showModal()">Compartir</button>' +
			'</div>';
			divParaNoticias.innerHTML = htmlParaNoticias; // dibujar html
		}
	}

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
	var htmlParaNoticias = "";
	for (let i=(pag*10)-10; i<(pag*10); i++) {	
		if (noticias_filtradas[i] != (null && undefined)) {	
			htmlParaNoticias += '<div class="in-flex" id="una-noticia">' +
			'<br><img src="' + articulos[i].urlToImage + '" height="160" width="280"><hr />' +
			'<br><a id="titulo-noticia" href='+ noticias_filtradas[i].url +' target="_blank">'+articulos[i].title+'</a>'+
			'<br><a id="una-noticia">Autor: ' + noticias_filtradas[i].author + '</a>' +
			'<br><a id="una-noticia">Fecha de publicación: ' + (noticias_filtradas[i].publishedAt).slice(0, 10) + '</a>' +
			'<br><a id="una-noticia" href=' + noticias_filtradas[i].url + ' target="_blank">Link a la noticia</a>' + 
			'<br><button class="boton-cheto" class="btn-abrir-popup" type="button" id="btn-abrir-popup" onclick="showModal()">Compartir</button>' +
			'</div>';
			divParaNoticias.innerHTML = htmlParaNoticias; // dibujar html
		}
	}

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
	var url = 'http://newsapi.org/v2/top-headlines?';
	if (palabras_clave != "") { url += "q=" + palabras_clave + "&" }
	url += "country=ar";
	var datenow = new Date();
	var fecha_now = datenow.getFullYear() + "-" 
	if (datenow.getMonth() < 10) { fecha_now += "0"; } 
	fecha_now += ((datenow.getMonth()) + 1) + "-";
	if (datenow.getDate() < 10) { fecha_now += "0"; } 
	fecha_now += datenow.getDate();
	url += '&apiKey=41145be57b964f11a90511f640fa2eec';
	
	var pedidoApi = new Request(url);
	fetch(pedidoApi)
	.then(function(response) {
		return response.json();
	})
	.then(function(resultadoBusqueda) {
		var htmlParaNoticias = "";
		divParaNoticias = document.getElementById('div-para-imprimir');
		divParaBotones = document.getElementById("div-para-botones-paginas");
		articulos = resultadoBusqueda.articles;
		if (articulos.length > 0) {

			if ((autor != ("" && null)) || fecha != "") {

				// inicializamos las noticias filtradas por autor o por fecha
				noticias_filtradas = [];
				for (var n=0; n<articulos.length; n++){
					// si el autor coincide pero la fecha está vacía, se guarda por el autor
					if (autor != "" && ((String(articulos[n].author)).toLowerCase()).includes(autor.toLowerCase()) && fecha == "") {
						noticias_filtradas.push(articulos[n]);
					}
					// sino, si falta el autor pero se ingresó alguna fecha, se guarda según fecha
					else if (fecha != "" && (articulos[n].publishedAt).slice(0, 10) >= fecha && autor == "") {
						noticias_filtradas.push(articulos[n]);
					}
					else {
						// sino, si se ingresaron ambos filtros, deben cumplirse ambos para guardar
						if (((String(articulos[n].author)).toLowerCase()).includes(autor.toLowerCase()) && (articulos[n].publishedAt).slice(0, 10) >= fecha) {
							noticias_filtradas.push(articulos[n]);
						}
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
			for (let n=(pag-1); n<(pag*10); n++) {	
				if (noticias_filtradas[n] != (null && undefined)) {	
					htmlParaNoticias += '<div class="in-flex" id="una-noticia">' +
					'<br><img src="' + articulos[n].urlToImage + '" height="160" width="280"><hr />' +
					'<br><a id="titulo-noticia" href='+ noticias_filtradas[n].url +' target="_blank">'+articulos[n].title+'</a>'+
					'<br><a id="una-noticia">Autor: ' + noticias_filtradas[n].author + '</a>' +
					'<br><a id="una-noticia">Fecha de publicación: ' + (noticias_filtradas[n].publishedAt).slice(0, 10) + '</a>' +
					'<br><a id="una-noticia" href=' + noticias_filtradas[n].url + ' target="_blank">Link a la noticia</a>' + 
					'<br><button class="boton-cheto" class="btn-abrir-popup" type="button" id="btn-abrir-popup" onclick="showModal()">Compartir</button>' +
					'</div>';
				}
			}
			divParaNoticias.innerHTML = htmlParaNoticias; // dibujar html

			var htmlParaBotones = '<button class="boton-cheto" type="button" id="boton-prev" onclick="paginaPrevia()">< Previa</button>' +
				'<button class="boton-cheto" type="button" id="boton-next" onclick="paginaSiguiente()">Siguiente ></button>';
			divParaBotones.innerHTML = htmlParaBotones;
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
		}
		else { 

			// MEJORAR EL ESTILO VISUAL DE ESTE DIV DE "NO RESULTADOS"
			pag = 0; maxPags = 0; // volvemos a definirlas en cero por las dudas
			divParaNoticias.innerHTML = '<div class="in-flex">La búsqueda no arrojó resultados</div>';
			document.getElementById("boton-prev").style.visibility = "hidden";
			document.getElementById("boton-next").style.visibility = "hidden";
		}

		console.log(pag + " de " + maxPags + ", " + noticias_filtradas.length + " resultados.");

	})
}



//function ocultar() {
//	document.getElementById('openModal').style.visibility = 'hidden';
//}

