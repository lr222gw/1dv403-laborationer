"use strict";
function Message(message, theDate){
	//Skapar get-metoder
	this.getTheMessage = function(){
		return message;
	};
	this.getTheDate = function(){
		return theDate.toLocaleString(); //returnerar tillbaka år-månad-dag timme-minut-sekund
	};
	//Skapar set-metoder
	this.setMessage = function(_message){
		message = _message;
	};
	this.setTheDate = function(_date){
		theDate = _date;
	};
	
} // med denna konstruktorfunktion kan vi instansiera nya meddelanden.. 

Message.prototype.toString = function() {
	return this.getTheMessage()+" ("+this.getTheDate()+")";
};
this.Message.prototype.getTextMessage = function(){ // En priviligerad metod.
	return this.getTheMessage();
};
this.Message.prototype.getDateTime = function() {
	return this.getTheDate();
};
this.Message.prototype.setTextMessage = function(_text) {
	this.setMessage(_text);
};
this.Message.prototype.setDateTime = function(_date) {
	this.setTheDate(_date);
};
