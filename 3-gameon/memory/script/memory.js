"use strict";
var memory = {
	
	cardArray : [],
	
	startFunction : function(){
		
		
		memory.MemoryObj(3);
		
		
		
	},
	
	MemoryObj : function(cardCoupleAmount){
		var i, j, coupleId, card;
		for(i = 0; i < cardCoupleAmount; i += 1){ // för att alla par ska ha ett gemensamt ID...  
		
			for(j = 0; j < 2; j += 1){ // två kort i varje par
				
				card = {
					coupleId : i, // Alla par har ett gemensamt Id
					
					cardId : j, // Alla kort har sina egna Idn..
					
					status : 0, //korten är nedvända som standard
					
					img : "pics/"+i+".png" // Alla kort måste hitta rätt sökväg till sin bild
					
				}
				
				memory.cardArray.push(card);
				
			}
			
		}
		console.log("MemoryObj DONE!");
		
	},
	
	randomPlacement : function(){
		
	} 
	
	
	
	
};

window.onload = memory.startFunction();
