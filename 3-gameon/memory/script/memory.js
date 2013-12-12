"use strict";
var memory = {
	
	cardArray : [],
	
	startFunction : function(){
		
		
		memory.MemoryObj(3);
		memory.randomPlacement();
		
		
		
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
		var i, randomPlacementNumber, randomArr;
		randomArr = []; // berättar att randomArr är en array..
		for(i = 0; i < memory.cardArray.length; i += 1){
			
			randomPlacementNumber = Math.floor(Math.random()* memory.cardArray.length); // tar fram en slumpad siffra för att bestämma ordningen på vilken bricka som ska läggas in först..
			
			if(randomArr !== undefined && randomArr.indexOf(randomPlacementNumber) !== -1){ // Finns randomPlacementNumber redan i arrayen? om randomArr är undefined så finns inget i den, då kan den hoppa över satsen..
				while(randomArr.indexOf(randomPlacementNumber) !== -1){ // Om den gör det, loopa fram ett nytt som inte finns i arrayen
					randomPlacementNumber = Math.floor(Math.random()* memory.cardArray.length);
				}
			}
			
			randomArr.push(randomPlacementNumber); // När ett nytt nummer kommit fram så kastas den in i denna array! (arrayens syfte = håll koll så att samma nummer ej skrivs in flera ggr...)
			
		}
	} 
	
	
	
	
};

window.onload = memory.startFunction();
