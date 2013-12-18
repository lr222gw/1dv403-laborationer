"use strict";
var validator = {
	
	check : function(){
		var emme, i, targetId, targetContent, answer, errorMess, errorId;
		emme = [];
		emme = document.getElementsByTagName("input"); // Hämtar ner alla Inputs till en lista
		
		
		for( i = 0; i < emme.length ; i += 1){ // Genom att sätta min  funktion i en loop så hittar jag snabbt vilken "input" jag tryckt på.
			
			emme[i].onblur = function(e){								
				
				answer = undefined; // Nollställer Answer för varje gång man "blurar" en ny inputbox..
				
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
				
				validator.insertAfter(e, answer);  // Funktion som lägger till felmeddelande efter ruta..
				
				}else{ // Sats som skriver ut att du har en tom ruta. och att du måste fylla i innehållet.
					if(targetContent === ""){ // Är rutan tom ska detta skrivas ut..
						validator.insertAfter(e, "Du måste skriva något i rutan.");
					}else{// Är det något i rutan ska felmeddelandet tas bort! OM det finns ett felmeddelande
						
						errorId = /ErrorBox$/; //Gör ett regExp för att se om ID slutar på "ErrorBox"
						
						try{ // Om Denna sats inte lyckas = finns inget felmeddelande
							if(e.target.nextSibling.id.match(errorId)) {//Kontrollera att e.target.nextSibling är ett felmeddelande!
								
								e.target.nextSibling.remove(); 
							}
						}catch(iDontKnow){
							// Gör inget om det inte finns ett meddelande så finns det heller inget att ta bort...
						}
							
						
						
					}
					
					
				}
				
				
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
		
	},
	
	insertAfter : function(e, answer){
		var myTarget, myHolder, ErrorMessageId;
		myTarget = e.target;
		ErrorMessageId = myTarget.id + "ErrorBox"; //Skapar ett unikt Id för varje ErrorRuta!
		
		myHolder = document.createElement("p"); // skapar en ptagg som ska visa felmeddelanden
		
		myHolder.setAttribute("id", ErrorMessageId);
		
		myHolder.innerHTML = answer; // Lägger in Content i P-taggen
		
		if(myTarget.nextSibling.nodeName === "P"){ // if-sats som kollar om inputrutan redan visar ett felmeddelande.. 

			myTarget.nextSibling.remove();
			// ↑Tar bort meddelandet och låter det skrivas ut på nytt, på så sätt så blir det alltid rätt meddelanden som skrivs ut!
		}
			
		myTarget.parentNode.insertBefore(myHolder, myTarget.nextSibling); // Skriver ut Error meddelandet på nytt! 
		//Lägger till kod som gör att Error meddelandet blinkar till 
		validator.colorTimeOutOneSec(myTarget); //ser till att texten blinkar till..	
			
		
		
		
		
	},
	colorTimeOutOneSec : function(myTarget){ // Funktion som gör att felmeddelande blinkar rött om man ej åtgärdat det!
		
				myTarget.nextSibling.style.color = "red";	
			setTimeout(function(){
				
				myTarget.nextSibling.style.color = "black";
				
			}, 1000);
		
	}
	
	
};

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

FUNGERAR INTE: (undantag = * ) (ändra på regex för att fixa dessa..)
me@				*
@example.com	*
me.@example.com
.me@example.com	*
me@example..com	*
me.example@com
me\@example.com
 * */
