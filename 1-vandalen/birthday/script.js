"use strict";

window.onload = function(){

	
	var birthday = function(date){
		
	    var birthday = new Date(date + "T23:59:59"); // ändrar tiden på dygnet

	    //var now = new Date();

	    //var dayBirthday = ((((birthday.getTime() - now) / 1000) / 60) / 60) / 24; // Räknar ut antalet dagar mellan Bday och Idag.
	    //dayBirthday = Math.floor(dayBirthday);

	    //var birthday = dayBirthday - 1;

	    //return dayBirthday;


	    var now = new Date();

	    var birthdayYear = birthday.getFullYear();
	    var nowYear = now.getFullYear();
	    birthday.setFullYear(nowYear)
        if (birthday.getTime() - now.getTime() < 0)
        {
            birthday.setFullYear(nowYear + 1)
        }

        

	    var yearsInDaysBetweenBdayAndNow = ((((now.getTime() - birthday.getTime()) / 1000) / 60) / 60) / 24; // Räknar ut antalet dagar från det datum man fyllt år tills idag..
	    yearsInDaysBetweenBdayAndNow = Math.floor(yearsInDaysBetweenBdayAndNow);

	    // var yearsInDaysBetweenBdayAndNow = ((((birthday.getTime() - now.getTime())/1000)/60)/60)/24; //(yearsBetweenBdayAndNow * 364) + 364; 
       

	    var daysUntilBday = ((((birthday.getTime() - now.getTime())/1000)/60)/60)/24; // Dividera med 1000 för att få millisekunder till sekunder.. /60 för att få det till minuter.. /60 igen för h... /24 för dagar..
	    daysUntilBday = Math.floor(daysUntilBday) ; // + 1 gör så att allting fungerar! resten är avrundning..
	    
	    if (daysUntilBday < 0) // Denna sats ser till att om man testar 
	    {
            // 
	        daysUntilBday = yearsInDaysBetweenBdayAndNow + daysUntilBday;//+ daysUntilBday
	    }

	    //return birthday.getDate();
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