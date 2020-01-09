/*
Program that prints all numbers from 1 to 100, with two exceptions. If number is 
divisible by 3, print 'Fizz'. If the number is divisible by 5 print 'Buzz'. If the
number is divisible by 3 and 5 print 'FizzBuzz'.
*/

for (let num = 1; num <= 100; num++) {
    if (num % 3 == 0) {
        if (num % 5 == 0) console.log('FizzBuzz');
        else console.log('Fizz');
    }
    else if (num % 5 == 0) console.log('Buzz');
    else console.log(num); 
}