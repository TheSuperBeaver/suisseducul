var personnes = []
var objets = []
var lieux = []
var quands = []
var verbes = []

var quand;
var personne1;
var personne2;
var personne3;
var verbe;
var objet;
var lieu;

function loadData() {
	var urlPersonnes = "https://spreadsheets.google.com/feeds/list/1-Z1JsVYIIudA6aWKqfz1GYhwSrRfvTnGmCj1H3wgdOs/1/public/values?alt=json";
	var urlLieux = "https://spreadsheets.google.com/feeds/list/1-Z1JsVYIIudA6aWKqfz1GYhwSrRfvTnGmCj1H3wgdOs/2/public/values?alt=json";
	var urlObjets = "https://spreadsheets.google.com/feeds/list/1-Z1JsVYIIudA6aWKqfz1GYhwSrRfvTnGmCj1H3wgdOs/3/public/values?alt=json";
	var urlQuand = "https://spreadsheets.google.com/feeds/list/1-Z1JsVYIIudA6aWKqfz1GYhwSrRfvTnGmCj1H3wgdOs/4/public/values?alt=json";
	var urlVerbe = "https://spreadsheets.google.com/feeds/list/1-Z1JsVYIIudA6aWKqfz1GYhwSrRfvTnGmCj1H3wgdOs/5/public/values?alt=json";
    
	getJson(urlPersonnes, personnes, 'gsx$personne');
	getJson(urlLieux, lieux, 'gsx$lieux');
	getJson(urlObjets, objets, 'gsx$objet');
	getJson(urlQuand, quands, 'gsx$quand');
	getJson(urlVerbe, verbes, 'gsx$verbe');
}

function getJson(url, list, fieldName) {
  $.getJSON(url, function(data) {						  
    var sheetData = data.feed.entry;
	var i;
	for (i = 0; i < sheetData.length; i++) {
		var value = data.feed.entry[i][fieldName]['$t'];
		list.push(value);
	}
  });
}
function randomQuand() {
	quand = quands[Math.floor(Math.random() * quands.length)];
}
function randomPersonne1() {
	personne1 = personnes[Math.floor(Math.random() * personnes.length)];
}
function randomPersonne2() {
	personne2 = personnes[Math.floor(Math.random() * personnes.length)];
}
function randomPersonne3() {
	personne3 = personnes[Math.floor(Math.random() * personnes.length)];
}
function randomVerbe() {
	verbe = verbes[Math.floor(Math.random() * verbes.length)];
}
function randomObjet() {
	objet = objets[Math.floor(Math.random() * objets.length)];
}
function randomLieu() {
	lieu = lieux[Math.floor(Math.random() * lieux.length)];
}
function replacePhrase() {
	phrase = quand + " " + lieu + " " + personne1 + " et " + personne2 + " " + verbe + " " + objet + " de " + personne3;
	var textWrapper = document.querySelector('.ml11 .letters');
	textWrapper.innerHTML = phrase;
	
}

var showText = function (target, message, index, interval) {   
  if (index < message.length) {
    $(target).append(message[index++]);
    setTimeout(function () { showText(target, message, index, interval); }, interval);
  }
}

function generePhrase() {
	randomQuand();
	randomPersonne1();
	randomPersonne2();
	randomPersonne3();
	randomVerbe();
	randomObjet();
	randomLieu();
	replacePhrase();
}