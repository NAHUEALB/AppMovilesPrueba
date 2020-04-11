function apretarBoton() { 

	var palabras_clave = String(document.getElementById('input-pc').value);
	var autor = String(document.getElementById('input-autor').value);
	var divnoticia = document.getElementById('div-para-imprimir');
	var hubo_resultados = false;

	var url = 'http://newsapi.org/v2/top-headlines?';
	if (palabras_clave != "") {
		url += "q=" + palabras_clave + "&";
	}
	url += "country=ar";
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
			if (autor != "") {
				// Creamos un vector de noticias filtradas por autor
				var noticias_filtradas = [];
				for (var n=0; n<noticias.length; n++){	
					console.log(autor);
					console.log(noticias[n].author);
					if (noticias[n].author == autor) {
						noticias_filtradas.push(noticias[n]);
					}
				}
				if (noticias_filtradas.length > 0) {
					hubo_resultados = true;
					console.log("hubo resultados jejejeje");
					for ( var n=0; n<noticias_filtradas.length; n++){			
						lista_de_noticias += '<div class="in-flex"><br>Autor: ' + noticias_filtradas[n].author;
						lista_de_noticias += '<br>Titulo: ' + noticias_filtradas[n].title;
						lista_de_noticias += '<br>Contenido ' + noticias_filtradas[n].content;
						lista_de_noticias += '<br>Fecha: ' + noticias_filtradas[n].publishedAt;
						lista_de_noticias += '<br>url: <a href=' + noticias_filtradas[n].url + ' target="_blank">Link a la noticia</a></div>';
					}
				}
				else {
					console.log("hubo noticias pero no de ese autor");
				}
			}
			else {
				hubo_resultados = true;
				console.log("hubo resultados encima sin autor");
				for ( var n=0; n<noticias.length; n++){			
					lista_de_noticias += '<div class="in-flex"><br>Autor: ' + noticias[n].author;
					lista_de_noticias += '<br>Titulo: ' + noticias[n].title;
					lista_de_noticias += '<br>Contenido ' + noticias[n].content;
					lista_de_noticias += '<br>Fecha: ' + noticias[n].publishedAt;
					lista_de_noticias += '<br>url: <a href=' + noticias[n].url + ' target="_blank">Link a la noticia</a></div>';
				}
			}
		}
		else {
			console.log("no hubo ni noticias genericas");
		}
	if (hubo_resultados) {
		divnoticia.innerHTML = lista_de_noticias;
	}
	else {
		divnoticia.innerHTML = '<div class="in-flex">No hubo resultados</div>';
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