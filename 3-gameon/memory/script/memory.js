var memory = {
	
	brickArray : [],
	
	randomPlats : [],
	
	startFunction : function(){
		do{	
			var brickAmount = + prompt("Hur många brickpar vill du köra med?(2-9)");
		
			if(brickAmount >= 2 && brickAmount <= 9 && brickAmount != NaN){
				
				memory._2brickaMaker(brickAmount);
				break;
			}else if(brickAmount == false){ // stänger ner om man trycker på cancel..
				break;
			}else{
				console.log("OPS not a number...");
			}
		}while(true)
		memory.randomPlats = RandomGenerator.getPictureArray(5, 2);
		
		
		
	},
	_2brickaMaker : function(brickAmount){
		
		for(var i = 0; i < brickAmount; i++ ){
			var aPic = "pics/"+i+".png";
			var aPic2 = "pics/"+i+".png";
			var id = i;
			
			var new_2Bricka = {};
			
			new_2Bricka = new memory._2bricka(aPic, aPic2, id);
			memory.brickArray.push(new_2Bricka);
		}
	},
	_2bricka : function(aPic, aPic2, id){
		this.getPic = function(){
			return aPic;
		}
		this.getPic2 = function(){
			return aPic2;
		}
		this.getId = function(){
			return id;
		}
		this.setPic = function(_aPic){
			aPic = _aPic;
		}
		this.setPic2 = function(_aPic2){
			aPic2 = _aPic2;
		}
		this.SetId = function(_id){
			id = _id;
		}
		
	}
	
	
	
}

window.onload = memory.startFunction();
