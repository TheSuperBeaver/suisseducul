var personnes = []
var objets = []
var lieux = []
var quands = []
var verbesPluriel = []
var verbesSingulier = []

var quand;
var personnesChoisies = [];
var verbe;
var objet;
var lieu;

var urlPersonnes = "https://spreadsheets.google.com/feeds/list/1-Z1JsVYIIudA6aWKqfz1GYhwSrRfvTnGmCj1H3wgdOs/1/public/values?alt=json";
var urlLieux = "https://spreadsheets.google.com/feeds/list/1-Z1JsVYIIudA6aWKqfz1GYhwSrRfvTnGmCj1H3wgdOs/2/public/values?alt=json";
var urlObjets = "https://spreadsheets.google.com/feeds/list/1-Z1JsVYIIudA6aWKqfz1GYhwSrRfvTnGmCj1H3wgdOs/3/public/values?alt=json";
var urlQuand = "https://spreadsheets.google.com/feeds/list/1-Z1JsVYIIudA6aWKqfz1GYhwSrRfvTnGmCj1H3wgdOs/4/public/values?alt=json";
var urlVerbe = "https://spreadsheets.google.com/feeds/list/1-Z1JsVYIIudA6aWKqfz1GYhwSrRfvTnGmCj1H3wgdOs/5/public/values?alt=json";

getJson(urlPersonnes, personnes, 'gsx$personne');
getJson(urlLieux, lieux, 'gsx$lieux');
getJson(urlObjets, objets, 'gsx$objet');
getJson(urlQuand, quands, 'gsx$quand');
getJson(urlVerbe, verbesPluriel, 'gsx$verbe');
getJson(urlVerbe, verbesSingulier, 'gsx$singulier');

$('.text-carousel').carousel({
	interval: false,
	pause: "hover"
});

function getJson(url, list, fieldName) {
  $.getJSON(url, function(data) {						  
    var sheetData = data.feed.entry;
	var i;
	for (i = 0; i < sheetData.length; i++) {
		var value = data.feed.entry[i][fieldName]['$t'];
		list.push(value);
	}
	
	if (hasElements(list)) {
		finishedLoadingList();
	}
  });
}

function hasElements(list) {
	return typeof list !== 'undefined' && list.length > 0;
}

function finishedLoadingList() {
	if(hasElements(personnes) && hasElements(objets) && hasElements(lieux) && hasElements(quands) && hasElements(verbesSingulier) && hasElements(verbesPluriel)) {
		regenerate();
	}		
}

function regenerate() {
	$("#phrase").html(getPhrase(true));

    randomImage();
}

function randomImage() {
	var image = $("#image");
    image.fadeOut('fast', function () {
        image.attr('src', 'img/img'+getRandomInt(1,52)+'.jpg');
        image.fadeIn('fast');
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function autrePersonnes() {
	$("#phrase").html(getPhrase(false));
}

function getPhrase(changePhrase) {
	
	if(changePhrase) {
		quand = _.sampleSize(quands, 1);
		lieu = _.sampleSize(lieux, 1);
		objet = _.sampleSize(objets, 1);
		verbePluriel = _.sampleSize(verbesPluriel, 1)
		verbeSingulier = _.sampleSize(verbesSingulier, 1)
	}
	
	if(Math.random() >= 0.5) { // 50% 2 personnes, 50% 3 personnes
		personnesChoisies = _.sampleSize(personnes, 3)		
		return quand + " " + lieu + ", <b>" + personnesChoisies[0] + "</b> et <b>" + personnesChoisies[1] + "</b> " + verbePluriel + " " + objet + getDe(personnesChoisies[2]) + "<b>" + personnesChoisies[2] + "</b>";
	} else {
		personnesChoisies = _.sampleSize(personnes, 2)
		return quand + " " + lieu + ", <b>" + personnesChoisies[0] + "</b> " + verbeSingulier + " " + objet + getDe(personnesChoisies[1]) + "<b>" + personnesChoisies[1] + "</b>";
	}
}

function getDe(personne) {
	var vowelRegex = '^[aieouAIEOU].*';
	var matched = personne.match(vowelRegex);
	if(matched) {
		return " d'";
	} else {
		return " de ";
	}
}

var showText = function (target, message, index, interval) {   
  if (index < message.length) {
    $(target).append(message[index++]);
    setTimeout(function () { showText(target, message, index, interval); }, interval);
  }
}