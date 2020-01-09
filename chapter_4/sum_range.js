function range(start, end, step=1) {
    // Outputs array of numbers from start to end.
    let numbers = [];

    // Positive step.
    if (step > 0){
        while (start <= end) {
            numbers.push(start);
            start += step;
        }
    }

    // Negative step.
    else if (step < 0 ) {
        while (start >= end) {
            numbers.push(start);
            start += step;
        }
    }

    return numbers;
}

function sum(numbers) {
    // Returns sum of numbers in array.
    let sum = 0;
    for (num of numbers) sum += num;
    return sum;
}

console.log(range(1,10));
console.log(range(5,2,-1));
console.log(sum(range(1,10)));