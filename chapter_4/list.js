function arrayToList(array) {
    // Returns list structure made of give array.

    let list = {};

    if (array.length > 0) {
        // Creat first structure node pointing to null.
        list = {value: array[array.length - 1], rest: null};
        array.pop();

        // Create the rest of the list structure.
        for (i = array.length - 1; i >= 0; i--)
            list = {value: array[i], rest: list};
    }

    return list;
}

function listToArray(list) {
    // Returns array exctracted from list object values.

    let array = [];

    while (list.rest != null) {
        array.push(list.value);
        list = list.rest;
    }
    array.push(list.value);

    return array;
}

function prepend(element, list) {
    // Returns list with added element in the front.

    return {value: element, rest: list};
}

function nth(list, number) {
    // Returns value from the list based on given number, or undefined if there 
    // is no such element.

    // Recursion end check.
    if (number == 0) return list.value;
    else if (list.rest == null) return undefined;
    else return nth(list.rest, number - 1);
}

// Tests.
console.log(arrayToList([10,20,30]));
console.log(listToArray(arrayToList([10,20,30])));
console.log(prepend(10, prepend(20, null)));
console.log(nth(arrayToList([10,20,30]), 1));