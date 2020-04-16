
function apretarBoton() { 

	var palabras_clave = String(document.getElementById('input-pc').value);
	var autor = String(document.getElementById('input-autor').value);
	var fecha = String(document.getElementById('input-date').value);
	var nuevo_divnoticia = document.getElementById('div-para-imprimir');
	var hubo_resultados = false;
	//Le paso como parametros el contenido de los input
	save_localStorage(autor,palabras_clave,fecha);

	
	var url = 'http://newsapi.org/v2/top-headlines?';
	if (palabras_clave != "") {
		url += "q=" + palabras_clave + "&";
	}
	url += "country=ar";

	var datenow = new Date();
	var fecha_now = datenow.getFullYear() + "-" 

	if (datenow.getMonth() < 10) { fecha_now += "0"; } 
	fecha_now += ((datenow.getMonth()) + 1) + "-";
	if (datenow.getDate() < 10) { fecha_now += "0"; } 
	fecha_now += datenow.getDate();

	url += '&apiKey=41145be57b964f11a90511f640fa2eec';
	
	var req = new Request(url);
	fetch(req)
	.then(function(response) {
		return response.json();
	})
	.then(function(prueba) {
		var noticias = prueba.articles;
		var lista_de_noticias = "";
		if (noticias.length > 0) {
			if ((autor != "" && autor != null) || fecha != "") {
				// Creamos un vector de noticias filtradas por autor
				var noticias_filtradas = [];
				for (var n=0; n<noticias.length; n++){
					if (autor != "" && ((String(noticias[n].author)).toLowerCase()).includes(autor.toLowerCase()) && fecha == "") {
						noticias_filtradas.push(noticias[n]);
					}
					else if (fecha != "" && (noticias[n].publishedAt).slice(0, 10) >= fecha && autor == "") {
						noticias_filtradas.push(noticias[n]);
					}
					else {
						if (((String(noticias[n].author)).toLowerCase()).includes(autor.toLowerCase()) && (noticias[n].publishedAt).slice(0, 10) >= fecha) {
							noticias_filtradas.push(noticias[n]);
						}
					}
				}
				if (noticias_filtradas.length > 0) {
					hubo_resultados = true;
					for ( var n=0; n<noticias_filtradas.length; n++){			
						lista_de_noticias += '<div class="in-flex" id="una-noticia">' +
							'<br><img src="' + noticias[n].urlToImage + '" height="190" width="280"><hr />' +
							'<br><a id="titulo-noticia" href='+ noticias_filtradas[n].url +' target="_blank">'+noticias[n].title+'</a>'+
							'<br><a id="una-noticia">Autor: ' + noticias_filtradas[n].author + '</a>' +
							'<br><a id="una-noticia">Fecha de publicación: ' + (noticias_filtradas[n].publishedAt).slice(0, 10) + '</a>' +
							'<br><a id="una-noticia" href=' + noticias_filtradas[n].url + ' target="_blank">Link a la noticia</a>' + 
							'<br><button class="boton-cheto" class="btn-abrir-popup" type="button" id="btn-abrir-popup" onclick="showModal()">Compartir</button>' +

							
							'</div>';

					}
				}
				else {

				}
			}			
			else {
				hubo_resultados = true;
				for ( var n=0; n<noticias.length; n++){		
					lista_de_noticias += '<div class="in-flex" id="una-noticia">' +
						'<br><img src="' + noticias[n].urlToImage + '" height="160" width="280"><hr />' +
						'<br><a id="titulo-noticia" href='+ noticias[n].url +' target="_blank">'+noticias[n].title+'</a>'+
						'<br><a id="una-noticia">Autor: ' + noticias[n].author + '</a>' +
						'<br><a id="una-noticia">Fecha de publicación: ' + (noticias[n].publishedAt).slice(0, 10) + '</a>' +
						'<br><a id="una-noticia" href=' + noticias[n].url + ' target="_blank">Link a la noticia</a>' + 
						'<br><button class="boton-cheto" class="btn-abrir-popup" type="button" id="btn-abrir-popup" onclick="showModal()">Compartir</button>' +
					'</div>';

				}
			}
		}
		if (hubo_resultados) {
			nuevo_divnoticia.innerHTML = lista_de_noticias;
		}
		else {
			nuevo_divnoticia.innerHTML = '<div class="in-flex">La búsqueda no arrojó resultados</div>';
		}
	
	});
}

function enviarModal() {
	document.getElementById('openModal').style.display = 'block';
}