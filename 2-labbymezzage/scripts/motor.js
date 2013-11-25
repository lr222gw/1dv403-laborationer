"use strict";

var mess = new Message("tessstar", new Date()); 

var motor = {
	 alertD : function(){
	mess.setMessage("farr");
	alert(mess.getTheMessage());
	}
}

window.onload = motor.alertD;