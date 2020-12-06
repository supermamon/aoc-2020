// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: light-gray; icon-glyph: magic;
const aoc = importModule('aoc-helpers')
const day  = 6
const input = (await aoc.getInput(day))

const start = new Date().getTime()
//------------------------------------


const questions = input.split("\n\n").map( g => g.replace(/\n/g,'') ) 
.map( a => {
  
  return a.split('').filter( (q,i,l) => l.indexOf(q) == i ).length
  
}).reduce( (a,c) => a+c )



const output = questions

//------------------------------------
const stop = new Date().getTime()

const content = `
output : ${output}
time   : ${(stop-start)}ms
`
log(content)
await aoc.saveOutput(day, content, 'a')