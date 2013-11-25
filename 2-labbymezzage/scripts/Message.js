"use strict";
function Message(message, date){
	//Skapar get-metoder
	this.getMessage = function(){
		return message;
	};
	this.getDate = function(){
		return date;
	};
	//Skapar set-metoder
	this.setMessage = function(_message){
		message = _message;
	};
	this.setDate = function(_date){
		date = _date;
	};
	
} // med denna konstruktorfunktion kan vi instansiera nya meddelanden.. 

Message.prototype.toString = function() {
	return this.getMessage()+" ("+this.getDate+")";
};
this.Message.prototype.getTextMessage = function(){ // En priviligerad metod.
	return this.getMessage();
};
this.Message.prototype.getDateTime = function() {
	return this.getDate();
};
this.Message.prototype.setTextMessage = function(_text) {
	this.setMessage(_text);
};
this.Message.prototype.setDateTime = function(_date) {
	this.setDate(_date);
};
