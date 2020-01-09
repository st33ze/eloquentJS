// Function that checks if number is even or odd in a recursive way.
// 0 is even, 1 is odd. For any other number N, its evenness is the same as N - 2.

function isEven(num) {
    
    if (num < 0) num = - num;
    
    // Check if number is 0 or 1.
    if (num == 0) return true;
    else if (num == 1) return false;
    
    // Else look further.
    else return isEven(num - 2);
}

// Tests
console.log(isEven(50));
console.log(isEven(75));
console.log(isEven(-1));