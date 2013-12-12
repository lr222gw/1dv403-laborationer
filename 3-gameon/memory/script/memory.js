"use strict";
var memory = {
	
	cardArray : [],
	randomArr : [], 
	startFunction : function(){
		
		
		memory.MemoryObj(3);
		memory.randomPlacement();
		memory.placeCards(4, 4);
		
		
		
	},
	
	MemoryObj : function(cardCoupleAmount){
		var i, j, coupleId, card, img;
		for(i = 0; i < cardCoupleAmount; i += 1){ // för att alla par ska ha ett gemensamt ID...  
		
			for(j = 0; j < 2; j += 1){ // två kort i varje par
				
				//card = {
				//	coupleId : i, // Alla par har ett gemensamt Id
					
				//	cardId : j, // Alla kort har sina egna Idn..
					
				//	status : 0, //korten är nedvända som standard
					
				//	img : "pics/"+i+".png" // Alla kort måste hitta rätt sökväg till sin bild
					
				//}
				card = document.createElement("a");
				
				card.setAttribute("coupleId", i);
				card.setAttribute("CardId", j);
				card.setAttribute("status", 0);
				card.setAttribute("href", "#");
				
				img = document.createElement("img");
				img.setAttribute("src", "pics/"+i+".png");
				
				card.appendChild(img);
				
				
				memory.cardArray.push(card);
				
			}
			
		}
		console.log("MemoryObj DONE!");
		
	},
	
	randomPlacement : function(){
		var i, randomPlacementNumber;
		
		for(i = 0; i < memory.cardArray.length; i += 1){
			
			randomPlacementNumber = Math.floor(Math.random()* memory.cardArray.length); // tar fram en slumpad siffra för att bestämma ordningen på vilken bricka som ska läggas in först..
			
			if(memory.randomArr !== undefined && memory.randomArr.indexOf(randomPlacementNumber) !== -1){ // Finns randomPlacementNumber redan i arrayen? om randomArr är undefined så finns inget i den, då kan den hoppa över satsen..
				while(memory.randomArr.indexOf(randomPlacementNumber) !== -1){ // Om den gör det, loopa fram ett nytt som inte finns i arrayen
					randomPlacementNumber = Math.floor(Math.random()* memory.cardArray.length); 
				}
			}
			
			memory.randomArr.push(randomPlacementNumber); // När ett nytt nummer kommit fram så kastas den in i denna array! (arrayens syfte = håll koll så att samma nummer ej skrivs in flera ggr...)
			
		}
	},
	
	placeCards : function(rows, cols){
		var i, j, aTag, thisBrick, x; 
		x = 0;
		for(i = 0; i < rows; i += 1){
			
			for(j = 0; j < cols; j += 1){
				
				
				
				thisBrick = memory.cardArray[memory.randomArr[x]];// tar fram det kort i cardArray som har samma värde som värdet av randomArr[x] har..
				
				
				
				document.getElementById("box").appendChild(thisBrick);
				
				x += 1;
				
			}			
			
		}
		
		
	}
	
	
	
	
};

window.onload = memory.startFunction();
