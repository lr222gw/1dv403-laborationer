"use strict";

var motor = {
	
	messageHolder : [],
	
	theSendFunction : function() {
		var sendButton = document.getElementById("sendButton");  // hämtar ner sendButton från DOMen och lägger den i en variabel med samma namn...
		var messageContent;
		var message;
		//var prevMessage;
		//var prevTextBox;
		//var prevDateBox;
		
		
		
		var sendFunction = function(){
			console.log("dude, it works!"); //ska ta bort sen
			


			
			
			messageContent = document.querySelector("#messageContainer textarea").value; // hämtar ner innehållet från meddelandet och lägger den i en variabel "messageContent"
			
			console.log(messageContent);//ska ta bort sen

			//messageContent = messageContent.replace(/\n/g, '<br>'); // gör om "JavaScript-nyaRader" till "HTML-NyaRader"
			// ^detta görs istället i konstruktorfunktionen!! :3
			
			message = new Message(messageContent, new Date().toLocaleTimeString()); // Skapar ett nytt MessageObject med innehållet från brevet och datumet som är nu!
			
			message.mId = motor.messageHolder.length + Math.floor(Math.random()* 10000 + 1); // ger Message ett UNIKT id som ej ändras, med denna kan jag ta  bort message från arrayen!
			
			motor.messageHolder.push(message); // Puttar in mitt nya object i en array!
			console.log(message);//ska ta bort sen
			
			document.querySelector("#messageContainer textarea").value = ""; // Tömmer textarean så att nästa meddelande man ska skicka kan börjas skriva på utan att ta bort det gamla meddelandet..
			
			
			motor.renderMessage(message); // anropar metoden som skriver ut meddelandet, skickar med meddelandet skrivits.
			
			motor.renderMessages();

		}

		//Kod för knapptryckning...
		sendButton.onclick = sendFunction; // om man trycker på skicka knappen så anropas sendFunction...
		document.querySelector("#messageContainer textarea").onkeypress = function(e){			
			if(e.keyCode === 13) //Om man trycker enter så ska man skicka ett meddelande...
			{
				
				if(e.shiftKey === true){ //hittade detta kodstycke här : http://stackoverflow.com/questions/6178431/how-to-catch-enter-keypress-on-textarea-but-not-shiftenter
					//tom, just carry on!
				}
				else{
					sendFunction();
					return false; // för att slippa blankraden..
				}				
				
			}
					
		}; 
		
	},
	
	renderMessage : function(message){	
		var mCount = document.getElementById("mCount"); 
		var that = this;
		//var theId = motor.messageHolder.length;
		
		var prevMessage = document.getElementById("prevMessage"); //hämtar ner containern där mina meddelanden ska ligga			
		
		var aPtag = document.createElement("p");
		//aPtag.appendChild(document.createTextNode(message.getHTMLText())); // hämtar ut meddelandets text...
		// HITTADE FELET TILL <BR> !  ^ DEENNA borde se ut ↓
		aPtag.innerHTML = message.getHTMLText(); // eftersom vi gjorde en textNode så blev (trolgitvis) all kod formaterad till text.. dvs html Element blev sjusterade s åatt det skulle se ut som text..
		
		
		var prevTextBox = document.createElement("div"); //skapar en div där min text ska ligga i :)
		prevTextBox.setAttribute("class", "prevTextBox"); //ger den ett ID			
		prevTextBox.appendChild(aPtag); // skickar med meddelandet..
		
		var prevDateBox = document.createElement("div");
		prevDateBox.setAttribute("class", "prevDateBox");
		prevDateBox.appendChild(document.createTextNode(message.getTheDate()));
		
		var soloMessageStyler = document.createElement("div"); // skapar en "behållare" som jag kan styla till. Detta för att SoloMessage ändrar sitt namn för alla nya meddelanden...
		soloMessageStyler.setAttribute("class", "soloMessageStyler");		
		
		var soloMessage = document.createElement("div");
		soloMessage.setAttribute("class", "soloMessage");
		soloMessage.setAttribute("mId", message.mId)
	
		var removeB = document.createElement("input"); // Skapar en knapp för att ta bort
		removeB.setAttribute("class", "removeB");
		removeB.setAttribute("type", "image");
		removeB.setAttribute("value", "Ta bort");
		removeB.setAttribute("src", "remove.png");
		
		var timeB = document.createElement("input"); // Skapar en knapp för att kolla exakt klockslag/datum
		timeB.setAttribute("class", "timeB");
		timeB.setAttribute("type", "image");
		timeB.setAttribute("value", "Kolla tidsstämpeln");
		timeB.setAttribute("src", "time.png");
		
		var aContainer = document.createElement("aContainer");
		aContainer.setAttribute("class", "acontainer")
		
		soloMessageStyler.appendChild(soloMessage);
		soloMessage.appendChild(prevTextBox);
		soloMessage.appendChild(aContainer);
		aContainer.appendChild(removeB);
		aContainer.appendChild(timeB);
		aContainer.appendChild(prevDateBox); //flyttar denna länngre ner då det blir enkalre att skjustera om i CSS
		
		removeB.onclick = function(e) {
			
			//var extractedId = e.target.parentNode.id;
			//extractedId = +extractedId.replace("soloMessage", "");
			
			var yesORno = confirm("säker på att du vill ta bort detta meddelande?");
			
			if(yesORno === false){
				return;
			}
			
			var removeThisMessage;
			var i;
			var extractedMid = + e.target.parentNode.getAttribute("mId");	// "+" gör om allt till "number"/int...
			
			for( i = 0; i < motor.messageHolder.length; i++){ // For loop som hittar meddelandet som skas ta bort!
				
				if(motor.messageHolder[i].mId === extractedMid){ // när meddelandets "mId" är samma som meddelandet som ska tas bort "mId" så deklareras en variabel som håller koll på vilket array-element som ska tas bort!
					removeThisMessage =  i; // array nummer i ska tas bort!
					
					break;
				}
				else{
					console.log("nope"+ i); // onödig, endast för testning..
				}
				
			}
			motor.messageHolder.splice(removeThisMessage, 1); // Tar bort Array-Elementet med samma "mId" som elementets parentNode som man tryckte på! 
			
			//motor.messageHolder.splice(extractedMid - 1, 1);
			//console.log(extractedId);
			//e.target.parentNode.parentNode.remove(); //skriver parentNode två gånger då e.target ligger under 2 st parents.. en för style och en för innehåll..

			motor.renderMessages(); // skriver ut alla meddelanden igen! eftersom att man behöver uppdatera vad som ska visas.. = vad som finns kvar i arrayen..

		}	
		prevMessage.appendChild(soloMessageStyler); // Skriver ut meddelandet..
		
		
	},
	renderMessages : function(){
		var i = 0;
		document.getElementById("prevMessage").innerHTML= ""; // tar bort allt som har skrivits... så att det kan bli ersatt igen.
		for(i; i < motor.messageHolder.length; i++){ // skriver ut alla meddelanden
			
			motor.renderMessage(motor.messageHolder[i]);

		}
		mCount.innerHTML = "Antal meddelanden: " + motor.messageHolder.length; //Skriver ut antalet meddelanden som finns i messageHolder. = skriver ut antalet meddelanden som skapats..

	}


}


window.onload = motor.theSendFunction;


//	messages : [],
//	
//	functionToDo : function(){
//		var test = [];
//		test[0] = new Message("hej däär!", new Date()) // skapar ett meddelande object!
//		test[1] = new Message("din jäkel", new Date()) // skapar ett till meddelande object!
//		
//		for(var i = 0; i < test.length ; i++)
//		{
//			motor.messages.push(test[i]); // Pushar in det i arrayen messages som ligger i objectet motor
//		}
//		
//		alert(motor.messages[1]); // visar meddelandet från "brevet"
//		}


