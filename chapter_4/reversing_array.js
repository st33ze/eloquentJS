function reverseArray(array) {
    // Returns new array in reversed oreder.
    let reversedArray = [];
    
    for (i = array.length - 1; i >= 0; i--) 
        reversedArray.push(array[i]);

    return reversedArray;
}

function reverseArrayInPlace(array) {
    // Returns the same array, but in reversed order.
    let arrayLength = array.length;
    let placeHolder;
    
    for (i = 0; i < arrayLength / 2; i++) {
        placeHolder = array[i];
        array[i] = array[arrayLength - i - 1];
        array[arrayLength - i - 1] = placeHolder;
    }
}

// Tests.
console.log(reverseArray(["A", "B", "C"]));

let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);