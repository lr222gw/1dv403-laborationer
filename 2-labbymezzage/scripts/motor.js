"use strict";

var motor = {
	
	messageHolder : [],
	
	theSendFunction : function() {
		var sendButton = document.getElementById("sendButton");  // hämtar ner sendButton från DOMen och lägger den i en variabel med samma namn...
		var messageContent;
		var message;
		
		sendButton.onclick = function(){
			console.log("dude, it works!"); //ska ta bort sen
			messageContent = document.querySelector("#messageContainer textarea").value; // hämtar ner innehållet från meddelandet och lägger den i en variabel "messageContent"
			console.log(messageContent);//ska ta bort sen
			
			
			message = new Message(messageContent, new Date()); // Skapar ett nytt MessageObject med innehållet från brevet och datumet som är nu!
			motor.messageHolder.push(message); // Puttar in mitt nya object i en array!
			console.log(message);
			
			
		}
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