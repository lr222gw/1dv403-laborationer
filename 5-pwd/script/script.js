"use strict";

var DESKTOPAPP = {
	
	master : function(){ // Huvudfunktionen som kör allt..
		var he = new DESKTOPAPP.konstructors.deskButtonFunctionHolder("hehe", "heh", "hoho");
		var ho = new DESKTOPAPP.konstructors.DeskWindowFunctionHolder("aerarWindow", "picstuff");
		var heo = new DESKTOPAPP.konstructors.DeskWindowFunctionHolder("aeeeeWindow", "pics/gallery.png");
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
				
			DeskButton.prototype.doAction = function(){
				alert();
			};
			
			theButtonToReturn = new DeskButton(name, buttonFunc, icon); // skapar en knapp med värderna som skickades in till deskButtonFunctionHolder som returneras...
			return theButtonToReturn;
		},
			
			//Konstruktor för mina fönster..
			DeskWindowFunctionHolder : function(name, icon, methodForWindow){
				var theWindowToReturn, frame, topBar, bottomBar, contentWrap, contentBox, iconAndName, exitBpos;
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
					
					
					
					document.getElementById("desktop").appendChild(frame);
				};
								
				
				theWindowToReturn = new DeskWindow(name, icon); // skapar en knapp med värderna som skickades in till deskButtonFunctionHolder som returneras...
				theWindowToReturn.structure();// Aktiverar fönstret med hjälp av min prototype..
				return theWindowToReturn;
			}
			
				
		},
	
	myFunctions : { // Object där jag lagrar mina funktioner, mm...
		
	}
	
	
};

window.onload = DESKTOPAPP.master;