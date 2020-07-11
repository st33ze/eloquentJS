// PARSER 

function parseExpression(program) {
    program = skipSpace(program);
    let match, expr;
    if (match = /^"([^"]*)"/.exec(program)) {
      expr = {type: "value", value: match[1]};
    } else if (match = /^\d+\b/.exec(program)) {
      expr = {type: "value", value: Number(match[0])};
    } else if (match = /^[^\s(),#"]+/.exec(program)) {
      expr = {type: "word", name: match[0]};
    } else {
      throw new SyntaxError("Unexpected syntax: " + program);
    }
  
    return parseApply(expr, program.slice(match[0].length));
  }
  
  function skipSpace(string) {
    let first = string.search(/\S/);
    if (first == -1) return "";
    return string.slice(first);
  }
  
  function parseApply(expr, program) {
    program = skipSpace(program);
    if (program[0] != "(") {
      return {expr: expr, rest: program};
    }
  
    program = skipSpace(program.slice(1));
    expr = {type: "apply", operator: expr, args: []};
    while (program[0] != ")") {
      let arg = parseExpression(program);
      expr.args.push(arg.expr);
      program = skipSpace(arg.rest);
      if (program[0] == ",") {
        program = skipSpace(program.slice(1));
      } else if (program[0] != ")") {
        throw new SyntaxError("Expected ',' or ')'");
      }
    }
    return parseApply(expr, program.slice(1));
  }
  
  function parse(program) {
    let {expr, rest} = parseExpression(program);
    if (skipSpace(rest).length > 0) {
      throw new SyntaxError("Unexpected text after program");
    }
    return expr;
  }



  // COMPILER

function compile(exp) {
  if (exp.type == "value") {
    if (typeof(exp.value) == "string") return `"${exp.value}"`;
    return exp.value;
  } else if (exp.type == "word") return exp.name;
  
  else if (exp.type == "apply") {
    if (exp.operator.name in specialForms)
      return specialForms[exp.operator.name](exp.args);
    else 
      return `${exp.operator.name}(${exp.args.map(arg => compile(arg))})`;
  }
}

function run(eggCode){
  return eval(compile(parse(eggCode)));
}


// HELPERS
const specialForms = Object.create(null);

specialForms.if = (args) => {
  if (args.length != 2)
    throw new SyntaxError("Wrong number of args to if");
  else
    return `if(${compile(args[0])})` + `{${compile(args[1])}}`;
}

specialForms.elif = (args) => {
  if (args.length != 2)
    throw new SyntaxError("Wrong number of args to elif");
  else
    return `else if(${compile(args[0])})` + `{${compile(args[1])}}`;
}

specialForms.else = args => {
  if (args.length != 1)
    throw new SyntaxError("Wrong number of args to else");
  else
    return `else{${compile(args[0])}}`;
}

specialForms.while = (args) => {
  if (args.length != 2)
    throw new SyntaxError("Wrong number of args to while");
  else
    return `while(${compile(args[0])})` + `{\n${compile(args[1])}}`;
}

specialForms.do = args => {
  let tasks = ``;
  for (let arg of args) {
    tasks = tasks.concat(`${compile(arg)}`);
    if (!["}", ";"].includes(tasks.slice(-1)))
      tasks = tasks.concat(";");
    tasks = tasks.concat(`\n`);
  }
  return tasks;
}

specialForms.define = args => {
  if (args.length != 2 || args[0].type != "word")
    throw new SyntaxError("Incorrect use of define");
  else {
    let varVal;
    if (args[1].type == "apply") varVal = compile(args[1]);
    else args[1].type == "word" ? varVal = args[1].name : varVal = args[1].value;
    return `let ${args[0].name} = ${varVal}`;
  }
}

for(let op of ["+", "-", "*", "/", "==", "<", ">"]) {
  specialForms[op] = args => {
    if (args.length != 2)
      throw new SyntaxError(`"${op}" operation needs two arguments`);
    else 
      return `${compile(args[0])} ${op} ` + `${compile(args[1])}`;
  }
}

specialForms.print = args => {
  return `console.log(${args.map(arg => compile(arg))})`;
} 

specialForms.set = args => {
  if (args.length != 2 || args[0].type != "word")
    throw new SyntaxError("Incorrect use of set");
  else {
    let varVal;
    if (args[1].type == "apply") varVal = compile(args[1]);
    else args[1].type == "word" ? varVal = args[1].name : varVal = args[1].value;
    return `${args[0].name} = ${varVal}`;
  }
}

specialForms.fun = args => {
  if (!args.length)
    throw new SyntaxError("Functions need a body");

  let body = compile(args[args.length - 1]);
  let params = args.slice(0, args.length - 1).map(exp => {
    if (exp.type != "word") throw new SyntaxError("Parameter names must be words");
    return exp.name;
  });

return `function(${params}){\n${body}}`;
}

specialForms.return = args => {
  if (args.length > 1) 
    throw new SyntaxError("Return can have max one argument");
  return `return ${compile(args[0])};`;
}


// TEST CODE

run(`
do(define(total, 0),
   define(count, 1),
   while(<(count, 11),
         do(set(total, +(total, count)),
            set(count, +(count, 1)))),
   print(total))
`);

run(`
do(define(plusOne, fun(a, return(+(a, 1)))),
   print(plusOne(10)))
`);

run(`
do(define(pow, fun(base, exp,
  do(if(==(exp, 0), return(1)),
     else(return(*(base, pow(base, -(exp,1))))) 
    )
  )), 
  print(pow(2,10))
)`);