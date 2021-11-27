const anotherFunc = require('./first');
const secondFunc = require('./second');

const {thirdFunc,thirdVar} = require('./third');

anotherFunc();
secondFunc();

thirdFunc();
console.log(thirdVar);
console.log("app js");