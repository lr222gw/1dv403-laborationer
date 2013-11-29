"use strict";

window.onload = function(){

	// I denna funktion ska du skriva koden för att hantera "spelet"
	var convertString = function(str){
		// Plats för förändring.		
		// Returnera den konverterade strängen.
		// Vid fel, kasta ett undantag med ett meddelande till användaren. 
	
	    var to = str; //obs detta gjorde jag bara så att jag kunde testa.. hade lika gärna kunnat skriva "str" direkt i for-loopen..
	    var i = 0;
	    var count = 0; 
	    var output = " "; // så att det blir en sträng

	    for (var i = 0; i < to.length ; i++) // för varje bokstav i variabeln "to" <-- ändras väll så småning om, testar bara nu..
	    {
	        var newChar = to[i].toUpperCase(); // to[i] <-- markerar den bokstav jag vill ändra.. (i berättar vilken bokstav det är..)
                                                // newChar Får in bokstaven från to[i]  fast som stor. i if-satsen testas det om newChar och to[i] är samma, (det ÄR samma bokstav) det som testar är om båda bokstäverna är STORA..
                                                //                                  ^-i står för vilken bokstav i strängen to
	        var the_aChar = 'a';
	        var the_AChar = 'A';
	        if (to[i] === the_aChar || to[i] === the_AChar) // to[i].toLowerCase() === "a"
	        {
	            output += "#";
	            continue; // bryter loopen och börjar nu om 
	        }
	        if(newChar === to[i])//to.charAt(i).toUpperCase(to.charAt(i))
	        {
	            output += newChar.toLowerCase(); // Här konkateneras (stavas inte så.. ) output ihop med newChar.toLoweCase()

	            //to.charAt(i).replace(to.charAt(i), to.toLowerCase(to.charAt(i)));
	        }else // om inte if-satsen "fungerar" så innebär det att denna sats ska göras. Det innebär alltså att om denna sats utförs så är det för att bokstaven inte var stor och då är den ju liten <-- den ska bli stor! (det händer i denna sats..)
	        {
	            output += newChar.toUpperCase();
	        }
	        
	    }


	    return output;




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
			var answer = convertString(input.value) // Läser in texten från textrutan och skickar till funktionen "convertString"
			p.innerHTML = answer;		// Skriver ut texten från arrayen som skapats i funktionen.	
		} catch (error){
			p.classList.add( "error"); // Växla CSS-klass, IE10+
			p.innerHTML = error.message;
		}
	
	});



};