"use strict";
var validator = {
	
	check : function(){
		var emme, i;
		emme = [];
		emme = document.getElementsByTagName("input"); // Hämtar ner alla Inputs till en lista
		
		
		for( i = 0; i < emme.length ; i += 1){ // Genom att sätta min  funktion i en loop så hittar jag snabbt vilken "input" jag tryckt på.
			
			emme[i].onblur = function(e){
				
				alert(e.target);
				e.target.blur(); // tar bort fokus från fältet som är fel.
				
			};
		}
		
	}
	
	
	
	
}

window.onload = validator.check;
