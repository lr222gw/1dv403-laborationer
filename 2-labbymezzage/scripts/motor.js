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
		
		sendButton.onclick = function(){
			console.log("dude, it works!"); //ska ta bort sen

			
			
			messageContent = document.querySelector("#messageContainer textarea").value; // hämtar ner innehållet från meddelandet och lägger den i en variabel "messageContent"
			
			console.log(messageContent);//ska ta bort sen

			
			message = new Message(messageContent, new Date().toLocaleTimeString()); // Skapar ett nytt MessageObject med innehållet från brevet och datumet som är nu!
			motor.messageHolder.push(message); // Puttar in mitt nya object i en array!
			console.log(message);//ska ta bort sen
			
			document.querySelector("#messageContainer textarea").value = ""; // Tömmer textarean så att nästa meddelande man ska skicka kan börjas skriva på utan att ta bort det gamla meddelandet..
			
			motor.renderMessages(message); // anropar metoden som skriver ut meddelandet, skickar med meddelandet skrivits.


			
			

		}

	},
	
	renderMessages : function(message){	
		var mCount = document.getElementById("mCount"); 
		
		var theId = motor.messageHolder.length;
		
		var prevMessage = document.getElementById("prevMessage"); //hämtar ner containern där mina meddelanden ska ligga			
	
		var prevTextBox = document.createElement("div"); //skapar en div där min text ska ligga i :)
		prevTextBox.setAttribute("class", "prevTextBox"); //ger den ett ID			
		prevTextBox.appendChild(document.createTextNode(message.getTheMessage())); // skickar med meddelandet..
		
		var prevDateBox = document.createElement("div");
		prevDateBox.setAttribute("class", "prevDateBox");
		prevDateBox.appendChild(document.createTextNode(message.getTheDate()));
		
		var soloMessageStyler = document.createElement("div"); // skapar en "behållare" som jag kan styla till. Detta för att SoloMessage ändrar sitt namn för alla nya meddelanden...
		soloMessageStyler.setAttribute("class", "soloMessageStyler");
		
		var soloMessage = document.createElement("div");
		soloMessage.setAttribute("id", "soloMessage" + theId);
	
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
		
		soloMessageStyler.appendChild(soloMessage);
		soloMessage.appendChild(prevTextBox);
		soloMessage.appendChild(prevDateBox);
		soloMessage.appendChild(removeB);
		soloMessage.appendChild(timeB);
		
		prevMessage.appendChild(soloMessageStyler); // Skriver ut meddelandet..
		
		removeB.onclick = function(e) {
			
			var extractedId = e.target.parentNode.id;
			extractedId = +extractedId.replace("soloMessage", "");
			
			motor.messageHolder.splice(extractedId - 1, 1);
			
			console.log(extractedId);
			e.target.parentNode.parentNode.remove(); //skriver parentNode två gånger då e.target ligger under 2 st parents.. en för style och en för innehåll..
			mCount.innerHTML = "Antal meddelanden: " + motor.messageHolder.length; //Skriver ut antalet meddelanden som finns i messageHolder. = skriver ut antalet meddelanden som skapats..

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


