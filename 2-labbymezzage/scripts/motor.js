"use strict";

var mess = new this.Message("tessstar", new Date()); 

var motor = {
	 alertD : function(){
	 
	alert(mess);
	}
}

window.onload = motor.alertD;