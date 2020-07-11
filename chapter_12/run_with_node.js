// const { parse } = require("path");

// load dependencies
require("./code/load")("code/chapter/12_language.js");

run(`
do(define(plusOne, fun(a, +(a, 1))),
   print(plusOne(10)))
`);

run(`
do(define(pow, fun(base, exp,
     if(==(exp, 0),
        1,
        *(base, pow(base, -(exp, 1)))))),
   print(pow(2, 10)))
`);

run(`
do(define(sum, fun(array,
     do(define(i, 0),
        define(sum, 0),
        while(<(i, length(array)),
          do(define(sum, +(sum, element(array, i))),
             define(i, +(i, 1)))),
        sum))),
   print(sum(array(1, 2, 3))))
`);

console.log(parse("# hello\nx"));
console.log(parse("a # one\n   # two\n()"));

run(`
do(define(x, 4),
   define(setx, fun(val, set(x, val))),
   setx(50),
   print(x))
`);

run(`set(quux, true)`);