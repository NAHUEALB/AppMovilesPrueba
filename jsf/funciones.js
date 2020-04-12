
function apretarBoton() { 

	var palabras_clave = String(document.getElementById('input-pc').value);
	var autor = String(document.getElementById('input-autor').value);
	var fecha = String(document.getElementById('input-date').value);
	var nuevo_divnoticia = document.getElementById('div-para-imprimir');
	var hubo_resultados = false;

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
			if (autor != "" || fecha != "") {
				// Creamos un vector de noticias filtradas por autor
				var noticias_filtradas = [];
				for (var n=0; n<noticias.length; n++){
					if (autor != "" && noticias[n].author == autor && fecha == "") {
						noticias_filtradas.push(noticias[n]);
					}
					else if (fecha != "" && (noticias[n].publishedAt).slice(0, 10) >= fecha && autor == "") {
						noticias_filtradas.push(noticias[n]);
					}
					else {
						if (noticias[n].author == autor && (noticias[n].publishedAt).slice(0, 10) >= fecha) {
							noticias_filtradas.push(noticias[n]);
						}
					}
				}
				if (noticias_filtradas.length > 0) {
					hubo_resultados = true;
					console.log("hubo resultados con alguno o ambos filtros jejejeje");
					for ( var n=0; n<noticias_filtradas.length; n++){			
						lista_de_noticias += '<div class="in-flex" id="una-noticia">' +
							'<br><img src="' + noticias[n].urlToImage + '" height="190" width="280"><hr />' +
							'<br><a id="titulo-noticia" href='+ noticias_filtradas[n].url +' target="_blank">'+noticias[n].title+'</a>'+
							'<br><a id="una-noticia">Autor: ' + noticias_filtradas[n].author + '</a>' +
							'<br><a id="una-noticia">Fecha de publicación: ' + (noticias_filtradas[n].publishedAt).slice(0, 10) + '</a>' +
							'<br><a id="una-noticia" href=' + noticias_filtradas[n].url + ' target="_blank">Link a la noticia</a>' + 
							'<br><button class="boton-cheto" class="btn-abrir-popup" type="button" id="btn-abrir-popup">Compartir</button>' +

							
							'</div>';
					}
				}
				else {
					console.log("de tanto filtro dejamos cero");
				}
			}			
			else {
				hubo_resultados = true;
				console.log("como no hubo filtros traemos todo");
				for ( var n=0; n<noticias.length; n++){		
					lista_de_noticias += '<div class="in-flex" id="una-noticia">' +
						'<br><img src="' + noticias[n].urlToImage + '" height="160" width="280"><hr />' +
						'<br><a id="titulo-noticia" href='+ noticias[n].url +' target="_blank">'+noticias[n].title+'</a>'+
						'<br><a id="una-noticia">Autor: ' + noticias[n].author + '</a>' +
						'<br><a id="una-noticia">Fecha de publicación: ' + (noticias[n].publishedAt).slice(0, 10) + '</a>' +
						'<br><a id="una-noticia" href=' + noticias[n].url + ' target="_blank">Link a la noticia</a>' + 
						'<br><button class="boton-cheto" class="btn-abrir-popup" type="button" id="btn-abrir-popup">Compartir</button>' +
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


				

							



/* 
		var res = response.json();
		console.log(res);
		document.getElementById("resultado").textContent = response;



	fetch('https://www.hatchways.io/api/assessment/students')
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    var divOut = document.getElementById('txtOut');
    var allStudents = myJson.students;
    var txtOut = "";
    for (var k in allStudents) {
      txtOut += `<b>${allStudents[k].firstName}</b><br />`;
      txtOut += `email: ${allStudents[k].email}<br />`;
      txtOut += `Company: ${allStudents[k].company}<br />`;
      txtOut += `Skill: ${allStudents[k].skill}<br />`;
      txtOut += `Average: ${allStudents[k].grades}<br />`;
      txtOut += `<img src="${allStudents[k].pic}"><hr />`;
    }
    divOut.innerHTML = txtOut;
  });
	

*/