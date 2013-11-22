"use strict";

var makePerson = function(persArr){

    // Ta persArr bryta upp den i flera delar(Name, age). Delarna ska sedan samlas i ett objekt med arrayer. Objectets arrayer ska sedan behandlas (tex ange min,max och average). objectet ska returneras tillbaka
    var i;
    var objectArr = { names: "Null", minAge: 0, maxAge: 0, averageAge: 0 };
    var differentAges = [];
    var differentNames = [];
    var findMax = 0;
    var findMin = Infinity - 1;
    var allAgeTogheter = 0;


    for(i = 0; i < persArr.length ; i++) // ska hålla på tills det inte finns mer object i arrayen...
    {        
        differentNames.push(persArr[i].name);
        differentAges.push(persArr[i].age);
               
    }

    for (i = 0; i < differentAges.length; i++)
    {
        if(differentAges[i] > findMax)
        {
            findMax = differentAges[i];
        }
        if (differentAges[i] < findMin) {
            findMin = differentAges[i];
        }
        allAgeTogheter += differentAges[i];

    }

    objectArr.maxAge = findMax;
    objectArr.minAge = findMin;
    objectArr.averageAge = (allAgeTogheter) / differentAges.length;
    differentNames.sort(); // sorterar till bokstavsordning
    objectArr.names = differentNames.join(", ");

    return objectArr;
}
var data = [{ name: "John Häggerud", age: 37 }, { name: "Mats Loock", age: 46 }, { name: "Johan Leitet", age: 36 }];

var result = makePerson(data);

console.log(result);
