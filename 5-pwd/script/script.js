"use strict";

var DESKTOPAPP = {
	
	master : function(){ // Huvudfunktionen som kör allt..
		var he = new DESKTOPAPP.konstructors.DeskButtonFunctionHolder("hehe", "heh", "hoho");
	}, 
	
	konstructors : { // Objekt där jag lagrar mina konstruktorer...
		
		//Konstruktor för knapp/icon... här förvarar jag konstruktorn för knappskapandet samt prototyperna..
		DeskButtonFunctionHolder : function(name, buttonFunc, icon){ 
			var theButtonToReturn;
			
			function DeskButton(name, buttonFunc, icon){
				this.name = name; //namnet på iconen
				this.buttonFunc = buttonFunc; // Metoden som ska kontaktas när denna knapp trycks
				this.icon = icon; // En bild till knappen
			}			
				
			DeskButton.prototype.doAction = function(){
				alert();
			};
			
			theButtonToReturn = new DeskButton(name, buttonFunc, icon); // skapar en knapp som returneras...
			return theButtonToReturn;
		},
			
			//Konstruktor för mina fönster..
			DeskWindow : function(){
				
			} 
				
		},
	
	myFunctions : { // Object där jag lagrar mina funktioner, mm...
		
	}
	
	
};

window.onload = DESKTOPAPP.master;