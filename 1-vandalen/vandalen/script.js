"use strict";

var makePerson = function(persArr){

    // Ta persArr bryta upp den i flera delar(Name, age). Delarna ska sedan samlas i ett objekt med arrayer. Objectets arrayer ska sedan behandlas (tex ange min,max och average). objectet ska returneras tillbaka
    var i;
    var objectArr = {name: [], age : []};

    for(i = 0; i < persArr.length ; i++) // ska hålla på tills det inte finns mer object i arrayen...
    {
        
        objectArr.name.push(persArr[i].name);
        objectArr.age.push(persArr[i].age);
        
    }

    

    return objectArr;
}
var data = [{ name: "John Häggerud", age: 37 }, { name: "Mats Loock", age: 46 }, { name: "Johan Leitet", age: 36 }];

var result = makePerson(data);

console.log(result);
