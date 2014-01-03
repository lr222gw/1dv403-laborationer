"use strict";

var DESKTOPAPP = {
	
	master : function(){ // Huvudfunktionen som kör allt..
		var he = new DESKTOPAPP.konstructors.deskButtonFunctionHolder("hehe", "heh", "hoho");
		var ho = new DESKTOPAPP.konstructors.DeskWindowFunctionHolder("aWindow", "picstuff");
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
			DeskWindowFunctionHolder : function(name, icon){
				var theWindowToReturn;
				
				function DeskWindow(name, icon){
					this.name = name;
					this.icon = icon;
				}
				
				DeskWindow.prototype.structure = function(){
					
				};
				
				theWindowToReturn = new DeskWindow(name, icon); // skapar en knapp med värderna som skickades in till deskButtonFunctionHolder som returneras...
				return theWindowToReturn;
			}
			
				
		},
	
	myFunctions : { // Object där jag lagrar mina funktioner, mm...
		
	}
	
	
};

window.onload = DESKTOPAPP.master;