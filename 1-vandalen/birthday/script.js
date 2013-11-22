"use strict";

window.onload = function(){

	
    var birthday = function (date) {
        var Y, M, D;
        
        
        if (!(Date.parse(date))) // Om Date.pase(date) blir null så kommer denna sats köras. Date.parse returnerar null om argumentsträngen är ogiltig..
        {
            throw new TypeError("Du måste ange ett giltigt datum.. i formen ÅÅÅÅ-MM-DD. ex: 1994-03-24");
        };

	    var birthday = new Date(date + "T23:59:59");//"T23:59:59" ändrar tiden på dygnet till sista sekunden.. :birthday = sätter datumet till datumet som användaren matar in.
	    var now = new Date();                       // :now = sätter datumet som är dagens datum
	    var nowYear = now.getFullYear();            // :nowYear = Tar reda på det fulla året av dagens år (genom now som vet dagens datum)

	    birthday.setFullYear(nowYear)               // Ändrar året man har sagt att man fyller år till årets år, detta för att räkna år är ovesentligt när man räknar antalet dagar till nästa dag man fyller år.

	    if (birthday.getTime() - now.getTime() < 0) // Denna if-sats görs om tiden som man fyller år på (från 1970) subbtraherat med tiden för dagens datum (från 1970) blir mindre än 0. <-- alltså om altalet millisekunder blir negativt.
	    {
	        birthday.setFullYear(nowYear + 1)       // Tar födelsedagens år och ändrar den till årets år +1. <-- gör att tiden aldrig kan bli negativ eftersom att man ändrar året på birthday när det blir det!
	    };      

	    var daysUntilBday = ((((birthday.getTime() - now.getTime())/1000)/60)/60)/24; // Dividera med 1000 för att få millisekunder till sekunder.. /60 för att få det till minuter.. /60 igen för h... /24 för dagar..
	    daysUntilBday = Math.floor(daysUntilBday); //  avrundning..
	    
	    return daysUntilBday;
			




	};
	// ------------------------------------------------------------------------------


	// Kod för att hantera utskrift och inmatning. Denna ska du inte behöva förändra
	var p = document.querySelector("#value"); // Referens till DOM-noden med id="#value"
	var input = document.querySelector("#string");
	var submit = document.querySelector("#send");

	// Vi kopplar en eventhanterare till formulärets skickaknapp som kör en anonym funktion.
	submit.addEventListener("click", function(e){
		e.preventDefault(); // Hindra formuläret från att skickas till servern. Vi hanterar allt på klienten.

		p.classList.remove( "error");

		try {
			var answer = birthday(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			var message;
			switch (answer){
				case 0: message = "Grattis på födelsedagen!";
					break;
				case 1: message = "Du fyller år imorgon!";
					break;
				default: message = "Du fyller år om " + answer + " dagar";
					break;
			}

			p.innerHTML = message;
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};