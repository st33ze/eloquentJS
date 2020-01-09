function deepEqual (elementA, elementB) {
    /* Compares two elements with === operator. If compared elements are objects,
       checks if their keys and values match in a recursive way. */

    // Check if both elements are objects. If true compare the properties.
    if ((typeof elementA == 'object' && elementA != null) &&
        (typeof elementB == 'object' && elementB != null)) {
        
        let elementAKeys = Object.keys(elementA);
        let elementBKeys = Object.keys(elementB);

        // Check keys amount.
        if (elementAKeys.length != elementBKeys.length) return false;
        
        // Check if keys are the same.
        for (const key of elementAKeys) {
            if (!(key in elementB)) return false;
            if (deepEqual(elementA[key], elementB[key]) == false) return false;
        }

        return true;
        }

    // If only one element is an object return false.
    else if ((typeof elementA == 'object' && elementA != null) ||
             (typeof elementB == 'object' && elementB != null))
                 return false;

    // Do deep comparison for the rest value types.
    else {
        if (elementA !== elementB) return false;
        return true;
    }
}

// Tests.
let obj = {here: {is: 'an'}, object: 2};
console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, {here: 1, object: 2}));
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
console.log(deepEqual(null, null));
