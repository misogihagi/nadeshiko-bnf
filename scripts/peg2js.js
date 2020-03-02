const peg = require("pegjs");
const fs = require('fs');
console.log(__dirname)
const text = fs.readFileSync(__dirname + "/../peg.txt", 'utf-8');
const parser = peg.generate(text, {
  output: "source"
})
fs.writeFile(__dirname + '/../nakoparser.js', 'const a=' + parser + '\nmodule.exports=a', () => {})