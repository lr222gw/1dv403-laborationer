"use strict";

var mess = new Message("tessstar", new Date()); 

var motor = {
	 alertD : function(){
	 
	alert(mess);
	}
}

window.onload = motor.alertD;