"use strict";
var validator = {
	
	check : function(){
		var emme, i, targetId, targetContent, answer, errorMess;
		emme = [];
		emme = document.getElementsByTagName("input"); // Hämtar ner alla Inputs till en lista
		
		
		for( i = 0; i < emme.length ; i += 1){ // Genom att sätta min  funktion i en loop så hittar jag snabbt vilken "input" jag tryckt på.
			
			emme[i].onblur = function(e){								
				
				targetContent = e.target.value;
				
				targetId = e.target.id; // tar reda på vilken input man har tryckt ifrån (onblur)
				
				switch(targetId){ // Anger olika beskrivningar beroende på vilken input/ruta som har 
					
					case "mailId":
					// target id contet ska skickas till checkamil där den checkas med regex och returnerar eventuella felmeddelanden
					answer = validator.checkMail(targetContent);
					break;
					
					case "PostnummerId":
					
					break;
					default:
					
					break;
				}
				
				if(answer !== undefined){ //om något returneras tillbaka så är det ett felmeddelande, då ska det skrivas ut..
				alert(answer);	
				
				errorMess = document.createElement("p");
				errorMess.textContent = answer;
				
				e.target.appendChild(errorMess);
				
				
				
				} // Ide! Alla fält har redan en liten "osynlig" ruta brevid dem där error text hamnar. om det inte är några error så rensas rutan!
				
				
				e.target.blur(); // tar bort fokus från fältet som är fel.
				
			};
		}
		
	},
	
	checkMail : function(targetContent){
		var regExMail, result;	// http://gskinner.com/RegExr/ sida för att testa regulära uttryck, användbart..
		
		
		if(targetContent === ""){ // Om targetContent är "" så ska ett meddelande lämnas att fältet är tomt..
			return;
		} 
		
		regExMail = /[^\.].+[^\.^\\]+@(\S.+\.(?!\.).+(?!\.))+/gi; // använder "[^\.].+[^\.^\\]+@(\S.+\.(?!\.).+(?!\.))+" för att man kan skriva epostadresser på så många konstiga sätt. och den här klarar allt så länge du har något före och efter @ och sen en punkt och "com"/"se" etc..
		
		result = targetContent.match(regExMail); // om Null returneras så är epostadressen ogiltig
		
		if(result === null){ // om emailen är ogiltig så skrivs ett meddelande ut.
		return "Epostadressen är ogiltig!";
		}
		
	}
	
	
	
}

window.onload = validator.check;


/*
 
 * Lista på Mail som ej fungerar, samt mail som fungerar...
 * 
FUNGERAR:
email@example.com
firstname.lastname@example.com
email@subdomain.example.com
firstname+lastname@example.com
email@123.123.123.123
email@[123.123.123.123]
"email"@example.com
1234567890@example.com
email@example-one.com
_______@example.com
email@example.name
email@example.museum
email@example.co.jp
firstname-lastname@example.com
f@gmail.se

FUNGERAR INTE: (undantag = * )
me@				*
@example.com	*
me.@example.com
.me@example.com	*
me@example..com	*
me.example@com
me\@example.com
 * */
