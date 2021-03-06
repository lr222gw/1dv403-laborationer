"use strict";

var DESKTOPAPP = {
	
	windowOnTop : "undefined",
	
	master : function(){ // Huvudfunktionen som kör allt..
		var button = new DESKTOPAPP.konstructors.deskButtonFunctionHolder("hehe", DESKTOPAPP.konstructors.DeskWindowFunctionHolder, "pics/gallery.png");
		//^funktionsanropet över skapar iconknappen...
	}, 
	
	konstructors : { // Objekt där jag lagrar mina konstruktorer...
		
		//Konstruktor för knapp/icon... här förvarar jag konstruktorn för knappskapandet samt prototyperna..
		deskButtonFunctionHolder : function(name, buttonFunc, icon){ 
			var theButtonToReturn;
			
			function DeskButton(name, buttonFunc, icon){
				this.name = name; //namnet på iconen
				this.buttonFunc = buttonFunc; // Metoden som ska kontaktas när denna knapp trycks (tex vad innehållet ska vara i fönster ruta)
				this.icon = icon; // En bild till knappen				
			}			
			
			DeskButton.prototype.structure = function(){
				var theIcon, iconBar;
				theIcon = document.createElement("div");
				theIcon.setAttribute("class", "icon");
				theIcon.innerHTML = "<img src='"+icon+"'>";
				
				iconBar = document.getElementById("iconBar");
				iconBar.appendChild(theIcon);
				
				theIcon.onclick = function(){
					buttonFunc("Bildgalleri", "pics/gallery.png", DESKTOPAPP.myFunctions.getGallery);
				};
			};
				
			
			DeskButton.prototype.structure(); // bygger upp min knapp..
			
			theButtonToReturn = new DeskButton(name, buttonFunc, icon); // skapar en knapp med värderna som skickades in till deskButtonFunctionHolder som returneras...
			return theButtonToReturn;
		},
			
			//Konstruktor för mina fönster..
			DeskWindowFunctionHolder : function(name, icon, methodForWindow){
				var theWindowToReturn, frame, topBar, bottomBar, contentWrap, contentBox, iconAndName, exitBpos, dragFrame;
				
				dragFrame = null;
				
				function DeskWindow(name, icon){
					this.name = name;
					this.icon = icon;
				}
				
				DeskWindow.prototype.structure = function(){ // här ska all kod för själva fönstrets uppbyggnad ligga..
					frame = document.createElement("div"); // Skapar ramen
					frame.setAttribute("class", "aWindow");
					
					topBar = document.createElement("div"); // skapar en övre list, där plats för namn, icon och stängaknapp ska finnas..
					topBar.setAttribute("class", "topBar");
					frame.appendChild(topBar);					
					
					iconAndName = document.createElement("div");
					iconAndName.setAttribute("class", "iconAndName");
					iconAndName.innerHTML = "<img src='"+icon+"'></img>";
					iconAndName.innerHTML += "<p>"+name+"</p>"; // Ger rutan ett namn.. namnet som man skickar med..
					topBar.appendChild(iconAndName);
					
					exitBpos = document.createElement("input");
					exitBpos.setAttribute("type", "submit");
					exitBpos.setAttribute("value", "X");
					exitBpos.setAttribute("class", "exitBpos");
					topBar.appendChild(exitBpos);

					contentWrap = document.createElement("div"); //Skapar en wrap till platsen för content
					contentWrap.setAttribute("class", "contentWrap");
					frame.appendChild(contentWrap);
					
					contentBox = document.createElement("div"); // skapar platsen för content
					contentBox.setAttribute("class", "contentBox");
					contentWrap.appendChild(contentBox);
					
					bottomBar = document.createElement("div"); // skapar bottomBar (plats för laddningsknapp/statusrad)
					bottomBar.setAttribute("class", "bottomBar");
					frame.appendChild(bottomBar);
					
					exitBpos.onclick = function(e){ // funktion som stänger ner fönstret när man trycker på fönstrets stänga knapp!
						e.target.parentNode.parentNode.remove();
					};
					
					//metod för att flytta fönstret, inspererad av http://stackoverflow.com/questions/13152578/create-a-draggable-div-in-native-javascript

					topBar.onmousedown = function(e){
							
						dragFrame = frame;
						document.body.classList.add("selectTextOff"); // När man börjar dra omkring rutan så stängs select av.. då markeras inget..
						
						// Ändrar z-index så att föremålet tidigare tryckt på blir överst..
						if(DESKTOPAPP.windowOnTop !== "undefined"){
							DESKTOPAPP.windowOnTop.style.zIndex = 0; // om det finns något i windowOnTop så sätt dennes index till 0. 
						}
						
						e.target.parentNode.style.zIndex = 5; // Sätter fönstret som man nyss tryck på att bli det översta
						
						DESKTOPAPP.windowOnTop = e.target.parentNode; //sparar ner vilket fönster i windowOnTop, för nästa fönster som trycks på!
						
					};
					frame.onmousemove = function(e){
						
						var x = e.pageX - 50;
						var y = e.pageY - 25; // minus värderna ändrar positionen för var muspekaren ska börja... 
						
						if(dragFrame === null){
							return;
						}
						
						dragFrame.style.left = x+"px";
						dragFrame.style.top = y+"px";
						
						topBar.onmouseout = function(){
							
							document.getElementById("desktop").onmouseup = function(){// Fix = om musen är utanför rutan och man släpper så släpps rutan när man släpper musknappen...
								dragFrame = null;
								document.body.classList.remove("selectTextOff");
							};
						};
					}; 
					
					document.getElementById("desktop").appendChild(frame);
					
					methodForWindow(contentBox, bottomBar); // Beroende på vilken ikon man tryckt på anropas respektive metod för att fylla upp fönstret med rätt innehåll..
				};
								
				
				theWindowToReturn = new DeskWindow(name, icon); // skapar en knapp med värderna som skickades in till deskButtonFunctionHolder som returneras...
				theWindowToReturn.structure();// Aktiverar fönstret med hjälp av min prototype..
				return theWindowToReturn;
			}
			
				
		},
	
	myFunctions : { // Object där jag lagrar mina funktioner, mm...
		
		getGallery : function(contentBox, bottomBar){
			var galleryContent, jsonStr, parsedGallery, loadingImg;
			galleryContent = new XMLHttpRequest();
			
		
			
			galleryContent.onreadystatechange = function(){							
				
				if(galleryContent.readyState === 4){
				
					if(galleryContent.status >=200 && galleryContent.status < 300 || galleryContent.status === 304){
						
						
						jsonStr = galleryContent.responseText;
						
						parsedGallery = JSON.parse(jsonStr);
						
						//contentBox.innerHTML = parsedGallery; //testkod...
						
						DESKTOPAPP.myFunctions.insertGallery(contentBox, parsedGallery, bottomBar);// Skickar med mitt parsed gallery och content till en funktion som ska sätta in innehållet i fönstret..
						
						//tar bort laddningsikonen
						loadingImg.remove();		
						
					}else{
						console.log("läsfel, Status:"+galleryContent.status);
						
					}
					
				}
				
			};
			
			//laddar in laddningssymbolen...
		 	loadingImg = document.createElement("div");
			loadingImg.setAttribute("class", "loaderIcon");
			loadingImg.setAttribute("text", "Loadning...");
			
			bottomBar.appendChild(loadingImg);
			
			//Gör det anropet mot servern...
			galleryContent.open("get", "http://homepage.lnu.se/staff/tstjo/labbyServer/imgviewer/", true);
			galleryContent.send(null);

		},
		
		insertGallery : function(contentBox, parsedGallery, bottomBar){
			var i, j, widest, tallest, box, img;
			widest = 0;
			tallest = 0;
			
			for(j = 0; j < parsedGallery.length; j +=1){
				//Dessa två satser tar reda på den bredaste bredden, och den högsta höjden...
				if(widest < parsedGallery[j].thumbWidth){
					widest = parsedGallery[j].thumbWidth;		
				}
				
				if(tallest < parsedGallery[j].thumbHeight){
					tallest = parsedGallery[j].thumbHeight;
				}			
			}
			
			for(i = 0; i < parsedGallery.length; i +=1){
				
				box = document.createElement("div");
				box.setAttribute("class", "box");
				box.style.width = widest+"px"; // sätter boxens width och height till den bredaste och den högsta
				box.style.height =  tallest+"px";
				
				img = document.createElement("img");  // skapar en bildtagg och lägger in thumbnail bilderna
				img.setAttribute("src", parsedGallery[i].thumbURL);
				img.setAttribute("picLink", parsedGallery[i].URL); // Sparar ner informationen om bildens URL...
				box.appendChild(img);
				
				contentBox.appendChild(box);
				
				//↓Funktion för att sätta bakgrundsbild!
				box.onclick = function(e){ 					
					var picToBeSet;
					
					if(e.target.className === "box"){ //om användaren tryckt på boxen
						picToBeSet = e.target.children[0].getAttribute("piclink");
					}else{ //om användaren tryckt på bilden
						picToBeSet = e.target.getAttribute("piclink");
					}
					
					document.getElementById("desktop").style.backgroundImage = "url("+picToBeSet+")";
					
				}
				

			}
			

		}
	}
	
	
};

window.onload = DESKTOPAPP.master;