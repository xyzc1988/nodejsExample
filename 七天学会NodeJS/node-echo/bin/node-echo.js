#!/usr/bin/env node
var argv = require("argv");
var echo = require("../lib/echo");
// console.log(echo(argv.join(" ")));

// Parses default arguments 'process.argv.slice( 2 )'
console.log(echo(argv.run().targets));

// Parses array instead
//argv.run([ '--option=123', '-o', '123' ]);



// var args = process.argv;
// var res = "";
// for(var i=0;i<args.length;i++){
//   res += args[i] + ' ';
// }
// console.log(echo(res))
