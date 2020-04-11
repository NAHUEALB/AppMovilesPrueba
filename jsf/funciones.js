function apretarBoton() { 
	var url = 'http://newsapi.org/v2/top-headlines?' + 'country=ar&' + 'apiKey=41145be57b964f11a90511f640fa2eec';
	var req = new Request(url);

	fetch(req)
	.then(function(response) {
		return response.json();
	})
	.then(function(prueba) {
		var noticia = document.getElementById('noti')
		var noticias = prueba.articles;
		var noti = "";
		for ( var n=0; n<10; n++){
		
			noti += '<div class="in-flex"><br>autor: ' + noticias[n].author;
			noti += '<br>Titulo: ' + noticias[n].title;
			noti += '<br>Contenido ' + noticias[n].content;
			noti += '<br>Fecha: ' + noticias[n].publishedAt;
			noti += '<br>url: <a href=' + noticias[n].url + ' target="_blank">Link a la noticia</a></div>';

		}
	noticia.innerHTML = noti;
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