"use strict";
function Message(message, theDate){
	//Skapar get-metoder
	this.getTheMessage = function(){
		return message;
	};
	this.getTheDate = function(){
		return theDate; //returnerar tillbaka år-månad-dag timme-minut-sekund
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
	return this.getHTMLText()+" ("+this.getTheDate()+")"; 
};
// Felet är att dessa metoder under, ska heta "getHTMLtext"
Message.prototype.getHTMLText = function(){  // getTheMessage <-- hette denna förut..
	return this.getTheMessage().replace(/[\n\r]/g, "<br/>");
};
Message.prototype.getDateTime = function() {// En priviligerad metod <-- ändrade från priviligerad till icke priviligerad..
	return this.getTheDate();
};


// tar bort dessa då de ej används av mitt program.. låter dem vara kvar som referens..
//this.Message.prototype.setTextMessage = function(_text) {
//	this.setMessage(_text).replace(/[\n\r]/g, "<br>");
//};
//this.Message.prototype.setDateTime = function(_date) {
//	this.setTheDate(_date);
//};
