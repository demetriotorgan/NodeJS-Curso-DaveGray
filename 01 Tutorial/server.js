const os = require('os')
const {add, sub, mult, div} = require('./math')

console.log(os.type())
console.log(os.version())
console.log(os.homedir())

console.log(__dirname);
console.log(__filename);

//--------------------
console.log('-------------------------')
console.log(add(2,3))
console.log(sub(2,3))
console.log(mult(2,3))
console.log(div(2,3))