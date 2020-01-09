/* Analogous to the some method, arrays also have an every method. This one
returns true when the given function returns true for every element in the array.
In a way, some is a version of the || operator that acts on arrays, and every is 
like the && operator.
Implement every as a function that takes an array and a predicate function as 
parameters. Write two versions, one using a loop and one using the some method. */

function every(array, test) {
    for (item of array) {
        if (test(item) === false) return false;
    }
    return true;
}

function everySome(array, test) {
    return !array.some(element => !test(element));
}
console.log(every([1,2,3], n => n < 10));
console.log(every([2,4,16], n => n < 10));
console.log(every([], n => n < 10));
console.log('\n');
console.log(everySome([1,2,3], n => n < 10));
console.log(everySome([2,4,16], n => n < 10));
console.log(everySome([], n => n < 10));