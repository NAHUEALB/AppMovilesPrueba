function apretarBoton() { 
	var url = 'http://newsapi.org/v2/top-headlines?' + 'country=ar&' + 'apiKey=41145be57b964f11a90511f640fa2eec';
	var req = new Request(url);
	fetch(req)
	.then(function(response) {
		console.log(response.json());
		document.getElementById("resultado").textContent = response;
	})
}