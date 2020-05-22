var personnes = []
var objets = []
var lieux = []

function loadData() {
	
	var urlPersonnes = "https://spreadsheets.google.com/feeds/list/1-Z1JsVYIIudA6aWKqfz1GYhwSrRfvTnGmCj1H3wgdOs/1/public/values?alt=json";
	var urlLieux = "https://spreadsheets.google.com/feeds/list/1-Z1JsVYIIudA6aWKqfz1GYhwSrRfvTnGmCj1H3wgdOs/2/public/values?alt=json";
	var urlObjets = "https://spreadsheets.google.com/feeds/list/1-Z1JsVYIIudA6aWKqfz1GYhwSrRfvTnGmCj1H3wgdOs/3/public/values?alt=json";
                      
	$.getJSON(urlPersonnes, function(data) {						  
        var sheetData = data.feed.entry;
        var i;
        for (i = 0; i < sheetData.length; i++) {
          var name = data.feed.entry[i]['gsx$personne']['$t'];		  
		  personnes.push(name);
        }
      });
	$.getJSON(urlLieux, function(data) {						  
        var sheetData = data.feed.entry;
		var i;
        for (i = 0; i < sheetData.length; i++) {
          var lieu = data.feed.entry[i]['gsx$lieux']['$t'];		  
		  lieux.push(lieu);
        }
      });
	$.getJSON(urlObjets, function(data) {						  
        var sheetData = data.feed.entry;
		var i;
        for (i = 0; i < sheetData.length; i++) {
          var objet = data.feed.entry[i]['gsx$objet']['$t'];		  
		  objets.push(objet);
        }
      });
}
	  
function getPersonne() {
	$("#personne").removeClass('d-none');
	var random = personnes[Math.floor(Math.random() * personnes.length)];
	document.getElementById("personne").innerHTML=random;
}
	
function getObjet() {
	$("#objet").removeClass('d-none');
	var random = objets[Math.floor(Math.random() * objets.length)];
	document.getElementById("objet").innerHTML=random;
}
	
function getLieu() {
	$("#lieu").removeClass('d-none');
	var random = lieux[Math.floor(Math.random() * lieux.length)];
	document.getElementById("lieu").innerHTML=random;
}