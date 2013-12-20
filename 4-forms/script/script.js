"use strict";
var validator = {
	
	doWhat : 0,
	
	check : function(){
		var emme, i, targetId, targetContent, answer, errorMess, errorId, checkArr;
		emme = [];
		errorId = /ErrorBox$/; //Gör ett regExp för att se om ID slutar på "ErrorBox"
		emme = document.getElementsByTagName("input"); // Hämtar ner alla Inputs till en lista
		
		document.getElementById("SkickaKnapp").disabled = true; // disablar skicka knappen.. gör detta genom javaascript istället då sidan ska fungera utan javascript ...
		
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
					answer = validator.checkPostNmr(targetContent);
					break;
					default: // Genom att skicka till deafault händer inget, den enda kontrolleringen som görs då är om input fältet är tomt eller inte.
					
					break;
				}
				
				validator.ControlEverything(answer, e, targetContent, errorId); // Metod för att validera allt
				
				e.target.blur(); // tar bort fokus från fältet 
				
				validator.readyToSend(errorId);
				
			};
		}
		
		document.getElementById("SkickaKnapp").onclick = function(e){ // när man trycker på skicka knappen
			var popUpp, h1, cancel, accept, doWhat, transP;

			e.preventDefault(); //return false; // För att formuläret inte ska skickas när man trycker på knappen..
			
			
			//document.getElementById("transp").style.display = "block"; // gör så att blockeringen sätts igång.. (från att trycka etc..)
			// Ny lösning ↓
			document.getElementById("transp").classList.add("shown");
			document.getElementById("transp").classList.remove("hidden");
			
			
			popUpp = document.createElement("div");
			popUpp.setAttribute("id", "popupp");
			
			
			
			h1 = document.createElement("h1");
			h1.appendChild(document.createTextNode("Bekräfta beställning");
			popUpp.appendChild(h1);
			
			validator.createPopuppContent("Förnamn", document.getElementById("nameId").value, popUpp);
			validator.createPopuppContent("Efternamn", document.getElementById("lastNameId").value, popUpp);
			validator.createPopuppContent("Postnummer", document.getElementById("PostnummerId").value, popUpp);
			validator.createPopuppContent("E-Post", document.getElementById("mailId").value, popUpp);
			validator.createPopuppContent("Prismodell", document.getElementById("PrismodellId").value, popUpp);
			
			//popUpp.style.display = "block"; // gör så att popuppen syns.. 
			// Ny lösning ↓
			popUpp.classList.add("shown");
			popUpp.classList.remove("hidden");
			
			
			//Skapar två knappar... ↓
			cancel = document.createElement("input");
			cancel.setAttribute("type", "submit");
			cancel.setAttribute("Value", "cancel");
			cancel.setAttribute("id", "cancelbutton");
			popUpp.appendChild(cancel);
			
			accept = document.createElement("input");
			accept.setAttribute("type", "submit");
			accept.setAttribute("Value", "accept");
			accept.setAttribute("id", "acceptbutton");
			popUpp.appendChild(accept);
			
			accept.onclick = function(){				
				document.getElementById("minForm").submit(); // om man tryccker på Accept så submittas formen! 
			};
			
			cancel.onclick = function(){				
				popUpp.remove();
				// document.getElementById("transp").style.display = "none"; // gör så att blockering försvinner..
				// Ny lösning ↓
				popUpp.classList.add("hidden");
				transP.classList.remove("shown");
				transP.classList.add("hidden");
			};
			
			transP = document.getElementById("transp");
			
			transP.parentNode.insertBefore(popUpp, transP.nextSibling); // skjuter in allt i webbläsaren
		};
		
	},
	
	createPopuppContent : function(name, theValue, popUpp){
		var pTag, pTag2;
		
		pTag = document.createElement("p");
		pTag.appendChild(document.createTextNode(name+": "));
		pTag2 = document.createElement("p");
		pTag2.appendChild(document.createTextNode(theValue+"</br>"));
		popUpp.appendChild(pTag);
		popUpp.appendChild(pTag2);
		
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
	
	checkPostNmr : function(targetContent){
		var regExArr, regExNmr1, regExNmr2, regExNmr3, regExNmr4, regExNmr5, regExNmr6, regExNmr7, regExNmr8, regExNmr9, result, i;
		result = "null";
		if(targetContent === ""){ // Om targetContent är "" så ska ett meddelande lämnas att fältet är tomt..
			return;
		}
		
		//Listar upp alla olika typer av format som kan tas emot med regulära uttryck.
		regExArr = [
		regExNmr1 = /^[0-9]{5}$/,			// matchar 11111
		regExNmr2 = /[0-9]{3}-[0-9]{2}/,	// matchar 111-11
		regExNmr3 = /[0-9]{3} [0-9]{2}/,	// Matchar 111 11
		regExNmr4 = /SE[0-9]{5}/,			// Matchar SE11111
		regExNmr5 = /SE[0-9]{3}-[0-9]{2}/,	// Matchar SE111-11
		regExNmr6 = /SE[0-9]{3} [0-9]{2}/,	// Matchar SE111 11
		regExNmr7 = /^SE [0-9]{3}[0-9]{2}/,	// Matchar SE 11111
		regExNmr8 = /SE [0-9]{3}-[0-9]{2}/, // Matchar SE 111-11
		regExNmr9 = /SE [0-9]{3} [0-9]{2}/ // Matchar SE 111 11
		];
		
		for(i = 0; i < regExArr.length; i+=1){
			
			result = targetContent.match(regExArr[i]);
			if(result !== null){ // Om result ej är Null så har result fått en match, då ska loopen avbrytas och result ska bearbetas..
				
				switch(i){
					
					case 0:
					return; //Allt är som det ska, returnar och kör vidare..
					break;
					
					case 1:
					result = result[0].replace("-", "");// rättar till så vi frå formatet vi önskar, sparar ner i result										
					break;
					
					case 2:
					result = result[0].replace(" ", "");					
					break;
					
					case 3:
					result = result[0].replace("SE", "");					
					break;
					
					case 4:
					result = result[0].replace("SE", "");
					result = result[0].replace("-", "");					
					break;
					
					case 5:
					result = result[0].replace("SE", "");
					result = result[0].replace(" ", "");					
					break;
					
					case 6:
					result = result[0].replace("SE ", "");													
					break;
					
					case 7:
					result = result[0].replace("SE", "");
					result = result[0].replace(" ", "");	
					result = result[0].replace("-", "");					
					break;
					
					case 8:
					result = result[0].replace("SE", "");
					result = result[0].replace(" ", "");			
					break;									
					
				}
				validator.setResult(result);//skickar till en funktion som ändrar värdet på slutanvändarens skärm till result...	
				
				break; // bryter här så att man inte får ett meddelande..

			}
			
		}
		if(result === null){ // om Postnummret är ogiltig så skrivs ett meddelande ut. Det skrivs alltså ut om det inte finns någon match i Switch-satsen/forLoopen..
			return "Postnummret är ogiltigt!";
		}
	},
	
	setResult : function(result){
		
		document.getElementById("PostnummerId").value = result;
		
	},
	
	insertAfter : function(e, answer){
		var myTarget, myHolder, ErrorMessageId;
		myTarget = e.target;
		ErrorMessageId = myTarget.id + "ErrorBox"; //Skapar ett unikt Id för varje ErrorRuta!
		
		myHolder = document.createElement("p"); // skapar en ptagg som ska visa felmeddelanden
		
		myHolder.setAttribute("id", ErrorMessageId);
		
		//↓ var innerHTML förut...
		myHolder.textContent = answer; // Lägger in Content i P-taggen
		
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
		
	},
	
	ControlEverything : function(answer, e, targetContent, errorId){
			
		if(answer !== undefined){ //om något returneras tillbaka så är det ett felmeddelande, då ska det skrivas ut..						
			
			validator.insertAfter(e, answer);  // Funktion som lägger till felmeddelande efter ruta..
			
		}else{ // Sats som skriver ut att du har en tom ruta. och att du måste fylla i innehållet.
			if(targetContent === ""){ // Är rutan tom ska detta skrivas ut..
				validator.insertAfter(e, "Du måste skriva något i rutan.");
			}else{// Är det något i rutan ska felmeddelandet tas bort! OM det finns ett felmeddelande
				
				//flyttade upp ErrorId för att den används senare..
				
				try{ // Om Denna sats inte lyckas = finns inget felmeddelande
					if(e.target.nextSibling.id.match(errorId)) {//Kontrollera att e.target.nextSibling är ett felmeddelande!
						
						e.target.nextSibling.remove(); 
					}
				}catch(iDontKnow){
					// Gör inget om det inte finns ett meddelande så finns det heller inget att ta bort...
				}
			}
		}
	},
	
	readyToSend : function(errorId){
		var checkArr, i, result, temp, isFilled;
		result = [];
		isFilled = true;
		
		checkArr = document.getElementById("minForm").children[0].children;  // hämtar ner en array med alla input boxar..
		
		for(i=0; i<checkArr.length; i+=1){ // For loop som tar reda på om det finns error meddelanden..
			
			temp = checkArr[i].id.match(errorId); // Kollar om Det finns Idn i CheckArr som slutar på "ErrorBox" och lägger in dem i en ny array.
			
			if(temp !== null){ // Om Temp inte är Null så finns det error meddealnden, vi registrera att det finns meddelanden genom att putta in dem i en array.
				result.push(temp);
			}
		}
		
		for(i=0; i<checkArr.length; i+=1){ //Forloop som tar reda på om det finns rutor utan content....
			
			if(checkArr[i].nodeName === "INPUT"){ // Om den del i checkArr är en input ruta så fortsätt till nästa if-sats
				
				if (checkArr[i].value === ""){ // om en inputrutan är tom sätt "isFilled" till false
					isFilled = false;
					break;
				} 
			}
			
		}
		
		
		if(result.length === 0 && isFilled === true){// Kollar om det finns error message och om allt är i fyllt kontrolleras  ..
			document.getElementById("SkickaKnapp").disabled = false;
		}else{
			document.getElementById("SkickaKnapp").disabled = true; // ändrar status från false till true om det skulle behövas.. tex om användaren ändrar från giltig till ogiltig information..
		}
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
