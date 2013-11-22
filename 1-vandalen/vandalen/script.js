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
    //var stringFixScandinavianLetters = ["Å", "Ä", "Ö", "å", "ä", "ö"];
    function compare(a, b) {
        return a.localeCompare(b); // function som tar hand om de scandinaviska bokstäverna.. Anropas av Sort-metoden..
        if (a > b ) 
        {
            return -1;
        }
        if (a > b)
        {
            return 1;
        }
        
        // a must be equal to b
        return 0;
    }


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
    objectArr.averageAge = Math.round(objectArr.averageAge); // avnrundar så att det blir ett godkänt tal i testerna..
    differentNames.sort(compare); // sorterar till bokstavsordning
    objectArr.names = differentNames.join(", ");
    

    return objectArr;
}
var data = [{ name: "John Häggerud", age: 37 }, { name: "Mats Loock", age: 46 }, { name: "Johan Leitet", age: 36 }];

var result = makePerson(data);

console.log(result);
