"use strict";
var memory = {
	
	cardArray : [],
	randomArr : [], 
	chosenBricks : [],
	attempts : 0, 
	startFunction : function(){
		
		
		
		
		memory.MemoryObj(8); // Antal par
		memory.randomPlacement();
		memory.placeCards(4, 4); // här kan man ändra raderna..
		
		
		
	},
	
	MemoryObj : function(cardCoupleAmount){
		var i, j, coupleId, card, img, realImg;
		for(i = 0; i < cardCoupleAmount; i += 1){ // för att alla par ska ha ett gemensamt ID...  
		
			for(j = 0; j < 2; j += 1){ // två kort i varje par
				
				// ↓ Tog bort denna kod för att den var bättre att skapa ett HTML objekt som jag senare (i funktionen randomPlacement) kunde skjuta in i webben..
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
				img.setAttribute("src", "pics/fast/ask.png");
				
				realImg = document.createElement("div");
				realImg.setAttribute("src", "pics/"+i+".png");
				img.appendChild(realImg);
				
				
				
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
		var i, j, k, l, aTag, thisBrick, x, row, questionmark, statusCheckList, statusCheckListSummary, setAttribute, winChecker, winCheckerArr; 
		x = 0;
		statusCheckListSummary = 0;
		statusCheckList = [];
		winCheckerArr = [];
		for(i = 0; i < rows; i += 1){
			
			row = document.createElement("div"); // används för att dela upp allt i rader..
			//^gör en ny rad varje gång denna loopas.. använder samma rad tills j blir lika mkt som cols ↓ 
			for(j = 0; j < cols; j += 1){
				
				
				
				thisBrick = memory.cardArray[memory.randomArr[x]];// tar fram det kort i cardArray som har samma värde som värdet av randomArr[x] har..

				document.getElementById("box").appendChild(row).appendChild(thisBrick);
				
				
				thisBrick.onclick = function(e){
					//e.target.remove();
					var resetter = function(){
						
						for(k = 0; k < 2; k +=1){// for loop för att kolla om aTag har mer än 2 st status som har värdet 1.
						
							// ↓ dålig lösning då detta resettar ALLA brickor..
							//document.getElementById("box").getElementsByTagName("a")[k].firstChild.setAttribute("src", questionmark);
							
							
							memory.chosenBricks[k].setAttribute("src", questionmark); // tar bort de brickorna som man valt, specifikt!
							
						}
						
						for(k = 0; k < 2; k +=1){ // Denna kod utförs när resetter functionen anropas. den skulle utföras i

							memory.chosenBricks[k].parentNode.setAttribute("status", 0); // sätter "status" till 0

						}
						
						//memory.chosenBricks[k].parentNode.setAttribute("status", 0); 
						memory.chosenBricks = []; // rensar arrayen för nytt bruk..
						statusCheckListSummary = 0; // måste sättas till noll annats fortsätter metoden att anropa resetter och då blir det knas!					
						
					};
					
					questionmark = e.target.getAttribute("src"); //sparar ner vägen till "?"-tecknet..
					
					memory.chosenBricks.push(e.target);//  lägga de två valda brickorna i en array som rensas varje gång brickorna tas bort..
					
					e.target.setAttribute("src", e.target.firstChild.getAttribute("src"));//sätter attributet för sökvägen (src) till sökvägen som leder till bilden som hör till kortet.. 
					
					if(e.target.getAttribute("src") ===  e.target.firstChild.getAttribute("src")){ // om  sökvägen är samma i källan som visas.
						
						e.target.parentNode.setAttribute("status", 1); // sätt status till 1
					}
					
					aTag = document.getElementById("box").getElementsByTagName("a");
					for(k = 0; k < aTag.length; k +=1){// for loop för att kolla om aTag har mer än 2 st status som har värdet 1.
						
						statusCheckList.push(parseInt(aTag[k].getAttribute("status"))); // tar ner alla status och parsar om från string till int..
						
						statusCheckListSummary += statusCheckList[k]; //  kollar det totala värdet av arrayen. Om det är över 2 då är 2 kort uppe...
						
					}
					
					if(statusCheckListSummary >= 2 ){ // om 2 kort är uppe...
						
						if(memory.chosenBricks[0].parentNode.getAttribute("coupleid") === memory.chosenBricks[1].parentNode.getAttribute("coupleid")){ 
							memory.chosenBricks = []; // rensar så att det är fritt fram för nästa par..
							statusCheckListSummary = 0; 
							
							winCheckerArr = []; // tommer.. 
							winChecker = document.getElementsByTagName("a");
							for(l = 0; l < winChecker.length; l +=1){
								winCheckerArr.push(parseInt(winChecker[l].getAttribute("status"))); // gör om listan till en array så att jag kan köra indexOf på den. parsar om från string till number.. 
							}
							if(winCheckerArr.indexOf(0) === -1){ // kontrollerar om alla kort är uppvända! 
								alert("DU klarade spelet! Du klarade det på "+memory.attempts+" Försök!");
							}
							
						}else{
							setTimeout(resetter, 500); // efter en sekund så rensas fönstret..
							memory.attempts += 1;
						}
						
						
						
					}

					
				};
				
				
				x += 1; // denna nollställs bara efter funktionen har körts.. den är lämplig att använda för att J skulle bara nollställas och "förstöra" allt...
				
			}			
			
		}
		
		
	}
	
	
	
	
};

window.onload = memory.startFunction();
