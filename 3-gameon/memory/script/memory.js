"use strict";
var memory = {
	
	brickArray : [],
	
	randomPlats : [],
	
	startFunction : function(){
		var rowsAndBricks;
		do{	
			var brickAmount = + prompt("Hur många brickpar vill du köra med?(2-9)"); // ta reda på hur många par användaren vill spela med
		
			if(brickAmount >= 2 && brickAmount <= 9 && !(isNaN(brickAmount))){ // om ett giltigt tal skrivs in ska koden skapa så många _2bricka objekt
				
				memory._2brickaMaker(brickAmount);
				break;
			}else if(brickAmount == false){ // stänger ner om man trycker på cancel..  
				break;
			}else{	//om talet är ogiltigt så ska detta hända och allt ska loopas om tills ett giltigt tal fylls i.. ändrar nog denna senare..  
				console.log("OPS not a number...");
			}
		}while(true)
		
		rowsAndBricks = Math.ceil(Math.sqrt(memory.brickArray.length)); // Räknar ut roten av brickArrayens längd och avrundar uppåt...
		

		memory.randomPlats = RandomGenerator.getPictureArray(memory.brickArray.length, 2); //matar in arrayens längd och en 2a då vi ska ta arrayens längd * 2...
																						 // ^för att då fungerar min placeBricks-function! 
		
		memory.placeBricks(rowsAndBricks);
		
		
		
		
		
	},
	
	_2brickaMaker : function(brickAmount){ // funktion som används för att ta fram antalet brickpar som ska användas
		var i;
		for( i = 0; i < brickAmount; i += 1 ){
			var aPic = "pics/"+i+".png";// bild 1
			var aPic2 = "pics/"+i+".png"; // parbilden till bild 1..
			var id = i;
			var new_2Bricka = {}; // skapar ett  objekt 
			
			new_2Bricka = new memory._2bricka(aPic, aPic2, id); // Tilldelar objektet egenskaperna som vi tar fram i loopen
			memory.brickArray.push(new_2Bricka); // Puttar in objektet i en array..
		}
	},
	
	_2bricka : function(aPic, aPic2, id){ //Konstruktorfunktion för _2bricka..
		this.getPic = function(){
			return aPic;
		};
		this.getPic2 = function(){
			return aPic2;
		};
		this.getId = function(){
			return id;
		};
		this.setPic = function(_aPic){
			aPic = _aPic;
		};
		this.setPic2 = function(_aPic2){
			aPic2 = _aPic2;
		};
		this.SetId = function(_id){
			id = _id;
		};		
	},
	
	placeBricks : function(rowsAndBricks){
		var i, j, k, a2brick, brickPlace, brickRow, brickToPlace;
		
		
		for( i = 0; i < rowsAndBricks; i += 1 ){ //Skapar en rad för varje rad som krävs..
			
			brickRow = document.createElement("div");
			
			for( j = 0 ;j < rowsAndBricks; j +=1 ){//skapar antal brickplatser för ^row..							
				
				brickPlace = document.createElement("div");
				brickPlace.setAttribute("class", "brickPlace");
				
				for(k = 0; k < memory.brickArray.length; k += 1){ 
					
					if(memory.brickArray[k].getId() === memory.randomPlats[j] - 1 ){ // ger minus till randomplats då de siffrorna ligger på en "level upp"...
						brickToPlace = memory.brickArray[k];
						break;
					}
					
				}
				
				//a2brick = memory.brickArray[memory.randomPlats[j]];
				
				if(brickPlace.child === brickToPlace.getPic() ){
					
				}else{
					brickPlace.innerHTML= brickToPlace.getPic();
				}
				
				document.getElementById("box").appendChild(brickPlace);
				
				
			}
			
			
		}
		
	}
	
	
	
};

window.onload = memory.startFunction();
