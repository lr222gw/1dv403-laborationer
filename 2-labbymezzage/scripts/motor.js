"use strict";

var motor = {
	messages : [],
	
	functionToDo : function(){
		var test = [];
		test[0] = new Message("hej däär!", new Date()) // skapar ett meddelande object!
		test[1] = new Message("din jäkel", new Date()) // skapar ett till meddelande object!
		
		for(var i = 0; i < test.length ; i++)
		{
			motor.messages.push(test[i]); // Pushar in det i arrayen messages som ligger i objectet motor
		}
		
		alert(motor.messages[1]); // visar meddelandet från "brevet"
	},
}

window.onload = motor.functionToDo;